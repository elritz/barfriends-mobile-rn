import {VStack} from '#/src/components/ui/vstack'
import {Text} from '#/src/components/ui/text'
import {Pressable} from '#/src/components/ui/pressable'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Divider} from '#/src/components/ui/divider'
import {Box} from '#/src/components/ui/box'
// TODO: FN(Change theme functionality with database and local storage save)
import {useReactiveVar} from '@apollo/client'
import {InitialStateSearchArea} from '#/src/constants/Preferences'
import {
  AUTHORIZATION,
  LOCAL_STORAGE_SEARCH_AREA,
  LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
} from '#/src/constants/StorageConstants'
import {
  DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME,
  DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
} from '#/src/constants/TaskManagerConstants'
import {Feather, Ionicons} from '@expo/vector-icons'
import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  AuthorizationReactiveVar,
  SearchAreaReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {
  secureStorageItemDelete,
  secureStorageItemRead,
} from '#/src/util/hooks/local/useSecureStorage'
import * as Application from 'expo-application'
import * as Clipboard from 'expo-clipboard'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'
import {useRouter} from 'expo-router'
import {useEffect, useState} from 'react'
import {Alert, SectionList, useWindowDimensions} from 'react-native'
import {Platform, Linking, AppState, View} from 'react-native'
import {FlashList} from '@shopify/flash-list'

async function registerBackgroundFetchAsync() {
  await Location.startLocationUpdatesAsync(
    DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
    {
      accuracy: Location.Accuracy.Balanced,
      deferredUpdatesDistance: 15,
      timeInterval: 5000,
      showsBackgroundLocationIndicator: true,
      deferredUpdatesInterval:
        process.env.EXPO_PUBLIC_NODE_ENV === 'development' ? 1000 : 5000,
      distanceInterval:
        process.env.EXPO_PUBLIC_NODE_ENV === 'development' ? 0 : 20,
      foregroundService: {
        notificationTitle: 'Location',
        notificationBody: 'Location tracking in background',
        notificationColor: '#fff',
      },
    },
  )
}

async function registerForegroundFetchAsync() {
  await Location.startLocationUpdatesAsync(
    DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME,
    {
      accuracy: Location.Accuracy.Balanced,
      deferredUpdatesDistance: 25,
      timeInterval: 5000,
      showsBackgroundLocationIndicator: true,
      deferredUpdatesInterval:
        process.env.EXPO_PUBLIC_NODE_ENV === 'development' ? 1000 : 5000,
      distanceInterval:
        process.env.EXPO_PUBLIC_NODE_ENV === 'development' ? 0 : 20,
      foregroundService: {
        notificationTitle: 'Location',
        notificationBody: 'Location tracking in background',
        notificationColor: '#fff',
      },
    },
  )
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  return Location.stopLocationUpdatesAsync(
    DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
  )
}

export default () => {
  const ITEM_HEIGHT = 50
  const {width} = useWindowDimensions()
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

  const [appState, setAppState] = useState(AppState.currentState)
  const [isCopiedTokenDone, setIsCopiedTokenDone] = useState(false)
  const [isCopiedProfileIdDone, setIsCopiedProfileIdDone] = useState(false)
  const [isCopiedPushTokenDone, setIsCopiedPushTokenDone] = useState(false)
  const [token, setToken] = useState('')
  const [expoPushNotificationToken, setExpoPushNotificationToken] = useState('')
  const [pushNotificationToken, setPushNotificationToken] = useState('')
  const [searchAreaDeleteLoading, setSearchAreaDeleteLoading] = useState(false)
  const [authorizationDeleteLoading, setAuthorizationDeleteLoading] =
    useState(false)

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
    client,
  } = useRefreshDeviceManagerQuery({
    fetchPolicy: 'network-only',
  })

  // const appStateHandleBackgroundLocation = async nextAppState => {
  // 	const hasStarted = await Location.hasStartedLocationUpdatesAsync(
  // 		DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
  // 	)

  // 	if (isBackgroundLocationOn) {
  // 		if (!hasStarted && nextAppState === 'inactive') {
  // 			await registerBackgroundFetchAsync()
  // 		}
  // 		if (appState !== nextAppState) {
  // 			if (appState.match(/inactive|background/) && nextAppState === 'active') {
  // 				await unregisterBackgroundFetchAsync()
  // 			}
  // 		}
  // 	}

  // 	if (!isBackgroundLocationOn && hasStarted) {
  // 		await unregisterBackgroundFetchAsync()
  // 	}

  // 	AppState.currentState = nextAppState
  // 	setAppState(AppState.currentState)
  // }

  // async function onFetchUpdateAsync() {
  // 	try {
  // 		const update = await Updates.checkForUpdateAsync();

  // 		if (update.isAvailable) {
  // 			await Updates.fetchUpdateAsync();
  // 			await Updates.reloadAsync();
  // 		}
  // 	} catch (error) {
  // 		// You can also add an alert() to see the error message in case of an error when fetching updates.
  // 		Alert.alert(`Error fetching latest Expo update: ${error}`);
  // 	}
  // }

  async function getApplicationAuthorization() {
    const getAuthorization = await secureStorageItemRead({
      key: AUTHORIZATION,
    })
    setToken(String(getAuthorization))
  }

  async function getPushNotificationToken() {
    const IOSenv =
      await Application.getIosPushNotificationServiceEnvironmentAsync()
    const notificationtoken = await Notifications.getDevicePushTokenAsync()

    setPushNotificationToken(String(notificationtoken.data))

    const expoToken = await Notifications.getExpoPushTokenAsync({
      applicationId: String(Application.applicationId),
      projectId: Constants?.expoConfig?.extra?.eas.projectId,
      // development: IOSenv === 'development' ? true : false,
      development: true,
    })

    setExpoPushNotificationToken(String(expoToken.data))
  }

  useEffect(() => {
    getApplicationAuthorization()
    getPushNotificationToken()
  }, [])

  // useEffect(() => {
  // 	const appStateListen = AppState.addEventListener('change', appStateHandleBackgroundLocation)
  // 	return () => {
  // 		appStateListen.remove()
  // 	}
  // }, [isBackgroundLocationOn])

  // useEffect(() => {
  // 	registerForPushNotificationsAsync().then(token => setPushNotificationToken(token))

  // 	notificationListener?.current = Notifications.addNotificationReceivedListener(notification => {
  // 		setNotification(notification)
  // 	})

  // 	responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  // 	})

  // 	return () => {
  // 		Notifications.removeNotificationSubscription(notificationListener.current)
  // 		Notifications.removeNotificationSubscription(responseListener.current)
  // 	}
  // }, [])

  const handleOpenPhoneSettings = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings://')
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.APP_OPS_SETTINGS,
      )
    }
  }

  const toggleForegroundLocationTask = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME,
    )
    if (hasStarted) {
      await unregisterBackgroundFetchAsync()
    } else {
      await registerBackgroundFetchAsync()
    }
  }

  // const onReloadPress = useCallback(() => {
  // 	if (Platform.OS === 'web') {
  // 		location.reload()
  // 	} else {
  // 		Updates.reloadAsync()
  // 	}
  // }, [])

  // const onReloadPress = async () => {
  // 	if (Platform.OS === 'web') {
  // 		// location.reload()
  // 	} else {
  // 		await Updates.reloadAsync()
  // 	}
  // }

  const SettingsOptions = [
    {
      type: 'setting',
      title: 'Preference modals',
      icon: 'albums',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/preferences',
        }),
    },
    {
      type: 'setting',
      title: 'Ask modals',
      icon: 'albums',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/asks',
        }),
    },
    {
      type: 'setting',
      title: 'Permission modals',
      icon: 'bookmarks',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/permissionmodals',
        }),
    },
    {
      type: 'setting',
      title: 'Change theme',
      icon: 'color-palette-sharp',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/theme',
        }),
    },
    {
      type: 'setting',
      title: 'Device settings',
      icon: 'settings',
      onPress: handleOpenPhoneSettings,
    },
    // {
    // 	type: 'setting',
    // 	title: 'Refresh',
    // 	icon: 'refresh',
    // 	onPress: onReloadPress,
    // },
  ]

  const TokenOptions = [
    {
      type: 'token',
      title: 'Authorization',
      icon: 'finger-print',
      loading: authorizationDeleteLoading,
      onPress: async () => {
        setAuthorizationDeleteLoading(true)
        await secureStorageItemDelete({
          key: AUTHORIZATION,
        }),
          setTimeout(() => {
            setAuthorizationDeleteLoading(false)
          }, 1500)
      },
    },
    {
      type: 'token',
      title: 'Search area',
      icon: 'map',
      loading: searchAreaDeleteLoading,
      onPress: async () => {
        setSearchAreaDeleteLoading(true)
        await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
        SearchAreaReactiveVar(InitialStateSearchArea)
        setTimeout(() => {
          setSearchAreaDeleteLoading(false)
        }, 1500)
      },
    },
    {
      type: 'token',
      title: 'Reset theme',
      icon: 'color-palette-sharp',
      onPress: async () => {
        await AsyncStorage.removeItem(
          LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
        )
        const initialThemeColorSchemeState = JSON.stringify({
          colorScheme: 'system',
        })
        await AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
          initialThemeColorSchemeState,
        )
      },
    },
    {
      type: 'token',
      title: 'Cache Reset',
      icon: 'albums-outline',
      onPress: async () => {
        client.resetStore()
      },
    },
  ]

  const GeneralOptions = [
    // {
    // 	type: 'generalinformation',
    // 	title: 'Check for updates',
    // 	value: process.env.SERVER_ENDPOINT,
    // 	icon: '',
    // 	onPress: onFetchUpdateAsync,
    // },
    // {
    //   type: 'generalinformation',
    //   title: 'IP Address',
    //   value: process.env.SERVER_ENDPOINT,
    //   icon: '',
    //   onPress: async () => {
    //     await Clipboard.setStringAsync(String(process.env.SERVER_ENDPOINT))
    //   },
    // },
    // {
    //   type: 'generalinformation',
    //   title: 'Authorization Token',
    //   value: token,
    //   icon: '',
    //   onPress: async () => {
    //     await Clipboard.setStringAsync(token)
    //   },
    // },
    // {
    //   type: 'generalinformation',
    //   title: 'Profile Id',
    //   value: rAuthorizationVar?.Profile?.id,
    //   icon: '',
    //   onPress: async () => {
    //     await Clipboard.setStringAsync(String(rAuthorizationVar?.Profile?.id))
    //   },
    // },
    // {
    //   type: 'generalinformation',
    //   title: 'BfsProfile Id',
    //   value: rAuthorizationVar?.Profile?.bfsprofileid,
    //   icon: '',
    //   onPress: async () => {
    //     await Clipboard.setStringAsync(
    //       String(rAuthorizationVar?.Profile?.bfsprofileid),
    //     )
    //   },
    // },
    // {
    //   type: 'generalinformation',
    //   title: 'Expo Push Token',
    //   value: expoPushNotificationToken,
    //   icon: '',
    //   onPress: async () => {
    //     await Clipboard.setStringAsync(token)
    //   },
    // },
    // {
    //   type: 'generalinformation',
    //   title: 'Device Push Token',
    //   value: pushNotificationToken,
    //   icon: '',
    //   onPress: async () => {
    //     await Clipboard.setStringAsync(pushNotificationToken)
    //   },
    // },
  ]

  const Item = ({item, index, loading}) => {
    switch (item.type) {
      case 'setting':
        return (
          <Pressable key={index} onPress={item.onPress} className="mx-3">
            <Box style={{height: ITEM_HEIGHT}} className="justify-between">
              <Divider />
              <HStack space={'md'} className="items-center px-2">
                <Ionicons
                  size={25}
                  name={item.icon}
                  color={
                    rTheme.colorScheme === 'light'
                      ? rTheme.theme?.gluestack.tokens.colors.light900
                      : rTheme.theme?.gluestack.tokens.colors.light100
                  }
                />
                <Heading className="text-lg">{item.title}</Heading>
              </HStack>
              <Divider />
            </Box>
          </Pressable>
        )
      case 'token':
        return (
          <Pressable key={index} onPress={item.onPress} className="mx-3">
            <Box style={{height: ITEM_HEIGHT}} className="justify-between">
              <Divider />
              <HStack
                space={'md'}
                className="items-center justify-between px-2">
                <HStack space={'md'} className="items-center">
                  <Ionicons
                    size={25}
                    name={item.icon}
                    color={
                      rTheme.colorScheme === 'light'
                        ? rTheme.theme?.gluestack.tokens.colors.light900
                        : rTheme.theme?.gluestack.tokens.colors.light100
                    }
                  />
                  <Heading className="text-lg">{item.title}</Heading>
                </HStack>
                <Feather
                  style={{marginRight: 3}}
                  name="trash"
                  size={18}
                  color={rTheme.theme?.gluestack.tokens.colors.error500}
                />
              </HStack>
              <Divider />
            </Box>
          </Pressable>
        )
      case 'generalinformation':
        return (
          <Pressable onPress={item.onPress} className="mx-3">
            <VStack>
              <Divider />
              <Heading className="text-lg">{item.title}</Heading>
              <HStack className="items-center justify-between  py-4">
                <Text
                  ellipsizeMode={'tail'}
                  numberOfLines={1}
                  className="text-md max-w-[80%] flex-1 font-black capitalize">
                  {item.value}
                </Text>
                <View style={{marginHorizontal: 2}}>
                  <Feather
                    color={rTheme.theme?.gluestack.tokens.colors.primary500}
                    size={25}
                    name="copy"
                  />
                </View>
              </HStack>
            </VStack>
          </Pressable>
        )
      case 'test':
        return (
          <Pressable onPress={item.onPress} className="mx-3">
            <VStack style={{height: ITEM_HEIGHT}} className="justify-around">
              <Divider />
              <Heading className="text-lg max-w-[80%] font-black capitalize ">
                {item.title}
              </Heading>
            </VStack>
          </Pressable>
        )
    }
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: {data: 'goes here for link', link: 'What is this link'},
      },
      trigger: {seconds: 5},
    })
  }

  async function registerForPushNotificationsAsync() {
    let token

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    if (Device.isDevice) {
      const {status: existingStatus} = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
    } else {
      Alert.alert('Must use physical device for Push Notifications')
    }

    return token
  }

  const data = [
    {
      name: 'network',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/network',
        }),
    },
    {
      name: 'settings',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/settings',
        }),
    },
    {
      name: 'account',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/account',
        }),
    },
    {
      name: 'tokens',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/tokens',
        }),
    },
    {
      name: 'themes',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/theme',
        }),
    },
    {
      name: 'permissions',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/permissions',
        }),
    },
    {
      name: 'state',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/state',
        }),
    },
    {
      name: 'notifications',
      onPress: () =>
        router.push({
          pathname: '/(app)/hometab/developmentstack/notifications',
        }),
    },
  ]
  const NUM_COLUMNS = 3
  const ITEM_SIZE = width / NUM_COLUMNS - 10
  // return (
  //   <Box className="flex-1 bg-transparent">
  //     <SectionList
  //       showsVerticalScrollIndicator={false}
  //       contentInset={{
  //         bottom: 100,
  //       }}
  //       sections={[
  //         {
  //           title: 'General',
  //           data: GeneralOptions,
  //         },
  //         {
  //           title: 'Settings',
  //           data: SettingsOptions,
  //         },
  //         {
  //           title: 'Tokens',
  //           data: TokenOptions,
  //         },
  //         // {
  //         //   title: 'Testing',
  //         //   data: TestingOptions,
  //         // },
  //       ]}
  //       renderItem={({item, index, section}) => {
  //         return <Item loading={false} index={index} item={item} />
  //       }}
  //       renderSectionHeader={({section: {title}}) => (
  //         <Box className="justify-center rounded-none p-3">
  //           <Heading className="mt-4 text-2xl">{title}</Heading>
  //         </Box>
  //       )}
  //     />
  //   </Box>
  // )
  return (
    <Box className="flex-1">
      <FlashList
        data={data}
        keyExtractor={(item, index) => item.name}
        numColumns={NUM_COLUMNS}
        estimatedItemSize={ITEM_SIZE}
        renderItem={({item, index}) => {
          return (
            <Box className="flex-1 p-2 w-[100%] items-center">
              <Pressable className="w-[100%]" onPress={item.onPress}>
                <Box
                  style={{height: ITEM_SIZE}}
                  className="rounded-lg bg-light-200 dark:bg-light-800 justify-center">
                  <Heading className="capitalize self-center">
                    {item.name}
                  </Heading>
                </Box>
              </Pressable>
            </Box>
          )
        }}
      />
    </Box>
  )
}

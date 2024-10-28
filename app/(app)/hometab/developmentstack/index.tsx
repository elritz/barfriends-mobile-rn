import {useWindowDimensions} from 'react-native'
import {useRouter} from 'expo-router'
// TODO: FN(Change theme functionality with database and local storage save)
import {FlashList} from '@shopify/flash-list'

import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'

// async function registerBackgroundFetchAsync() {
//   await Location.startLocationUpdatesAsync(
//     DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
//     {
//       accuracy: Location.Accuracy.Balanced,
//       deferredUpdatesDistance: 15,
//       timeInterval: 5000,
//       showsBackgroundLocationIndicator: true,
//       deferredUpdatesInterval:
//         process.env.EXPO_PUBLIC_NODE_ENV === 'development' ? 1000 : 5000,
//       distanceInterval:
//         process.env.EXPO_PUBLIC_NODE_ENV === 'development' ? 0 : 20,
//       foregroundService: {
//         notificationTitle: 'Location',
//         notificationBody: 'Location tracking in background',
//         notificationColor: '#fff',
//       },
//     },
//   )
// }

// async function registerForegroundFetchAsync() {
//   await Location.startLocationUpdatesAsync(
//     DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME,
//     {
//       accuracy: Location.Accuracy.Balanced,
//       deferredUpdatesDistance: 25,
//       timeInterval: 5000,
//       showsBackgroundLocationIndicator: true,
//       deferredUpdatesInterval:
//         process.env.EXPO_PUBLIC_NODE_ENV === 'development' ? 1000 : 5000,
//       distanceInterval:
//         process.env.EXPO_PUBLIC_NODE_ENV === 'development' ? 0 : 20,
//       foregroundService: {
//         notificationTitle: 'Location',
//         notificationBody: 'Location tracking in background',
//         notificationColor: '#fff',
//       },
//     },
//   )
// }

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
// async function unregisterBackgroundFetchAsync() {
//   return Location.stopLocationUpdatesAsync(
//     DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
//   )
// }

export default () => {
  const {width} = useWindowDimensions()
  const router = useRouter()

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

  // async function getApplicationAuthorization() {
  //   const getAuthorization = await secureStorageItemRead({
  //     key: AUTHORIZATION,
  //   })
  //   setToken(String(getAuthorization))
  // }

  // async function getPushNotificationToken() {
  //   const IOSenv =
  //     await Application.getIosPushNotificationServiceEnvironmentAsync()
  //   const notificationtoken = await Notifications.getDevicePushTokenAsync()

  //   setPushNotificationToken(String(notificationtoken.data))

  //   const expoToken = await Notifications.getExpoPushTokenAsync({
  //     applicationId: String(Application.applicationId),
  //     projectId: Constants?.expoConfig?.extra?.eas.projectId,
  //     // development: IOSenv === 'development' ? true : false,
  //     development: true,
  //   })

  //   setExpoPushNotificationToken(String(expoToken.data))
  // }

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

  // const handleOpenPhoneSettings = async () => {
  //   if (Platform.OS === 'ios') {
  //     Linking.openURL('app-settings://')
  //   } else {
  //     IntentLauncher.startActivityAsync(
  //       IntentLauncher.ActivityAction.APP_OPS_SETTINGS,
  //     )
  //   }
  // }

  // const toggleForegroundLocationTask = async () => {
  //   const hasStarted = await Location.hasStartedLocationUpdatesAsync(
  //     DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME,
  //   )
  //   if (hasStarted) {
  //     await unregisterBackgroundFetchAsync()
  //   } else {
  //     await registerBackgroundFetchAsync()
  //   }
  // }

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

  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "You've got mail! 📬",
  //       body: 'Here is the notification body',
  //       data: {data: 'goes here for link', link: 'What is this link'},
  //     },
  //     trigger: {seconds: 5},
  //   })
  // }

  // async function registerForPushNotificationsAsync() {
  //   let token

  //   if (Platform.OS === 'android') {
  //     await Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     })
  //   }

  //   if (Device.isDevice) {
  //     const {status: existingStatus} = await Notifications.getPermissionsAsync()
  //     let finalStatus = existingStatus
  //     if (existingStatus !== 'granted') {
  //       const {status} = await Notifications.requestPermissionsAsync()
  //       finalStatus = status
  //     }
  //     if (finalStatus !== 'granted') {
  //       Alert.alert('Failed to get push token for push notification!')
  //       return
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data
  //   } else {
  //     Alert.alert('Must use physical device for Push Notifications')
  //   }

  //   return token
  // }

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
              <Pressable
                accessibilityRole="button"
                className="w-[100%]"
                onPress={item.onPress}>
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

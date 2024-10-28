import {useEffect, useRef} from 'react'
import {Alert, AppState, Platform, ScrollView, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import * as Application from 'expo-application'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {useIsFocused} from '@react-navigation/native'

import {TokenType, useUpsertDevicePushTokenMutation} from '#/graphql/generated'
import {PermissionsReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Divider} from '#/src/components/ui/divider'
import {Heading} from '#/src/components/ui/heading'
import {VStack} from '#/src/components/ui/vstack'
import {capitalizeFirstLetter} from '#/src/util/helpers/capitalizeFirstLetter'
import useTimer2 from '#/src/util/hooks/useTimer2'
import PermissionDetailItem from '#/src/view/screens/permissions/PermissionDetailItem'

// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it

export default () => {
  const appStateRef = useRef(AppState.currentState)
  const router = useRouter()
  const isFocused = useIsFocused()
  const insets = useSafeAreaInsets()
  const rPerm = useReactiveVar(PermissionsReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const {finished, start, seconds, started} = useTimer2('0:2')

  const details = [
    {
      title: 'How you’ll use this',
      detail: 'To receive messages, venue and event deals around you.',
      icon: (
        <Ionicons
          name={'location-sharp'}
          size={25}
          style={{
            marginHorizontal: 7,
          }}
          color={
            rTheme.colorScheme === 'light'
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      ),
    },
    {
      title: 'How we’ll use this',
      detail: 'To create messages from you to others.',
      icon: (
        <MaterialCommunityIcons
          name={'android-messages'}
          size={25}
          style={{
            marginHorizontal: 7,
          }}
          color={
            rTheme.colorScheme === 'light'
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      ),
    },
    {
      title: 'How these settings work',
      detail:
        'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
      icon: (
        <Ionicons
          name={'settings-sharp'}
          size={25}
          style={{
            marginHorizontal: 7,
          }}
          color={
            rTheme.colorScheme === 'light'
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      ),
    },
  ]

  const [upsertDevicePushTokenMutation, {data, loading, error}] =
    useUpsertDevicePushTokenMutation()

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Barfriends Notification Permission',
      `Notifications are currently ${capitalizeFirstLetter(
        capitalizeFirstLetter(rPerm?.notifications.status),
      )}. If you wish to adjust go to your device settings.`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Settings', onPress: () => handleOpenPhoneSettings()},
      ],
    )

  const handleOpenPhoneSettings = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings://')
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.NOTIFICATION_SETTINGS,
      )
    }
  }

  const handleRequestPermission = async () => {
    if (Device.isDevice) {
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#ff6f007c',
        })
      }

      const status = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
          provideAppNotificationSettings: true,
          allowCriticalAlerts: true,
          allowDisplayInCarPlay: true,
        },
      })

      PermissionsReactiveVar({
        ...rPerm,
        notifications: status,
      })

      if (status.granted) {
        const devicetoken = await Notifications.getDevicePushTokenAsync()

        if (Platform.OS === 'ios') {
          const IOSenv =
            await Application.getIosPushNotificationServiceEnvironmentAsync()

          const expoToken = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas.projectId,
            applicationId: String(Application.applicationId),
            development: IOSenv === 'development' ? true : false,
          })

          upsertDevicePushTokenMutation({
            variables: {
              type: TokenType.Ios,
              expoToken: expoToken.data,
            },
          })
        } else {
          const expoToken = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas.projectId,
            applicationId: String(Application.applicationId),
          })

          upsertDevicePushTokenMutation({
            variables: {
              type: TokenType.Android,
              token: devicetoken.data,
              expoToken: expoToken.data,
            },
          })
        }
      } else {
        createTwoButtonAlert()
      }
    } else {
      Alert.alert('Must use physical device for Push Notifications')
    }
  }

  useEffect(() => {
    async function loadPermissionsAsync() {
      const status = await Notifications.getPermissionsAsync()
      try {
        PermissionsReactiveVar({
          ...rPerm,
          notifications: status,
        })
      } catch (e) {
        console.warn(e)
      }
    }
    loadPermissionsAsync()
  }, [isFocused])

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )
    return () => {
      subscription.remove()
    }
  }, [])

  const handleAppStateChange = async (nextAppState: any) => {
    if (
      /inactive|background/.exec(appStateRef.current) &&
      nextAppState === 'active'
    ) {
      const status = await Notifications.getPermissionsAsync()
      PermissionsReactiveVar({
        ...rPerm,
        notifications: status,
      })
      if (status.granted && status.status === 'granted') {
        setTimeout(() => {
          router.back()
        }, 2000)
        start()
      }
    }
    appStateRef.current = nextAppState
  }

  finished(() => {
    router.back()
  })

  return (
    <Box style={{marginBottom: insets.bottom}} className="mb-5 flex-1">
      <Box className="my-5 items-center justify-start">
        <Box className="h-[65px] w-[65px] items-center justify-center rounded-md bg-[#ff7000]">
          <Ionicons
            name="notifications"
            size={30}
            color={
              rTheme.theme?.gluestack.tokens.colors.secondary900 || 'black'
            }
          />
        </Box>
        <Divider style={{width: 50, marginVertical: 10}} className="w-2" />
        <Heading
          style={{
            textAlign: 'center',
          }}
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={3}
          className="px-2 text-3xl font-black">
          Allow Barfriends to access your network
        </Heading>
      </Box>
      <ScrollView>
        <Box
          style={{flex: 1, alignSelf: 'center'}}
          className="w-[100%] bg-transparent">
          {details.map((item, index) => {
            return (
              <View key={index}>
                <PermissionDetailItem {...item} />
              </View>
            )
          })}
        </Box>
      </ScrollView>
      <VStack space={'md'} className="mb-[2] w-full items-center">
        <Divider className="w-[95%]" />
        <Button
          size={'lg'}
          onPress={() =>
            !rPerm?.notifications.granted
              ? rPerm?.notifications.canAskAgain && !rPerm.notifications.granted
                ? handleRequestPermission()
                : handleOpenPhoneSettings()
              : createTwoButtonAlert()
          }
          className="w-[95%]">
          <ButtonText>
            {!rPerm?.notifications.granted
              ? rPerm?.notifications.canAskAgain && !rPerm.notifications.granted
                ? 'Continue'
                : 'Go to Phone Settings'
              : 'Granted'}
          </ButtonText>
        </Button>
        {!started ? (
          <Button
            size={'lg'}
            onPress={() => router.back()}
            variant={'link'}
            className="w-[95%]">
            <ButtonText className="font-medium">Close</ButtonText>
          </Button>
        ) : (
          <Button
            size={'lg'}
            onPress={() => router.back()}
            variant={'link'}
            className="w-[95%]">
            {started && (
              <Box className="h-[24px] bg-transparent">
                {
                  <ButtonText className="font-medium">
                    Auto close in {seconds}
                  </ButtonText>
                }
              </Box>
            )}
          </Button>
        )}
      </VStack>
    </Box>
  )
}

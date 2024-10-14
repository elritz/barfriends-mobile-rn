import {VStack} from '#/src/components/ui/vstack'
import {Text} from '#/src/components/ui/text'
import {Heading} from '#/src/components/ui/heading'
import {Divider} from '#/src/components/ui/divider'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Box} from '#/src/components/ui/box'
// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it
import {useReactiveVar} from '@apollo/client'
import IllustrationDynamicLocation from '#/assets/images/location/IllustrationDynamicLocation'
import PermissionDetailItem from '#/src/view/screens/permissions/PermissionDetailItem'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {useIsFocused} from '@react-navigation/native'
import {
  PermissionBackgroundLocationReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {capitalizeFirstLetter} from '#/src/util/helpers/capitalizeFirstLetter'
import useTimer2 from '#/src/util/hooks/useTimer2'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import {useRouter} from 'expo-router'
import React, {useEffect, useRef} from 'react'
import {Alert, AppState, Platform, ScrollView, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export default () => {
  const appStateRef = useRef(AppState.currentState)
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const isFocused = useIsFocused()
  const rBackgroundLocationPermissionVar = useReactiveVar(
    PermissionBackgroundLocationReactiveVar,
  )
  const {start, seconds, started} = useTimer2('0:2')
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const details = [
    {
      title: 'How you’ll use this',
      detail: 'To find venues and event deals around you.',
      icon: (
        <Ionicons
          name="location-sharp"
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
      detail: 'To create your own content and share. ',
      icon: (
        <MaterialCommunityIcons
          name="android-messages"
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
          name="settings-sharp"
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

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Barfriends Backgrounds Location Permission',
      `Location access is currently active ${capitalizeFirstLetter(
        rBackgroundLocationPermissionVar?.status,
      )}. If you wish to adjust go to your device settings.
			`,
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
        IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS,
      )
    }
  }

  const handleRequestBackgroundLocationPermission = async () => {
    const status = await Location.requestBackgroundPermissionsAsync()
    if (status.granted) {
    }
  }

  useEffect(() => {
    async function loadPermissionsAsync() {
      const status = await Location.getBackgroundPermissionsAsync()
      try {
        PermissionBackgroundLocationReactiveVar(status)
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
      const backgroundlocationpermission =
        await Location.getBackgroundPermissionsAsync()
      PermissionBackgroundLocationReactiveVar(backgroundlocationpermission)
      if (
        backgroundlocationpermission.granted &&
        backgroundlocationpermission.status === 'granted'
      ) {
        setTimeout(() => {
          router.back()
        }, 1500)
        start()
      }
    }
    appStateRef.current = nextAppState
  }

  return (
    <Box style={{marginBottom: insets.bottom}} className="mb-5 flex-1">
      <Box className="my-5 items-center justify-start">
        <IllustrationDynamicLocation width={60} height={60} />
        <Divider style={{width: 50, marginVertical: 10}} className="w-2" />
        <Heading
          style={{
            textAlign: 'center',
          }}
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={3}
          className="px-2 text-3xl font-black">
          Allow Barfriends to access Background location
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
            !rBackgroundLocationPermissionVar?.granted
              ? rBackgroundLocationPermissionVar?.canAskAgain &&
                !rBackgroundLocationPermissionVar.granted
                ? handleRequestBackgroundLocationPermission()
                : handleOpenPhoneSettings()
              : createTwoButtonAlert()
          }
          className="w-[95%] rounded-lg">
          <ButtonText>
            {!rBackgroundLocationPermissionVar?.granted
              ? rBackgroundLocationPermissionVar?.canAskAgain &&
                !rBackgroundLocationPermissionVar.granted
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

import {useEffect, useRef} from 'react'
import {ScrollView} from 'react-native'
import {Alert, AppState, Platform, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import {useRouter} from 'expo-router'
// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it
import {useReactiveVar} from '@apollo/client'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {useIsFocused} from '@react-navigation/native'

import IllustrationDynamicLocation from '#/assets/images/location/IllustrationDynamicLocation'
import {PermissionsReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Divider} from '#/src/components/ui/divider'
import {Heading} from '#/src/components/ui/heading'
import {VStack} from '#/src/components/ui/vstack'
import {capitalizeFirstLetter} from '#/src/util/helpers/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '#/src/util/hooks/searcharea/useSetSearchAreaWithLocation'
import useTimer2 from '#/src/util/hooks/useTimer2'
import PermissionDetailItem from '#/src/view/screens/permissions/PermissionDetailItem'

export default () => {
  const appStateRef = useRef(AppState.currentState)
  const router = useRouter()
  const isFocused = useIsFocused()
  const insets = useSafeAreaInsets()
  const rPerm = useReactiveVar(PermissionsReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const {start, seconds, started, finished} = useTimer2('0:2')

  const details = [
    {
      title: 'How you’ll use this',
      detail: 'To find venues and event deals around you.',
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
      detail: 'To create your own content and share. ',
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

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Barfriends Foreground Location Permission',
      `Location is currently ${capitalizeFirstLetter(
        rPerm?.locationForeground.status,
      )} and in use. If you wish to adjust go to your device settings.`,
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

  const handleRequestForegroundLocationPermission = async () => {
    const status = await Location.requestForegroundPermissionsAsync()
    if (status.granted) {
      PermissionsReactiveVar({
        ...rPerm,
        locationForeground: status,
      })
      await useSetSearchAreaWithLocation()
      if (!started) {
        start()
      }
    }
  }

  useEffect(() => {
    async function loadPermissionsAsync() {
      const status = await Location.getForegroundPermissionsAsync()
      try {
        PermissionsReactiveVar({
          ...rPerm,
          locationForeground: status,
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
      const locationpermission = await Location.getForegroundPermissionsAsync()
      PermissionsReactiveVar({
        ...rPerm,
        locationForeground: locationpermission,
      })
      if (
        locationpermission.granted &&
        locationpermission.status === 'granted'
      ) {
        if (!started) {
          start()
        }
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
        <IllustrationDynamicLocation width={60} height={60} />
        <Divider style={{width: 50, marginVertical: 10}} />
        <Heading
          style={{
            textAlign: 'center',
          }}
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={3}
          className="px-2 text-3xl font-black">
          Allow Barfriends to Use Foreground Location
        </Heading>
      </Box>
      <ScrollView>
        <Box style={{flex: 1, alignSelf: 'center'}} className="w-[100%] ">
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
          style={{
            width: '95%',
          }}
          onPress={() =>
            !rPerm?.locationForeground.granted
              ? rPerm?.locationForeground.canAskAgain &&
                !rPerm.locationForeground.granted
                ? handleRequestForegroundLocationPermission()
                : handleOpenPhoneSettings()
              : createTwoButtonAlert()
          }>
          <ButtonText>
            {!rPerm?.locationForeground.granted
              ? rPerm?.locationForeground.canAskAgain &&
                !rPerm.locationForeground.granted
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

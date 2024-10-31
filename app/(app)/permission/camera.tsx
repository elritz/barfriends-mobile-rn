import {Camera, requestCameraPermissionsAsync} from 'expo-camera/legacy'
import * as Device from 'expo-device'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import {useRouter} from 'expo-router'
import {useEffect, useRef} from 'react'
import {Alert, AppState, Platform, ScrollView, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
// TODO: FN(Open camera app) ln:66
import {useReactiveVar} from '@apollo/client'
import {AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'

import {PermissionsReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Divider} from '#/src/components/ui/divider'
import {Heading} from '#/src/components/ui/heading'
import {VStack} from '#/src/components/ui/vstack'
import {capitalizeFirstLetter} from '#/src/util/helpers/capitalizeFirstLetter'
import useTimer2 from '#/src/util/hooks/useTimer2'
import PermissionDetailItem from '#/src/view/screens/permissions/PermissionDetailItem'

export default () => {
  const router = useRouter()
  const appStateRef = useRef(AppState.currentState)
  const rPerm = useReactiveVar(PermissionsReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const insets = useSafeAreaInsets()
  const {finished, start, seconds, started} = useTimer2('0:2')

  const details = [
    {
      title: 'How you’ll use this',
      detail: 'To take photos, record videos from your device.',
      icon: (
        <AntDesign
          name="camera"
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
      detail: 'To show you captured content of visual and audio effects.',
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
      title: 'How theses settings work',
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
  // const [cameraPermission, cameraRequestPermission] = Camera.useCameraPermissions()
  // const [micPermission, micRequestPermission] = Camera.useMicrophonePermissions()

  const handleOpenPhoneSettings = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings://')
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.APPLICATION_SETTINGS,
      )
    }
  }
  const createTwoButtonAlert = () =>
    Alert.alert(
      'Barfriends Camera Permissions',
      `Camera permissions are currently ${capitalizeFirstLetter(
        capitalizeFirstLetter(rPerm?.camera.status),
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

  const handleAppStateChange = async (nextAppState: any) => {
    if (
      /inactive|background/.exec(appStateRef.current) &&
      nextAppState === 'active'
    ) {
      const status = await Camera.getCameraPermissionsAsync()
      PermissionsReactiveVar({
        ...rPerm,
        camera: status,
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
  const handleRequestPermission = async () => {
    if (Device.isDevice) {
      const status = await requestCameraPermissionsAsync()

      PermissionsReactiveVar({
        ...rPerm,
        camera: status,
      })

      createTwoButtonAlert()
    }
  }
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )
    return () => {
      subscription.remove()
    }
  }, [handleAppStateChange])

  finished(() => {
    router.back()
  })

  return (
    <Box style={{marginBottom: insets.bottom}} className="mb-5 flex-1">
      <Box className="my-5 items-center justify-start">
        <Box className="h-[65px] w-[65px] items-center justify-center rounded-md bg-[#ff7000]">
          <Ionicons
            color={
              rTheme.theme?.gluestack.tokens.colors.secondary900 || 'black'
            }
            name="camera"
            size={30}
          />
        </Box>
        <Divider style={{width: 50, marginVertical: 10}} />
        <Heading
          style={{
            textAlign: 'center',
          }}
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={3}
          className="px-2 text-3xl font-black">
          Allow Barfriends to access your camera
        </Heading>
      </Box>
      <ScrollView>
        <Box
          style={{width: '95%', flex: 1, alignSelf: 'center'}}
          className="bg-transparent">
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
            !rPerm?.camera.granted
              ? rPerm?.camera.canAskAgain && !rPerm?.camera.granted
                ? handleRequestPermission()
                : handleOpenPhoneSettings()
              : createTwoButtonAlert()
          }
          className="w-[95%]">
          <ButtonText>
            {!rPerm?.camera.granted
              ? rPerm?.camera.canAskAgain && !rPerm.camera.granted
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

import {useEffect, useRef} from 'react'
import {AppState, Platform, ScrollView, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as MediaLibrary from 'expo-media-library'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

import IllustrationDynamicMedia from '#/assets/images/media/IllustrationDynamicMedia'
import {PermissionsReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Divider} from '#/src/components/ui/divider'
import {Heading} from '#/src/components/ui/heading'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import useTimer2 from '#/src/util/hooks/useTimer2'
import PermissionDetailItem from '#/src/view/screens/permissions/PermissionDetailItem'

export default () => {
  const appStateRef = useRef(AppState.currentState)
  const [status] = MediaLibrary.usePermissions()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const rPerm = useReactiveVar(PermissionsReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const {finished, start, seconds, started} = useTimer2('0:2')

  const details = [
    {
      title: 'How you’ll use this',
      detail: 'To access photos, record videos from your device.',
      icon: (
        <MaterialIcons
          name={'photo-size-select-actual'}
          style={{
            marginHorizontal: 7,
          }}
          size={23}
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
      detail: 'To create your content and share.',
      icon: (
        <MaterialCommunityIcons
          size={25}
          name={'android-messages'}
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

  useEffect(() => {
    if (status) {
      PermissionsReactiveVar({
        ...PermissionsReactiveVar(),
        medialibrary: status,
      })
    }
  }, [status])

  const askMediaLibraryPermissionAsync = async () => {
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()
    PermissionsReactiveVar({
      ...PermissionsReactiveVar(),
      medialibrary: mediaLibraryPermission,
    })
    if (
      mediaLibraryPermission.granted &&
      mediaLibraryPermission.status === 'granted'
    ) {
      start()
    }
  }

  const openPhoneSettings = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings://')
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS,
      )
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
  }, [])

  const handleAppStateChange = async (nextAppState: any) => {
    if (
      /inactive|background/.exec(appStateRef.current) &&
      nextAppState === 'active'
    ) {
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync()
      PermissionsReactiveVar({
        ...PermissionsReactiveVar(),
        medialibrary: mediaLibraryPermission,
      })
      if (
        mediaLibraryPermission.granted &&
        mediaLibraryPermission.status === 'granted'
      ) {
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
      <Box className="my-5 items-center justify-start bg-transparent">
        <IllustrationDynamicMedia width={60} height={60} />
        <Divider style={{width: 50, marginVertical: 10}} />
        <Heading
          style={{
            textAlign: 'center',
          }}
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={3}
          className="px-2 text-3xl font-black">
          Allow Barfriends to access your photos and videos
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
            rPerm?.medialibrary.canAskAgain
              ? askMediaLibraryPermissionAsync()
              : openPhoneSettings()
          }
          className="w-[95%]">
          <ButtonText>
            {!rPerm?.medialibrary.granted
              ? rPerm?.medialibrary.canAskAgain && !rPerm.medialibrary.granted
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
                {<Text className="font-medium">Auto close in {seconds}</Text>}
              </Box>
            )}
          </Button>
        )}
      </VStack>
    </Box>
  )
}

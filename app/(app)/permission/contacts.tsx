import {useEffect, useRef} from 'react'
import {Alert, AppState, Platform, ScrollView, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import * as Contacts from 'expo-contacts'
import * as Device from 'expo-device'
import * as Linking from 'expo-linking'
import {useRouter} from 'expo-router'
// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it
import {useReactiveVar} from '@apollo/client'
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import {useIsFocused} from '@react-navigation/native'

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
      detail: 'To share, friend and invite to events and venues.',
      icon: (
        <MaterialIcons
          name={'contact-page'}
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
      detail: 'To show you your contacts.',
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
      'Barfriends Contacts Permission',
      `Contacts are currently ${capitalizeFirstLetter(
        capitalizeFirstLetter(rPerm?.contacts.status),
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
      Linking.openURL('app-settings://')
    }
  }

  const handleRequestPermission = async () => {
    const status = await Contacts.requestPermissionsAsync()
    if (Device.isDevice) {
      PermissionsReactiveVar({
        ...rPerm,
        contacts: status,
      })
      if (status.granted && status.status === 'granted') {
        const {data} = await Contacts.getContactsAsync()
        if (data.length) {
          // ContactsReactiveVar(data)
          console.log('Contacts: TODO', data)
        }
        start()
      }
    } else {
      createTwoButtonAlert()
    }
  }

  useEffect(() => {
    async function loadPermissionsAsync() {
      const status = await Contacts.getPermissionsAsync()
      try {
        PermissionsReactiveVar({
          ...rPerm,
          contacts: status,
        })

        if (status.granted && status.status === 'granted') {
          const {data} = await Contacts.getContactsAsync()
          if (data.length) {
            console.log('Contacts: TODO', data)
          }
        }
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
      const status = await Contacts.getPermissionsAsync()
      PermissionsReactiveVar({
        ...rPerm,
        contacts: status,
      })
      if (status.granted && status.status === 'granted') {
        const {data} = await Contacts.getContactsAsync()
        if (data.length) {
          // ContactsReactiveVar(data)
          console.log('Contacts: TODO', data)
        }
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
          <FontAwesome
            name="user"
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
          Allow Barfriends access to your contacts
        </Heading>
      </Box>
      <ScrollView>
        <Box
          style={{width: wp(95), flex: 1, alignSelf: 'center'}}
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
            !rPerm?.contacts?.granted
              ? rPerm?.contacts?.canAskAgain && !rPerm?.contacts.granted
                ? handleRequestPermission()
                : handleOpenPhoneSettings()
              : createTwoButtonAlert()
          }
          className="w-[95%]">
          <ButtonText>
            {!rPerm?.contacts?.granted
              ? rPerm?.contacts?.canAskAgain && !rPerm.contacts.granted
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

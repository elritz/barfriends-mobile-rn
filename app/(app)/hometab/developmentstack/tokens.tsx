import React, {useEffect, useState} from 'react'
import {View, Pressable} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import {secureStorageItemRead} from '#/src/util/hooks/local/useSecureStorage'
import {
  AUTHORIZATION,
  LOCAL_STORAGE_SEARCH_AREA,
} from '#/src/constants/StorageConstants'
import {FlashList} from '@shopify/flash-list'
import {Feather} from '@expo/vector-icons'
import {Divider} from '#/src/components/ui/divider'
import {VStack} from '#/src/components/ui/vstack'
import {Text} from '#/src/components/ui/text'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {SearchAreaReactiveVar, ThemeReactiveVar} from '#/src/state/reactive'
import {useReactiveVar} from '@apollo/client'
import {Box} from '#/src/components/ui/box'
import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import * as Application from 'expo-application'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {InitialStateSearchArea} from '#/src/constants/Preferences'

const Tokens: React.FC = () => {
  const [atoken, setAToken] = useState('')
  const [expoPushNotificationToken, setExpoPushNotificationToken] = useState('')
  const [devicePushNotificationToken, setDevicePushNotificationTToken] =
    useState('')
  const rTheme = useReactiveVar(ThemeReactiveVar)

  async function getApplicationAuthorization() {
    const auth = await secureStorageItemRead({
      key: AUTHORIZATION,
    })
    setAToken(String(auth))
  }
  async function getPushNotificationToken() {
    const notificationtoken = await Notifications.getDevicePushTokenAsync()

    setDevicePushNotificationTToken(String(notificationtoken.data))

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

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
    client,
  } = useRefreshDeviceManagerQuery({
    fetchPolicy: 'network-only',
  })

  const data = [
    {
      title: 'authorization',
      value: atoken,
      onPressCopy: async () => {
        await Clipboard.setStringAsync(atoken)
      },
      onPressDelete: async () => {
        await AsyncStorage.removeItem(AUTHORIZATION)
      },
    },
    {
      title: 'expo push notification token',
      value: expoPushNotificationToken,
      onPressCopy: async () => {
        await Clipboard.setStringAsync(expoPushNotificationToken)
      },
      onPressDelete: null,
    },
    {
      title: 'device push token',
      value: devicePushNotificationToken,
      onPressCopy: async () => {
        await Clipboard.setStringAsync(devicePushNotificationToken)
      },
      onPressDelete: null,
    },
  ]

  return (
    <Box className="flex-1">
      <FlashList
        data={data}
        contentInset={{bottom: 120}}
        estimatedItemSize={50}
        ItemSeparatorComponent={() => <Divider className="my-5" />}
        renderItem={({item}) => {
          return (
            <VStack className="bg-red-900 flex-1 justify-between py-4 px-2">
              <HStack className=" justify-between pb-3">
                <Heading className="text-lg capitalize">{item.title}</Heading>
                <HStack
                  space="3xl"
                  className="items-center justify-between mr-3">
                  <Pressable onPress={item.onPressDelete}>
                    <Feather
                      color={rTheme.theme?.gluestack.tokens.colors.red500}
                      size={25}
                      name="trash"
                    />
                  </Pressable>
                  <Pressable onPress={item.onPressCopy}>
                    <Feather
                      color={rTheme.theme?.gluestack.tokens.colors.primary500}
                      size={25}
                      name="copy"
                    />
                  </Pressable>
                </HStack>
              </HStack>
              <Text
                ellipsizeMode={'tail'}
                className="text-md font-semibold text-lg ">
                {item.value}
              </Text>
            </VStack>
          )
        }}
      />
    </Box>
  )
}

export default Tokens

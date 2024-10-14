import {VStack} from '#/src/components/ui/vstack'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Button, ButtonText} from '#/src/components/ui/button'
import {
  NowPreferencePermissionInitialState,
  TomorrowPreferencePermissionInitialState,
} from '#/src/constants/Preferences'
import {
  LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
} from '#/src/constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  PreferenceBackgroundLocationPermissionReactiveVar,
  PreferenceForegroundLocationPermissionReactiveVar,
} from '#/reactive'
import {useRouter} from 'expo-router'
import {FlashList} from '@shopify/flash-list'

export default function Notifications() {
  const router = useRouter()

  const nextAskAction = [
    {
      title: 'Foreground Location',
      actions: [
        {
          title: 'Reset',
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
              JSON.stringify(NowPreferencePermissionInitialState),
            )
          },
        },
        {
          title: 'Show',
          onPress: async () => {
            router.push({
              pathname: '/(app)/modal/asks/foregroundlocationnextask',
            })
          },
        },
        {
          title: 'Dont show again',
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              }),
            )
            PreferenceForegroundLocationPermissionReactiveVar({
              ...TomorrowPreferencePermissionInitialState,
              canShowAgain: false,
            })
          },
        },
      ],
    },
    {
      title: 'Background Location',
      actions: [
        {
          title: 'Reset',
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
              JSON.stringify(NowPreferencePermissionInitialState),
            )
          },
        },
        {
          title: 'Show',
          onPress: async () => {
            router.push({
              pathname: '/(app)/modal/asks/backgroundlocationnextask',
            })
          },
        },
        {
          title: 'Dont show again',
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              }),
            )
            PreferenceBackgroundLocationPermissionReactiveVar({
              ...TomorrowPreferencePermissionInitialState,
              canShowAgain: false,
            })
          },
        },
      ],
    },
    {
      title: 'Notification',
      actions: [
        {
          title: 'Reset',
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
              JSON.stringify(NowPreferencePermissionInitialState),
            )
          },
        },
        {
          title: 'Show',
          onPress: async () => {
            router.push({
              pathname: '/(app)/modal/asks/notificationnextask',
            })
          },
        },
        {
          title: 'Dont show again',
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              }),
            )
            PreferenceBackgroundLocationPermissionReactiveVar({
              ...TomorrowPreferencePermissionInitialState,
              canShowAgain: false,
            })
          },
        },
      ],
    },
  ]

  return (
    <FlashList
      data={nextAskAction}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <VStack>
          <Heading className="text-xl">{item.title}</Heading>
          <HStack space={'sm'} className="mt-2 justify-start">
            {item.actions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant="solid"
                onPress={action.onPress}>
                <ButtonText className="text-xl">{action.title}</ButtonText>
              </Button>
            ))}
          </HStack>
        </VStack>
      )}
      contentContainerStyle={{padding: 10}}
    />
  )
}

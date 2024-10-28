import {FlashList} from '@shopify/flash-list'

import {PermissionsPreferencesReactiveVar} from '#/reactive'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {VStack} from '#/src/components/ui/vstack'
import {
  NowPreferencePermissionInitialState,
  TomorrowPreferencePermissionInitialState,
} from '#/src/constants/Preferences'
import {
  LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
} from '#/src/constants/StorageConstants'
import {storage} from '#/src/storage/mmkv'

export default function Notifications() {
  const nextAskAction = [
    {
      title: 'Foreground Location',
      actions: [
        {
          title: 'Reset',
          onPress: async () => {
            storage.set(
              LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
              JSON.stringify(NowPreferencePermissionInitialState),
            )
          },
        },
        {
          title: 'Dont show again',
          onPress: async () => {
            storage.set(
              LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              }),
            )
            PermissionsPreferencesReactiveVar({
              ...PermissionsPreferencesReactiveVar(),
              locationForeground: {
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              },
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
            storage.set(
              LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
              JSON.stringify(NowPreferencePermissionInitialState),
            )
          },
        },
        {
          title: 'Dont show again',
          onPress: async () => {
            storage.set(
              LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              }),
            )
            PermissionsPreferencesReactiveVar({
              ...PermissionsPreferencesReactiveVar(),
              locationBackground: {
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              },
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
            storage.set(
              LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
              JSON.stringify(NowPreferencePermissionInitialState),
            )
          },
        },
        {
          title: 'Dont show again',
          onPress: async () => {
            storage.set(
              LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              }),
            )
            PermissionsPreferencesReactiveVar({
              ...PermissionsPreferencesReactiveVar(),
              notifications: {
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              },
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

import {VStack} from '#/src/components/ui/vstack'
import {Text} from '#/src/components/ui/text'
import {Spinner} from '#/src/components/ui/spinner'
import {Pressable} from '#/src/components/ui/pressable'
import {HStack} from '#/src/components/ui/hstack'
import {Divider} from '#/src/components/ui/divider'
import {Box} from '#/src/components/ui/box'
import {useReactiveVar} from '@apollo/client'
import {
  TomorrowPreferencePermissionInitialState,
  NowPreferencePermissionInitialState,
} from '#/src/constants/Preferences'
import {
  LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
} from '#/src/constants/StorageConstants'
import {Ionicons, Feather} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  PreferenceBackgroundLocationPermissionReactiveVar,
  PreferenceForegroundLocationPermissionReactiveVar,
  PreferencePermissionNotificationReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {useState} from 'react'
import {ScrollView, Alert} from 'react-native'
import {FlashList} from '@shopify/flash-list'

export default function State() {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const [loading, setIsLoading] = useState(false)
  const ITEM_HEIGHT = 60

  return (
    <FlashList
      data={[]}
      estimatedItemSize={100}
      renderItem={({item}) => {
        return <Box></Box>
      }}
      ListHeaderComponent={() => {
        return (
          <VStack className="mx-3 my-5">
            <Text className="text-center text-lg">
              These items allow you to reset or update the state of the
              application. They manage the preferences saved during the initial
              render of the Barfriends app. These preferences are also updated
              when a user interacts with components that prompt them to set or
              dismiss the persisted state.
            </Text>
          </VStack>
        )
      }}
    />
  )
}

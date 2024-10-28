import {Alert, Linking, Platform} from 'react-native'
import * as IntentLauncher from 'expo-intent-launcher'
import {useReactiveVar} from '@apollo/client'

import {PermissionsReactiveVar, SearchAreaReactiveVar} from '#/reactive'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {LOCAL_STORAGE_SEARCH_AREA} from '#/src/constants/StorageConstants'
import {storage} from '#/src/storage/mmkv'
import {capitalizeFirstLetter} from '#/src/util/helpers/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '#/src/util/hooks/searcharea/useSetSearchAreaWithLocation'
import {LocalStoragePreferenceSearchAreaType} from '#/types/preferences'

// TODO: UX() location icon when searchArea is using Currently Location over preset

const LocationPermissionItemEmptyState = () => {
  const rPerm = useReactiveVar(PermissionsReactiveVar)
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

  const newSearchArea: LocalStoragePreferenceSearchAreaType = {
    ...rSearchAreaVar,
    useCurrentLocation: false,
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Barfriends Location Permission',
      capitalizeFirstLetter(rPerm?.locationForeground.status),
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

  return (
    <Pressable
      accessibilityRole="button"
      onPress={async () => {
        !rSearchAreaVar?.useCurrentLocation
          ? !rPerm?.locationForeground.granted
            ? rPerm?.locationForeground.canAskAgain &&
              !rPerm.locationForeground.granted
              ? await useSetSearchAreaWithLocation()
              : createTwoButtonAlert()
            : await useSetSearchAreaWithLocation()
          : (SearchAreaReactiveVar({
              ...newSearchArea,
              useCurrentLocation: false,
            }),
            storage.set(
              LOCAL_STORAGE_SEARCH_AREA,
              JSON.stringify(newSearchArea),
            ))
      }}
      className="pressed:bg-primary-500 rounded-xl">
      <HStack className="justify-between p-3">
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          className="w-[100%] self-center text-center text-lg font-semibold">
          {rSearchAreaVar?.useCurrentLocation
            ? 'Using current location'
            : 'Use current location'}
        </Text>
      </HStack>
    </Pressable>
  )
}

export default LocationPermissionItemEmptyState

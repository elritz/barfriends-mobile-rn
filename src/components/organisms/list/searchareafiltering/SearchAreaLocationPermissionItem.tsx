import {useCallback} from 'react'
import {Alert, Linking, Platform} from 'react-native'
import * as IntentLauncher from 'expo-intent-launcher'
// TODO: UX() location icon when searchArea is using Currently Location over preset
import {useReactiveVar} from '@apollo/client'
import {FontAwesome5} from '@expo/vector-icons'

import {
  PermissionsReactiveVar,
  SearchAreaReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {LOCAL_STORAGE_SEARCH_AREA} from '#/src/constants/StorageConstants'
import {storage} from '#/src/storage/mmkv'
import {capitalizeFirstLetter} from '#/src/util/helpers/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '#/src/util/hooks/searcharea/useSetSearchAreaWithLocation'
import {LocalStoragePreferenceSearchAreaType} from '#/types/preferences'

const SearchAreaLocationPermissionItem = () => {
  const rPerm = useReactiveVar(PermissionsReactiveVar)
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)

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

  const handleOpenPhoneSettings = useCallback(async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings://')
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS,
      )
    }
  }, [])

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
      }}>
      {({isPressed}) => {
        return (
          <HStack
            className={` ${isPressed ? 'bg-[#ffffff100]' : rSearchAreaVar?.useCurrentLocation ? 'bg-blue-600' : 'bg-light-300'} ${isPressed ? 'dark:bg-[#00000040]' : rSearchAreaVar?.useCurrentLocation ? 'dark:bg-blue-600' : 'dark:bg-light-800'} h-[50px] justify-between overflow-hidden rounded-lg bg-transparent p-3`}>
            <Text
              ellipsizeMode={'tail'}
              className="self-center text-left text-lg font-medium">
              {rSearchAreaVar?.useCurrentLocation
                ? 'Using current location'
                : 'Use current location'}
            </Text>
            <Box
              className={` ${rSearchAreaVar?.useCurrentLocation ? 'bg-light-800' : 'bg-light-200'} ${rSearchAreaVar?.useCurrentLocation ? 'dark:bg-light-200' : 'dark:bg-light-600'} h-[35px] w-[35px] items-center justify-center self-center rounded-full`}>
              <FontAwesome5
                size={14}
                name={'location-arrow'}
                style={{
                  borderRadius: 25,
                  color:
                    rTheme.colorScheme === 'light'
                      ? rSearchAreaVar?.useCurrentLocation
                        ? 'white'
                        : rTheme.theme?.gluestack.tokens.colors.blue500
                      : rSearchAreaVar?.useCurrentLocation
                        ? 'black'
                        : rTheme.theme?.gluestack.tokens.colors.blue500,
                }}
              />
            </Box>
          </HStack>
        )
      }}
    </Pressable>
  )
}

export default SearchAreaLocationPermissionItem

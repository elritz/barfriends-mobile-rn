import {Alert, Linking, Platform} from 'react-native'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import {useReactiveVar} from '@apollo/client'

import {
  CurrentLocationReactiveVar,
  PermissionsReactiveVar,
  SearchAreaReactiveVar,
} from '#/reactive'
import {LOCAL_STORAGE_SEARCH_AREA} from '#/src/constants/StorageConstants'
import {storage} from '#/src/storage/mmkv'
import {LocalStoragePreferenceSearchAreaType} from '#/types/preferences'

const useSetSearchAreaWithLocation = async () => {
  const status = await Location.getForegroundPermissionsAsync()
  const rSearchAreaVar = SearchAreaReactiveVar()
  const rPerm = useReactiveVar(PermissionsReactiveVar)

  const useLocationToSetSearchArea = async (): Promise<boolean> => {
    const getLastKnowPosition = await Location.getLastKnownPositionAsync({
      requiredAccuracy: 50,
      maxAge: 1200000,
    })

    if (getLastKnowPosition) {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: getLastKnowPosition.coords.latitude,
        longitude: getLastKnowPosition.coords.longitude,
      })

      const valueSearchArea: LocalStoragePreferenceSearchAreaType = {
        ...rSearchAreaVar,
        useCurrentLocation: true,
        searchArea: {
          country: {
            name: String(reverseGeocode[0].country),
            isoCode: String(reverseGeocode[0].isoCountryCode),
            coords: {
              latitude: getLastKnowPosition.coords.latitude,
              longitude: getLastKnowPosition.coords.longitude,
            },
          },
          state: {
            name: String(reverseGeocode[0].region),
            isoCode: String(reverseGeocode[0].region),
            coords: {
              latitude: getLastKnowPosition.coords.latitude,
              longitude: getLastKnowPosition.coords.longitude,
            },
          },
          city: {
            name: String(reverseGeocode[0].city),
            isoCode: '',
            coords: {
              latitude: getLastKnowPosition.coords.latitude,
              longitude: getLastKnowPosition.coords.longitude,
            },
          },
          coords: {
            latitude: getLastKnowPosition.coords.latitude,
            longitude: getLastKnowPosition.coords.longitude,
          },
        },
      }

      const newSearchArea = JSON.stringify(valueSearchArea)

      CurrentLocationReactiveVar({
        current: {
          ...getLastKnowPosition,
        },
        reverseGeocoded: reverseGeocode[0],
      })
      SearchAreaReactiveVar({
        ...valueSearchArea,
      })

      storage.set(LOCAL_STORAGE_SEARCH_AREA, newSearchArea)

      return true
    } else {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.High,
      })

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      })

      const valueSearchArea: LocalStoragePreferenceSearchAreaType = {
        ...rSearchAreaVar,
        useCurrentLocation: true,
        searchArea: {
          country: {
            name: String(reverseGeocode[0].country),
            isoCode: String(reverseGeocode[0].isoCountryCode),
            coords: {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            },
          },
          state: {
            name: String(reverseGeocode[0].region),
            isoCode: String(reverseGeocode[0].region),
            coords: {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            },
          },
          city: {
            name: String(reverseGeocode[0].city),
            isoCode: '',
            coords: {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            },
          },
          coords: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
        },
      }

      const newSearchArea = JSON.stringify(valueSearchArea)

      CurrentLocationReactiveVar({
        current: {
          ...currentLocation,
        },
        reverseGeocoded: reverseGeocode[0],
      })
      SearchAreaReactiveVar({
        ...valueSearchArea,
      })

      storage.set(LOCAL_STORAGE_SEARCH_AREA, newSearchArea)

      return true
    }
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Location Permission Status',
      `Currently the location permission is ${rPerm?.locationForeground.status}. Go to settings to change this for Barfriends.`,
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

  if (status.granted) {
    return useLocationToSetSearchArea()
  } else if (status.canAskAgain) {
    const status = await Location.requestForegroundPermissionsAsync()
    PermissionsReactiveVar({
      ...rPerm,
      locationForeground: status,
    })
    if (status.granted) {
      return useLocationToSetSearchArea()
    } else {
      createTwoButtonAlert()
    }
  }
}

export default useSetSearchAreaWithLocation

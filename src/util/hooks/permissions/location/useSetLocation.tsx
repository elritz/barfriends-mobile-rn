import * as Location from 'expo-location'

import {CurrentLocationReactiveVar} from '#/reactive'

export const useSetLocation = async (): Promise<void> => {
  const currentLocation = await Location.getCurrentPositionAsync({
    accuracy: Location.LocationAccuracy.Balanced,
  })

  if (!currentLocation) {
    const lastLocation = await Location.getLastKnownPositionAsync({
      requiredAccuracy: 50,
      maxAge: 1200000,
    })

    if (lastLocation) {
      const geocodedLocation = await Location.reverseGeocodeAsync({
        latitude: lastLocation.coords.latitude,
        longitude: lastLocation.coords.longitude,
      })
      CurrentLocationReactiveVar({
        current: lastLocation,
        reverseGeocoded: geocodedLocation[0],
      })
    }
  }
  const geocodedLocation = await Location.reverseGeocodeAsync({
    latitude: currentLocation.coords.latitude,
    longitude: currentLocation.coords.longitude,
  })

  if (geocodedLocation) {
    CurrentLocationReactiveVar({
      current: currentLocation,
      reverseGeocoded: geocodedLocation[0],
    })
  }
}

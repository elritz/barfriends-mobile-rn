import {useEffect} from 'react'
import * as Location from 'expo-location'

import {PermissionsReactiveVar} from '#/reactive'
import {useSetLocation} from './useSetLocation'

const useSetLocationToCurrentWithPermission = (): void => {
  const getSetLocationPermissions = async (): Promise<void> => {
    try {
      const currentLocationPermission =
        await Location.getForegroundPermissionsAsync()
      PermissionsReactiveVar({
        ...PermissionsReactiveVar(),
        locationForeground: currentLocationPermission,
      })
      if (currentLocationPermission.status === 'granted') {
        await useSetLocation()
      }
    } catch (error) {
      console.error(error, '//! Error with location permissions')
    }
  }

  useEffect(() => {
    getSetLocationPermissions()
  }, [])
}

export default useSetLocationToCurrentWithPermission

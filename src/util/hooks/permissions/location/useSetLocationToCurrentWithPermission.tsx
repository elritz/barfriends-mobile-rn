import {useEffect} from 'react'
import * as Location from 'expo-location'

import {PermissionsReactiveVar} from '#/reactive'
import {useSetLocation} from './useSetLocation'

const useSetLocationToCurrentWithPermission = (): void => {
  const useGetSetLocationPermissions = async (): Promise<void> => {
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
    useGetSetLocationPermissions()
  }, [])
}

export default useSetLocationToCurrentWithPermission

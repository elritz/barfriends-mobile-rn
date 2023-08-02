import { setLocation } from './setLocation'
import { PermissionForegroundLocationReactiveVar } from '@reactive'
import * as Location from 'expo-location'
import { useEffect } from 'react'

const useSetLocationToCurrentWithPermission = (): void => {
	const getSetLocationPermissions = async (): Promise<void> => {
		try {
			const currentLocationPermission = await Location.getForegroundPermissionsAsync()
			PermissionForegroundLocationReactiveVar(currentLocationPermission)
			if (currentLocationPermission.status === 'granted') {
				await setLocation()
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

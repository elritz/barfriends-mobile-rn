import { makeVar } from '@apollo/client'
import { LocationPermissionResponse } from 'expo-location'
import { PermissionStatus } from 'expo-permissions'

export const forgroundLocationPermissionInitialState: LocationPermissionResponse = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
}

export const PermissionForegroundLocationReactiveVar = makeVar<LocationPermissionResponse | null>(
	forgroundLocationPermissionInitialState,
)

export const backgroundLocationPermissionInitialState: LocationPermissionResponse = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
}

export const PermissionBackgroundLocationReactiveVar = makeVar<LocationPermissionResponse | null>(
	backgroundLocationPermissionInitialState,
)

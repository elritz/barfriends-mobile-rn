import { makeVar } from '@apollo/client'
import { PermissionResponse } from 'expo-camera'
import { PermissionStatus } from 'expo-permissions'

export const permissionCameraInitialState: PermissionResponse = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
}

export const PermissionCameraReactiveVar = makeVar<PermissionResponse | null>(
	permissionCameraInitialState,
)

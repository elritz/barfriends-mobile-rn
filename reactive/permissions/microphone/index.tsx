import { makeVar } from '@apollo/client'
import { PermissionResponse } from 'expo-camera'
import { PermissionStatus } from 'expo-permissions'

export const permissionMicrophoneInitialState: PermissionResponse = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
}

export const PermissionMicrophoneReactiveVar = makeVar<PermissionResponse | null>(
	permissionMicrophoneInitialState,
)

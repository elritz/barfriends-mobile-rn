import { makeVar } from '@apollo/client'
import { PermissionResponse } from 'expo-media-library'
import { PermissionStatus } from 'expo-permissions'

export const permissionMediaInitialState: PermissionResponse = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
}

export const PermissionMediaReactiveVar = makeVar<PermissionResponse | null>(
	permissionMediaInitialState,
)

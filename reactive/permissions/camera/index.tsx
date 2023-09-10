import { makeVar } from '@apollo/client'
import { InitialStatePermissionCamera } from '@constants/Preferences'
import { PermissionResponse } from 'expo-camera'

export const PermissionCameraReactiveVar = makeVar<PermissionResponse | null>(
	InitialStatePermissionCamera,
)

import { makeVar } from '@apollo/client'
import { InitialStatePermissionMedia } from '@constants/Preferences'
import { PermissionResponse } from 'expo-media-library'

export const PermissionMediaReactiveVar = makeVar<PermissionResponse | null>(
	InitialStatePermissionMedia,
)

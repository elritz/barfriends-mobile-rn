import { makeVar } from '@apollo/client'
import { InitialStatePermissionMicrophone } from '@constants/Preferences'
import { PermissionResponse } from 'expo-camera'

export const PermissionMicrophoneReactiveVar = makeVar<PermissionResponse | null>(
	InitialStatePermissionMicrophone,
)

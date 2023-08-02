import { makeVar } from '@apollo/client'
import { NowPreferencePermissionInitialState } from '@constants/Preferences'
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from '@ctypes/preferences'

export const PreferenceForegroundLocationPermissionReactiveVar =
	makeVar<LocalStoragePreferenceAskForegroundLocationPermissionType | null>(
		NowPreferencePermissionInitialState,
	)

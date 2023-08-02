import { makeVar } from '@apollo/client'
import { NowPreferencePermissionInitialState } from '@constants/Preferences'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@ctypes/preferences'

export const PreferenceBackgroundLocationPermissionReactiveVar =
	makeVar<LocalStoragePreferenceAskBackgroundLocationPermissionType | null>(
		NowPreferencePermissionInitialState,
	)

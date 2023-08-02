import { makeVar } from '@apollo/client'
import { NowPreferencePermissionInitialState } from '@constants/Preferences'
import { LocalStoragePreferenceAskNotificationPermissionType } from '@ctypes/preferences'

export const PreferencePermissionNotificationReactiveVar =
	makeVar<LocalStoragePreferenceAskNotificationPermissionType | null>(
		NowPreferencePermissionInitialState,
	)

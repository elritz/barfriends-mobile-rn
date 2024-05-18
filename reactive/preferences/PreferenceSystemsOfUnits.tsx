import { makeVar } from '@apollo/client'
import { InitalStateStorage } from '#/constants/Preferences'
import { LocalStoragePreferenceSystemsOfUnitsType } from '#/ctypes/preferences'

export const PreferenceSystemsOfUnitsReactiveVar =
	makeVar<LocalStoragePreferenceSystemsOfUnitsType | null>(
		InitalStateStorage.preferences.systemunits,
	)

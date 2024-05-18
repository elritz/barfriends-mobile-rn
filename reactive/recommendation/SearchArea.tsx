import { makeVar } from '@apollo/client'
import { InitalStateStorage } from '#/constants/Preferences'
import { LocalStoragePreferenceSearchAreaType } from '#/ctypes/preferences'

export const SearchAreaReactiveVar = makeVar<LocalStoragePreferenceSearchAreaType>(
	InitalStateStorage.preferences.searcharea,
)

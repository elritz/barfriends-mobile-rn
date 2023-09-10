import { makeVar } from '@apollo/client'
import { InitialStateJoiningInformationPreferencePermission } from '@constants/Preferences'
import { LocalStorageInformationJoinVenueType } from '@ctypes/preferences'

export const InformationJoinVenueReactiveVar = makeVar<LocalStorageInformationJoinVenueType | null>(
	InitialStateJoiningInformationPreferencePermission,
)

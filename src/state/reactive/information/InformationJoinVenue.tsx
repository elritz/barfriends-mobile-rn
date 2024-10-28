import {makeVar} from '@apollo/client'

import {InitialStateJoiningInformationPreferencePermission} from '#/src/constants/Preferences'
import {LocalStorageInformationJoinVenueType} from '#/types/preferences'

export const InformationJoinVenueReactiveVar =
  makeVar<LocalStorageInformationJoinVenueType | null>(
    InitialStateJoiningInformationPreferencePermission,
  )

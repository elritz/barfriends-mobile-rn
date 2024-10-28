import {makeVar} from '@apollo/client'

import {InitalStateStorage} from '#/src/constants/Preferences'
import {LocalStoragePreferenceSystemsOfUnitsType} from '#/types/preferences'

export const PreferenceSystemsOfUnitsReactiveVar =
  makeVar<LocalStoragePreferenceSystemsOfUnitsType | null>(
    InitalStateStorage.preferences.systemunits,
  )

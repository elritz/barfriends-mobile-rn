import {makeVar} from '@apollo/client'

export * from './PreferenceSystemsOfUnits'

import {MonthsPreferencePermissionInitialState} from '#/src/constants/Preferences'
import {
  LocalStoragePreferenceAskBackgroundLocationPermissionType,
  LocalStoragePreferenceAskForegroundLocationPermissionType,
  LocalStoragePreferenceAskNotificationPermissionType,
} from '#/types/preferences'

type PermissionPreferencesProp = {
  notifications: LocalStoragePreferenceAskNotificationPermissionType
  locationForeground: LocalStoragePreferenceAskForegroundLocationPermissionType
  locationBackground: LocalStoragePreferenceAskBackgroundLocationPermissionType
}

const PermissionsRectiveInitialState: PermissionPreferencesProp = {
  notifications: MonthsPreferencePermissionInitialState,
  locationForeground: MonthsPreferencePermissionInitialState,
  locationBackground: MonthsPreferencePermissionInitialState,
}

export const PermissionsPreferencesReactiveVar =
  makeVar<PermissionPreferencesProp>(PermissionsRectiveInitialState)

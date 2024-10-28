import {PermissionResponse as ExpoCameraPermissionResponse} from 'expo-camera/legacy'
import {PermissionResponse as ExpoContactPermissionResponse} from 'expo-contacts'
import {LocationPermissionResponse} from 'expo-location'
import {PermissionResponse as ExpoMediaLibraryPermissionResponse} from 'expo-media-library'
import {NotificationPermissionsStatus} from 'expo-notifications'
import {makeVar} from '@apollo/client'

import {
  InitialStateBackgroundLocationPermission,
  InitialStateForegroundLocationPermission,
  InitialStatePermissionCamera,
  InitialStatePermissionContacts,
  InitialStatePermissionMedia,
  InitialStatePermissionNotifications,
} from '#/src/constants/Preferences'

type PermissionsProp = {
  notifications: NotificationPermissionsStatus
  medialibrary: ExpoMediaLibraryPermissionResponse
  locationForeground: LocationPermissionResponse
  locationBackground: LocationPermissionResponse
  camera: ExpoCameraPermissionResponse
  contacts: ExpoContactPermissionResponse
}

const PermissionsRectiveInitialState: PermissionsProp = {
  notifications: InitialStatePermissionNotifications,
  medialibrary: InitialStatePermissionMedia,
  locationForeground: InitialStateForegroundLocationPermission,
  locationBackground: InitialStateBackgroundLocationPermission,
  camera: InitialStatePermissionCamera,
  contacts: InitialStatePermissionContacts,
}

export const PermissionsReactiveVar = makeVar<PermissionsProp>(
  PermissionsRectiveInitialState,
)

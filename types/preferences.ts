import {
  LocationGeocodedAddress,
  LocationObject,
  LocationOptions,
} from 'expo-location'
import { DateTime } from 'luxon'

export type ThemeColorSchemeOptionsType = 'light' | 'dark' | 'system'

export type ThemeType = {
  preference: ThemeColorSchemeOptionsType,
  mode: 'light' | 'dark'
}

export enum SystemsOfUnits {
  Imperial = 'Imperial',
  Metric = 'Metric',
}

export type DefaultPreferenceToPermissionType = {
  dateLastShown: DateTime
  dateToShowAgain: DateTime
  numberOfTimesDismissed: number
  canShowAgain: boolean
}

export interface LocalStoragePreferenceAskNotificationPermissionType
  extends DefaultPreferenceToPermissionType {}

export interface LocalStorageInformationJoinVenueType
  extends DefaultPreferenceToPermissionType {}

export interface LocalStoragePreferenceAskBackgroundLocationPermissionType
  extends DefaultPreferenceToPermissionType {}

export interface LocalStoragePreferenceAskForegroundLocationPermissionType
  extends DefaultPreferenceToPermissionType {}

export interface LocalStoragePreferenceAskSystemOfUnitsPermissionType
  extends DefaultPreferenceToPermissionType {}

export interface LocalStoragePreferenceSystemsOfUnitsType
  extends DefaultPreferenceToPermissionType {
  system: SystemsOfUnits
}

export type ServerNetworkType = {
  isConnected: boolean
}

export type Coords = {
  latitude: number | null
  longitude: number | null
}

export type PlaceType = {
  name: string
  isoCode: string | null
  coords: Coords
}

export type LocalStoragePreferenceSearchAreaType = {
  useCurrentLocation: boolean
  searchArea: {
    country: PlaceType
    state: PlaceType
    city: PlaceType
    coords: Coords
  }
  kRing: {
    value: number
    distance: number
  }
}

export type LocationType = {
  watchPosition?: LocationOptions
  current?: LocationObject
  reverseGeocoded?: LocationGeocodedAddress
}

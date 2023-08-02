import { DateTime } from 'luxon'

export type ThemeColorSchemeOptionsType = 'light' | 'dark' | 'system'

export type LocalStoragePreferenceThemeType = {
	colorScheme: ThemeColorSchemeOptionsType
}

export enum SystemsOfUnits {
	Imperial = 'Imperial',
	Metric = 'Metric',
}

export type DefaultPreferenceToPermission = {
	dateToShowAgain: DateTime
	numberOfTimesDismissed: number
	canShowAgain: boolean
}

export interface LocalStoragePreferenceAskNotificationPermissionType
	extends DefaultPreferenceToPermission {}

export interface LocalStoragePreferenceAskBackgroundLocationPermissionType
	extends DefaultPreferenceToPermission {}

export interface LocalStoragePreferenceAskNotificationPermissionType
	extends DefaultPreferenceToPermission {}

export interface LocalStoragePreferenceAskForegroundLocationPermissionType
	extends DefaultPreferenceToPermission {}

export interface LocalStoragePreferenceAskSystemOfUnitsPermissionType
	extends DefaultPreferenceToPermission {}

export interface LocalStoragePreferenceSystemsOfUnitsType extends DefaultPreferenceToPermission {
	system: SystemsOfUnits
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

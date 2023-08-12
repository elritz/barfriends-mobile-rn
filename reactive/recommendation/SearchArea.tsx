import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceSearchAreaType } from '@ctypes/preferences'

export const searchAreaInitialState: LocalStoragePreferenceSearchAreaType = {
	useCurrentLocation: false,
	searchArea: {
		country: {
			coords: {
				latitude: 0,
				longitude: 0,
			},
			isoCode: '',
			name: '',
		},
		state: {
			coords: {
				latitude: 0,
				longitude: 0,
			},
			isoCode: '',
			name: '',
		},
		city: {
			coords: {
				latitude: 0,
				longitude: 0,
			},
			isoCode: '',
			name: '',
		},
		coords: {
			latitude: 0,
			longitude: 0,
		},
	},
	kRing: {
		value: 1,
		distance: 30,
	},
}

export const SearchAreaReactiveVar =
	makeVar<LocalStoragePreferenceSearchAreaType>(searchAreaInitialState)

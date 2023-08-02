import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceSearchAreaType } from '@ctypes/preferences'

export const searchAreaInitialState: LocalStoragePreferenceSearchAreaType = {
	useCurrentLocation: false,
	searchArea: {
		country: {
			coords: {
				latitude: null,
				longitude: null,
			},
			isoCode: '',
			name: '',
		},
		state: {
			coords: {
				latitude: null,
				longitude: null,
			},
			isoCode: '',
			name: '',
		},
		city: {
			coords: {
				latitude: null,
				longitude: null,
			},
			isoCode: '',
			name: '',
		},
		coords: {
			latitude: null,
			longitude: null,
		},
	},
	kRing: {
		value: 1,
		distance: 30,
	},
}

export const SearchAreaReactiveVar =
	makeVar<LocalStoragePreferenceSearchAreaType>(searchAreaInitialState)

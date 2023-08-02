import { makeVar } from '@apollo/client'
import { LocationGeocodedAddress, LocationObject, LocationOptions, Accuracy } from 'expo-location'

type LocationType = {
	watchPosition?: LocationOptions
	current?: LocationObject
	reverseGeocoded?: LocationGeocodedAddress
}

export const locationInitialState: LocationType = {
	watchPosition: {
		accuracy: Accuracy.Balanced,
		distanceInterval: 10,
		timeInterval: 5000,
	},
	current: {
		coords: {
			accuracy: null,
			altitude: null,
			altitudeAccuracy: null,
			heading: null,
			latitude: 0,
			longitude: 0,
			speed: null,
		},
		timestamp: 0,
	},
	reverseGeocoded: {
		city: null,
		country: null,
		district: null,
		isoCountryCode: null,
		streetNumber: null,
		name: null,
		postalCode: null,
		region: null,
		street: null,
		subregion: null,
		timezone: null,
	},
}

export const CurrentLocationReactiveVar = makeVar<LocationType | null>(locationInitialState)

import { gql } from '@apollo/client'
import { PROFILE_VENUES_FRAGMENT, AREA_FRAGMENT } from '@graphql/DM/fragments/index.fragments'

export const VENUES_NEARBY_QUERY = gql`
	${PROFILE_VENUES_FRAGMENT}
	${AREA_FRAGMENT}
	query venuesNearby(
		$countryIsoCode: String!
		$stateIsoCode: String!
		$kRing: Int
		$currentLocationCoords: CoordsInput
		$searchAreaCoords: CoordsInput!
	) {
		venuesNearby(
			currentLocationCoords: $currentLocationCoords
			searchAreaCoords: $searchAreaCoords
			countryIsoCode: $countryIsoCode
			stateIsoCode: $stateIsoCode
			kRing: $kRing
		) {
			... on ComingAreaResponse {
				comingAreas {
					id
					h3Index5
					h3Index6
					keywordSuggestions
					timesRequested
					toBeNotifiedProfileIds
					Area {
						...AREA_FRAGMENT
					}
					Vote {
						id
						profileId
						upvote
					}
					createdAt
					updatedAt
				}
				searchArea {
					...AREA_FRAGMENT
				}
			}
			... on Error {
				errorCode
				message
			}
			... on VenuesNearbyResponse {
				searchArea {
					...AREA_FRAGMENT
				}
				venuesNearby {
					...PROFILE_VENUES_FRAGMENT
				}
			}
		}
	}
`

export const GET_COUNTRIES_QUERY = gql`
	query getAllCountries {
		getAllCountries {
			name
			phonecode
			isoCode
			flag
			currency
			latitude
			longitude
		}
	}
`

export const GET_ALL_STATES_BY_COUNTRY_QUERY = gql`
	query getAllStatesByCountry($countryIsoCode: String!) {
		getAllStatesByCountry(countryIsoCode: $countryIsoCode) {
			name
			isoCode
			countryCode
			latitude
			longitude
		}
	}
`

export const GET_ALL_CITIES_BY_STATE_QUERY = gql`
	query getAllCitiesByState($countryIsoCode: String!, $stateIsoCode: String!) {
		getAllCitiesByState(countryIsoCode: $countryIsoCode, stateIsoCode: $stateIsoCode) {
			popularCities {
				name
				stateCode
				venuesInArea
				countryCode
				latitude
				longitude
			}
			allCities {
				name
				stateCode
				venuesInArea
				countryCode
				latitude
				longitude
			}
		}
	}
`

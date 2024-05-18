import { gql } from '@apollo/client'
import {
	PUBLIC_PERSONAL_FRAGMENT,
	VENUE_FRAGMENT,
	PROFILE_FRAGMENT,
} from '#/graphql/DM/fragments/index.fragments'
import { PROFILE_VENUE_FRAGMENT } from '#/graphql/DM/fragments/profilevenue.fragments'

export const PROFILE = gql`
	${PROFILE_FRAGMENT}
	query profile($where: ProfileWhereInput) {
		profile(where: $where) {
			...PROFILE_FRAGMENT
		}
	}
`

export const PROFILES = gql`
	${PROFILE_FRAGMENT}
	query profiles(
		$where: ProfileWhereInput
		$take: Int
		$skip: Int
		$distinct: [ProfileScalarFieldEnum!]
	) {
		profiles(where: $where, take: $take, skip: $skip, distinct: $distinct) {
			...PROFILE_FRAGMENT
		}
	}
`

export const VENUE = gql`
	${VENUE_FRAGMENT}
	query venue($where: VenueWhereInput) {
		venue(where: $where) {
			...VENUE_FRAGMENT
		}
	}
`
export const VENUES = gql`
	${VENUE_FRAGMENT}
	query venues($where: VenueWhereInput) {
		venues(where: $where) {
			...VENUE_FRAGMENT
		}
	}
`

export const PUBLIC_VENUE_QUERY = gql`
	${PROFILE_VENUE_FRAGMENT}
	query publicVenue($where: ProfileWhereInput, $currentLocationCoords: CoordsInput) {
		publicVenue(where: $where, currentLocationCoords: $currentLocationCoords) {
			...PROFILE_VENUE_FRAGMENT
		}
	}
`

export const PUBLIC_PERSONAL_QUERY = gql`
	${PUBLIC_PERSONAL_FRAGMENT}
	query publicProfile($where: ProfileWhereInput) {
		publicProfile(where: $where) {
			...PUBLIC_PERSONAL_FRAGMENT
		}
	}
`

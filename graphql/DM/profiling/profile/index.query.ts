import { gql } from '@apollo/client'
import { PUBLIC_PROFILE_FRAGMENT, VENUE_FRAGMENT } from '@graphql/DM/fragments/index.fragments'

export const PROFILE = gql`
	${PUBLIC_PROFILE_FRAGMENT}
	query profile($where: ProfileWhereInput) {
		profile(where: $where) {
			...PUBLIC_PROFILE_FRAGMENT
		}
	}
`

export const PROFILE_VENUE = gql`
	${PUBLIC_PROFILE_FRAGMENT}
	query profileVenue($where: ProfileWhereInput) {
		profile(where: $where) {
			...PUBLIC_PROFILE_FRAGMENT
		}
	}
`
export const PROFILES = gql`
	${PUBLIC_PROFILE_FRAGMENT}
	query profiles(
		$where: ProfileWhereInput
		$take: Int
		$skip: Int
		$distinct: [ProfileScalarFieldEnum!]
	) {
		profiles(where: $where, take: $take, skip: $skip, distinct: $distinct) {
			...PUBLIC_PROFILE_FRAGMENT
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

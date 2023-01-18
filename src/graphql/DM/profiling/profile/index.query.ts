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
export const PROFILES = gql`
	${PUBLIC_PROFILE_FRAGMENT}
	query profiles($where: ProfileWhereInput) {
		profiles(where: $where) {
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

import { gql } from '@apollo/client'
import { PUBLIC_PROFILE_FRAGMENT } from '@graphql/DM/fragments/profile.fragments'

export const VENUE_FRAGMENT = gql`
	${PUBLIC_PROFILE_FRAGMENT}
	fragment VENUE_FRAGMENT on Venue {
		id
		Profile {
			...PUBLIC_PROFILE_FRAGMENT
		}
		createdAt
		updatedAt
	}
`

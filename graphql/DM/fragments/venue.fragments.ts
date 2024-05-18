import { gql } from '@apollo/client'
import { PROFILE_FRAGMENT } from '#/graphql/DM/fragments/profile.fragments'

export const VENUE_FRAGMENT = gql`
	${PROFILE_FRAGMENT}
	fragment VENUE_FRAGMENT on Venue {
		id
		Profile {
			...PROFILE_FRAGMENT
		}
		createdAt
		updatedAt
	}
`

import { gql } from '@apollo/client'
import { PROFILE_FRAGMENT } from '#/graphql/DM/fragments/profile.fragments'

export const PERSONAL_FRAGMENT = gql`
	${PROFILE_FRAGMENT}
	fragment PERSONAL_FRAGMENT on Personal {
		id
		Profile {
			...PROFILE_FRAGMENT
		}
		updatedAt
		createdAt
	}
`

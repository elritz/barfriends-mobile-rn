import { gql } from '@apollo/client'

export const GET_INTERESTS_QUERY = gql`
	query getInterests {
		getInterests {
			id
			name
			Tags {
				id
				name
				categoryId
				emoji
			}
		}
	}
`

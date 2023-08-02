import { gql } from '@apollo/client'

export const DETAIL_INFORMATION_FRAGMENT = gql`
	fragment DETAIL_INFORMATION_FRAGMENT on DetailInformation {
		id
		Tags {
			id
			emoji
			name
		}
		capacity
		description
		established
		profileId
	}
`

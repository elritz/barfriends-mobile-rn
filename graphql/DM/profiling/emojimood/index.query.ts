import { gql } from '@apollo/client'

export const ALL_EMOJIMOODS = gql`
	query emojimoods {
		emojimoods {
			id
			colors
			emoji
			emojiname
		}
	}
`

export const EMOJIMOOD = gql`
	query emojimood($where: EmojimoodWhereUniqueInput!) {
		emojimood(where: $where) {
			id
			colors
			emoji
			emojiname
		}
	}
`

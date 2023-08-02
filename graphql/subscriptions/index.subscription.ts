import { gql } from '@apollo/client'

export const GRETTINGS_SUBSCRIPTION = gql`
	subscription numberIncremented {
		numberIncremented
	}
`

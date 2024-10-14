import { gql } from '@apollo/client'

export const ERROR_FRAGMENT = gql`
	fragment ERROR_FRAGMENT on Error {
		errorCode
		message
	}
`

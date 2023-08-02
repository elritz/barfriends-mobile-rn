import { gql } from '@apollo/client'

export const LOCATION_FRAGMENT = gql`
	fragment LOCATION_FRAGMENT on Location {
		id
		h3Index15
		Geometry {
			id
			h3Index15
			latitude
			longitude
		}
		plusCode {
			compoundCode
			globalCode
			id
		}
		Address {
			id
			formattedAddress
			AddressComponents {
				id
				short_name
				long_name
				types
				h3Index15
			}
		}
		createdAt
		updatedAt
	}
`

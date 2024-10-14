import { gql } from '@apollo/client'

export const AREA_FRAGMENT = gql`
	fragment AREA_FRAGMENT on Area {
		id
		City {
			id
			name
			Geometry {
				id
				latitude
				longitude
			}
		}
		State {
			id
			name
			isoCode
			Geometry {
				id
				latitude
				longitude
			}
		}
		Country {
			id
			name
			flag
			isoCode
		}
	}
`

export const COUNTRY_FRAGMENT = gql`
	fragment COUNTRY_FRAGMENT on Country {
		id
		name
		isoCode
		flag
	}
`
export const STATE_FRAGMENT = gql`
	fragment STATE_FRAGMENT on State {
		id
		name
		isoCode
		Geometry {
			id
			latitude
			longitude
		}
	}
`
export const CITY_FRAGMENT = gql`
	fragment CITY_FRAGMENT on City {
		id
		name
		Geometry {
			id
			latitude
			longitude
		}
	}
`

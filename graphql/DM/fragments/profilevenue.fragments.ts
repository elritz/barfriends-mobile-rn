import { gql } from '@apollo/client'
import { CREDENTIALS_FRAGMENT } from '#/graphql/DM/fragments/credentials.fragments'
import { DETAIL_INFORMATION_FRAGMENT } from '#/graphql/DM/fragments/detail_information.fragments'
import { INDETIFIABLE_INFORMATION_FRAGMENT } from '#/graphql/DM/fragments/identifiable_information.fragments'
import { LOCATION_FRAGMENT } from '#/graphql/DM/fragments/location.fragments'

export const PROFILE_VENUE_FRAGMENT = gql`
	${CREDENTIALS_FRAGMENT}
	${INDETIFIABLE_INFORMATION_FRAGMENT}
	${DETAIL_INFORMATION_FRAGMENT}
	${LOCATION_FRAGMENT}
	fragment PROFILE_VENUE_FRAGMENT on ProfileVenue {
		__typename
		id
		ProfileType
		IdentifiableInformation {
			...INDETIFIABLE_INFORMATION_FRAGMENT
		}
		distanceInM
		DetailInformation {
			...DETAIL_INFORMATION_FRAGMENT
		}
		photos {
			id
			url
			type
			position
			active
			ratio
			blurhash
			createdAt
			updatedAt
		}
		Venue {
			id
			name
			Profile {
				id
				createdAt
				updatedAt
			}
			LiveOutVenue {
				id
				Out {
					id
					venueProfileId
					personalProfileId
				}
			}
			Location {
				...LOCATION_FRAGMENT
			}
			createdAt
			updatedAt
		}
	}
`

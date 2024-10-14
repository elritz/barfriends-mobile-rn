import { gql } from '@apollo/client'

export const OUT_FRAGMENT = gql`
	fragment OUT_FRAGMENT on Out {
		id
		type
		personalProfileId
		venueProfileId
		VenueStats {
			id
		}
		venueStatsId
		PersonalStats {
			id
		}
		personalStatsId
		LiveOutVenue {
			id
		}
		liveOutVenueId
		leftAt
		LiveOutPersonal {
			id
		}
		liveOutPersonalId
		createdAt
		updatedAt
	}
`

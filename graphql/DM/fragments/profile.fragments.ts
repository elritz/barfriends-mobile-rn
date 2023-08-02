import { gql } from '@apollo/client'
import { CREDENTIALS_FRAGMENT } from '@graphql/DM/fragments/credentials.fragments'
import { DETAIL_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/detail_information.fragments'
import { INDETIFIABLE_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/identifiable_information.fragments'
import { LOCATION_FRAGMENT } from '@graphql/DM/fragments/location.fragments'
import { OUT_FRAGMENT } from '@graphql/DM/fragments/out.fragments'
import { RELATIONSHIP_FRAGMENT } from '@graphql/DM/fragments/relationship.fragments'
import { THEME_MANAGER_FRAGMENT } from '@graphql/DM/fragments/theme.fragments'

export const PROFILE_FRAGMENT = gql`
	${CREDENTIALS_FRAGMENT}
	${INDETIFIABLE_INFORMATION_FRAGMENT}
	${DETAIL_INFORMATION_FRAGMENT}
	${LOCATION_FRAGMENT}
	${THEME_MANAGER_FRAGMENT}
	${RELATIONSHIP_FRAGMENT}
	${OUT_FRAGMENT}
	fragment PROFILE_FRAGMENT on Profile {
		__typename
		id
		ProfileType
		IdentifiableInformation {
			...INDETIFIABLE_INFORMATION_FRAGMENT
		}
		DetailInformation {
			...DETAIL_INFORMATION_FRAGMENT
		}
		resentSearches {
			id
			Profile {
				id
			}
			profileId
			searches
		}
		ThemeManager {
			...THEME_MANAGER_FRAGMENT
		}
		Relationships {
			...RELATIONSHIP_FRAGMENT
		}
		profilePhoto {
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
		Credentials {
			...CREDENTIALS_FRAGMENT
		}
		Personal {
			id
			Profile {
				id
				createdAt
				updatedAt
			}
			profileId
			PersonalStats {
				id
				Out {
					...OUT_FRAGMENT
				}
				createdAt
				updatedAt
			}
			LiveOutPersonal {
				id
				Out {
					...OUT_FRAGMENT
				}
				Personal {
					id
				}
				personalId
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
		Venue {
			id
			Profile {
				id
				createdAt
				updatedAt
			}
			LiveOutVenue {
				id
				Out {
					...OUT_FRAGMENT
				}
			}
			Location {
				...LOCATION_FRAGMENT
			}
			createdAt
			updatedAt
		}
		tonightStory {
			id
			photos {
				id
				position
				url
			}
			emojimood {
				__typename
				id
				colors
				emojiname
				emoji
			}
		}
	}
`

export const PUBLIC_PROFILE_FRAGMENT = gql`
	${CREDENTIALS_FRAGMENT}
	${INDETIFIABLE_INFORMATION_FRAGMENT}
	${DETAIL_INFORMATION_FRAGMENT}
	${LOCATION_FRAGMENT}
	${RELATIONSHIP_FRAGMENT}
	fragment PUBLIC_PROFILE_FRAGMENT on Profile {
		__typename
		id
		ProfileType
		IdentifiableInformation {
			...INDETIFIABLE_INFORMATION_FRAGMENT
		}
		DetailInformation {
			...DETAIL_INFORMATION_FRAGMENT
		}
		Relationships {
			...RELATIONSHIP_FRAGMENT
		}
		profilePhoto {
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
		Credentials {
			...CREDENTIALS_FRAGMENT
		}
		Personal {
			id
			Profile {
				id
				createdAt
				updatedAt
			}
			profileId
			PersonalStats {
				id
				Out {
					id
					type
					personalProfileId
					venueProfileId
					createdAt
					updatedAt
				}
			}
			LiveOutPersonal {
				id
				Out {
					id
					venueProfileId
					personalProfileId
				}
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
		Venue {
			id
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
		tonightStory {
			id
			date

			emojimood {
				id
				emojiname
				emoji
				colors
			}
			Profile {
				id
			}
			photos {
				id
				url
				active
				blurhash
				ratio
				type
				position
				createdAt
				updatedAt
			}
			startDate
			createdAt
			updatedAt
		}
	}
`

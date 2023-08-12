import { gql } from '@apollo/client';
import { PROFILE_VENUES_FRAGMENT } from '@graphql/DM/fragments/index.fragments';
import { PUBLIC_PROFILE_FRAGMENT } from '@graphql/DM/fragments/profile.fragments';


export const EXPLORE_SEARCH_QUERY = gql`
	query exploreSearch($search: String!) {
		exploreSearch(search: $search) {
			people {
				id
				Profile {
					id
					IdentifiableInformation {
						id
						fullname
						firstname
						lastname
						username
					}
					photos {
						id
						active
						blurhash
						url
					}
				}
			}
			venues {
				id
				Profile {
					id
					IdentifiableInformation {
						id
						fullname
						firstname
						lastname
						username
					}
					photos {
						id
						active
						blurhash
						url
					}
				}
			}
			events
		}
	}
`
import { gql } from '@apollo/client'
import { PROFILE_FRAGMENT } from '#/graphql/DM/fragments/profile.fragments'

export const GET_CURRENT_PUSH_NOTIFICATION_TOKEN = gql`
	${PROFILE_FRAGMENT}
	query getCurrentPushNotificationToken {
		getCurrentPushNotificationToken {
			id
			expoToken
			updatedAt
			createdAt
		}
	}
`

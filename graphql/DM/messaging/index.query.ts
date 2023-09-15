import { gql } from '@apollo/client'

export const GET_CONVERSATIONS_AUTHENTICATED_QUERY = gql`
	query getConversations {
		getConversations {
			id
			Members {
				id
				profilePhoto {
					id
					url
					blurhash
				}
				IdentifiableInformation {
					id
					firstname
					fullname
				}
			}
			MembersConversationNotificationSetting {
				id
			}
			Messages {
				id
				messageId
				content
				conversationId
			}
			name
		}
	}
`

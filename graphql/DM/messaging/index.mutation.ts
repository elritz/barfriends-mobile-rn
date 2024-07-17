import { gql } from '@apollo/client'

export const CREATE_MESSAGE_MUTATION = gql`
	mutation createMessage($content: Json!, $conversationId: String, $members: [String!]) {
		createMessage(content: $content, conversationId: $conversationId, members: $members) {
			id
			content 
			conversationId
			messageId
			Conversation {
				id
				name
				MembersConversationNotificationSetting {
					id
				}
			}
			Request {
				id
				senderProfileId
				NotificationType
			}
			createAt
			updatedAt
		}
	}
`

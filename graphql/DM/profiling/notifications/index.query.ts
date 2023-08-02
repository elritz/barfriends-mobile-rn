import { gql } from '@apollo/client'

export const NOTIFICATIONS_QUERY = gql`
	query getNotifications {
		getNotifications {
			friendRequestNotifications {
				id
				NotificationStatus {
					id
					FriendRequest {
						id
						Notifications {
							id
						}
						receiverProfileId
						senderProfileId
						NotificationStatus {
							id
						}
						notificationStatusId
					}
					isAccepted
					isAnswered
					isChecked
				}
				notificationStatusId
				receiverProfileId
				senderProfile {
					id
					photos {
						id
						type
						url
					}
					IdentifiableInformation {
						id
						username
						fullname
					}
				}
				receiverProfile {
					id
					photos {
						id
						type
						url
					}
					IdentifiableInformation {
						id
						username
						fullname
					}
				}
				createdAt
				updatedAt
			}
		}
	}
`

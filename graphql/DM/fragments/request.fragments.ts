import { gql } from '@apollo/client'

export const REQUEST_FRAGMENT = gql`
	fragment REQUEST_FRAGMENT on Request {
		__typename
		id
		senderProfileId
		recievers {
			id
			requestId
			NotificationStatus {
				RequestReceiver {
					profileId
				}
				id
				isAccepted
				isAnswered
				isCanceled
				isChecked
				updatedAt
				createdAt
			}
		}
		createdAt
		updatedAt
	}
`

// import { gql } from '@apollo/client'

// import { RELATIONSHIP_FRAGMENT } from '#/graphql/DM/fragments/index.fragments'

// export const GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY = gql`
// 	${RELATIONSHIP_FRAGMENT}
// 	query getRelationshipFriendRequestStatus($profileId: String!) {
// 		getRelationshipFriendRequestStatus(profileId: $profileId) {
// 			... on Error {
// 				errorCode
// 				message
// 			}
// 			... on Request {
// 				id
// 			}
// 			... on Relationship {
// 				...RELATIONSHIP_FRAGMENT
// 			}
// 			# ... on RejectedFriendsResponse {
// 			# 	friends
// 			# }
// 		}
// 	}
// `
export const GET_SECURE_DATA_QRCODE_FRIENDING_QUERY = gql`
  query getSecureFriendQRCodeData {
    getSecureFriendQRCodeData
  }
`

import {gql} from '@apollo/client'

import {REQUEST_FRAGMENT} from '#/graphql/DM/fragments/request.fragments'

export const CREATE_FRIEND_REQUEST_MUTATION = gql`
  ${REQUEST_FRAGMENT}
  mutation createFriendRequest($receiversProfileId: [String!]!) {
    createFriendRequest(receiversProfileId: $receiversProfileId) {
      ...REQUEST_FRAGMENT
    }
  }
`

export const DELETE_FRIEND_REQUEST_MUTATION = gql`
  mutation deleteFriendRequest($friendRequestId: String!) {
    deleteFriendRequest(friendRequestId: $friendRequestId)
  }
`

export const QR_FRIEND_MUTATION = gql`
  mutation qrAddFriend($qrCodeProfileId: String!, $dataHash: String!) {
    qrAddFriend(qrCodeProfileId: $qrCodeProfileId, dataHash: $dataHash) {
      id
      venueMetAt
      Profile {
        id
      }
      RelationshipStatus
      createdAt
      updatedAt
    }
  }
`

export const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation acceptFriendRequest(
    $friendRequestId: String!
    $venueIdMetAt: String
    $notificationStatusId: String!
  ) {
    acceptFriendRequest(
      friendRequestId: $friendRequestId
      venueIdMetAt: $venueIdMetAt
      notificationStatusId: $notificationStatusId
    ) {
      id
      venueMetAt
      Profile {
        id
      }
      RelationshipStatus
      createdAt
      updatedAt
    }
  }
`
export const DECLINE_FRIEND_REQUEST_MUTATION = gql`
  mutation declineFriendRequest(
    $friendRequestId: String!
    $notificationStatusId: String!
  ) {
    declineFriendRequest(
      friendRequestId: $friendRequestId
      notificationStatusId: $notificationStatusId
    )
  }
`

export const REMOVE_FRIEND_MUTATION = gql`
  mutation removeFriend($relationshipId: String!) {
    removeFriend(relationshipId: $relationshipId)
  }
`

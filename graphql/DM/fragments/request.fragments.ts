import {gql} from '@apollo/client'

import {PROFILE_PUBLIC_FRAGMENT} from './profile.fragments'

export const REQUEST_FRAGMENT = gql`
  ${PROFILE_PUBLIC_FRAGMENT}
  fragment REQUEST_FRAGMENT on Request {
    __typename
    id
    NotificationType
    NotificationMessage {
      id
      profileId
    }
    NotificationFriendRequest {
      id
      profileId
    }
    senderProfileId
    senderProfile {
      ...PROFILE_PUBLIC_FRAGMENT
    }
    recievers {
      __typename
      id
      profileId
      Profile {
        ...PROFILE_PUBLIC_FRAGMENT
      }
      requestId
      notificationStatusId
      NotificationStatus {
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

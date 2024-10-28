import {gql} from '@apollo/client'

import {PROFILE_PUBLIC_FRAGMENT} from './../../fragments/profile.fragments'

export const GET_NOTIFICATIONS_QUERY = gql`
  ${PROFILE_PUBLIC_FRAGMENT}
  query getNotifications {
    getNotifications {
      friendRequestNotifications {
        id
        NotificationType
        updatedAt
        createdAt
        NotificationFriendRequest {
          id
          profileId
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
            createdAt
            updatedAt
          }
        }
        senderProfile {
          ...PROFILE_PUBLIC_FRAGMENT
        }
      }
    }
  }
`

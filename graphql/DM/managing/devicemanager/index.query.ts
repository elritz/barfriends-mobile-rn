import {gql} from '@apollo/client'

import {PROFILE_FRAGMENT} from '#/graphql/DM/fragments/profile.fragments'

export const GET_A_DEVICE_MANAGER_QUERY = gql`
  ${PROFILE_FRAGMENT}
  query getADeviceManager {
    getADeviceManager {
      ... on DeviceManagerDeviceProfiles {
        DeviceProfiles {
          id
          AppType
          ProfileType
          isActive
          deviceManagerId
          DeviceManager {
            id
          }
          profileId
          Profile {
            ...PROFILE_FRAGMENT
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`

export const REFRESH_DEVICE_MANAGER_QUERY = gql`
  ${PROFILE_FRAGMENT}
  query refreshDeviceManager {
    refreshDeviceManager {
      ... on AuthorizationDeviceProfile {
        id
        isActive
        AppType
        deviceManagerId
        Profile {
          ...PROFILE_FRAGMENT
        }
      }
      ... on Error {
        errorCode
        message
      }
    }
  }
`

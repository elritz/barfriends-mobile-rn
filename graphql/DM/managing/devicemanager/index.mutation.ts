import {gql} from '@apollo/client'

import {INDETIFIABLE_INFORMATION_FRAGMENT} from '#/graphql/DM/fragments/identifiable_information.fragments'
import {PROFILE_FRAGMENT} from '#/graphql/DM/fragments/profile.fragments'

export const REMOVE_DEVICE_PROFILE_FROM_DEVICE_MANAGER_MUTATION = gql`
  mutation removeDeviceProfileFromDeviceManager($profileId: String!) {
    removeDeviceProfileFromDeviceManager(profileId: $profileId)
  }
`

export const SWITCH_DEVICE_PROFILE_MUTATION = gql`
  ${PROFILE_FRAGMENT}
  ${INDETIFIABLE_INFORMATION_FRAGMENT}
  mutation switchDeviceProfile($profileId: String!) {
    switchDeviceProfile(profileId: $profileId) {
      ... on AuthorizationDeviceProfile {
        __typename
        id
        isActive
        AppType
        DeviceManager {
          id
        }
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

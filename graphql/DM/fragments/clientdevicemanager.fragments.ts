import {gql} from '@apollo/client'

import {PROFILE_FRAGMENT} from './profile.fragments'

export const AUTHORIZATION_DEVICE_PROFILE_FRAGMENT = gql`
  ${PROFILE_FRAGMENT}
  fragment AUTHORIZATION_DEVICE_PROFILE_FRAGMENT on AuthorizationDeviceProfile {
    id
    profileId
    isActive
    deviceManagerId
    Profile {
      ...PROFILE_FRAGMENT
    }
    AppType
    ProfileType
    DeviceManager {
      id
    }
    createdAt
    updatedAt
  }
`
export const AUTHORIZATION_DEVICE_MANAGER_FRAGMENT = gql`
  ${AUTHORIZATION_DEVICE_PROFILE_FRAGMENT}
  fragment AUTHORIZATION_DEVICE_MANAGER_FRAGMENT on AuthorizationDeviceManager {
    id
    DeviceProfile {
      ...AUTHORIZATION_DEVICE_PROFILE_FRAGMENT
    }
    Device {
      id
    }
  }
`

import {gql} from '@apollo/client'

import {
  AUTHORIZATION_DEVICE_PROFILE_FRAGMENT,
  ERROR_FRAGMENT,
  PROFILE_FRAGMENT,
} from '#/graphql/DM/fragments/index.fragments'

export const CREATE_PROFILE_PERSONAL_MUTATION = gql`
  ${ERROR_FRAGMENT}
  ${AUTHORIZATION_DEVICE_PROFILE_FRAGMENT}
  mutation createPersonalProfile($data: CreatePersonalDataInput) {
    createPersonalProfile(data: $data) {
      ... on Error {
        ...ERROR_FRAGMENT
      }
      ... on AuthorizationDeviceProfile {
        ...AUTHORIZATION_DEVICE_PROFILE_FRAGMENT
      }
    }
  }
`

export const CREATE_PROFILE_GUEST_MUTATION = gql`
  ${ERROR_FRAGMENT}
  ${AUTHORIZATION_DEVICE_PROFILE_FRAGMENT}
  mutation createGuestProfile {
    createGuestProfile {
      ... on Error {
        ...ERROR_FRAGMENT
      }
      ... on AuthorizationDeviceProfile {
        ...AUTHORIZATION_DEVICE_PROFILE_FRAGMENT
      }
    }
  }
`

export const UPDATE_PROFILE_IDENTIFIABLE_INFORMATION_MUTATION = gql`
  ${ERROR_FRAGMENT}
  ${PROFILE_FRAGMENT}
  mutation updateProfileIdentifiableInformation(
    $data: IdentifiableInformationUpdateInput!
  ) {
    updateProfileIdentifiableInformation(data: $data) {
      ... on Error {
        ...ERROR_FRAGMENT
      }
      ... on Profile {
        ...PROFILE_FRAGMENT
      }
    }
  }
`

export const UPDATE_PROFILE_MUTATION = gql`
  ${ERROR_FRAGMENT}
  ${PROFILE_FRAGMENT}
  mutation updateOneProfile(
    $data: ProfileUpdateInput!
    $where: ProfileWhereUniqueInput!
  ) {
    updateOneProfile(data: $data, where: $where) {
      ...PROFILE_FRAGMENT
    }
  }
`

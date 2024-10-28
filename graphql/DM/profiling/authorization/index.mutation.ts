import {gql} from '@apollo/client'

import {
  CODE_FRAGMENT,
  ERROR_FRAGMENT,
} from '#/graphql/DM/fragments/index.fragments'

export const AUTHENTICATION_DEVICE_OWNER_CODE_MUTATION = gql`
  ${CODE_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation sendAuthenticatorDeviceOwnerCode(
    $data: CodeDataInput
    $where: CustomCodeWhereInput
  ) {
    sendAuthenticatorDeviceOwnerCode(data: $data, where: $where) {
      ... on Code {
        ...CODE_FRAGMENT
      }
      ... on Error {
        ...ERROR_FRAGMENT
      }
    }
  }
`

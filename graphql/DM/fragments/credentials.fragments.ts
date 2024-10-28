import {gql} from '@apollo/client'

export const CREDENTIALS_FRAGMENT = gql`
  fragment CREDENTIALS_FRAGMENT on Credentials {
    id
    AuthenticationProvider {
      id
      phones {
        id
        number
        completeNumber
        countryCode
        canUseAsRecovery
        countryCallingCode
        createdAt
        updatedAt
      }
      emails {
        id
        email
        canUseAsRecovery
        createdAt
        updatedAt
      }
    }
  }
`

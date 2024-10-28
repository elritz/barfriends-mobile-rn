import {gql} from '@apollo/client'

import {
  ERROR_FRAGMENT,
  PROFILE_FRAGMENT,
} from '#/graphql/DM/fragments/index.fragments'

export const AUTHORIZED_PROFILES_QUERY = gql`
  ${ERROR_FRAGMENT}
  ${PROFILE_FRAGMENT}
  query authorizedProfiles($where: AuthorizedProfilesWhereInput!) {
    authorizedProfiles(where: $where) {
      ... on Error {
        ...ERROR_FRAGMENT
      }
      ... on ProfilesResponse {
        email {
          ...PROFILE_FRAGMENT
        }
        phone {
          ...PROFILE_FRAGMENT
        }
        username {
          ...PROFILE_FRAGMENT
        }
      }
    }
  }
`

export const GET_LATEST_TERMS_AND_SERVICES = gql`
  query privacyTermsDocuments {
    privacyTermsDocuments {
      privacy {
        id
        LegalAgreement {
          id
        }
        TypeOfDocument
        createdAt
        updatedAt
        content
      }
      termsofservice {
        id
        LegalAgreement {
          id
        }
        TypeOfDocument
        createdAt
        updatedAt
        content
      }
    }
  }
`

export const LOGIN_PASSWORD_QUERY = gql`
  query loginPassword($username: String!, $password: String!) {
    loginPassword(username: $username, password: $password)
  }
`

export const CHECK_USERNAME_AVAILABLE_QUERY = gql`
  query checkUsername($username: String!) {
    checkUsername(username: $username)
  }
`

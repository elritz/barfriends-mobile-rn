import gql from 'graphql-tag'

export const GET_SECURE_DATA_QRCODE_FRIENDING_QUERY = gql`
  query checkPrivacyTermsDocumentUpdate {
    checkPrivacyTermsDocumentUpdate {
      ... on Error {
        message
        errorCode
      }
      ... on LatestPrivacyAndTermsDocumentResponse {
        privacy {
          id
        }
        termsofservice {
          id
        }
      }
    }
  }
`

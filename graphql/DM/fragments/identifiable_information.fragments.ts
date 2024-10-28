import {gql} from '@apollo/client'

export const INDETIFIABLE_INFORMATION_FRAGMENT = gql`
  fragment INDETIFIABLE_INFORMATION_FRAGMENT on IdentifiableInformation {
    id
    username
    fullname
    nickname
    firstname
    lastname
    gender
    lookfor
    birthday
    hometown
    currenttown
  }
`

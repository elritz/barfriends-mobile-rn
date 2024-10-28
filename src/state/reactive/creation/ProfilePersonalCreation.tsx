import {makeVar} from '@apollo/client'

import {CredentialPersoanlType} from '#/types/app'

export const CredentialPersonalProfileReactiveVar =
  makeVar<CredentialPersoanlType>({
    PrivacyId: '',
    ServiceId: '',
    birthday: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    username: '',
    photo: {
      uri: '',
    },
    phone: {
      number: '',
      completeNumber: '',
      countryCallingCode: '',
      countryCode: '',
    },
  })

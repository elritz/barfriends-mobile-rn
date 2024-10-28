export interface ITabColor {
  color: string
  focused: boolean
  size: number
}

export type DynamicIllustrationProps = {
  width: number
  height: number
  primary?: string
  secondary?: string
  tertiary?: string
}

export type CredentialPersoanlType = {
  PrivacyId?: string
  ServiceId?: string
  email?: string
  birthday?: string
  password?: string
  username?: string
  firstname?: string
  lastname?: string
  photo?: {
    uri?: string
  }
  phone?: {
    number?: string
    completeNumber?: string
    countryCallingCode?: string
    countryCode?: string
  }
}

export type TermsServiceType = {
  update: boolean
}

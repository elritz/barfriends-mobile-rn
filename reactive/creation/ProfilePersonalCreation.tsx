import { makeVar } from '@apollo/client'

export type CredentialPersoanl = {
	PrivacyId?: string
	ServiceId?: string
	email?: string
	birthday?: string
	password?: string
	username?: string
	firstname?: string
	lastname?: string
	phone?: {
		number?: string
		completeNumber?: string
		countryCallingCode?: string
		countryCode?: string
	}
}

export const CredentialPersonalProfileReactiveVar = makeVar<CredentialPersoanl>({
	PrivacyId: '',
	ServiceId: '',
	birthday: '',
	email: '',
	firstname: '',
	lastname: '',
	password: '',
	username: '',
	phone: {
		number: '',
		completeNumber: '',
		countryCallingCode: '',
		countryCode: '',
	},
})

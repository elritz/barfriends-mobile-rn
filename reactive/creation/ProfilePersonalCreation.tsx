import { makeVar } from '@apollo/client'
import { CredentialPersoanlType } from '@ctypes/app'

export const CredentialPersonalProfileReactiveVar = makeVar<CredentialPersoanlType>({
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

import { makeVar } from '@apollo/client'

type TermsServiceType = {
	update: boolean
}

export const termsServiceInitialState: TermsServiceType = {
	update: false,
}

export const TermsServiceReactiveVar = makeVar<TermsServiceType>(termsServiceInitialState)

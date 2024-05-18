import { makeVar } from '@apollo/client'
import { InitialStateTermsService } from '#/constants/Preferences'
import { TermsServiceType } from '#/ctypes/app'

export const TermsServiceReactiveVar = makeVar<TermsServiceType>(InitialStateTermsService)

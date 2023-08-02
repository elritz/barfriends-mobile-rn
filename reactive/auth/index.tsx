import { makeVar } from '@apollo/client'
import { AuthorizationDeviceManager } from '@graphql/generated'

export const AuthorizationReactiveVar = makeVar<AuthorizationDeviceManager | null>(null)

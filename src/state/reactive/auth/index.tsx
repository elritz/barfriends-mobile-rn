import {makeVar} from '@apollo/client'
import {AuthorizationDeviceProfile} from '#/graphql/generated'

export const AuthorizationReactiveVar =
  makeVar<AuthorizationDeviceProfile | null>(null)

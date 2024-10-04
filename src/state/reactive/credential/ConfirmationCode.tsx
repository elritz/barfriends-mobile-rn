import { makeVar } from '@apollo/client'
import { Code_FragmentFragment } from '#/graphql/generated'

export const ConfirmationCodeReactiveVar = makeVar<Code_FragmentFragment | undefined>(undefined)

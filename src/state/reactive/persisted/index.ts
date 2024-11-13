import * as persisted from '#/src/state/persisted'
import { makeVar } from '@apollo/client'

export const PersitedVar = makeVar<persisted.Schema>(persisted.defaults)

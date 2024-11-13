// import {deviceLanguageCodes, deviceLocales} from '#/src/locale/deviceLocales'
// import {findSupportedAppLanguage} from '#/src/locale/helpers'
import { z } from 'zod'

import * as colors from '#/assets/theme/colors'
import { logger } from '#/src/logger'


/**
 * A account persisted to storage. Stored in the `accounts[]` array. Contains
 * base account info and access tokens.
 */
const accountSchema = z.object({
  service: z.string(),
  did: z.string(),
  handle: z.string(),
  email: z.string().optional(),
  emailConfirmed: z.boolean().optional(),
  emailAuthFactor: z.boolean().optional(),
  refreshJwt: z.string().optional(), // optional because it can expire
  accessJwt: z.string().optional(), // optional because it can expire
  signupQueued: z.boolean().optional(),
  active: z.boolean().optional(), // optional for backwards compat
  /**
   * Known values: takendown, suspended, deactivated
   * @see https://github.com/bluesky-social/atproto/blob/5441fbde9ed3b22463e91481ec80cb095643e141/lexicons/com/atproto/server/getSession.json
   */
  status: z.string().optional(),
  pdsUrl: z.string().optional(),
})
export type PersistedAccount = z.infer<typeof accountSchema>

/**
 * The current account. Stored in the `currentAccount` field.
 *
 * In previous versions, this included tokens and other info. Now, it's used
 * only to reference the `did` field, and all other fields are marked as
 * optional. They should be considered deprecated and not used, but are kept
 * here for backwards compat.
 */
const currentAccountSchema = accountSchema.extend({
  service: z.string().optional(),
  handle: z.string().optional(),
})
export type PersistedCurrentAccount = z.infer<typeof currentAccountSchema>

const schema = z.object({
  theme: z.object({
    mode: z.enum(['system', 'light', 'dark']).optional(),
    theme: z.object({
      gluestack: z.object({
        primary0: z.string(),
        primary50: z.string(),
        primary100: z.string(),
        primary200: z.string(),
        primary300: z.string(),
        primary400: z.string(),
        primary500: z.string(),
        primary600: z.string(),
        primary700: z.string(),
        primary800: z.string(),
        primary900: z.string(),
        primary950: z.string(),
        secondary0: z.string(),
        secondary50: z.string(),
        secondary100: z.string(),
        secondary200: z.string(),
        secondary300: z.string(),
        secondary400: z.string(),
        secondary500: z.string(),
        secondary600: z.string(),
        secondary700: z.string(),
        secondary800: z.string(),
        secondary900: z.string(),
        secondary950: z.string(),
        tertiary0: z.string(),
        tertiary50: z.string(),
        tertiary100: z.string(),
        tertiary200: z.string(),
        tertiary300: z.string(),
        tertiary400: z.string(),
        tertiary500: z.string(),
        tertiary600: z.string(),
        tertiary700: z.string(),
        tertiary800: z.string(),
        tertiary900: z.string(),
        tertiary950: z.string(),
      }),
      reactnavigation: z.object({
        primary: z.string(),
        background: z.string(),
        border: z.string(),
        card: z.string(),
        text: z.string(),
        notification: z.string(),
      }),
    }),
  })
})

export type Schema = z.infer<typeof schema>

export const defaults: Schema = {
  theme: {
    mode: 'system',
    theme: {
      reactnavigation: {
        background: colors.grey900,
        primary: '#FF7000',
        card: colors.grey800,
        text: colors.grey300,
        border: colors.grey300,
        notification: '#257CFF',
      },
      gluestack: {
        primary0: '#ffefdb',
        primary50: '#ffefdb',
        primary100: '#ffd3ae',
        primary200: '#ffb77e',
        primary300: '#ff9b4c',
        primary400: '#ff7e1a',
        primary500: '#ff7000',
        primary600: '#de6100',
        primary700: '#813700',
        primary800: '#4f2100',
        primary900: '#200800',
        primary950: '#200800',
        secondary0: '#FCFCFC',
        secondary50: '#F5F5F5',
        secondary100: '#E5E5E5',
        secondary200: '#DBDBDB',
        secondary300: '#D4D4D4',
        secondary400: '#8C8C8C',
        secondary500: '#8C8C8C',
        secondary600: '#737373',
        secondary700: '#525252',
        secondary800: '#404040',
        secondary900: '#262626',
        secondary950: '#171717',
        tertiary0: '#def0ff',
        tertiary50: '#def0ff',
        tertiary100: '#afcfff',
        tertiary200: '#7dafff',
        tertiary300: '#4b8fff',
        tertiary400: '#1a6fff',
        tertiary500: '#0056e6',
        tertiary600: '#0043b4',
        tertiary700: '#003082',
        tertiary800: '#001d51',
        tertiary900: '#000a21',
        tertiary950: '#000a21',
      }
    },
  }
}

export function tryParse(rawData: string): Schema | undefined {
  let objData
  try {
    objData = JSON.parse(rawData)
  } catch (e) {
    logger.error('persisted state: failed to parse root state from storage', {
      message: e,
    })
  }
  if (!objData) {
    return undefined
  }
  const parsed = schema.safeParse(objData)
  if (parsed.success) {
    return objData
  } else {
    const errors =
      parsed.error?.errors?.map(e => ({
        code: e.code,
        // @ts-ignore exists on some types
        expected: e?.expected,
        path: e.path?.join('.'),
      })) || []
    logger.error(`persisted store: data failed validation on read`, {errors})
    return undefined
  }
}

export function tryStringify(value: Schema): string | undefined {
  try {
    schema.parse(value)
    return JSON.stringify(value)
  } catch (e) {
    logger.error(`persisted state: failed stringifying root state`, {
      message: e,
    })
    return undefined
  }
}

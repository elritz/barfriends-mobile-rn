// import {deviceLanguageCodes, deviceLocales} from '#/src/locale/deviceLocales'
// import {findSupportedAppLanguage} from '#/src/locale/helpers'
import { z } from 'zod'

import { logger } from '#/src/logger'

const externalEmbedOptions = ['show', 'hide'] as const

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
  })
  // session: z.object({
  //   accounts: z.array(accountSchema),
  //   currentAccount: currentAccountSchema.optional(),
  // }),
  // reminders: z.object({
  //   lastEmailConfirm: z.string().optional(),
  // }),
  // requireAltTextEnabled: z.boolean(), // should move to server
  // largeAltBadgeEnabled: z.boolean().optional(),
  // externalEmbeds: z
  //   .object({
  //     giphy: z.enum(externalEmbedOptions).optional(),
  //     tenor: z.enum(externalEmbedOptions).optional(),
  //     youtube: z.enum(externalEmbedOptions).optional(),
  //     youtubeShorts: z.enum(externalEmbedOptions).optional(),
  //     twitch: z.enum(externalEmbedOptions).optional(),
  //     vimeo: z.enum(externalEmbedOptions).optional(),
  //     spotify: z.enum(externalEmbedOptions).optional(),
  //     appleMusic: z.enum(externalEmbedOptions).optional(),
  //     soundcloud: z.enum(externalEmbedOptions).optional(),
  //     flickr: z.enum(externalEmbedOptions).optional(),
  //   })
  //   .optional(),
  // invites: z.object({
  //   copiedInvites: z.array(z.string()),
  // }),
  // onboarding: z.object({
  //   step: z.string(),
  // }),
  // hiddenPosts: z.array(z.string()).optional(), // should move to server
  // useInAppBrowser: z.boolean().optional(),
  // lastSelectedHomeFeed: z.string().optional(),
  // pdsAddressHistory: z.array(z.string()).optional(),
  // disableHaptics: z.boolean().optional(),
  // disableAutoplay: z.boolean().optional(),
  // kawaii: z.boolean().optional(),
  // hasCheckedForStarterPack: z.boolean().optional(),
  // subtitlesEnabled: z.boolean().optional(),
  /** @deprecated */
  // mutedThreads: z.array(z.string()),
})

export type Schema = z.infer<typeof schema>

export const defaults: Schema = {
  theme: {
    mode: 'system',
  }
  // session: {
  //   accounts: [],
  //   currentAccount: undefined,
  // },
  // reminders: {
  //   lastEmailConfirm: undefined,
  // },
  // languagePrefs: {
  //   primaryLanguage: deviceLanguageCodes[0] || 'en',
  //   contentLanguages: deviceLanguageCodes || [],
  //   postLanguage: deviceLanguageCodes[0] || 'en',
  //   postLanguageHistory: (deviceLanguageCodes || [])
  //     .concat(['en', 'ja', 'pt', 'de'])
  //     .slice(0, 6),
  //   // try full language tag first, then fallback to language code
  //   appLanguage: findSupportedAppLanguage([
  //     deviceLocales.at(0)?.languageTag,
  //     deviceLanguageCodes[0],
  //   ]),
  // },
  // requireAltTextEnabled: false,
  // largeAltBadgeEnabled: false,
  // externalEmbeds: {},
  // mutedThreads: [],
  // invites: {
  //   copiedInvites: [],
  // },
  // onboarding: {
  //   step: 'Home',
  // },
  // hiddenPosts: [],
  // useInAppBrowser: undefined,
  // lastSelectedHomeFeed: undefined,
  // pdsAddressHistory: [],
  // disableHaptics: false,
  // kawaii: false,
  // hasCheckedForStarterPack: false,
  // subtitlesEnabled: true,
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

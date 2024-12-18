import { logger } from '#/src/logger'
import {
  defaults,
  Schema,
  tryParse,
  tryStringify,
} from '#/src/state/persisted/schema'
import { storage } from '#/src/storage/mmkv'
import { PersistedApi } from './types'
import { normalizeData } from './util'

export { defaults } from '#/src/state/persisted/schema'
export type { PersistedAccount, Schema } from '#/src/state/persisted/schema'

const BFS_STORAGE = 'BFS_STORAGE'

let _state: Schema = defaults

export async function init() {
  const stored = await readFromStorage()

  if (stored) {
    _state = stored
  }
}
init satisfies PersistedApi['init']

export function get<K extends keyof Schema>(key: K): Schema[K] {
  return _state[key]
}
get satisfies PersistedApi['get']

export async function write<K extends keyof Schema>(
  key: K,
  value: Schema[K],
): Promise<void> {
  _state = normalizeData({
    ..._state,
    [key]: value,
  })
  await writeToStorage(_state)
}
write satisfies PersistedApi['write']

export function onUpdate<K extends keyof Schema>(
  _key: K,
  _cb: (v: Schema[K]) => void,
): () => void {
  return () => {}
}
onUpdate satisfies PersistedApi['onUpdate']

export async function clearStorage() {
  try {
    storage.clearAll()
  } catch (e: any) {
    logger.error(`persisted store: failed to clear`, {message: e.toString()})
  }
}
clearStorage satisfies PersistedApi['clearStorage']

async function writeToStorage(value: Schema) {
  const rawData = tryStringify(value)
  if (rawData) {
    try {
      storage.set(BFS_STORAGE, rawData)
    } catch (e) {
      logger.error(`persisted state: failed writing root state to storage`, {
        message: e,
      })
    }
  }
}

async function readFromStorage(): Promise<Schema | undefined> {
  let rawData: string | undefined = undefined
  try {
    rawData = storage.getString(BFS_STORAGE)
  } catch (e) {
    logger.error(`persisted state: failed reading root state from storage`, {
      message: e,
    })
  }
  if (rawData) {
    const parsed = tryParse(rawData)
    if (parsed) {
      return normalizeData(parsed)
    }
  }
}

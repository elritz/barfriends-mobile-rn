import {storage} from '../storage/mmkv'

export function loadString(key: string): string | null {
  return storage.getString(key) ?? null
}

export function saveString(key: string, value: string): boolean {
  try {
    storage.set(key, value)
    return true
  } catch {
    return false
  }
}

export function load(key: string): any | null {
  try {
    const str = storage.getString(key)
    if (typeof str !== 'string') {
      return null
    }
    return JSON.parse(str)
  } catch {
    return null
  }
}

export function save(key: string, value: any): boolean {
  try {
    storage.set(key, JSON.stringify(value))

    return true
  } catch {
    return false
  }
}

export function remove(key: string): void {
  try {
    storage.delete(key)
  } catch {}
}

export function clear(): void {
  try {
    storage.clearAll()
  } catch {}
}

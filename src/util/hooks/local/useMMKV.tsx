import {MMKV} from 'react-native-mmkv'
import jwtDecode from 'jwt-decode'

export const storage = new MMKV()

interface ReadTokenProps {
  key: string
  decode?: boolean
}
interface CreateTokenProps {
  key: string
  value: string
  options?: Storage
}

interface DeleteTokenProps {
  key: string
}

const mmkvItemRead = ({key, decode}: ReadTokenProps): string | unknown => {
  if (decode) {
    const token = storage.getString(key)
    if (token) {
      const decodedToken: Record<string, string> = jwtDecode(token)
      return decodedToken
    }
  }
  const token: string | undefined = storage.getString(key)
  if (token) {
    return token
  }
  return null
}

const secureStorageItemCreate = async ({
  key,
  value,
  options,
}: CreateTokenProps): Promise<void> => storage.set(key, value)

const secureStorageItemDelete = async ({
  key,
}: DeleteTokenProps): Promise<void> => storage.delete(key)

export {mmkvItemRead, secureStorageItemCreate, secureStorageItemDelete}

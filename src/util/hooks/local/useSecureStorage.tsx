import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode'


interface ReadTokenProps {
	key: string
	decode?: boolean
}
interface CreateTokenProps {
	key: string
	value: string
	options?: SecureStore.SecureStoreOptions
}

interface DeleteTokenProps {
	key: string
	options?: SecureStore.SecureStoreOptions
}

const secureStorageItemRead = async ({
	key,
	decode,
}: ReadTokenProps): Promise<string | unknown> => {
	if (decode) {
		const token = await SecureStore.getItemAsync(key)
		if (token) {
			const decodedToken: Record<string, string> = jwtDecode(token)
			return decodedToken
		}
	}
	const token: Promise<string | null> = SecureStore.getItemAsync(key)
	if (token) {
		return token
	}
	return null
}

const secureStorageItemCreate = async ({ key, value, options }: CreateTokenProps): Promise<void> =>
	SecureStore.setItemAsync(key, value, options)

const secureStorageItemDelete = async ({ key, options }: DeleteTokenProps): Promise<void> =>
	SecureStore.deleteItemAsync(key, options)

export { secureStorageItemCreate, secureStorageItemRead, secureStorageItemDelete }

import { setContext } from '@apollo/client/link/context'
import { REVEL, AUTHORIZATION } from '@constants/StorageConstants'
import { useDeviceType } from '@util/hooks/device/useDeviceType'
import { secureStorageItemRead } from '@util/hooks/local/useSecureStorage'

const authLink = setContext(async (_, { headers }) => {
	const authorization = await secureStorageItemRead({ key: AUTHORIZATION })

	const { deviceType } = await useDeviceType()

	return {
		headers: {
			...headers,
			authorization: authorization,
			deviceType,
			appType: REVEL,
		},
	}
})

export default authLink

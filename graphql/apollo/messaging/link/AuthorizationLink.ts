import { setContext } from '@apollo/client/link/context'
import { BARFRIENDS, AUTHORIZATION } from '@constants/StorageConstants'
import { useDeviceType } from '@util/hooks/device/useDeviceType'
import { secureStorageItemRead } from '@util/hooks/local/useSecureStorage'

const authLink = setContext(async (_, { headers }) => {
	const authorization = await secureStorageItemRead({ key: AUTHORIZATION })

	const { deviceType } = await useDeviceType()

	return {
		headers: {
			...headers,
			authorization: authorization ? authorization : '',
			deviceType,
			appType: BARFRIENDS,
		},
	}
})

export default authLink

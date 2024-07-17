import { setContext } from '@apollo/client/link/context'
import { BARFRIENDS, AUTHORIZATION, REFRESH } from '#/constants/StorageConstants'
import { useDeviceType } from '#/util/hooks/device/useDeviceType'
import { secureStorageItemRead } from '#/util/hooks/local/useSecureStorage'

const authLink = setContext(async (_, { headers }) => {
	const authorization = await secureStorageItemRead({ key: AUTHORIZATION })
	console.log("🚀 ~ authLink ~ authorization:", authorization)
	const refresh = await secureStorageItemRead({ key: REFRESH })
	console.log("🚀 ~ authLink ~ refresh:", refresh)

	const { deviceType } = await useDeviceType()
	if(!authorization || !refresh) {
		return {
			headers: {
				...headers,
				// authorization: 'authorization',
				// refresh: 'refresh',
				deviceType,
				appType: BARFRIENDS,
			},
		}
	}
	
	return {
		headers: {
			...headers,
			authorization: authorization,
			refresh: refresh,
			deviceType,
			appType: BARFRIENDS,
		},
	}
})

export default authLink

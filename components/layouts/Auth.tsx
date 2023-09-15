import { AUTHORIZATION } from '@constants/StorageConstants'
import {
	AuthorizationDeviceProfile,
	useCreateGuestProfileMutation,
	useRefreshDeviceManagerMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { AuthorizationDecoded } from '@util/hooks/auth/useCheckLocalStorageForAuthorizationToken'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { useCallback, useEffect } from 'react'

export default function Auth({ children }) {
	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				if (data.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile') {
					const deviceProfile = data.refreshDeviceManager as AuthorizationDeviceProfile
					AuthorizationReactiveVar(deviceProfile)
					// setTimeout(() => {
					// 	router.push('/(app)/hometab/venuefeed')
					// }, 1)
				}
				if (data.refreshDeviceManager?.__typename === 'Error') {
					// setTimeout(() => {
					// 	router.push('/(app)/hometab/venuefeed')
					// }, 1)
				}
			},
			onError: e => {},
		})

	const [createGuestProfileMutation, { data, loading: CGLoading, error: CGPMError }] =
		useCreateGuestProfileMutation({
			onCompleted: async data => {
				if (data?.createGuestProfile.__typename === 'AuthorizationDeviceProfile') {
					const deviceProfile = data.createGuestProfile as AuthorizationDeviceProfile
					if (deviceProfile) {
						AuthorizationReactiveVar(deviceProfile)
						// setTimeout(() => {
						// 	router.replace({
						// 		pathname: '/(app)/hometab/venuefeed',
						// 	})
						// }, 1)
					}
				}
			},
		})

	const applicationAuthorization = useCallback(async () => {
		// await secureStorageItemDelete({
		// 	key: LOCAL_STORAGE_SEARCH_AREA,
		// })

		// await secureStorageItemDelete({
		// 	key: AUTHORIZATION,
		// })

		const getAuthorization = (await secureStorageItemRead({
			key: AUTHORIZATION,
			decode: true,
		})) as AuthorizationDecoded


		if (!getAuthorization) {
			createGuestProfileMutation()
		} else {
			refreshDeviceManagerMutation()
		}
	}, [])

	useEffect(() => {
		applicationAuthorization()
	}, [])

	if (RDMLoading || CGLoading) {
		return null
	}

	return <>{children}</>
}

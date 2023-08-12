import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION } from '@constants/StorageConstants'
import {
	AuthorizationDeviceProfile,
	useCreateGuestProfileMutation,
	useRefreshDeviceManagerMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { AuthorizationDecoded } from '@util/hooks/auth/useCheckLocalStorageForAuthorizationToken'
import { secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { router } from 'expo-router'
import { useEffect } from 'react'

export default function Auth({ children }) {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onError(error, clientOptions) {
				router.push({
					pathname: '(error)/network',
				})
			},
			onCompleted: data => {
				if (data.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile') {
					const deviceProfile = data.refreshDeviceManager as AuthorizationDeviceProfile
					AuthorizationReactiveVar(deviceProfile)
					router.push('(app)/hometab/venuefeed')
				}
				if (data.refreshDeviceManager?.__typename === 'Error') {
					setTimeout(() => {
						router.replace({
							pathname: '(error)',
						})
					}, 1)
				}
			},
		})

	const [createGuestProfileMutation, { data, loading: CGLoading, error: CGPMError }] =
		useCreateGuestProfileMutation({
			onError(error, clientOptions) {
				// router.push({
				// 	pathname: '(error)/network',
				// })
			},
			onCompleted: async data => {
				if (data?.createGuestProfile.__typename === 'AuthorizationDeviceProfile') {
					const deviceProfile = data.createGuestProfile as AuthorizationDeviceProfile
					if (deviceProfile) {
						AuthorizationReactiveVar(deviceProfile)
						// setTimeout(() => {
						// 	router.replace({
						// 		pathname: '(app)/hometab/venuefeed',
						// 	})
						// }, 1)
					}
				}
			},
		})

	const applicationAuthorization = async () => {
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
	}

	useEffect(() => {
		applicationAuthorization()
	}, [])

	if (!rAuthorizationVar || RDMLoading || CGLoading) {
		return null
	}

	return <>{children}</>
}

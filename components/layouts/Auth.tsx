import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION } from '@constants/StorageConstants'
import {
	AuthorizationDeviceProfile,
	useCreateGuestProfileMutation,
	useRefreshDeviceManagerMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { AuthorizationDecoded } from '@util/hooks/auth/useCheckLocalStorageForAuthorizationToken'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { router, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'

export default function Auth({ children }) {
	const segments = useSegments()
	const router = useRouter()

	console.log('🚀 ~ file: Auth.tsx:18 ~ Auth ~ segments:', segments)

	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				// console.log('🚀 ~ file: Auth.tsx:20 ~ Auth ~ data:', JSON.stringify(data, null, 2))

				if (data.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile') {
					const deviceProfile = data.refreshDeviceManager as AuthorizationDeviceProfile
					AuthorizationReactiveVar(deviceProfile)
					console.log('AuthorizationReactiveVar :>> ', AuthorizationReactiveVar())
					// router.push('(app)/hometab/venuefeed')
				}
				if (data.refreshDeviceManager?.__typename === 'Error') {
				}
			},
			onError: e => {
				console.log('🛑 ===============================e :>> ', e)
				// router.push('(app)/hometab/venuefeed')
			},
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

	useEffect(() => {
		const inAuthGroup = segments[0] === '(auth)'

		if (
			// If the user is not signed in and the initial segment is not anything in the auth group.
			!rAuthorizationVar &&
			!inAuthGroup
		) {
			// Redirect to the sign-in page.
			// router.replace('(auth)/credential/logincredentialstack/authenticator')
		}
	}, [rAuthorizationVar, segments])

	if (RDMLoading || CGLoading) {
		return null
	}

	return <>{children}</>
}

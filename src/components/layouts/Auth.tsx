import {useCallback, useEffect} from 'react'

import {
  AuthorizationDeviceProfile,
  useCreateGuestProfileMutation,
  useRefreshDeviceManagerLazyQuery,
} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import {AUTHORIZATION} from '#/src/constants/StorageConstants'
import {AuthorizationDecoded} from '#/src/util/hooks/auth/useCheckLocalStorageForAuthorizationToken'
import {secureStorageItemRead} from '#/src/util/hooks/local/useSecureStorage'

import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default function Auth({children}: {children: ReactNode}) {
  const [refreshDeviceManagerQuery, {loading: RDMLoading}] =
    useRefreshDeviceManagerLazyQuery({
      fetchPolicy: 'network-only',
      onCompleted: data => {
        if (
          data.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
        ) {
          const deviceProfile =
            data.refreshDeviceManager as AuthorizationDeviceProfile

          AuthorizationReactiveVar(deviceProfile)
        }
        if (data.refreshDeviceManager?.__typename === 'Error') {
        }
      },
      onError: e => {
        AuthorizationReactiveVar(null)
        createGuestProfileMutation()
        // console.log("🚀 ~ Auth REFRESH DEVICE MANAGER~ e:", e);
      },
    })

  const [createGuestProfileMutation, {loading: CGLoading}] =
    useCreateGuestProfileMutation({
      onCompleted: async data => {
        if (
          data?.createGuestProfile?.__typename === 'AuthorizationDeviceProfile'
        ) {
          const deviceProfile =
            data.createGuestProfile as AuthorizationDeviceProfile
          if (deviceProfile) {
            AuthorizationReactiveVar(deviceProfile)
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
      refreshDeviceManagerQuery()
    }
  }, [])

  useEffect(() => {
    applicationAuthorization()
  }, [])

  if (RDMLoading || CGLoading) {
    return null
  }

  return <View style={styles.container}>{children}</View>
}

import {setContext} from '@apollo/client/link/context'

import {
  AUTHORIZATION,
  BARFRIENDS,
  REFRESH,
} from '#/src/constants/StorageConstants'
import {useDeviceType} from '#/src/util/hooks/device/useDeviceType'
import {secureStorageItemRead} from '#/src/util/hooks/local/useSecureStorage'

const authLink = setContext(async (_, {headers}) => {
  const authorization = await secureStorageItemRead({key: AUTHORIZATION})
  const refresh = await secureStorageItemRead({key: REFRESH})

  const {deviceType} = await useDeviceType()
  if (!authorization || !refresh) {
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

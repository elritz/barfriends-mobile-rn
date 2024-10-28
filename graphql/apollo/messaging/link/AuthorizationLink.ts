import {setContext} from '@apollo/client/link/context'

import {AUTHORIZATION, BARFRIENDS} from '#/src/constants/StorageConstants'
import {useDeviceType} from '#/src/util/hooks/device/useDeviceType'
import {secureStorageItemRead} from '#/src/util/hooks/local/useSecureStorage'

const authLink = setContext(async (_, {headers}) => {
  const authorization = await secureStorageItemRead({key: AUTHORIZATION})

  const {deviceType} = await useDeviceType()

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

import {AuthorizationDeviceProfile} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import {AUTHORIZATION} from '#/src/constants/StorageConstants'
import {secureStorageItemRead} from '#/src/util/hooks/local/useSecureStorage'

export type AuthorizationDecoded =
  | {
      devicemanager: string
      iat: number
      exp: number
    }
  | null
  | undefined

const useCheckLocalStorageForAuthorizationToken =
  async (): Promise<boolean> => {
    try {
      const getAuthorization = (await secureStorageItemRead({
        key: AUTHORIZATION,
        decode: true,
      })) as AuthorizationDecoded

      if (!getAuthorization) {
        return false
      }

      const parsedAuthorization = JSON.parse(
        getAuthorization.devicemanager,
      ) as AuthorizationDeviceProfile

      AuthorizationReactiveVar(parsedAuthorization)
      return true
    } catch (e) {
      return false
    }
  }

export default useCheckLocalStorageForAuthorizationToken

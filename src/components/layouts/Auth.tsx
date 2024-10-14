import { AUTHORIZATION } from "#/src/constants/StorageConstants";
import {
  AuthorizationDeviceProfile,
  useCreateGuestProfileMutation,
  useRefreshDeviceManagerLazyQuery,
} from "#/graphql/generated";
import { AuthorizationReactiveVar } from "#/reactive";
import { AuthorizationDecoded } from "#/src/util/hooks/auth/useCheckLocalStorageForAuthorizationToken";
import {
  secureStorageItemDelete,
  secureStorageItemRead,
} from "#/src/util/hooks/local/useSecureStorage";
import { useCallback, useEffect } from "react";

export default function Auth({ children }) {
  const [
    refreshDeviceManagerQuery,
    { data: RDMData, loading: RDMLoading, error: RDMError },
  ] = useRefreshDeviceManagerLazyQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (
        data.refreshDeviceManager?.__typename === "AuthorizationDeviceProfile"
      ) {
        const deviceProfile =
          data.refreshDeviceManager as AuthorizationDeviceProfile;

        AuthorizationReactiveVar(deviceProfile);
      }
      if (data.refreshDeviceManager?.__typename === "Error") {
      }
    },
    onError: (e) => {
      AuthorizationReactiveVar(null);
      createGuestProfileMutation();
      // console.log("🚀 ~ Auth REFRESH DEVICE MANAGER~ e:", e);
    },
  });

  const [
    createGuestProfileMutation,
    { data, loading: CGLoading, error: CGPMError },
  ] = useCreateGuestProfileMutation({
    onCompleted: async (data) => {
      console.log("🚀 ~ onCompleted: ~ data:", data);
      if (
        data?.createGuestProfile?.__typename === "AuthorizationDeviceProfile"
      ) {
        const deviceProfile =
          data.createGuestProfile as AuthorizationDeviceProfile;
        if (deviceProfile) {
          AuthorizationReactiveVar(deviceProfile);
        }
      }
    },
    onError: (e) => {
      console.log("🚀 ~ Auth ~ e CREATE GUEST:", e.name);
    },
  });

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
    })) as AuthorizationDecoded;

    if (!getAuthorization) {
      createGuestProfileMutation();
    } else {
      refreshDeviceManagerQuery();
    }
  }, []);

  useEffect(() => {
    applicationAuthorization();
  }, []);

  if (RDMLoading || CGLoading) {
    return null;
  }

  return <>{children}</>;
}

import {
	setActiveProfileInActive,
	authorizationGetToken,
	createAuthorizationTokenWithActiveProfile,
	authorizationParseToken,
} from './useAuthorizationToken'
import { AUTHORIZATION } from '@constants/StorageConstants'
import { ProfileTokenType, Maybe, ReturnProfileAuthentication } from '@ctypes/app'
import { secureStorageItemCreate } from '@util/hooks/local/useSecureStorage'

/**
 * @name switchLogoutProfile
 * @description Use this function to logout of accounts or to switch to a new one. If no Auhtorization this will create one with values passed
 *
 * @param ProfileTokenType
 *
 */

export interface AuthorizationInterface {
	profile?: ProfileTokenType
	logout?: boolean
}

const switchLogoutProfile = async (
	props: AuthorizationInterface,
): Promise<ReturnProfileAuthentication> => {
	if (props.logout) {
		const { success } = await setActiveProfileInActive()
		return {
			success,
		}
	}

	const isAuthorizationToken = await authorizationGetToken()

	if (!isAuthorizationToken && props.profile) {
		const { success: createAuthorizationTokenSuccess } =
			await createAuthorizationTokenWithActiveProfile({ ...props.profile })
		return {
			success: createAuthorizationTokenSuccess,
		}
	}
	const { data: AuthorizedCredentials, activeprofile } = await authorizationParseToken()

	if (!AuthorizedCredentials) {
		return {
			success: false,
		}
	}

	if (!AuthorizedCredentials.profiles) {
		return {
			success: false,
		}
	}

	if (activeprofile && activeprofile.username !== props.profile.username) {
		Object.assign(activeprofile, {
			...activeprofile,
			isActive: false,
		})

		AuthorizedCredentials.profiles[AuthorizedCredentials.profiles.find(profile => profile.isActive)] =
			activeprofile
	}

	const findPropsProfile: Maybe<ProfileTokenType> | undefined = AuthorizedCredentials.profiles.find(
		(profile: ProfileTokenType | null) => profile?.username === props.profile.username,
	)

	if (!findPropsProfile) {
		AuthorizedCredentials.profiles?.unshift({ ...props.profile, isActive: true })

		await secureStorageItemCreate({
			key: AUTHORIZATION,
			value: JSON.stringify(AuthorizedCredentials),
		})

		return {
			success: true,
		}
	}

	const findPropsProfileIndex: number = AuthorizedCredentials.profiles.findIndex(
		(profile: ProfileTokenType | null) => profile?.username === props.profile.username,
	)
	AuthorizedCredentials.profiles.splice(findPropsProfileIndex, 1)

	Object.assign(findPropsProfile, {
		...props.profile,
		isActive: true,
	})

	AuthorizedCredentials.profiles.unshift(findPropsProfile)

	await secureStorageItemCreate({
		key: AUTHORIZATION,
		value: JSON.stringify(AuthorizedCredentials),
	})

	return {
		success: true,
	}
}

export default switchLogoutProfile

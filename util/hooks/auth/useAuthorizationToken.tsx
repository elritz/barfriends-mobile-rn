import { AUTHORIZATION } from '@constants/StorageConstants'
import {
	AuthorizationToken,
	AuthorizedCredentialType,
	Maybe,
	ProfileTokenType,
	ReturnParseTokenAuthorization,
	ReturnProfileAuthentication,
} from '@ctypes/app'
import {
	secureStorageItemCreate,
	secureStorageItemDelete,
	secureStorageItemRead,
} from '@util/hooks/local/useSecureStorage'

/**
 * ✅
 * @name createAuthorizationTokenWithActiveProfile
 * @description This function will create a token for AUTHORIZATION. Be sure there is no token.......
 *
 */
const createAuthorizationTokenWithActiveProfile = async (
	props: ProfileTokenType,
): Promise<ReturnProfileAuthentication> => {
	const newAuthorizedCredentials: AuthorizedCredentialType = {
		profiles: [
			{
				...props,
				isActive: true,
			},
		],
	}

	await secureStorageItemCreate({
		key: AUTHORIZATION,
		value: JSON.stringify(newAuthorizedCredentials),
	})
	return {
		success: true,
	}
}

/**
 *✅
 * @name authorizationDeleteToken
 * @description This function will remove the AUTHORIZATION token.
 *
 */
const authorizationDeleteToken = async (): Promise<void> =>
	secureStorageItemDelete({ key: AUTHORIZATION })

/**
 * ✅
 * @name authorizationGetToken
 * @description This function checks secure storage for a token.
 *
 * @returns Boolean
 *
 */
const authorizationGetToken = async (): Promise<boolean> => {
	const authorizedCredentials = await secureStorageItemRead({
		key: AUTHORIZATION,
	})
	if (!authorizedCredentials) {
		return false
	}
	return true
}

/**
 * ✅
 * @name authorizationParseToken
 * @description This function accesses expo secure storage using the hook secureStorageItemRead for the
 * Authorized Profiles token. These profiles have been logged into on this device
 *
 * @returns ReturnParseTokenAuthorization
 *
 */
const authorizationParseToken = async (): Promise<ReturnParseTokenAuthorization> => {
	const authorizedCredentials = await secureStorageItemRead({
		key: AUTHORIZATION,
	})

	if (!authorizedCredentials) {
		return {
			data: null,
			activeprofile: null,
			error: 'NO_TOKEN',
		}
	}

	const AuthorizedCredentials: AuthorizationToken | null = JSON.parse(String(authorizedCredentials))

	if (!AuthorizedCredentials?.profiles) {
		return {
			data: null,
			activeprofile: null,
			error: 'YES_TOKEN_NO_PROFILES',
		}
	}

	const activeProfile: Maybe<ProfileTokenType> | undefined = AuthorizedCredentials.profiles.find(
		(profile: ProfileTokenType | null) => profile?.isActive,
	)
	return {
		data: AuthorizedCredentials,
		activeprofile: activeProfile || null,
		error: null,
	}
}

/**
 * ✅
 * @name setActiveProfileInActive
 * @description This function will set the active profile inactive. Be sure there is a token....
 *
 */
const setActiveProfileInActive = async (): Promise<ReturnProfileAuthentication> => {
	const { data: AuthorizedCredentials, activeprofile } = await authorizationParseToken()

	if (!activeprofile) {
		return {
			success: true,
		}
	}

	Object.assign(activeprofile, {
		...activeprofile,
		isActive: false,
	})

	if (AuthorizedCredentials && AuthorizedCredentials.profiles) {
		AuthorizedCredentials.profiles[AuthorizedCredentials.profiles.find(profile => profile.isActive)] =
			activeprofile
	}

	await secureStorageItemCreate({
		key: AUTHORIZATION,
		value: JSON.stringify(AuthorizedCredentials),
	})

	return {
		success: true,
	}
}

export interface ProfileAuthorizationInterface {
	profile?: ProfileTokenType
}

type ReturnProfileInAuthorizationToken = {
	success: boolean
	Profile: Maybe<ProfileTokenType> | undefined
}

const profileInAuthorizationToken = async (
	props: ProfileAuthorizationInterface,
): Promise<ReturnProfileInAuthorizationToken> => {
	const { data: authorizedCredentials } = await authorizationParseToken()

	if (!authorizedCredentials || !authorizedCredentials.profiles) {
		return {
			success: false,
			Profile: null,
		}
	}

	const findPropsProfile: Maybe<ProfileTokenType> | undefined = authorizedCredentials.profiles.find(
		(profile: ProfileTokenType | null) => profile?.username === props.profile?.username,
	)

	if (!findPropsProfile) {
		return {
			success: false,
			Profile: null,
		}
	}

	return {
		success: true,
		Profile: findPropsProfile,
	}
}

export {
	createAuthorizationTokenWithActiveProfile,
	authorizationDeleteToken,
	authorizationGetToken,
	authorizationParseToken,
	setActiveProfileInActive,
	profileInAuthorizationToken,
}

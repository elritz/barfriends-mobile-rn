//TODO: Add notfication listener
import { ApolloProvider } from '@apollo/client'
import { defaulttheme } from '@assets/theme/default'
import Theme from '@components/layouts/Theme'
import { NowPreferencePermissionInitialState } from '@constants/Preferences'
import {
	LOCAL_STORAGE_SEARCH_AREA,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
	LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
} from '@constants/StorageConstants'
import { Config, config } from '../gluestack-ui.config'
import {
	LocalStoragePreferenceSearchAreaType,
	LocalStoragePreferenceThemeType,
	LocalStoragePreferenceAskNotificationPermissionType,
	LocalStoragePreferenceAskBackgroundLocationPermissionType,
	LocalStoragePreferenceSystemsOfUnitsType,
} from '@ctypes/preferences'
import profilingclient from '@library/apollo/profiling/profiling-apollo-server'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	SearchAreaReactiveVar,
	searchAreaInitialState,
	ThemeReactiveVar,
	PreferencePermissionNotificationReactiveVar,
	PreferenceBackgroundLocationPermissionReactiveVar,
	PreferenceForegroundLocationPermissionReactiveVar,
	PreferenceSystemsOfUnitsInitialState,
	PreferenceSystemsOfUnitsReactiveVar,
	PermissionContactsReactiveVar,
	PermissionCameraReactiveVar,
	PermissionMicrophoneReactiveVar,
	PermissionForegroundLocationReactiveVar,
	PermissionBackgroundLocationReactiveVar,
	PermissionMediaReactiveVar,
	PermissionNotificationReactiveVar,
} from '@reactive'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { Camera } from 'expo-camera'
import * as Contacts from 'expo-contacts'
import 'expo-dev-client'
import { getForegroundPermissionsAsync, getBackgroundPermissionsAsync } from 'expo-location'
import { getPermissionsAsync as getMediaPermissionAsync } from 'expo-media-library'
import { getPermissionsAsync as getNotificiationPermissionAsync } from 'expo-notifications'
import { Slot, SplashScreen } from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect } from 'react'
import { Appearance } from 'react-native'
import 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(app)/hometab/venuefeed',
}

SplashScreen.preventAutoHideAsync()

export default function Root() {
	async function changeScreenOrientation() {
		await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
	}

	const setAsyncPreferencesLocalStorageData = async () => {
		try {
			// await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
			// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS)
			// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS)
			// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION)
			// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION)

			// SEARCHAREA_PREFERENCE ~ START
			const getLocalStorageSearchArea = await AsyncStorage.getItem(LOCAL_STORAGE_SEARCH_AREA)

			if (getLocalStorageSearchArea !== null) {
				const values: LocalStoragePreferenceSearchAreaType = JSON.parse(getLocalStorageSearchArea)
				if (values && values.useCurrentLocation) {
					await useSetSearchAreaWithLocation()
				} else {
					SearchAreaReactiveVar({
						...values,
					})
				}
			} else {
				const newSearchAreaValue = JSON.stringify({
					...searchAreaInitialState,
				} as LocalStoragePreferenceSearchAreaType)

				await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchAreaValue)
			}
			// SEARCHARE_PREFERENCE ~ END

			// THEME_PREFERENCE ~ START
			const getLocalStorageTheme = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
			)

			if (!getLocalStorageTheme) {
				const initialThemeColorSchemeState = JSON.stringify({
					colorScheme: 'system',
				} as LocalStoragePreferenceThemeType)

				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
					initialThemeColorSchemeState,
				)

				ThemeReactiveVar({
					theme:ThemeReactiveVar().theme,
					localStorageColorScheme: 'system',
					deviceColorScheme: Appearance.getColorScheme(),
					colorScheme: Appearance.getColorScheme(),
				})
			} else {
				const localStorageTheme: LocalStoragePreferenceThemeType = JSON.parse(getLocalStorageTheme)

				ThemeReactiveVar({
					theme: ThemeReactiveVar().theme,
					localStorageColorScheme: localStorageTheme.colorScheme,
					deviceColorScheme:
						localStorageTheme.colorScheme === 'system'
							? Appearance.getColorScheme()
							: localStorageTheme.colorScheme,
					colorScheme:
						localStorageTheme.colorScheme === 'system'
							? Appearance.getColorScheme()
							: localStorageTheme.colorScheme,
				})
			}
			// THEME_PREFERENCE ~ END

			// NOTIFICATION_PREFERENCE ~ START
			const getLocalStorageNotificationPermissionsPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
			)

			if (!getLocalStorageNotificationPermissionsPreference) {
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
					JSON.stringify(NowPreferencePermissionInitialState),
				)
			} else {
				// using local_storage values set the correct information
				const values: LocalStoragePreferenceAskNotificationPermissionType = JSON.parse(
					getLocalStorageNotificationPermissionsPreference,
				)
				PreferencePermissionNotificationReactiveVar({
					...values,
				})
			}
			// NOTIFICATION_PREFERENCE ~ END

			// BACKGROUNDLOCATION_PREFERENCE ~ START
			const getLocalStoragePreferenceBackgroundLocationPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
			)

			if (!getLocalStoragePreferenceBackgroundLocationPreference) {
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
					JSON.stringify(NowPreferencePermissionInitialState),
				)
			} else {
				// using local_storage values set the correct information
				const values: LocalStoragePreferenceAskBackgroundLocationPermissionType = JSON.parse(
					getLocalStoragePreferenceBackgroundLocationPreference,
				)

				PreferenceBackgroundLocationPermissionReactiveVar({
					...values,
				})
			}
			// BACKGROUNDLOCATION_PREFERENCE ~ END

			// FOREGROUNDLOCATION_PREFERENCE ~ START
			const getLocalStoragePreferenceForegroundLocationPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
			)

			if (!getLocalStoragePreferenceForegroundLocationPreference) {
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
					JSON.stringify(NowPreferencePermissionInitialState),
				)
			} else {
				const values: LocalStoragePreferenceAskBackgroundLocationPermissionType = JSON.parse(
					getLocalStoragePreferenceForegroundLocationPreference,
				)

				PreferenceForegroundLocationPermissionReactiveVar({
					...values,
				})
			}
			// FOREGROUNDLOCATION_PREFERENCE ~ END

			// SYSTEM_OF_UNITS_PREFERENCE ~ START
			const getLocalStorageSystemOfUnitsPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
			)

			if (!getLocalStorageSystemOfUnitsPreference) {
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
					JSON.stringify(PreferenceSystemsOfUnitsInitialState),
				)
			} else {
				const values: LocalStoragePreferenceSystemsOfUnitsType = JSON.parse(
					getLocalStorageSystemOfUnitsPreference,
				)

				PreferenceSystemsOfUnitsReactiveVar({
					...values,
				})
			}
			// BACKGROUNDLOCATION_PREFERENCE ~ START ~ END
		} catch (e) {}
	}

	const setPermissions = async () => {
		const contactsPermission = await Contacts.getPermissionsAsync()
		const cameraPermission = await Camera.getCameraPermissionsAsync()
		const microphonePermission = await Camera.getMicrophonePermissionsAsync()
		const foregroundLocationPermission = await getForegroundPermissionsAsync()
		const backgroundLocationPermission = await getBackgroundPermissionsAsync()
		const mediaLibraryPermission = await getMediaPermissionAsync()
		const notificationPermission = await getNotificiationPermissionAsync()

		PermissionContactsReactiveVar(contactsPermission)
		PermissionCameraReactiveVar(cameraPermission)
		PermissionMicrophoneReactiveVar(microphonePermission)
		PermissionForegroundLocationReactiveVar(foregroundLocationPermission)
		PermissionBackgroundLocationReactiveVar(backgroundLocationPermission)
		PermissionMediaReactiveVar(mediaLibraryPermission)
		PermissionNotificationReactiveVar(notificationPermission)
	}

	useEffect(() => {
		changeScreenOrientation()
		setAsyncPreferencesLocalStorageData()
		setPermissions()
	}, [])

	return (
		<ApolloProvider client={profilingclient}>
				<SafeAreaProvider>
					<KeyboardProvider statusBarTranslucent>
						<Theme>
							<Slot initialRouteName='(app)/hometab/venuefeed' />
						</Theme>
					</KeyboardProvider>
				</SafeAreaProvider>
		</ApolloProvider>
	)
}

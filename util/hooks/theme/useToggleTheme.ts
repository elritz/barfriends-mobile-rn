import createTheme from './createTheme'
import { LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME } from '@constants/StorageConstants'
import { ThemeColorSchemeOptionsType } from '@ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback } from 'react'
import { Appearance } from 'react-native'

type Props = {
	colorScheme?: ThemeColorSchemeOptionsType
}

export const useToggleTheme = () => {
	const toggleColorScheme = useCallback(async (props: Props) => {
		const localStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
		)
		const valueLocalStorageColorScheme = JSON.parse(String(localStorageColorScheme))

		// check if we need to update local storage with new ColorScheme value
		if (props.colorScheme !== valueLocalStorageColorScheme.colorScheme) {
			const initialThemeColorSchemeState = JSON.stringify({
				colorScheme: props.colorScheme,
			})

			console.log(
				'🚀 ~ file: useToggleTheme.ts:26 ~ toggleColorScheme ~ initialThemeColorSchemeState:',
				initialThemeColorSchemeState,
			)

			await AsyncStorage.setItem(
				LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
				initialThemeColorSchemeState,
			)
		}
		console.log(
			'🚀 ~ file: useToggleTheme.ts:37 ~ toggleColorScheme ~ props.colorScheme:',
			props.colorScheme,
		)

		switch (props.colorScheme) {
			case 'system':
				const deviceColorScheme = Appearance.getColorScheme()
				createTheme({
					themeScheme: deviceColorScheme,
					localStorageColorScheme: 'system',
				})
				break
			case 'light':
				createTheme({ themeScheme: 'light', localStorageColorScheme: 'light' })
				break

			case 'dark':
				createTheme({ themeScheme: 'dark', localStorageColorScheme: 'dark' })
				break
			default:
				createTheme({ themeScheme: 'dark', localStorageColorScheme: 'dark' })
		}
	}, [])

	const switchTheme = useCallback(async (props: Props) => {
		const localStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
		)
		const valueLocalStorageColorScheme = JSON.parse(String(localStorageColorScheme))

		// check if we need to update local storage with new ColorScheme value
		if (props.colorScheme !== valueLocalStorageColorScheme.colorScheme) {
			const initialThemeColorSchemeState = JSON.stringify({
				colorScheme: props.colorScheme,
			})

			await AsyncStorage.setItem(
				LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
				initialThemeColorSchemeState,
			)
		}

		switch (props.colorScheme) {
			case 'system':
				const deviceColorScheme = Appearance.getColorScheme()
				createTheme({
					themeScheme: deviceColorScheme,
					localStorageColorScheme: 'system',
				})
				break
			case 'light':
				createTheme({ themeScheme: 'light', localStorageColorScheme: 'light' })
				break

			case 'dark':
				createTheme({ themeScheme: 'dark', localStorageColorScheme: 'dark' })
				break
			default:
				createTheme({ themeScheme: 'dark', localStorageColorScheme: 'dark' })
		}
	}, [])

	return [switchTheme, toggleColorScheme]
}

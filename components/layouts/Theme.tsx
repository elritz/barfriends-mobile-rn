import { useReactiveVar } from '@apollo/client'
import AnimatedSplashScreen from '@components/screens/splash/AnimatedSplashScreen'
import { LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME } from '@constants/StorageConstants'
import { LocalStoragePreferenceThemeType } from '@ctypes/preferences'
import { StyledProvider } from '@gluestack-style/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider as ReactNavigationThemeProvider } from '@react-navigation/native'
import { ThemeReactiveVar } from '@reactive'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { useEffect, useRef } from 'react'
import { AppState, Appearance, StatusBar } from 'react-native'

export default function Theme({ children }) {
	const appState = useRef(AppState.currentState)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()

	const setTheme = async () => {
		const localStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
		)
		const valueLocalStorageColorScheme: LocalStoragePreferenceThemeType = JSON.parse(
			String(localStorageColorScheme),
		)

		await toggleThemes({ colorScheme: valueLocalStorageColorScheme.colorScheme })
	}

	useEffect(() => {
		if (!rThemeVar.theme) {
			setTheme()
		}
	}, [rThemeVar])

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
				setTheme()
			}
			if (rThemeVar.localStorageColorScheme === 'system') {
				const currentDeviceAppearance = Appearance.getColorScheme()
				if (currentDeviceAppearance !== rThemeVar.colorScheme) {
					setTheme()
				}
			}
			/// beef yaki noodles
			/// 40 guiza

			appState.current = nextAppState
		})

		return () => {
			subscription.remove()
		}
	}, [])

	return (
		<AnimatedSplashScreen>
			<ReactNavigationThemeProvider value={rThemeVar.theme.reactnavigation}>
				<StyledProvider
					config={rThemeVar.theme.gluestack}
					colorMode={rThemeVar.colorScheme === 'light' ? 'light' : 'dark'}
				>
					<StatusBar
						animated
						barStyle={rThemeVar.colorScheme === 'light' ? 'dark-content' : 'light-content'}
					/>
					{children}
				</StyledProvider>
			</ReactNavigationThemeProvider>
		</AnimatedSplashScreen>
	)
}

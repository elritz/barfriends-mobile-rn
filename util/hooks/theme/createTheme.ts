import { defaulttheme } from '@assets/theme/default'
import { ThemeColorSchemeOptionsType } from '@ctypes/preferences'
import { createConfig, config as defaultConfig } from '@gluestack-ui/themed'
import { DefaultTheme } from '@react-navigation/native'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { Appearance, ColorSchemeName } from 'react-native'

type Props = {
	themeScheme: ColorSchemeName
	localStorageColorScheme: ThemeColorSchemeOptionsType
}

const createTheme = ({ themeScheme, localStorageColorScheme }: Props) => {
	const deviceColorScheme = Appearance.getColorScheme()
	console.log(
		'AuthorizationReactiveVar()?.Profile?.ThemeManager?.ProfileTheme[0].Theme.theme :>> ',
		AuthorizationReactiveVar()?.Profile?.ThemeManager?.ProfileTheme[0].Theme.theme,
	)
	const theme =
		AuthorizationReactiveVar()?.Profile?.ThemeManager?.ProfileTheme[0].Theme.theme || defaulttheme

	const rnColors = () => {
		const rn = themeScheme === 'dark' ? theme.reactnavigation.dark : theme.reactnavigation.light
		return rn
	}

	// console.log('theme.gluestack', JSON.stringify(theme, null, 2))

	const config = createConfig({
		...defaultConfig.theme,
		tokens: {
			...defaultConfig.theme.tokens,
			colors: {
				...defaultConfig.theme.tokens.colors,
				...theme.gluestack,
			},
		},
		components: {
			Box: {
				theme: {
					rounded: '$md',
					_dark: {
						backgroundColor: '$light800',
					},
					_light: {
						backgroundColor: '$light50',
					},
				},
			},
		},
	})

	const _newtheme = {
		reactnavigation: rnColors(),
		gluestack: config,
	}

	const colorScheme = () => {
		if (localStorageColorScheme === 'system') {
			return deviceColorScheme
		}
		return localStorageColorScheme
	}

	ThemeReactiveVar({
		localStorageColorScheme: localStorageColorScheme,
		deviceColorScheme: deviceColorScheme,
		colorScheme: colorScheme(),
		theme: _newtheme,
	})
}

export default createTheme

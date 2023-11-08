import { defaulttheme } from '@assets/theme/default'
import { ThemeColorSchemeOptionsType } from '@ctypes/preferences'
import { createConfig, config as defaultConfig } from '@gluestack-ui/themed'
import { DefaultTheme, Theme } from '@react-navigation/native'
import { AuthorizationReactiveVar, IBFSTheme, ThemeReactiveVar } from '@reactive'
import { Appearance, ColorSchemeName } from 'react-native'

type Props = {
	colorScheme: ColorSchemeName
	localStorageColorScheme: ThemeColorSchemeOptionsType
}

const createTheme = ({ colorScheme, localStorageColorScheme }: Props) => {
	const deviceColorScheme = Appearance.getColorScheme()
	const theme: typeof defaulttheme =
		AuthorizationReactiveVar()?.Profile?.ThemeManager?.ProfileTheme[0].Theme.theme || defaulttheme

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

	const rnColors = () => {
		const rn = colorScheme === 'dark' ? theme.reactnavigation.dark : theme.reactnavigation.light
		return rn
	}

	const _newtheme: IBFSTheme = {
		// reactnavigation: {
		// 	dark: colorScheme === 'light' ? false : true,
		// 	colors:
		// 		colorScheme === 'dark' ? theme.reactnavigation.dark.colors : theme.reactnavigation.light.colors,
		// },
		reactnavigation: {
			...DefaultTheme,
			dark: colorScheme === 'light' ? false : true,
			colors: {
				...DefaultTheme.colors,
				...rnColors(),
			},
		},
		gluestack: config,
	}

	console.log('🚀 ~ file: createTheme.ts:51 ~ createTheme ~ _newtheme:', _newtheme)

	ThemeReactiveVar({
		localStorageColorScheme: localStorageColorScheme,
		deviceColorScheme: deviceColorScheme,
		colorScheme: colorScheme === 'light' ? 'light' : 'dark',
		theme: _newtheme,
	})
}

export default createTheme

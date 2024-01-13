import { defaulttheme } from '@assets/theme/default'
import { ThemeColorSchemeOptionsType } from '@ctypes/preferences'
import { createConfig } from '@gluestack-ui/themed'
import { config as defaultConfig } from '@gluestack-ui/config'
import { DefaultTheme } from '@react-navigation/native'
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
		...defaultConfig,
		tokens: {
			...defaultConfig.tokens,
			colors: {
				...defaultConfig.tokens.colors,
				...theme.gluestack,
			},
		},
		components: {
			...defaultConfig.components,
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
	} as const)

	const rnColors = () => {
		const rn = colorScheme === 'dark' ? theme.reactnavigation.dark : theme.reactnavigation.light
		return rn
	}
	const _newtheme: IBFSTheme = {
		reactnavigation: {
			...rnColors(),
		},
		gluestack: config,
	}
	
	ThemeReactiveVar({
		localStorageColorScheme: localStorageColorScheme,
		deviceColorScheme: deviceColorScheme,
		colorScheme: colorScheme === 'light' ? 'light' : 'dark',
		theme: _newtheme,
	})
}

export default createTheme

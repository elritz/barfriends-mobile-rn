import { ThemeObject } from '../../../assets/theme/default'
import { defaulttheme } from '#/assets/theme/default'
import { ThemeColorSchemeOptionsType } from '#/types/preferences'
import { createConfig } from '@gluestack-ui/themed'
import { config as defaultConfig } from '@gluestack-ui/config'
import { AuthorizationReactiveVar, IBFSTheme, ThemeReactiveVar } from '#/reactive'
import { Appearance, ColorSchemeName } from 'react-native'

type Props = {
	colorScheme: ColorSchemeName
	localStorageColorScheme: ThemeColorSchemeOptionsType
}

const createTheme = ({ colorScheme, localStorageColorScheme }: Props) => {
	const deviceColorScheme = Appearance.getColorScheme()
	// const theme: ThemeObject =
	// 	AuthorizationReactiveVar()?.Profile?.ThemeManager?.ProfileTheme[0].Theme.theme || defaulttheme
	const theme: ThemeObject = defaulttheme

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

	const _newtheme: IBFSTheme = {
		gluestack: config,
		reactnavigation: {
			dark: colorScheme === 'light' ? false : true,
			colors: colorScheme === 'dark' ? theme.reactnavigation.dark : theme.reactnavigation.light,
		},
	}
	ThemeReactiveVar({
		localStorageColorScheme: localStorageColorScheme,
		deviceColorScheme: deviceColorScheme,
		colorScheme: colorScheme === 'light' ? 'light' : 'dark',
		theme: _newtheme,
	})
}

export default createTheme

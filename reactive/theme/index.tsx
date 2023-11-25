import { makeVar } from '@apollo/client'
import { defaulttheme } from '@assets/theme/default'
// import { config } from '@gluestack-ui/config'
import { ThemeColorSchemeOptionsType } from '@ctypes/preferences'
import { Theme } from '@react-navigation/native'
import { Appearance, ColorSchemeName } from 'react-native'
import { config } from '../../gluestack-ui.config'

export type IBFSTheme = {
	reactnavigation: Theme
	// gluestack: typeof config
	gluestack: typeof config
	// restyle: BaseTheme
}

export interface ThemeInterface {
	localStorageColorScheme: ThemeColorSchemeOptionsType
	colorScheme: ColorSchemeName
	deviceColorScheme: ColorSchemeName
	theme: IBFSTheme
}

export const ThemeEmptyState: ThemeInterface = {
	localStorageColorScheme: 'system',
	deviceColorScheme: Appearance.getColorScheme(),
	colorScheme: Appearance.getColorScheme(),
	theme: {
		reactnavigation:
			Appearance.getColorScheme() === 'light'
				? defaulttheme.reactnavigation.light
				: defaulttheme.reactnavigation.dark,
		gluestack: config,
	},
}

export const ThemeReactiveVar = makeVar<ThemeInterface>(ThemeEmptyState)

import { Config, config } from '../../gluestack-ui.config'
import { makeVar } from '@apollo/client'
import { defaulttheme } from '@assets/theme/default'
import { ThemeColorSchemeOptionsType } from '@ctypes/preferences'
import { Theme } from '@react-navigation/native'
import { Appearance, ColorSchemeName } from 'react-native'

export type IBFSTheme = {
	reactnavigation: Theme
	gluestack: Config
}

export interface ThemeInterface {
	localStorageColorScheme: ThemeColorSchemeOptionsType
	colorScheme: ColorSchemeName
	deviceColorScheme: ColorSchemeName
	theme: IBFSTheme
}

export const ThemeEmptyState: ThemeInterface = {
	localStorageColorScheme: 'system',
	deviceColorScheme: 'dark',
	colorScheme: 'dark',
	theme: {
		reactnavigation:
			Appearance.getColorScheme() === 'light'
				? defaulttheme.reactnavigation.light
				: defaulttheme.reactnavigation.dark,
		gluestack: config.theme,
	},
}

export const ThemeReactiveVar = makeVar<ThemeInterface>(ThemeEmptyState)

import { Config, config } from '../../../gluestack-ui.config'
import { defaulttheme } from '@assets/theme/default'
import restyle from '@assets/theme/default/restyle'
import { ThemeColorSchemeOptionsType } from '@ctypes/preferences'
import { createConfig } from '@gluestack-ui/themed'
import { DefaultTheme } from '@react-navigation/native'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { createTheme as restyleCreateTheme } from '@shopify/restyle'
import { Appearance, ColorSchemeName } from 'react-native'

type Props = {
	themeScheme: ColorSchemeName
	localStorageColorScheme: ThemeColorSchemeOptionsType
}

const createTheme = ({ themeScheme, localStorageColorScheme }: Props) => {
	const deviceColorScheme = Appearance.getColorScheme()
	const theme =
		AuthorizationReactiveVar()?.Profile?.ThemeManager?.ProfileTheme[0].Theme.theme || defaulttheme

	const rnColors = () => {
		const rn = themeScheme === 'dark' ? theme.reactnavigation.dark : theme.reactnavigation.light
		return rn
	}

	// const restyletheme = restyleCreateTheme(restyle)

	const _newtheme = {
		reactnavigation: {
			...DefaultTheme,
			dark: themeScheme === 'light' ? false : true,
			colors: {
				...DefaultTheme.colors,
				...rnColors(),
			},
		},
		gluestack: config,
		// restyle: restyletheme,
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

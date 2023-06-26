import { darktheme, lighttheme } from '@assets/theme/default'
import { Config, config } from '@assets/theme/default/gluestack-ui.config'
import { DefaultTheme } from '@react-navigation/native'
import { AuthorizationReactiveVar, IBFSTheme } from '@reactive'
import { extendTheme } from 'native-base'
import { ColorSchemeName } from 'react-native'

type Props = {
	themeScheme: ColorSchemeName
}

const createTheme = ({ themeScheme }: Props): IBFSTheme => {
	const theme =
		AuthorizationReactiveVar()?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme[0].Theme.mobile[0]

	const rnColors = () => {
		const rn = themeScheme === 'dark' ? theme.dark.rn.colors : theme.light.rn.colors
		return rn
	}

	const createNewNativeBaseTheme = () => {
		const NativeBaseTheme = extendTheme({
			colors: themeScheme === 'dark' ? theme.dark.nativebase.colors : theme.light.nativebase.colors,
			config: {
				useSystemColorMode: themeScheme !== 'dark' && themeScheme !== 'light' ? true : false,
				initialColorMode: themeScheme,
			},
		})

		return NativeBaseTheme
	}

	const createGlueStackTheme: Config = {
		...config,
		aliases: {
			...config.theme.aliases,
		},
		tokens: {
			...config.theme.tokens,
			colors: {
				...config.theme.tokens.colors,
				...darktheme.gluestack.colors,
			},
		},
	}

	return {
		rn: {
			...DefaultTheme,
			dark: themeScheme === 'dark' ? true : false,
			colors: {
				...DefaultTheme.colors,
				...rnColors(),
			},
		},
		gluestack: createGlueStackTheme,
		nb: { ...createNewNativeBaseTheme() },
	}
}

export default createTheme

import { darkCompanyColors, lightCompanyColors } from '@assets/theme/default/companycolors'
import gluestack from '@assets/theme/default/gluestack'
import {
	DarkReactNavigationTheme,
	LightReactNavigationTheme,
} from '@assets/theme/default/reactnavigation'
// import restyle from '@assets/theme/default/restyle'

export const defaulttheme = {
	revel: {
		light: lightCompanyColors,
		dark: darkCompanyColors,
	},
	gluestack,
	reactnavigation: {
		light: LightReactNavigationTheme,
		dark: DarkReactNavigationTheme,
	},
	// restyle,
} as const

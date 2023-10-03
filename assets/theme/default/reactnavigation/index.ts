import { darkCompanyColors, lightCompanyColors } from '../companycolors'
import { DarkStyledTheme, LightStyledTheme } from '../styled'
import { Theme } from '@react-navigation/native'

export const LightReactNavigationTheme: Theme = {
	dark: false,
	colors: {
		background: LightStyledTheme.palette.primary.background,
		primary: lightCompanyColors.primary,
		card: LightStyledTheme.palette.secondary.background,
		text: LightStyledTheme.palette.primary.color,
		border: LightStyledTheme.palette.primary.color,
		notification: lightCompanyColors.tertiary,
	},
} as const

export const DarkReactNavigationTheme: Theme = {
	dark: true,
	colors: {
		background: DarkStyledTheme.palette.primary.background,
		primary: darkCompanyColors.primary,
		card: DarkStyledTheme.palette.secondary.background,
		text: DarkStyledTheme.palette.primary.color,
		border: DarkStyledTheme.palette.primary.color,
		notification: darkCompanyColors.tertiary,
	},
} as const

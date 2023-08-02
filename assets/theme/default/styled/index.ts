import { darkCompanyColors, lightCompanyColors } from '../colors'
import * as colors from '@assets/theme/colors'
import { bfsCompanyColors } from '@assets/theme/default/revel'

export const LightStyledTheme = {
	theme: 'light',
	palette: {
		bfscompany: {
			...bfsCompanyColors,
		},
		company: {
			...lightCompanyColors,
		},
		background: {
			paper: colors.grey[50],
		},
		primary: {
			background: colors.grey[200],
			color: colors.grey[700],
		},
		secondary: {
			background: colors.grey[300],
			color: colors.grey[600],
		},
		tertiary: {
			background: colors.grey[300],
			color: colors.grey[600],
		},
	},
} as const

export const DarkStyledTheme = {
	theme: 'dark',
	palette: {
		bfscompany: {
			...bfsCompanyColors,
		},
		company: {
			...darkCompanyColors,
		},
		background: {
			paper: colors.grey[900],
		},
		primary: {
			background: colors.grey[900],
			color: colors.grey[300],
		},
		secondary: {
			background: colors.grey[800],
			color: colors.grey[300],
		},
		tertiary: {
			background: colors.grey[300],
			color: colors.grey[800],
		},
	},
} as const

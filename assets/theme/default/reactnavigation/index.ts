import {CustomReactNavigationThemeColors} from '..'
import {darkCompanyColors, lightCompanyColors} from '../companycolors'
import {DarkStyledTheme, LightStyledTheme} from '../styled'
// import { Theme } from '@react-navigation/native'

export const LightReactNavigationTheme: CustomReactNavigationThemeColors = {
  background: LightStyledTheme.palette.primary.background,
  primary: lightCompanyColors.primary,
  card: LightStyledTheme.palette.secondary.background,
  text: LightStyledTheme.palette.primary.color,
  border: LightStyledTheme.palette.primary.color,
  notification: lightCompanyColors.tertiary,
  dark: true,
} as const

export const DarkReactNavigationTheme: CustomReactNavigationThemeColors = {
  background: DarkStyledTheme.palette.primary.background,
  primary: darkCompanyColors.primary,
  card: DarkStyledTheme.palette.secondary.background,
  text: DarkStyledTheme.palette.primary.color,
  border: DarkStyledTheme.palette.primary.color,
  notification: darkCompanyColors.tertiary,
  dark: false,
} as const

import {
  darkCompanyColors,
  lightCompanyColors,
} from "#/assets/theme/default/companycolors";
import gluestack from "#/assets/theme/default/gluestack";
import {
  DarkReactNavigationTheme,
  LightReactNavigationTheme,
} from "#/assets/theme/default/reactnavigation";
// import restyle from '#/assets/theme/default/restyle'

export const defaulttheme = {
  barfriends: {
    light: lightCompanyColors,
    dark: darkCompanyColors,
  },
  gluestack,
  reactnavigation: {
    light: LightReactNavigationTheme,
    dark: DarkReactNavigationTheme,
  },
  // restyle,
} as const;

type CustomGluestack = {
  primary0: string;
  primary50: string;
  tertiary0: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  primary950: string;
  secondary0: string;
  tertiary50: string;
  secondary50: string;
  tertiary100: string;
  tertiary200: string;
  tertiary300: string;
  tertiary400: string;
  tertiary500: string;
  tertiary600: string;
  tertiary700: string;
  tertiary800: string;
  tertiary900: string;
  tertiary950: string;
  secondary100: string;
  secondary200: string;
  secondary300: string;
  secondary400: string;
  secondary500: string;
  secondary600: string;
  secondary700: string;
  secondary800: string;
  secondary900: string;
  secondary950: string;
};

export type CustomReactNavigationThemeColors = {
  card: string;
  text: string;
  border: string;
  primary: string;
  background: string;
  notification: string;
  dark: boolean;
};

type CustomReactNavigation = {
  dark: CustomReactNavigationThemeColors;
  light: CustomReactNavigationThemeColors;
};

export type ThemeObject = {
  gluestack: CustomGluestack;
  reactnavigation: CustomReactNavigation;
};

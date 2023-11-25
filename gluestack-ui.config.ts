import { config as defaultConfig } from '@gluestack-ui/config'
import { createConfig } from '@gluestack-ui/themed'

export const config = createConfig({
	...defaultConfig,
	tokens: {
		...defaultConfig.tokens,
		colors: {
			...defaultConfig.tokens.colors,
			// Will keep following colors
			primary0: '#ffefdb',
			primary50: '#ffefdb',
			primary100: '#ffd3ae',
			primary200: '#ffb77e',
			primary300: '#ff9b4c',
			primary400: '#ff7e1a',
			primary500: '#ff7000',
			primary600: '#de6100',
			primary700: '#813700',
			primary800: '#4f2100',
			primary900: '#200800',
			primary950: '#200800',
			secondary0: '#FCFCFC',
			secondary50: '#F5F5F5',
			secondary100: '#E5E5E5',
			secondary200: '#DBDBDB',
			secondary300: '#D4D4D4',
			secondary400: '#8C8C8C',
			secondary500: '#8C8C8C',
			secondary600: '#737373',
			secondary700: '#525252',
			secondary800: '#404040',
			secondary900: '#262626',
			secondary950: '#171717',
			tertiary0: '#def0ff',
			tertiary50: '#def0ff',
			tertiary100: '#afcfff',
			tertiary200: '#7dafff',
			tertiary300: '#4b8fff',
			tertiary400: '#1a6fff',
			tertiary500: '#0056e6',
			tertiary600: '#0043b4',
			tertiary700: '#003082',
			tertiary800: '#001d51',
			tertiary900: '#000a21',
			tertiary950: '#000a21',
		},
	},
	components: {
		Box: {
			theme: {
				rounded: '$md',
				_dark: {
					backgroundColor: '$light900',
				},
				_light: {
					backgroundColor: '$light50',
				},
			},
		},
	},
} as const)

type ConfigType = typeof config
declare module '@gluestack-style/react' {
	interface ICustomConfig extends ConfigType {}
}

// type Config = typeof config
// // type Components = typeof components
// declare module '@gluestack-style/react' {
// 	interface UIConfig extends Config {}
// 	// interface UIConfig extends Components {}
// }

// export type Config = typeof config
// declare module '@gluestack-style/react' {
// 	interface ICustomConfig extends Config {}
// }

// export type Config = typeof config.theme
// declare module '@gluestack-style/react' {
// 	interface ICustomConfig extends Config {}
// }

// type Components = typeof defaultConfig.components
// // Extend the internal styled config
// declare module '@gluestack-ui/themed' {
// 	// interface UIConfig extends ConfigType {}

// 	interface ICustomConfig extends ConfigType {}
// 	interface ICustomComponents extends Components {}
// }

import {Appearance, ColorSchemeName} from 'react-native'
import {config as defaultConfig} from '@gluestack-ui/config'
import {createConfig} from '@gluestack-ui/themed'

import {defaulttheme, ThemeObject} from '#/assets/theme/default'
import {IBFSTheme, ThemeReactiveVar} from '#/reactive'
import {ThemeColorSchemeOptionsType} from '#/types/preferences'

type Props = {
  colorScheme: ColorSchemeName
  localStorageColorScheme: ThemeColorSchemeOptionsType
}

const createTheme = ({colorScheme, localStorageColorScheme}: Props) => {
  const deviceColorScheme = Appearance.getColorScheme()
  const theme: ThemeObject = defaulttheme

  const config = createConfig({
    ...defaultConfig,
    tokens: {
      ...defaultConfig.tokens,
      colors: {
        ...defaultConfig.tokens.colors,
        ...theme.gluestack,
      },
    },
    components: {
      ...defaultConfig.components,
      Box: {
        theme: {
          rounded: '$md',
          _dark: {
            backgroundColor: '$light800',
          },
          _light: {
            backgroundColor: '$light50',
          },
        },
      },
    },
  } as const)

  const _newtheme: IBFSTheme = {
    gluestack: config,
    reactnavigation: {
      dark: colorScheme === 'light' ? false : true,
      colors:
        colorScheme === 'dark'
          ? theme.reactnavigation.dark
          : theme.reactnavigation.light,
    },
  }
  ThemeReactiveVar({
    localStorageColorScheme: localStorageColorScheme,
    deviceColorScheme: deviceColorScheme,
    colorScheme: colorScheme === 'light' ? 'light' : 'dark',
    theme: _newtheme,
  })
}

export default createTheme

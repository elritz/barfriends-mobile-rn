import { ColorSchemeName } from 'react-native'

import { IBFSTheme } from '#/reactive'
import { Colors } from '#/src/constants/Colors'
import { ThemeColorSchemeOptionsType } from '#/types/preferences'
import { config } from '@gluestack-ui/config'

type Props = {
  colorScheme: ColorSchemeName
  localStorageColorScheme: ThemeColorSchemeOptionsType
}

const createTheme = ({colorScheme, localStorageColorScheme}: Props) => {
  const _newtheme: IBFSTheme = {
    reactnavigation: {
      dark: colorScheme === 'light' ? false : true,
      colors: colorScheme === 'dark'
          ? Colors.dark
          : Colors.light
      },
    gluestack: config,
  }
  // ThemeReactiveVar({
  //   mode: localStorageColorScheme,
  //   theme: {
  //     reactnavigation: _newtheme.reactnavigation,
  //     gluestack: _newtheme.gluestack,
  //   }
  // })
}

export default createTheme

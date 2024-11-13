import * as persisted from '#/src/state/persisted'
import { useCallback } from 'react'
import { Appearance } from 'react-native'

import { Colors } from '#/src/constants/Colors'
import Gluestack from '#/src/constants/Gluestack'
import { PersitedVar } from '#/src/state/reactive/persisted'
import { ThemeColorSchemeOptionsType } from '#/types/preferences'

type Props = {
  colorScheme?: ThemeColorSchemeOptionsType
}

export const useTheme = () => {
  const toggleColorScheme = useCallback((props: Props) => {
    switch (props.colorScheme) {
      case 'system':
        const deviceColorScheme = Appearance.getColorScheme()
        persisted.write('theme', {
          mode: 'system',
          theme: persisted.defaults.theme.theme,
        })
        PersitedVar({
          theme: {
            mode: 'system',
            theme: {
              gluestack: Gluestack,
              reactnavigation: deviceColorScheme === 'dark' ? Colors.dark : Colors.light,
            }
          }
        })
        break
        case 'light':
          persisted.write('theme', {
            mode: 'light',
            theme: persisted.defaults.theme.theme,
          })
          PersitedVar({
            theme: {
              mode: 'light',
              theme: {
                gluestack: Gluestack,
                reactnavigation: Colors.light,
              }
            }
          })
        break
      case 'dark':
        persisted.write('theme', {
          mode: 'dark',
          theme: persisted.defaults.theme.theme,
        })
        PersitedVar({
          theme: {
            mode: 'dark',
            theme: {
              gluestack: Gluestack,
              reactnavigation: Colors.dark,
            }
          }
        })
        break
        default:
        PersitedVar({
          theme: {
            mode: 'dark',
            theme: {
              gluestack: Gluestack,
              reactnavigation: Colors.dark,
            }
          }
        })
    }
  }, [])

  return [toggleColorScheme]
}

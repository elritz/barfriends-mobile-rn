import {useCallback} from 'react'
import {Appearance} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME} from '#/src/constants/StorageConstants'
import {ThemeColorSchemeOptionsType} from '#/types/preferences'
import createTheme from './createTheme'

type Props = {
  colorScheme?: ThemeColorSchemeOptionsType
}

export const useToggleTheme = () => {
  const toggleColorScheme = useCallback(async (props: Props) => {
    const localStorageColorScheme = await AsyncStorage.getItem(
      LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
    )
    const valueLocalStorageColorScheme = JSON.parse(
      String(localStorageColorScheme),
    )

    // check if we need to update local storage with new ColorScheme value
    if (props.colorScheme !== valueLocalStorageColorScheme.colorScheme) {
      const initialThemeColorSchemeState = JSON.stringify({
        colorScheme: props.colorScheme,
      })

      await AsyncStorage.setItem(
        LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
        initialThemeColorSchemeState,
      )
    }

    switch (props.colorScheme) {
      case 'system':
        const deviceColorScheme = Appearance.getColorScheme()
        createTheme({
          colorScheme: deviceColorScheme,
          localStorageColorScheme: 'system',
        })
        break
      case 'light':
        createTheme({colorScheme: 'light', localStorageColorScheme: 'light'})
        break

      case 'dark':
        createTheme({colorScheme: 'dark', localStorageColorScheme: 'dark'})
        break
      default:
        createTheme({colorScheme: 'dark', localStorageColorScheme: 'dark'})
    }
  }, [])

  const switchTheme = useCallback(async (props: Props) => {
    const localStorageColorScheme = await AsyncStorage.getItem(
      LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
    )
    const valueLocalStorageColorScheme = JSON.parse(
      String(localStorageColorScheme),
    )

    // check if we need to update local storage with new ColorScheme value
    if (props.colorScheme !== valueLocalStorageColorScheme.colorScheme) {
      const initialThemeColorSchemeState = JSON.stringify({
        colorScheme: props.colorScheme,
      })

      await AsyncStorage.setItem(
        LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
        initialThemeColorSchemeState,
      )
    }

    switch (props.colorScheme) {
      case 'system':
        const deviceColorScheme = Appearance.getColorScheme()
        createTheme({
          colorScheme: deviceColorScheme,
          localStorageColorScheme: 'system',
        })
        break
      case 'light':
        createTheme({colorScheme: 'light', localStorageColorScheme: 'light'})
        break

      case 'dark':
        createTheme({colorScheme: 'dark', localStorageColorScheme: 'dark'})
        break
      default:
        createTheme({colorScheme: 'dark', localStorageColorScheme: 'dark'})
    }
  }, [])

  return [switchTheme, toggleColorScheme]
}

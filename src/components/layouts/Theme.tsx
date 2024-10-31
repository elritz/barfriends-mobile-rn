import {
  DefaultTheme,
  ThemeProvider as ReactNavigationThemeProvider,
} from '@react-navigation/native'
import {ReactNode, useEffect, useRef} from 'react'
import {AppState, StatusBar, useColorScheme} from 'react-native'

import {GluestackUIProvider} from '#/src/components/ui/gluestack-ui-provider'
import {THEME_COLOR_SCHEME} from '#/src/constants/StorageConstants'
import {SplashScreen} from 'expo-router'
import {useMMKVString} from 'react-native-mmkv'

export default function Theme({children}: {children: ReactNode}) {
  const colorScheme = useColorScheme()
  const appState = useRef(AppState.currentState)

  const theme = {
    preference: 'system',
    mode: 'dark',
  }

  // const [theme, setTheme] = useMMKVObject<ThemeType>(THEME_COLOR_SCHEME)

  const [t, setTheme] = useMMKVString(THEME_COLOR_SCHEME)
  console.log('🚀 ~ file: Theme.tsx:29 ~ Theme ~ t:', t)

  // const theme = t ? JSON.parse(t) : undefined

  // console.log('🚀 ~ file: Theme.tsx:22 ~ Theme ~ theme:', theme)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (theme?.preference === 'system') {
          if (theme.mode !== colorScheme) {
            if (colorScheme) {
              setTheme(
                JSON.stringify({
                  preference: 'system',
                  mode: colorScheme,
                }),
              )
            } else {
              setTheme(
                JSON.stringify({
                  preference: 'dark',
                  mode: 'dark',
                }),
              )
            }
          }
        }
      }

      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [appState, colorScheme])

  useEffect(() => {
    if (!theme) {
      if (colorScheme) {
        setTheme(
          JSON.stringify({
            preference: 'system',
            mode: colorScheme,
          }),
        )
      } else {
        setTheme(
          JSON.stringify({
            preference: 'dark',
            mode: 'dark',
          }),
        )
      }
    }
  }, [theme, setTheme, colorScheme])

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <GluestackUIProvider mode={theme?.preference}>
      <StatusBar
        animated
        barStyle={theme?.mode === 'light' ? 'dark-content' : 'light-content'}
      />
      <ReactNavigationThemeProvider value={DefaultTheme}>
        {children}
      </ReactNavigationThemeProvider>
    </GluestackUIProvider>
  )
}

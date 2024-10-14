import {GluestackUIProvider} from '#/src/components/ui/gluestack-ui-provider'
import {useReactiveVar} from '@apollo/client'
import {LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME} from '#/src/constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ThemeProvider as ReactNavigationThemeProvider} from '@react-navigation/native'
import {ThemeReactiveVar} from '#/reactive'
import {useToggleTheme} from '#/src/util/hooks/theme/useToggleTheme'
import {useCallback, useEffect, useRef} from 'react'
import {AppState, Appearance, StatusBar} from 'react-native'
import {LocalStoragePreferenceThemeType} from '#/types/preferences'
import AnimatedSplashScreen from '#/src/view/screens/splash/AnimatedSplashScreen'

export default function Theme({children}) {
  const appState = useRef(AppState.currentState)
  const rThemeVar = useReactiveVar(ThemeReactiveVar)
  const [toggleColorScheme] = useToggleTheme()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setTheme = async () => {
    const localStorageColorScheme = await AsyncStorage.getItem(
      LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
    )

    const valueLocalStorageColorScheme: LocalStoragePreferenceThemeType =
      JSON.parse(String(localStorageColorScheme))

    await toggleColorScheme({
      colorScheme: valueLocalStorageColorScheme.colorScheme,
    })
  }

  const handleTheme = useCallback(() => {
    setTheme()
  }, [setTheme])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const currentDeviceAppearance = Appearance.getColorScheme()
        if (rThemeVar.localStorageColorScheme === 'system') {
          if (currentDeviceAppearance !== rThemeVar.colorScheme) {
            handleTheme()
          }
        } else {
          if (currentDeviceAppearance !== rThemeVar.deviceColorScheme) {
            handleTheme()
          }
        }
      }

      /// beef yaki noodles
      /// 40 guiza

      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [])
  useEffect(() => {
    handleTheme()
  }, [])

  if (!rThemeVar.theme) return null

  return (
    <AnimatedSplashScreen>
      <GluestackUIProvider
        mode={rThemeVar.colorScheme === 'light' ? 'light' : 'dark'}>
        <StatusBar
          animated
          barStyle={
            rThemeVar.colorScheme === 'light' ? 'dark-content' : 'light-content'
          }
        />
        <ReactNavigationThemeProvider value={rThemeVar.theme.reactnavigation}>
          {children}
        </ReactNavigationThemeProvider>
      </GluestackUIProvider>
    </AnimatedSplashScreen>
  )
}

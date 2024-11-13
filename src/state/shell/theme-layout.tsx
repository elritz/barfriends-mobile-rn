import {GluestackUIProvider} from '#/src/components/ui/gluestack-ui-provider'
import {Colors} from '#/src/constants/Colors'
import {useReactiveVar} from '@apollo/client'
import {ThemeProvider as ReactNavigationThemeProvider} from '@react-navigation/native'
import {SplashScreen} from 'expo-router'
import {ReactNode, useEffect} from 'react'
import {StatusBar, useColorScheme} from 'react-native'
import {PersitedVar} from '../reactive/persisted'
export default function Theme({children}: {children: ReactNode}) {
  const colorScheme = useColorScheme()
  const t = useReactiveVar(PersitedVar)

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <GluestackUIProvider mode={t.theme.mode}>
      <StatusBar
        animated
        barStyle={
          t.theme.mode === 'system'
            ? colorScheme === 'dark'
              ? 'light-content'
              : 'dark-content'
            : t.theme.mode === 'light'
              ? 'dark-content'
              : 'light-content'
        }
      />
      <ReactNavigationThemeProvider
        value={{
          dark:
            t.theme.mode === 'system'
              ? colorScheme === 'dark'
                ? true
                : false
              : t.theme.mode === 'dark'
                ? true
                : false,
          colors:
            t.theme.mode === 'system'
              ? colorScheme === 'dark'
                ? Colors.dark
                : Colors.light
              : t.theme.mode === 'dark'
                ? Colors.dark
                : Colors.light,
        }}>
        {children}
      </ReactNavigationThemeProvider>
    </GluestackUIProvider>
  )
}

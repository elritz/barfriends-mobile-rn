import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BlurView} from 'expo-blur'
import {Stack} from 'expo-router'
import {useReactiveVar} from '@apollo/client'

import {ThemeReactiveVar} from '#/reactive'
import SearchInputResults from '#/src/components/molecules/searchinput/SearchInputResults'
import SearchInputText from '#/src/components/molecules/searchinput/SearchInputText'
import {VStack} from '#/src/components/ui/vstack'

export default function _layout() {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const insets = useSafeAreaInsets()

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        // headerShown: false,
        animation: 'fade',
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen options={{}} name={'index'} />
      <Stack.Screen
        name={'searchtext'}
        options={{
          headerShown: true,
          headerTransparent: true,
          animation: 'fade',
          header: () => {
            return (
              <BlurView
                style={{
                  backgroundColor:
                    rTheme.colorScheme === 'light'
                      ? rTheme.theme?.gluestack.tokens.colors.light100
                      : rTheme.theme?.gluestack.tokens.colors.light900,
                  paddingTop: insets.top,
                }}
                intensity={70}
                tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
                <VStack className="justify-start bg-light-100 dark:bg-light-900">
                  <SearchInputText />
                </VStack>
              </BlurView>
            )
          },
        }}
      />
      <Stack.Screen
        name={'searchresults'}
        options={{
          animation: 'fade',
          headerTransparent: true,
          header: () => {
            return (
              <BlurView
                style={{
                  paddingTop: insets.top,
                }}
                intensity={70}
                tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
                <VStack className="justify-start bg-light-100 dark:bg-light-900">
                  <SearchInputResults />
                </VStack>
              </BlurView>
            )
          },
        }}
      />
    </Stack>
  )
}

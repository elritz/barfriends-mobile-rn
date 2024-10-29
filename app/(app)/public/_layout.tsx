import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BlurView} from 'expo-blur'
import {router, Stack} from 'expo-router'
// TODO: FX() Settings still needs to be done
import {useReactiveVar} from '@apollo/client'
import {Entypo, Ionicons} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'
import {Button} from '#/src/components/ui/button'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {SEARCH_BAR_HEIGHT} from '#/src/constants/ReactNavigationConstants'

export default () => {
  const NAVIGATION_BUTTON_HEIGHT = 38
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const insets = useSafeAreaInsets()
  const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
  const h = insets.top + HEADER_HEIGHT

  return (
    <Stack>
      <Stack.Screen
        name={'venue'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'personal'}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: rTheme.colorScheme === 'light' ? 'light' : 'dark',
          header: () => {
            return (
              <BlurView
                style={{
                  paddingTop: insets.top,
                  paddingBottom: 4,
                }}
                intensity={60}
                tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
                <HStack
                  space="md"
                  className="items-center justify-between px-3">
                  <HStack
                    space={'md'}
                    className="flex-1 items-center justify-start">
                    <Button
                      variant="link"
                      onPress={() => {
                        router.canGoBack()
                          ? router.back()
                          : router.replace({
                              pathname: '/(app)/hometab/venuefeed',
                            })
                      }}
                      style={{
                        height: NAVIGATION_BUTTON_HEIGHT,
                      }}>
                      <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        color={
                          rTheme.colorScheme === 'light'
                            ? rTheme.theme?.gluestack.tokens.colors.light900
                            : rTheme.theme?.gluestack.tokens.colors.light100
                        }
                      />
                    </Button>
                  </HStack>
                  <Text>⭐️</Text>
                  <HStack
                    space={'md'}
                    className="flex-1 items-center justify-end">
                    <Button
                      variant="link"
                      onPress={() =>
                        router.push({
                          pathname: '/(app)/public/personal/[username]',
                          params: {
                            username: 'test',
                          },
                        })
                      }
                      size="xs"
                      style={{
                        height: NAVIGATION_BUTTON_HEIGHT,
                      }}>
                      <Entypo
                        name={'dots-three-vertical'}
                        size={23}
                        color={
                          rTheme.colorScheme === 'light'
                            ? rTheme.theme?.gluestack.tokens.colors.light900
                            : rTheme.theme?.gluestack.tokens.colors.light100
                        }
                      />
                    </Button>
                  </HStack>
                </HStack>
              </BlurView>
            )
          },
        }}
      />
    </Stack>
  )
}

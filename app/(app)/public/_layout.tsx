import {VStack} from '#/src/components/ui/vstack'
import {Text} from '#/src/components/ui/text'
import {HStack} from '#/src/components/ui/hstack'
import {Button} from '#/src/components/ui/button'
// TODO: FX() Settings still needs to be done
import {useReactiveVar} from '@apollo/client'
import SearchInput from '#/src/components/molecules/searchinput/SearchInput'
import {SEARCH_BAR_HEIGHT} from '#/src/constants/ReactNavigationConstants'
import {Ionicons, Entypo} from '@expo/vector-icons'
import {ThemeReactiveVar} from '#/reactive'
import {BlurView} from 'expo-blur'
import {Stack, router} from 'expo-router'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

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
      <Stack.Screen
        name={'contacts'}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft: () => (
            <HStack
              space={'md'}
              className="ml-2 max-w-[90%] items-center justify-start">
              <Button
                onPress={() => router.back()}
                size="xs"
                className={`${rTheme.colorScheme === 'light' ? 'bg-light-50' : 'bg-light-900'} my-2 mr-2 rounded-full`}>
                <Ionicons name="chevron-back-outline" size={30} />
              </Button>
            </HStack>
          ),
          contentStyle: {
            backgroundColor:
              rTheme.colorScheme === 'light'
                ? rTheme.theme?.gluestack.tokens.colors.light100
                : rTheme.theme?.gluestack.tokens.colors.light900,
          },
          headerTransparent: true,
          header: () => {
            return (
              <VStack
                className={`h-${h} justify-end bg-light-100 pb-2 pt-[2] dark:bg-light-900`}>
                <SearchInput />
              </VStack>
            )
          },
        }}
      />
    </Stack>
  )
}

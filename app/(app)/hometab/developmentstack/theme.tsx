import {VStack} from '#/src/components/ui/vstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Divider} from '#/src/components/ui/divider'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Box} from '#/src/components/ui/box'
import {useReactiveVar} from '@apollo/client'
import {
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '#/src/constants/ReactNavigationConstants'
import {
  AuthorizationDeviceProfile,
  useGetAllThemesQuery,
  useRefreshDeviceManagerLazyQuery,
  useUpdateThemeManagerSwitchThemeMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {FlashList, ListRenderItem} from '@shopify/flash-list'
import {useToggleTheme} from '#/src/util/hooks/theme/useToggleTheme'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import {router} from 'expo-router'
import {useCallback} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

type Gluestack = {
  primary0: string
  primary50: string
  tertiary0: string
  primary100: string
  primary200: string
  primary300: string
  primary400: string
  primary500: string
  primary600: string
  primary700: string
  primary800: string
  primary900: string
  primary950: string
  secondary0: string
  tertiary50: string
  secondary50: string
  tertiary100: string
  tertiary200: string
  tertiary300: string
  tertiary400: string
  tertiary500: string
  tertiary600: string
  tertiary700: string
  tertiary800: string
  tertiary900: string
  tertiary950: string
  secondary100: string
  secondary200: string
  secondary300: string
  secondary400: string
  secondary500: string
  secondary600: string
  secondary700: string
  secondary800: string
  secondary900: string
  secondary950: string
}

type Theme = {
  card: string
  text: string
  border: string
  primary: string
  background: string
  notification: string
}

type ReactNavigation = {
  dark: Theme
  light: Theme
}

type Item = {
  index: number
  item: {
    id: string
    name: string
    theme: {
      gluestack: Gluestack
      reactnavigation: ReactNavigation
    }
  }
}

export default function Preferences() {
  const insets = useSafeAreaInsets()
  const contentInsets = useContentInsets()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const [toggleColorScheme, switchTheme] = useToggleTheme()

  const {data: GATData, loading: GATLoading, error} = useGetAllThemesQuery()

  const [updateSwitchTheme] = useUpdateThemeManagerSwitchThemeMutation({
    onCompleted: data => {
      refreshMutation()
    },
    onError: error => {
      console.log('errorwwww :>> ', error)
    },
  })

  const [refreshMutation, {data, loading}] = useRefreshDeviceManagerLazyQuery({
    onCompleted: data => {
      if (
        data.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
      ) {
        const deviceProfile =
          data.refreshDeviceManager as AuthorizationDeviceProfile
        AuthorizationReactiveVar(deviceProfile)
        setTheme({colorScheme: rTheme.localStorageColorScheme})
        setTimeout(() => {
          router.back()
        }, 500)
      }
      if (data.refreshDeviceManager?.__typename === 'Error') {
        // setTimeout(() => {
        // 	router.push('/(app)/hometab/venuefeed')
        // }, 1)
      }
    },
    onError: error => {
      console.log('error :>> ', error)
    },
  })

  const setTheme = async ({
    colorScheme,
  }: {
    colorScheme: 'light' | 'dark' | 'system'
  }) => {
    toggleColorScheme({colorScheme})
  }

  const renderItem: ListRenderItem<Item> = useCallback(
    ({item, index}) => {
      if (!item?.item) return null
      const gluestack = item.item.theme.gluestack
      return (
        <Pressable
          onPress={() => {
            updateSwitchTheme({
              variables: {
                id: item.item.id,
                themeId: item.item.id,
              },
            })
          }}>
          <Box
            key={item.item.id}
            style={{
              flex: 1,
              borderColor:
                AuthorizationReactiveVar()?.Profile?.ThemeManager
                  ?.ProfileTheme[0]?.Theme?.id === item.item.id
                  ? rTheme.theme?.gluestack.tokens.colors.primary500
                  : rTheme.theme?.gluestack.tokens.colors.light900,
            }}
            className="m-3 rounded-md border-2 px-2 py-4">
            <VStack space={'md'} className="flex-row flex-wrap justify-around">
              {rTheme.colorScheme === 'light' ? (
                <>
                  {Object.entries(gluestack).map((item, index) => {
                    return (
                      <Box
                        key={index}
                        style={{
                          backgroundColor: item[1],
                          width: 25,
                          height: 25,
                        }}
                        className="m-2 self-center"
                      />
                    )
                  })}
                </>
              ) : (
                <>
                  {Object.entries(gluestack).map((item, index) => {
                    return (
                      <Box
                        key={index}
                        style={{
                          backgroundColor: item[1],
                          width: 40,
                          height: 40,
                        }}
                        className="m-2 self-center"
                      />
                    )
                  })}
                </>
              )}
            </VStack>

            <Divider className="my-3" />
            <Heading className="mt-4 text-center text-xl font-bold capitalize">
              {item.item.name}
            </Heading>
          </Box>
        </Pressable>
      )
    },
    [rTheme.colorScheme],
  )

  if (GATLoading || !GATData?.getAllThemes) return null

  return (
    <FlashList
      estimatedItemSize={30}
      data={GATData.getAllThemes.map((theme, index) => ({
        index,
        item: theme,
      }))}
      keyExtractor={(item, index) => index.toString()}
      numColumns={1}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      contentInset={{
        bottom:
          insets.bottom !== 0
            ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
            : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
      }}
      renderItem={renderItem}
      ListHeaderComponent={() => {
        return (
          <HStack space={'lg'} className="w-full justify-around py-4">
            <Button
              onPress={async () => {
                await setTheme({colorScheme: 'light'})
              }}
              style={{
                borderColor:
                  rTheme.localStorageColorScheme === 'light'
                    ? rTheme.theme?.gluestack.tokens.colors.primary500
                    : 'transparent',
              }}
              className="flex-1 border-2 bg-light-50">
              <ButtonText className="text-black">Light</ButtonText>
            </Button>
            <Button
              onPress={async () => {
                await setTheme({colorScheme: 'dark'})
              }}
              style={{
                borderColor:
                  rTheme.localStorageColorScheme === 'dark'
                    ? rTheme.theme?.gluestack.tokens.colors.primary500
                    : 'transparent',
              }}
              className="flex-1 border-2 bg-light-800">
              <ButtonText className="text-white">Dark</ButtonText>
            </Button>
            <Button
              onPress={async () => {
                await setTheme({colorScheme: 'system'})
              }}
              style={{
                borderColor:
                  rTheme.localStorageColorScheme === 'system'
                    ? rTheme.theme?.gluestack.tokens.colors.primary500
                    : 'transparent',
                backgroundColor:
                  rTheme.colorScheme === 'light'
                    ? rTheme.theme.gluestack.tokens.colors.light100
                    : rTheme.theme.gluestack.tokens.colors.light800,
              }}
              className="flex-1 border-2 bg-light-50">
              <ButtonText
                style={{
                  color: rTheme.colorScheme === 'light' ? 'black' : 'white',
                }}>
                System
              </ButtonText>
            </Button>
          </HStack>
        )
      }}
    />
  )
}

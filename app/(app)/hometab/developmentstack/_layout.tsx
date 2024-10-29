import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Stack} from 'expo-router'

import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'
import {Box} from '#/src/components/ui/box'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import {SEARCH_BAR_HEIGHT} from '#/src/constants/ReactNavigationConstants'

export default () => {
  const insets = useSafeAreaInsets()
  const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
  const h = insets.top + HEADER_HEIGHT

  const {data: rdmData, loading: rdmLoading} = useRefreshDeviceManagerQuery()

  if (rdmLoading) return null

  const HeaderComponent = () => {
    if (
      rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
    ) {
      return (
        <Text
          adjustsFontSizeToFit
          className="leading-2xl text-center text-xl font-black capitalize">
          {rdmData?.refreshDeviceManager.Profile?.ProfileType !== 'GUEST' &&
            rdmData?.refreshDeviceManager.Profile?.IdentifiableInformation
              ?.username}
        </Text>
      )
    }
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={'index'}
        options={{
          header: () => {
            return (
              <VStack
                style={{
                  paddingTop: insets.top,
                  height: h,
                }}
                className="h-${h} justify-end bg-light-100 pb-2 pt-[10] dark:bg-light-900">
                <HeaderComponent />
                <Box className="bg-transparent">
                  <Text
                    adjustsFontSizeToFit
                    className="leading-2xl text-center text-3xl font-black capitalize">
                    {String.fromCharCode(60)}
                    {process.env.EXPO_PUBLIC_NODE_ENV}{' '}
                    {String.fromCharCode(47, 62)}
                  </Text>
                </Box>
              </VStack>
            )
          },
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={'account'}
        options={{
          headerShown: true,
          title: 'Account',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'settings'}
        options={{
          headerShown: true,
          title: 'Settings',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'tokens'}
        options={{
          headerShown: true,
          title: 'Tokens',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'permissions'}
        options={{
          headerBackground: () => <></>,
          headerShown: true,
          title: 'Permissions',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'notifications'}
        options={{
          headerBackground: () => <></>,
          headerShown: true,
          title: 'Notifications',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'state'}
        options={{
          headerBackground: () => <></>,
          headerShown: true,
          title: 'State',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'network'}
        options={{
          headerBackground: () => <></>,
          headerShown: true,
          title: 'Network',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'theme'}
        options={{
          headerBackground: () => <></>,
          headerShown: true,
          title: 'Themes',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
    </Stack>
  )
}

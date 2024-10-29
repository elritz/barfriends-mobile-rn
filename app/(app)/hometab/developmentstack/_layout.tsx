import {Stack} from 'expo-router'

import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'
import {Heading} from '#/src/components/ui/heading'

export default () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={'index'}
        options={{
          headerTitle: () => {
            return (
              <Heading>
                {String.fromCharCode(60)}
                {process.env.EXPO_PUBLIC_NODE_ENV} {String.fromCharCode(47, 62)}
              </Heading>
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
          headerShown: true,
          title: 'Permissions',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'notifications'}
        options={{
          headerShown: true,
          title: 'Notifications',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'state'}
        options={{
          headerShown: true,
          title: 'State',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'network'}
        options={{
          headerShown: true,
          title: 'Network',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'theme'}
        options={{
          headerShown: true,
          title: 'Themes',
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
    </Stack>
  )
}

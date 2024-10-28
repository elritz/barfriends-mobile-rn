import {router, Stack} from 'expo-router'

import {Button} from '#/src/components/ui/button'
import {Text} from '#/src/components/ui/text'

const Layout = () => {
  return (
    <Stack
      initialRouteName="hometab"
      screenOptions={{
        headerTransparent: true,
        animation: 'fade',
        headerShown: false,
      }}>
      <Stack.Screen
        name={'hometab'}
        options={{
          animation: 'default',
        }}
      />
      <Stack.Screen
        name={'newconversation'}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          presentation: 'modal',
          headerTitle: () => (
            <Text className="text-md font-bold">New Message</Text>
          ),
          headerRight: () => {
            return (
              <Button
                onPress={() =>
                  router.canGoBack()
                    ? router.back()
                    : router.push({pathname: '/(app)/hometab/venuefeed'})
                }
                size="md"
                variant="link">
                <Text>Cancel</Text>
              </Button>
            )
          },
        }}
      />
      <Stack.Screen
        name={'friendslist'}
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name={'conversation'} />
      <Stack.Screen name={'animatedconversation'} />
      <Stack.Screen
        name={'explore'}
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name={'modal'}
        options={{
          presentation: 'modal',
          animation: 'default',
        }}
      />
      <Stack.Screen name={'public'} />
      <Stack.Screen
        name={'searcharea'}
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen name={'permission'} />
      <Stack.Screen name={'settings'} />
    </Stack>
  )
}

Layout.displayName = 'Layout'

export default Layout

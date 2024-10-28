import {BlurView} from 'expo-blur'
import {router, Stack} from 'expo-router'

import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {Text} from '#/src/components/ui/text'

export default () => {
  return (
    <Stack
      initialRouteName="hometab"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: true,
        headerBackground: () => {
          return <Box className="flex-1 rounded-none" />
        },
        headerLeft: () => {
          return <ChevronBackArrow />
        },
        headerTitle: () => <Heading>Conversation</Heading>,
        headerRight: () => {
          return (
            <Button
              size="xs"
              onPress={() => {
                console.log('FRIENDS')
              }}>
              <ButtonText className="font-medium">Barfriend</ButtonText>
            </Button>
          )
        },
      }}>
      <Stack.Screen
        name={'[conversationid]'}
        options={{
          animation: 'fade',
        }}
      />
    </Stack>
  )
}

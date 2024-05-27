
import ChevronBackArrow from '#/components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Button, ButtonText, Heading, Text, Box } from '@gluestack-ui/themed'
import { Stack, router } from 'expo-router'

export default () => {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: true,
        headerBackground: () => {
          return (
            <Box flex={1} rounded={'$none'} />
          )
        },
        headerLeft: () => {
          return (
            <ChevronBackArrow />
          )
        },
        headerTitle: () => <Heading>Conversation</Heading>,
        headerRight: () => {
          return (
            <Button
              size='xs'
              onPress={() => {
                console.log('FRIENDS')
              }}
            >
              <ButtonText fontWeight='$medium'>
                Barfriend
              </ButtonText>
            </Button>
          )
        }
      }}
    >
      <Stack.Screen
        name={'[animatedconversationid]'}
        options={{
          animation: 'fade',
        }}
      />
    </Stack>
  )
}

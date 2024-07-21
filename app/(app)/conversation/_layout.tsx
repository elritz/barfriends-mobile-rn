
import { Box } from "#/components/ui/box";
import { Text } from "#/components/ui/text";
import { Heading } from "#/components/ui/heading";
import { Button, ButtonText } from "#/components/ui/button";
import ChevronBackArrow from '#/components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { BlurView } from 'expo-blur'
import { Stack, router } from 'expo-router'

export default () => {
  return (
    <Stack
      initialRouteName='hometab'
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: true,
        headerBackground: () => {
          return <Box className="flex-1 rounded-none" />;
        },
        headerLeft: () => {
          return <ChevronBackArrow />;
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
              <ButtonText className="font-medium">
                Barfriend
              </ButtonText>
            </Button>
          );
        }
      }}
    >
      <Stack.Screen
        name={'[conversationid]'}
        options={{
          animation: 'fade',
        }}
      />
    </Stack>
  );
}

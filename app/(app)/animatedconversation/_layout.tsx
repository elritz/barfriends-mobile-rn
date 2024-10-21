import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Button, ButtonText} from '#/src/components/ui/button'
import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'
import {Stack, useLocalSearchParams} from 'expo-router'
import {HStack} from '#/src/components/ui/hstack'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const AnimatedConversationLayout = () => {
  const insets = useSafeAreaInsets()
  const lp = useLocalSearchParams()
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: true,
        header: () => {
          return (
            <Box className="flex-row justify-between bg-light-100 pt-2 dark:bg-light-900">
              <HStack
                style={{paddingTop: insets.top}}
                className="flex-1 items-center justify-between py-2">
                <HStack className="flex-1 items-center justify-start">
                  <ChevronBackArrow />
                  <Box className="ml-2 mr-3 flex-1">
                    <Heading
                      allowFontScaling
                      numberOfLines={1}
                      className="capitalize">
                      {lp.name}
                    </Heading>
                  </Box>
                </HStack>
                <Button
                  size="xs"
                  className="mr-2"
                  onPress={() => {
                    console.log('FRIENDS')
                  }}>
                  <ButtonText className="text-md font-medium color-white">
                    Barfriend
                  </ButtonText>
                </Button>
              </HStack>
            </Box>
          )
        },
        //   headerBackground: () => {
        //     return <Box className="flex-1 rounded-none bg-lime-700 h-[400px]" />;
        //   },
        //   headerLeft: () => {
        //     return <ChevronBackArrow />;
        //   },
        //   headerTitle: () => <Heading>Conversation</Heading>,
        //   headerRight: () => {
        //     return (
        //       <Button
        //         size='xs'
        //         onPress={() => {
        //           console.log('FRIENDS')
        //         }}
        //       >
        //         <ButtonText className="font-medium">
        //           Barfriend
        //         </ButtonText>
        //       </Button>
        //     );
        //   }
      }}>
      <Stack.Screen
        name={'[animatedconversationid]'}
        options={{
          animation: 'fade',
        }}
      />
    </Stack>
  )
}

export default AnimatedConversationLayout

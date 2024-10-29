import * as Clipboard from 'expo-clipboard'
import {useReactiveVar} from '@apollo/client'
import {Feather} from '@expo/vector-icons'
import {FlashList} from '@shopify/flash-list'

import {Divider} from '#/src/components/ui/divider'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text/'
import {VStack} from '#/src/components/ui/vstack'
import {ThemeReactiveVar} from '#/src/state/reactive'

export default function Preferences() {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  return (
    <FlashList
      estimatedItemSize={65}
      data={[
        {
          name: 'ip address',
          value: process.env.EXPO_PUBLIC_IP_ADDRESS,
          onPress: async () => {
            await Clipboard.setStringAsync(String(process.env.SERVER_ENDPOINT))
          },
        },
        {
          name: 'sever endpoint',
          value: process.env.EXPO_PUBLIC_SERVER_ENDPOINT,
          onPress: async () => {
            await Clipboard.setStringAsync(String(process.env.SERVER_ENDPOINT))
          },
        },
      ]}
      keyExtractor={i => i.name}
      numColumns={1}
      contentInset={{top: 10}}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => {
        return (
          <Pressable
            accessibilityRole="button"
            onPressIn={item.onPress}
            className="px-4 py-3">
            <VStack className="flex-1 justify-between" space="sm">
              <HStack>
                <VStack className="flex-1">
                  <Heading className="text-2xl capitalize">{item.name}</Heading>
                  <Text className="text-lg ">{item.value}</Text>
                </VStack>
                <Feather
                  color={rTheme.theme?.gluestack.tokens.colors.primary500}
                  size={25}
                  name="copy"
                />
              </HStack>
            </VStack>
          </Pressable>
        )
      }}
    />
  )
}

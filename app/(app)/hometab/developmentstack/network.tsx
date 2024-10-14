import {Pressable} from '#/src/components/ui/pressable'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Divider} from '#/src/components/ui/divider'
import {FlashList} from '@shopify/flash-list'
import {useRouter} from 'expo-router'
import * as Clipboard from 'expo-clipboard'

export default function Preferences() {
  const ITEM_HEIGHT = 65
  return (
    <FlashList
      estimatedItemSize={65}
      data={[
        {
          name: 'IP Address',
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
          <Pressable onPressIn={item.onPress}>
            <Divider />
            <HStack
              className={`h-[${ITEM_HEIGHT}px] flex-1 items-center justify-between`}>
              <Heading className="text-md px-4">{item.name}</Heading>
              <Heading className="text-md px-4">{item.value}</Heading>
            </HStack>
          </Pressable>
        )
      }}
    />
  )
}

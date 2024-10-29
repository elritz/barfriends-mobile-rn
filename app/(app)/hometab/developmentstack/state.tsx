import {FlashList} from '@shopify/flash-list'

import {Box} from '#/src/components/ui/box'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

export default function State() {
  return (
    <FlashList
      data={[]}
      estimatedItemSize={100}
      renderItem={() => {
        return <Box />
      }}
      ListHeaderComponent={() => {
        return (
          <VStack className="mx-3 my-5">
            <Text className="text-center text-lg">
              These items allow you to reset or update the state of the
              application. They manage the preferences saved during the initial
              render of the Barfriends app. These preferences are also updated
              when a user interacts with components that prompt them to set or
              dismiss the persisted state.
            </Text>
          </VStack>
        )
      }}
    />
  )
}

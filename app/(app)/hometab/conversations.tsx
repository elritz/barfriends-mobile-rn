import {FlashList} from '@shopify/flash-list'

import {useGetConversationsQuery} from '#/graphql/generated'
import HorizontalMessageNotification from '#/src/components/molecules/notifications/message/HorizontalMessageNotification'
import {Box} from '#/src/components/ui/box'
import {Text} from '#/src/components/ui/text'
import useContentInsets from '#/src/util/hooks/useContentInsets'
const Messages = () => {
  const contentInsets = useContentInsets()
  const {data, loading} = useGetConversationsQuery()

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <Box className="flex-1 px-3">
      <FlashList
        data={data?.getConversations}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        estimatedItemSize={65}
        contentInset={{
          ...contentInsets,
        }}
        keyExtractor={({id}: {id: string}) => id.toString()}
        renderItem={({item}) => <HorizontalMessageNotification item={item} />}
        snapToAlignment="center"
      />
    </Box>
  )
}

export default Messages

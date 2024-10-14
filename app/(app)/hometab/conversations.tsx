import {Text} from '#/src/components/ui/text'
import {Heading} from '#/src/components/ui/heading'
import {Box} from '#/src/components/ui/box'
import HorizontalMessageNotification from '#/src/components/molecules/notifications/message/HorizontalMessageNotification'
import {useGetConversationsQuery} from '#/graphql/generated'
import {FlashList} from '@shopify/flash-list'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import {View} from 'react-native'
import CondensedVerticalFriendsNotficationsList from '#/src/components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
const Messages = () => {
  const contentInsets = useContentInsets()
  const {data, loading, error} = useGetConversationsQuery()
  console.log('🚀 ~ Messages ~ data:', data)

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <Box className="flex-1 px-3">
      <FlashList
        data={data?.getConversations}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View>
              <CondensedVerticalFriendsNotficationsList />
            </View>
          )
        }}
        refreshing={loading}
        estimatedItemSize={75}
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

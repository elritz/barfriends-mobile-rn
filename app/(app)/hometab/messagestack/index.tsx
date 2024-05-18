import HorizontalMessageNotification from '#/components/molecules/notifications/message/HorizontalMessageNotification'
import { Box, Heading, Text } from '@gluestack-ui/themed'
import { useGetConversationsQuery } from '#/graphql/generated'
import { FlashList } from '@shopify/flash-list'
import useGenerateConversations, {
	Conversation,
} from '#/util/hooks/placeholder/useGenerateConversations'
import useContentInsets from '#/util/hooks/useContentInsets'
import { useEffect, useState } from 'react'

const Messages = () => {
	const contentInsets = useContentInsets()
	const { data, loading, error } = useGetConversationsQuery()

	console.log(`🚀 ---------------🚀`)
	console.log(`🚀 ~ data:`, data)
	console.log(`🚀 ---------------🚀`)

	if (loading) {
		return <Text>Loading...</Text>
	}

	return (
		<Box flex={1} mx={'$2'}>
			{/* <Heading mt={'$10'} textAlign='center'>
				Messages, New Messages✅, Notifications, Pubsub, Searching/Filtering✅, Editing
			</Heading> */}
			<FlashList
				data={data?.getConversations}
				showsVerticalScrollIndicator={false}
				refreshing={loading}
				estimatedItemSize={75}
				ListHeaderComponent={() => {
					return (
						<Heading my={'$2'} fontSize={'$3xl'}>
							Messages
						</Heading>
					)
				}}
				contentInset={{
					...contentInsets,
					top: 20,
				}}
				keyExtractor={({ id }: { id: string }) => id.toString()}
				renderItem={({ item }) => <HorizontalMessageNotification item={item} />}
				snapToAlignment='center'
			/>
		</Box>
	)
}

export default Messages

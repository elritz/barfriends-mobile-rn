import { Box, Heading } from '@components/core'
import HorizontalMessageNotification from '@components/molecules/notifications/message/HorizontalMessageNotification'
import useGenerateConversations, {
	Conversation,
} from '@helpers/generate/placeholder/useGenerateConversations'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useEffect, useState } from 'react'

const Messages = () => {
	const contentInsets = useContentInsets()
	const [data, setData] = useState<Conversation[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const { generateConversations } = useGenerateConversations()

	useEffect(() => {
		setLoading(true)
		const conversations = generateConversations(10)
		setData(conversations)
		setLoading(false)
	}, [])

	if (loading) {
		return null
	}

	return (
		<Box flex={1} bg='$transparent' mx={'$2'}>
			<FlashList
				showsVerticalScrollIndicator={false}
				onRefresh={() => {
					setLoading(true)
					const conversations = generateConversations(10)
					setData(conversations)
					setLoading(false)
				}}
				refreshing={loading}
				data={data}
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
				}}
				keyExtractor={({ id }: { id: string }) => id.toString()}
				renderItem={({ item }) => <HorizontalMessageNotification item={item} />}
				snapToAlignment='center'
			/>
		</Box>
	)
}

export default Messages

import { Box, Heading, Text } from '@gluestack-ui/themed'
import HorizontalMessageNotification from '@components/molecules/notifications/message/HorizontalMessageNotification'
import { useGetConversationsQuery } from '@graphql/generated'
import { FlashList } from '@shopify/flash-list'
import useGenerateConversations, {
	Conversation,
} from '@util/hooks/placeholder/useGenerateConversations'
import useContentInsets from '@util/hooks/useContentInsets'
import { useEffect, useState } from 'react'

const Messages = () => {
	const contentInsets = useContentInsets()
	// const [data, setData] = useState<Conversation[]>([])
	// const [loading, setLoading] = useState<boolean>(true)
	const { generateConversations } = useGenerateConversations()

	// useEffect(() => {
	// 	setLoading(true)
	// 	const conversations = generateConversations(10)
	// 	setData(conversations)
	// 	setLoading(false)
	// }, [])

	// if (loading) {
	// 	return null
	// }
	//return (
	//	 <FlashList
	//		data={data}
	//		showsVerticalScrollIndicator={false}
	//		onRefresh={() => {
	//			setLoading(true)
	//			const conversations = generateConversations(10)
	//			setData(conversations)
	//			setLoading(false)
	//		}}
	//		refreshing={loading}
	//		estimatedItemSize={75}
	//		ListHeaderComponent={() => {
	// return (
	// <Heading my={'$2'} fontSize={'$3xl'}>
	{
		/* Messages */
	}
	{
		/* </Heading> */
	}
	// )
	//		}}
	//		contentInset={{
	//			...contentInsets,
	//		}}
	//		keyExtractor={({ id }: { id: string }) => id.toString()}
	//		renderItem={({ item }) => <HorizontalMessageNotification item={item} />}
	//		snapToAlignment='center'
	//	/>
	// )

	const { data, loading, error } = useGetConversationsQuery()

	// console.log("🚀 ~ file: index.tsx:61 ~ Messages ~ data:", data)


	if (loading) {
		return <Text>Loading...</Text>
	}

	return (
		<Box flex={1} bg='$green700' mx={'$2'}>
			{/* <FlashList
				data={data}
				showsVerticalScrollIndicator={false}
				onRefresh={() => {
					setLoading(true)
					const conversations = generateConversations(10)
					setData(conversations)
					setLoading(false)
				}}
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
				}}
				keyExtractor={({ id }: { id: string }) => id.toString()}
				renderItem={({ item }) => <HorizontalMessageNotification item={item} />}
				snapToAlignment='center'
			/> */}
		</Box>
	)
}

export default Messages

import { Box, Heading, Text } from '@components/core'

export default function index() {
	return (
		<Box bg={'$transparent'} flex={1} justifyContent={'center'} alignContent={'center'} mx={'$5'}>
			<Heading fontSize={'$3xl'}>Messaging</Heading>
			<Text>Enhance User Engagement and Communication with Messaging Feature on Revel</Text>
		</Box>
	)
}

// import { useReactiveVar } from '@apollo/client'
// import HorizontalMessageNotification from '@components/molecules/notifications/message/HorizontalMessageNotification'
// import { Ionicons } from '@expo/vector-icons'
// import GenerateMessageData from '@helpers/generate/placeholder/GenerateMessagesData'
// import { PermissionNotificationReactiveVar } from '@reactive'
// import { useRouter } from 'expo-router'
// import { useRef } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'

// const Messages = () => {
// 	const _flatListRef = useRef<typeof FlatList>()
// 	const router = useRouter()
// 	const rPermissionNotificationVar = useReactiveVar(PermissionNotificationReactiveVar)
// 	const data = GenerateMessageData(5, 2)

// 	return (
// 		<SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
// 			<HStack alignItems={'center'} justifyContent={'space-between'} mb={5}>
// 				<Heading fontSize={'$3xl'}>Messages</Heading>
// 				{!rPermissionNotificationVar?.granted && (
// 					<Icon
// 						as={Ionicons}
// 						name={'ios-notifications'}
// 						size={7}
// 						color={'secondary.500'}
// 						style={{}}
// 						onPress={() =>
// 							router.push({
// 								pathname: '(app)/permission/notifications',
// 							})
// 						}
// 					/>
// 				)}
// 			</HStack>
// 			<FlatList
// 				ref={_flatListRef}
// 				style={{ elevation: 100, zIndex: 100, borderRadius: 15 }}
// 				data={data}
// 				contentInset={{ top: 0, left: 0, bottom: 90, right: 0 }}
// 				keyExtractor={({ id }: { id: string }) => id.toString()}
// 				renderItem={({ item }) => <HorizontalMessageNotification item={item} />}
// 				snapToAlignment='center'
// 			/>
// 		</SafeAreaView>
// 	)
// }

// export default Messages

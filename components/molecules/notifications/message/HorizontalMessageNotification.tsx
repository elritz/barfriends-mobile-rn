// TODO: Create message navigator
import { Badge, Box, HStack, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useRefreshDeviceManagerQuery } from '#/graphql/generated'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

const HorizontalMessageNotification = ({ item }) => {
	const router = useRouter()
	// console.log("🚀 ~ HorizontalMessageNotification ~ item:", item)
	const { data: rdmData, loading: rdmLoading, error: rdmError } =
		useRefreshDeviceManagerQuery({
			fetchPolicy: 'cache-first',
		})



	const ChatContainer = ({ isGroup, item }) => {
		const member = item.Members.filter(item => item.id !== rdmData?.refreshDeviceManager?.Profile?.id)
		console.log('item.id :>> ', item.id);
		return (
			<Pressable
				onPress={() => {
					router.push({
						// pathname: `/(app)/conversation/${item.id}`,
						pathname: `/(app)/animatedconversation/${item.id}`,
					})
				}}
				sx={{
					h: 85,
				}}
			>
				<Box
					flex={1}
					backgroundColor={'transparent'}
					rounded={'$none'}
					// bg='$green800'
					flexDirection='row'
					pt={'$2'}
				>
					<VStack
						w={50}
						h={'$full'}
						// bg='$red200'
						rounded={'$none'} alignItems='center' justifyContent='flex-start'
					>
						<Box w={45} h={45} alignItems='center' justifyContent='center'
							$light-bg='$light200'
							$dark-bg='$light900'
						>
							{isGroup ?
								<MaterialIcons name="group" size={24} color="black" />
								:
								<MaterialIcons name="person" size={24} color="black" />
							}
						</Box>
					</VStack>
					<VStack flex={1} ml={'$1'} mb={'$2'}>
						<HStack >
							<Box bg='transparent' flex={1} mr={'$1'}>
								<Heading
									numberOfLines={1}
									// bg={'$amber500'}
									lineBreakMode='tail'
									allowFontScaling={true}
									minimumFontScale={0.80} maxFontSizeMultiplier={0.25}
									lineHeight={'$sm'}
									fontSize={'$md'}
									textAlign='left'
									fontWeight={'$bold'}
								>
									{isGroup ?
										item.name
										:
										member[0].IdentifiableInformation.fullname
									}
								</Heading>
							</Box>
							<Box bg='transparent' >
								<Text
									numberOfLines={1}
									lineBreakMode='tail'
									allowFontScaling={true}
									flexDirection='row-reverse'
									writingDirection='rtl'
									textAlign='right'
									// minimumFontScale={0.80} maxFontSizeMultiplier={0.25} letterSpacing={'$sm'}
									fontSize={'$sm'}
								>
									2024-05-01
								</Text>
							</Box>
						</HStack>
						<HStack flex={1}
							justifyContent='space-between'
							borderBottomWidth={0.25}
							sx={{
								_light: {
									borderBottomColor: '$light800',
								},
								_dark: {
									borderBottomColor: '$light9000',
								},
							}}>
							<Text
								// backgroundColor='$backgroundDark200'
								flex={1}
								fontSize={'$sm'}
								lineHeight={'$xs'}
								numberOfLines={2}
								textBreakStrategy={'balanced'}
								lineBreakMode={'tail'}
							>
								{item.Messages[0].content.message}
							</Text>
							<Box bg='transparent' pt={'$2'}>

								<Box
									mx={'$1'}
									maxHeight={8}
									minHeight={8}
									maxWidth={8}
									minWidth={8}
									bg='$primary500'
									rounded='$full'
									zIndex={1}
									alignSelf='center'
								/>
							</Box>
						</HStack>
					</VStack>
				</Box>
			</Pressable >
		)
	}

	return (
		<ChatContainer
			item={item}
			isGroup={item.Members.length === 2 ? false : true}
		/>
	)

}





export default HorizontalMessageNotification

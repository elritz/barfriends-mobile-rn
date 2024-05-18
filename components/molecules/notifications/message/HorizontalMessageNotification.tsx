// TODO: Create message navigator
import { Box, HStack, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useRefreshDeviceManagerQuery } from '#/graphql/generated'

const HorizontalMessageNotification = ({ item }) => {
	console.log("🚀 ~ HorizontalMessageNotification ~ item:", item)

	const { data: rdmData, loading: rdmLoading, error: rdmError } =
		useRefreshDeviceManagerQuery({
			fetchPolicy: 'cache-first',
		})

	if (item.Members.length === 2) {
		const member = item.Members.filter(item => item.id !== rdmData?.refreshDeviceManager?.Profile?.id)
	}

	return (
		<Box
			flex={1}
			my={'$1'}
			backgroundColor={'transparent'}
			borderBottomWidth={0.25}
			sx={{
				_light: {
					borderBottomColor: '$light800',
				},
				_dark: {
					borderBottomColor: '$light9000',
				},
			}}
		>
			<Pressable
				onPress={() => {
					// router.push({
					// 	pathname: '/(app)/permission/medialibrary',
					// })
				}}
				sx={{
					h: 75,
				}}
			>
				<HStack justifyContent={'space-around'}>
					<HStack flex={1} space={'md'}>
						{/* <Image
							alt={item.user?.name.slice(0, 1)}
							source={{ uri: item.user?.avatar }}
							contentFit='cover'
							// placeholder={item.user.blurhash}
							transition={100}
							style={{
								borderRadius: 5,
								height: 40,
								width: 40,
								backgroundColor: 'transparent',
							}}
						/> */}
						<Box bg={'$transparent'}>
							<VStack>
								{item.Members.length > 2 && item.name ?
									<Heading lineHeight={'$sm'} fontSize={'$md'} fontWeight={'$bold'}>
										Group: {item.name} {item.Members.length}
									</Heading>
									:
									<Heading lineHeight={'$sm'} fontSize={'$md'} fontWeight={'$bold'}>
										Chat: {item.Members.filter(item => item.id !== rdmData?.refreshDeviceManager?.Profile?.id)[0].IdentifiableInformation.firstname}
									</Heading>
								}
								<Text
									fontSize={'$xs'}
									numberOfLines={2}
									textBreakStrategy={'balanced'}
									lineBreakMode={'tail'}
								>
									{/* {item.messages[0].message} */}
								</Text>
							</VStack>
						</Box>
					</HStack>
					{/* <Badge
						h={30}
						w={30}
						bg='$primary500'
						rounded='$lg'
						zIndex={1}
						variant='solid'
						alignSelf='center'
					>
						{`${item.badge}`}
					</Badge> */}
				</HStack>
			</Pressable>
		</Box>
	)
}

export default HorizontalMessageNotification

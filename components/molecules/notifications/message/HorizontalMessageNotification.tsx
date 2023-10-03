// TODO: Create message navigator
import { Box, HStack, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { Image } from 'expo-image'

const HorizontalMessageNotification = ({ item }) => {
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
						<Image
							alt={item.user?.name.slice(0, 1)}
							source={{ uri: item.user?.avatar }}
							contentFit='cover'
							placeholder={item.user.blurhash}
							transition={100}
							style={{
								borderRadius: 5,
								height: 40,
								width: 40,
								backgroundColor: 'transparent',
							}}
						/>
						<Box bg={'$transparent'}>
							<VStack>
								<Heading lineHeight={'$sm'} fontSize={'$md'} fontWeight={'$bold'}>
									{item.user.name}
								</Heading>
								<Text
									fontSize={'$xs'}
									numberOfLines={2}
									textBreakStrategy={'balanced'}
									lineBreakMode={'tail'}
								>
									{item.messages[0].message}
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

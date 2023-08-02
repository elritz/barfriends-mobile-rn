// TODO: Create message navigator
import { Badge, Box, HStack, Heading, Pressable, Text, VStack } from '@components/core'
import { Image } from 'react-native'

interface HorizontalMessageNotificationProps {
	item: {
		avatar: string
		name: string
		messages: []
		time: string
		badge: number
	}
}

const HorizontalMessageNotification = ({ item }: HorizontalMessageNotificationProps) => {
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
					borderBottomColor: '$dark500',
				},
			}}
		>
			<Pressable
				onPress={() => {
					// router.push({
					// 	pathname: '(app)/permission/medialibrary',
					// })
				}}
				sx={{
					h: 75,
				}}
			>
				<HStack justifyContent={'space-around'}>
					<HStack flex={1} space={'md'}>
						<Image
							alt={item.name.slice(0, 1)}
							source={{ uri: item.avatar }}
							style={{
								borderRadius: 15,
								height: 45,
								width: 45,
								backgroundColor: 'transparent',
							}}
						/>
						<Box>
							<VStack>
								<Heading fontSize={'$md'} fontWeight={'$bold'}>
									{item.name}
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
					<Badge
						h={30}
						w={30}
						bg='$primary500'
						rounded='$lg'
						zIndex={1}
						variant='solid'
						alignSelf='center'
					>
						{`${item.badge}`}
					</Badge>
				</HStack>
			</Pressable>
		</Box>
	)
}

export default HorizontalMessageNotification

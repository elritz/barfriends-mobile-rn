import { Box, Pressable, Text } from '@components/core'
import { Relationship } from '@graphql/generated'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Image } from 'react-native'
import { useWindowDimensions } from 'react-native'

interface CardFullImageNameEmojiProps {
	item: Relationship
	cardWidth: number
}

export const CardFullImageNameEmoji = ({ item, cardWidth }: CardFullImageNameEmojiProps) => {
	const { width } = useWindowDimensions()
	const router = useRouter()
	if (!item) {
		return null
	}
	return (
		<Pressable
			onPress={() => {
				router.push({
					pathname: '(app)/public/personal',
					params: {
						profileid: item?.friendProfile?.id,
					},
				})
			}}
		>
			<Box
				style={{
					backgroundColor: 'transparent',
					borderColor: 'transparent',
					margin: width / (width / 3),
					height: 170,
					width: cardWidth,
				}}
			>
				<Box
					position={'absolute'}
					bottom={'$0'}
					left={'$0'}
					right={'$0'}
					w={'100%'}
					zIndex={10}
					rounded={'$md'}
					overflow={'hidden'}
				>
					<LinearGradient colors={['transparent', '#000000d1']}>
						<Box style={{ padding: 4 }}>
							<Text
								fontSize={'$md'}
								textAlign={'center'}
								fontWeight={'bold'}
								sx={{
									_light: {
										color: 'white',
									},
									_dark: {
										color: 'white',
									},
								}}
								style={{
									shadowOffset: {
										width: 0,
										height: 3,
									},
									shadowOpacity: 0.27,
									shadowRadius: 4.65,
									elevation: 6,
								}}
							>
								{capitalizeFirstLetter(item.friendProfile?.IdentifiableInformation?.firstname)}
							</Text>
							<Text
								textAlign={'center'}
								fontWeight={'bold'}
								sx={{
									color: 'white',
								}}
								style={{
									shadowOffset: {
										width: 0,
										height: 3,
									},
									shadowOpacity: 0.27,
									shadowRadius: 4.65,
									elevation: 6,
								}}
							>
								@{item.friendProfile?.IdentifiableInformation?.username}
							</Text>
						</Box>
					</LinearGradient>
				</Box>
				<Image
					alt={'Profile image'}
					source={{ uri: item.friendProfile?.photos?.url }}
					resizeMode='cover'
					style={{ height: 170, flexDirection: 'column-reverse', borderRadius: 10 }}
				/>
			</Box>
		</Pressable>
	)
}

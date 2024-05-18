import { Box, Pressable, Text } from '@gluestack-ui/themed'
import { Relationship } from '#/graphql/generated'
import { capitalizeFirstLetter } from '#/util/helpers/capitalizeFirstLetter'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
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
					pathname: `/(app)/public/personal/${item?.friendProfile?.IdentifiableInformation?.username}`,
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
							>
								{/* {capitalizeFirstLetter(item.friendProfile?.IdentifiableInformation?.firstname)} */}
								{item.friendProfile?.IdentifiableInformation?.firstname}
							</Text>
							<Text
								textAlign={'center'}
								fontWeight={'bold'}
								sx={{
									color: 'white',
								}}
							>
								@{item.friendProfile?.IdentifiableInformation?.username}
							</Text>
						</Box>
					</LinearGradient>
				</Box>
				<Image
					alt={'Profile image'}
					source={{ uri: item.friendProfile?.profilePhoto?.url }}
					contentFit='cover'
					style={{ height: 170, flexDirection: 'column-reverse', borderRadius: 10 }}
				/>
			</Box>
		</Pressable>
	)
}

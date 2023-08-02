import { FriendsListEmptyState } from './FriendsListEmptyState'
import { useReactiveVar } from '@apollo/client'
import { Divider, HStack, VStack } from '@components/core'
import { CardFullImageNameEmoji } from '@components/molecules/personal/CardFullImageNameEmoji'
import { AuthorizationReactiveVar } from '@reactive'
import { useWindowDimensions } from 'react-native'

const numColumns = 3

export const FriendsList = ({}) => {
	const { width } = useWindowDimensions()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const cardWidth = (width * 0.9) / numColumns

	const friendslist = rAuthorizationVar?.DeviceProfile?.Profile?.Relationships
	if (!friendslist) return null

	return (
		<VStack
			sx={{
				h: '100%',
			}}
			mx={'$1'}
			flex={1}
			flexDirection={'column'}
		>
			{friendslist.length ? (
				<>
					<HStack justifyContent={'flex-start'} flexWrap={'wrap'}>
						{friendslist.map((item, index) => {
							return <CardFullImageNameEmoji key={index} cardWidth={cardWidth} item={item} />
						})}
					</HStack>
					<Divider style={{ marginVertical: 10 }} />
				</>
			) : (
				<FriendsListEmptyState />
			)}
		</VStack>
	)
}

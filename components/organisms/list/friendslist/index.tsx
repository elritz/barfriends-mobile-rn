import { VStack } from "#/components/ui/vstack";
import { HStack } from "#/components/ui/hstack";
import { Divider } from "#/components/ui/divider";
import { FriendsListEmptyState } from './FriendsListEmptyState'
import { useReactiveVar } from '@apollo/client'
import { CardFullImageNameEmoji } from '#/components/molecules/personal/CardFullImageNameEmoji'
import { AuthorizationReactiveVar } from '#/reactive'
import { useWindowDimensions } from 'react-native'

const numColumns = 3

export const FriendsList = ({}) => {
	const { width } = useWindowDimensions()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const cardWidth = (width * 0.9) / numColumns

	const friendslist = rAuthorizationVar?.Profile?.Relationships

	if (!friendslist) return null

	return (
        <VStack className="h-[100%] mx-1 flex-1 flex-column">
            {friendslist.length ? (
				<>
					<HStack className="justify-start flex-wrap">
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
    );
}

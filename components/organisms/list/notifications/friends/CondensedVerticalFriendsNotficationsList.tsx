import { Box } from '@components/core'
import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import { FriendRequestNotification } from '@graphql/generated'

interface Props<T> {
	data: T[] | undefined | null
	renderItem: (item: FriendRequestNotification) => React.ReactNode
	keyExtractor: (item: T) => string
}

const CondensedVerticalFriendsNotficationsList = <T extends FriendRequestNotification>({
	data,
}: Props<T>) => {
	return (
		<>
			{data?.length ? (
				<Box
					flex={1}
					sx={{
						h: '100%',
					}}
					flexDirection={'column'}
					rounded={'$md'}
					overflow={'hidden'}
				>
					{data.map((item, index) => (
						<CondensedHorizontalFriendNotifciation key={index} item={item} />
					))}
				</Box>
			) : null}
		</>
	)
}

export default CondensedVerticalFriendsNotficationsList

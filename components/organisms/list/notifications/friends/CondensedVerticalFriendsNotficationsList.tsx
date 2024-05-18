import { CondensedHorizontalFriendNotifciation } from '#/components/molecules'
import { Box, VStack } from '@gluestack-ui/themed'
import { useGetNotificationsQuery } from '#/graphql/generated'

const CondensedVerticalFriendsNotficationsList = () => {
	const { data, loading, error } = useGetNotificationsQuery({
		nextFetchPolicy: 'cache-first',
	})

	if (loading || !data?.getNotifications.friendRequestNotifications?.length) return null

	return (
		<Box>
			<VStack
				flex={1}
				sx={{
					py: '$3',
				}}
				flexDirection={'column'}
				rounded={'$md'}
			>
				{data?.getNotifications.friendRequestNotifications.map((item, index) => {
					return <CondensedHorizontalFriendNotifciation item={item} key={index} />
				})}
			</VStack>
		</Box>
	)
}

export default CondensedVerticalFriendsNotficationsList

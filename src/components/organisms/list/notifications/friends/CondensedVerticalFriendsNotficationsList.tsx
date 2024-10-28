import {useGetNotificationsQuery} from '#/graphql/generated'
import {CondensedHorizontalFriendNotifciation} from '#/src/components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import {Box} from '#/src/components/ui/box'
import {VStack} from '#/src/components/ui/vstack'

const CondensedVerticalFriendsNotficationsList = () => {
  const {data, loading} = useGetNotificationsQuery({
    nextFetchPolicy: 'cache-first',
  })

  if (loading || !data?.getNotifications?.friendRequestNotifications?.length)
    return null

  return (
    <Box>
      <VStack className="flex-column flex-1 py-3">
        {data?.getNotifications.friendRequestNotifications.map(
          (item, index) => {
            return (
              <CondensedHorizontalFriendNotifciation item={item} key={index} />
            )
          },
        )}
      </VStack>
    </Box>
  )
}

export default CondensedVerticalFriendsNotficationsList

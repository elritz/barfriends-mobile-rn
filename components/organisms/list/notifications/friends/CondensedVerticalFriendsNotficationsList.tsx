import { VStack } from "#/components/ui/vstack";
import { Box } from "#/components/ui/box";
import { CondensedHorizontalFriendNotifciation } from "#/components/molecules";
import { useGetNotificationsQuery } from "#/graphql/generated";

const CondensedVerticalFriendsNotficationsList = () => {
  const { data, loading, error } = useGetNotificationsQuery({
    nextFetchPolicy: "cache-first",
  });

  if (loading || !data?.getNotifications.friendRequestNotifications?.length)
    return null;

  console.log(
    "🚀 ~ CondensedVerticalFriendsNotficationsList ~ data?.getNotifications.friendRequestNotifications:",
    data?.getNotifications.friendRequestNotifications,
  );
  return (
    <Box>
      <VStack className="flex-column flex-1 py-3">
        {data?.getNotifications.friendRequestNotifications.map(
          (item, index) => {
            return (
              <CondensedHorizontalFriendNotifciation item={item} key={index} />
            );
          },
        )}
      </VStack>
    </Box>
  );
};

export default CondensedVerticalFriendsNotficationsList;

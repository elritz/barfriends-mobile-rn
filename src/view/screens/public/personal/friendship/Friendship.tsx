import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { AuthorizationReactiveVar } from "#/reactive";

export default function Friendship() {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);

  // const {
  // 	data: GRFRSData,
  // 	loading: GRFRSLoading,
  // 	error: GRFRSError,
  // } = useGetRelationshipFriendRequestStatusQuery({
  // 	skip: !route.params?.profileId,
  // 	fetchPolicy: 'network-only',
  // 	variables: {
  // 		profileId: String(route.params.profileId),
  // 	},
  // })

  // if (GRFRSLoading || !GRFRSData) return null

  // const Friends = (): ReactElement | null => {
  // 	switch (GRFRSData.getRelationshipFriendRequestStatus?.__typename) {
  // 		case 'Request':
  // 			return null

  // 		case 'RejectedFriendsResponse':
  // 			return null
  // 		case 'Relationship': {
  // 			const created = DateTime.fromISO(
  // 				GRFRSData.getRelationshipFriendRequestStatus.createdAt,
  // 			).toFormat('yyyy LLL dd')
  // 			return (
  // 				<Box>
  // 					<Text  fontSize={'sm'} fontWeight={'bold'} textAlign={'center'}>
  // 						Friends since
  // 					</Text>
  // 					<Text  fontSize={'lg'} fontWeight={'bold'}>
  // 						{created}
  // 					</Text>
  // 				</Box>
  // 			)
  // 		}
  // 		default:
  // 			return null
  // 	}
  // }

  return (
    <Box className="flex-1 items-center rounded-xl bg-[light.50] p-3 dark:bg-[light.800]">
      <Ionicons size={24} name={"person"} />
      {/* <Friends /> */}
    </Box>
  );
}

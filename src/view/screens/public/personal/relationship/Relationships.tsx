import { Text } from "#/src/components/ui/text";
import { Box } from "#/src/components/ui/box";
import { useRoute } from "@react-navigation/native";
import { DateTime } from "luxon";
import { ReactElement } from "react";

export default function Relationships() {
  const route = useRoute();

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
  // 		case 'FriendRequest':
  // 			return null

  // 		case 'RejectedFriendsResponse':
  // 			return null
  // 		case 'Relationship': {
  // 			const created = DateTime.fromISO(
  // 				GRFRSData.getRelationshipFriendRequestStatus.createdAt,
  // 			).toFormat('yyyy LLL dd')
  // 			GRFRSData.getRelationshipFriendRequestStatus.RelationshipStatus
  // 			if (
  // 				!GRFRSData.getRelationshipFriendRequestStatus.RelationshipStatus.includes(
  // 					RelationshipStatus.Dating,
  // 				)
  // 			) {
  // 				return null
  // 			}
  // 			return (
  // 				<Box rounded={'$xl'} flex={1} p={'$3'}>
  // 					<Text  fontSize={'$sm'} fontWeight={'$bold'} textAlign={'center'}>
  // 						Friends since
  // 					</Text>
  // 					<Text  fontSize={'$lg'} fontWeight={'$bold'}>
  // 						{created}
  // 					</Text>
  // 				</Box>
  // 			)
  // 		}
  // 		default:
  // 			return null
  // 	}
  // }

  // return <Friends />
  return null;
}

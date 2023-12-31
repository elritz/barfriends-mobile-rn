import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { AuthorizationReactiveVar } from '@reactive'
import { Box } from '@gluestack-ui/themed'

export default function Friendship() {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

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
	// 					<Text textTransform={'uppercase'} fontSize={'sm'} fontWeight={'bold'} textAlign={'center'}>
	// 						Friends since
	// 					</Text>
	// 					<Text textTransform={'uppercase'} fontSize={'lg'} fontWeight={'bold'}>
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
		<Box
			sx={{
				_light: {
					bg: 'light.50',
				},
				_dark: {
					bg: 'light.800',
				},
			}}
			borderRadius={'$xl'}
			flex={1}
			p={3}
			alignItems={'center'}
		>
			<Ionicons size={24} name={'person'} />
			{/* <Friends /> */}
		</Box>
	)
}

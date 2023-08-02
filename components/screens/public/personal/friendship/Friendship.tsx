import { useReactiveVar } from '@apollo/client'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Relationship, useGetRelationshipFriendRequestStatusQuery } from '@graphql/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { PersonalProfileStackParamList } from '@types'
import { DateTime } from 'luxon'
import { Box, Heading, Icon, Text } from 'native-base'
import { ReactElement } from 'react'

export type PublicProfileRouteProp = RouteProp<
	PersonalProfileStackParamList,
	'PublicPersonalScreen'
>

export default function Friendship() {
	const route = useRoute<PublicProfileRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const {
		data: GRFRSData,
		loading: GRFRSLoading,
		error: GRFRSError,
	} = useGetRelationshipFriendRequestStatusQuery({
		skip: !route.params?.profileId,
		fetchPolicy: 'network-only',
		variables: {
			profileId: String(route.params.profileId),
		},
	})

	if (GRFRSLoading || !GRFRSData) return null

	const Friends = (): ReactElement | null => {
		switch (GRFRSData.getRelationshipFriendRequestStatus?.__typename) {
			case 'FriendRequest':
				return null

			case 'RejectedFriendsResponse':
				return null
			case 'Relationship': {
				const created = DateTime.fromISO(
					GRFRSData.getRelationshipFriendRequestStatus.createdAt,
				).toFormat('yyyy LLL dd')
				return (
					<Box>
						<Text textTransform={'uppercase'} fontSize={'sm'} fontWeight={'bold'} textAlign={'center'}>
							Friends since
						</Text>
						<Text textTransform={'uppercase'} fontSize={'lg'} fontWeight={'bold'}>
							{created}
						</Text>
					</Box>
				)
			}
			default:
				return null
		}
	}

	return (
		<Box
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'light.800',
			}}
			borderRadius={'xl'}
			flex={1}
			p={3}
			alignItems={'center'}
		>
			<Icon as={Ionicons} size={'xl'} name={'person'} my={3} />
			<Friends />
		</Box>
	)
}

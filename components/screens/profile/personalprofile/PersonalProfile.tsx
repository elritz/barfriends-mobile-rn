import ProfilePhoto from '../profilephoto'
import { useReactiveVar } from '@apollo/client'
import { Box, Divider, HStack, Heading, VStack } from '@components/core'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import { FriendsList } from '@components/organisms/list/friendslist'
import CondensedVerticalFriendsNotficationsList from '@components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
import QuickBarfriendCard from '@components/screens/public/venue/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import AddRelationship from '@components/screens/tonight/activity/ask/AddRelationship/AddRelationship'
import { GetNotificationsQuery, ProfileType } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { View } from 'react-native'

type Props = {
	notifications: GetNotificationsQuery | undefined
}

const PersonalScreen = ({ notifications }: Props) => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	if (rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest) {
		return (
			<Box bg='$transparent' my={'$10'} mx={'$3'} flex={1}>
				<View>
					<CardPleaseSignup signupTextId={4} />
					<Divider style={{ marginVertical: 20 }} />
				</View>
			</Box>
		)
	}

	return (
		<Box bg={'transparent'}>
			<View style={{ alignItems: 'center', marginVertical: 20 }}>
				<ProfilePhoto photo={rAuthorizationVar?.DeviceProfile?.Profile?.profilePhoto} />
				<View style={{ marginVertical: 20 }}>
					<Heading
						fontSize={'$3xl'}
						numberOfLines={2}
						style={{ textTransform: 'capitalize', textAlign: 'center' }}
					>
						{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.fullname}
					</Heading>
					<Heading fontSize={'$md'} style={{ textTransform: 'uppercase', textAlign: 'center' }}>
						@{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.username}
					</Heading>
				</View>
				{/* <Divider style={{ marginVertical: 10 }} /> */}
			</View>
			<Box mx={'$2'}>
				<CondensedVerticalFriendsNotficationsList
					keyExtractor={item => String(item.id)}
					renderItem={item => <CondensedHorizontalFriendNotifciation item={item} />}
					data={notifications?.getNotifications?.friendRequestNotifications}
				/>
			</Box>
			<VStack m={'$3'} space={'md'} justifyContent={'space-around'}>
				<HStack space={'md'} justifyContent={'space-around'}>
					<Box
						flex={1}
						sx={{
							h: 200,
						}}
						justifyContent={'center'}
						alignItems={'center'}
						rounded='$lg'
						px={'$5'}
					>
						<QuickBarfriendCard color={'#ff7000'} showIcon={false} logosize={40} qrcodesize={140} />
					</Box>
					<AddRelationship />
				</HStack>
			</VStack>
			<Box mx={'$2'}>
				<FriendsList />
			</Box>
		</Box>
	)
}

export default PersonalScreen

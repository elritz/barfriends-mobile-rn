import ProfilePhoto from '../profilephoto'
import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import { FriendsList } from '@components/organisms/list/friendslist'
import CondensedVerticalFriendsNotficationsList from '@components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
import QuickBarfriendCard from '@components/screens/public/venue/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import AddRelationship from '@components/screens/tonight/activity/ask/AddRelationship/AddRelationship'
import { Box, HStack, Heading, VStack } from '@gluestack-ui/themed'
import { ProfileType } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { DateTime } from 'luxon'
import { View } from 'react-native'

type Props = {
	notifications: undefined
}

const PersonalScreen = ({ notifications }: Props) => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	if (rAuthorizationVar?.Profile?.ProfileType === ProfileType.Guest) {
		return (
			<Box bg='$red900' mx={'$3'} flex={1}>
				<CardPleaseSignup signupTextId={4} />
			</Box>
		)
	}

	return (
		<Box bg={'transparent'}>
			<HStack style={{ alignItems: 'flex-start', marginVertical: 20 }} mx={'$3'} space={'md'}>
				<ProfilePhoto photo={rAuthorizationVar?.Profile?.profilePhoto} />
				<VStack space='sm'>
					<VStack flex={1} space='sm'>
						<View>
							<Heading
								fontSize={'$2xl'}
								fontWeight='$bold'
								numberOfLines={1}
								lineHeight={'$xl'}
								style={{ textTransform: 'capitalize' }}
							>
								{rAuthorizationVar?.Profile?.IdentifiableInformation?.fullname}
							</Heading>
							<Heading
								fontSize={'$lg'}
								fontWeight='$bold'
								letterSpacing={1}
								numberOfLines={1}
								lineHeight={'$xl'}
							>
								@{rAuthorizationVar?.Profile?.IdentifiableInformation?.username}
							</Heading>
						</View>
					</VStack>
					<View>
						<Heading fontSize={'$sm'} numberOfLines={1} lineHeight={'$sm'}>
							{DateTime.fromISO(rAuthorizationVar?.Profile?.IdentifiableInformation?.birthday).toFormat(
								'yyyy LLL dd',
							)}
						</Heading>
					</View>
				</VStack>
			</HStack>
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

import ProfilePhoto from '../profilephoto'
import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '#/components/molecules/asks/signuplogin'
import { FriendsList } from '#/components/organisms/list/friendslist'
import CondensedVerticalFriendsNotficationsList from '#/components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
import QuickBarfriendCard from '#/components/screens/public/venue/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import AddRelationship from '#/components/screens/tonight/activity/ask/AddRelationship/AddRelationship'
import { View, Box, HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import { ProfileType } from '#/graphql/generated'
import { AuthorizationReactiveVar } from '#/reactive'
import { DateTime } from 'luxon'

const PersonalScreen = () => {
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
							<VStack flex={1} position='relative' mt={'$3'} space='sm'>
								<HStack justifyContent='space-between'>
									<Text
										fontSize={'$sm'}
										fontWeight={'$medium'}
										position='absolute'
										numberOfLines={1}
										sx={{
											top: -20,
										}}
									>
										@{rAuthorizationVar?.Profile?.IdentifiableInformation?.username}
									</Text>
									<HStack>
										<Text
											lineHeight={'$2xl'}
											fontSize={'$3xl'}
											letterSpacing={'$sm'}
											numberOfLines={2}
											fontWeight='$bold'
										>
											{rAuthorizationVar?.Profile?.IdentifiableInformation?.fullname}
										</Text>
									</HStack>
								</HStack>
								<Heading fontWeight='$light' fontSize={'$md'} numberOfLines={1} lineHeight={'$xs'}>
									{DateTime.fromISO(rAuthorizationVar?.Profile?.IdentifiableInformation?.birthday).toFormat(
										'yyyy LLLL dd',
									)}
								</Heading>
							</VStack>
						</View>
					</VStack>
					<View></View>
				</VStack>
			</HStack>
			<View mx={'$3'}>
				<CondensedVerticalFriendsNotficationsList />
			</View>
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

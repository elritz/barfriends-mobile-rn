import Details from '../details/Details'
import { useReactiveVar } from '@apollo/client'
import { Box, Button, HStack, Text, VStack } from '@components/core'
import SignupModal from '@components/molecules/modals/signupaskmodal'
import { Ionicons } from '@expo/vector-icons'
import { Profile, useGetRelationshipFriendRequestStatusQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { useState } from 'react'

type Props = {
	profile: Profile
}

export default function Actions({ profile }: Props) {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [showMore, setShowMore] = useState(false)
	const {
		isOpen: isOpenSignupModal,
		onOpen: onOpenSignupModal,
		onClose: onCloseSignupModal,
	} = useDisclose()

	const isGuest = rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST'

	const {
		data: GRFRSData,
		loading: GRFRSLoading,
		error: GRFRSError,
	} = useGetRelationshipFriendRequestStatusQuery({
		skip: !profile.id,
		fetchPolicy: 'network-only',
		variables: {
			profileId: String(profile.id),
		},
	})

	if (GRFRSLoading || !GRFRSData) return null

	return (
		<VStack rounded={'$xl'} flex={1} py={'$3'} px={'$2'} space={'md'}>
			<HStack alignItems={'flex-start'}>
				{/* <RelationshipModal isOpen={isOpenRelationshipModal} onClose={onCloseRelaationshipModal} /> */}
				<SignupModal isOpen={isOpenSignupModal} onClose={onCloseSignupModal} />

				<Details profile={profile} />
				<Button
					onPress={() => {
						isGuest
							? onOpenSignupModal()
							: router.push({
									pathname: '(app)/messages',
									params: {
										roomid: '',
									},
							  })
					}}
					rounded={'$md'}
				>
					<Ionicons
						name='chatbubble-ellipses'
						size={28}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
						style={{
							zIndex: 100,
							justifyContent: 'center',
							alignSelf: 'center',
						}}
					/>
				</Button>
			</HStack>

			<Box bg={'$transparent'} flex={1}>
				{profile?.DetailInformation?.description?.length ? (
					<Box bg={'$transparent'}>
						{!showMore ? (
							<Text fontSize={'$lg'} numberOfLines={2}>
								{profile.DetailInformation?.description}
							</Text>
						) : (
							<Text fontSize={'$lg'}>{profile.DetailInformation?.description}</Text>
						)}
						<Button my={'$2'} onPress={() => setShowMore(!showMore)} variant={'link'}>
							<Text>{showMore ? 'Show Less' : 'Show More'}</Text>
						</Button>
					</Box>
				) : (
					<Box my={2}>
						<Text h={'auto'} fontSize={'$lg'}>
							No description available
						</Text>
					</Box>
				)}
			</Box>
		</VStack>
	)
}

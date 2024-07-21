import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { Button } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import Details from '../details/Details'
import { useReactiveVar } from '@apollo/client'
import SignupModal from '#/components/molecules/modals/signupaskmodal'
import { Ionicons } from '@expo/vector-icons'
import { Profile } from '#/graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import { useDisclose } from '#/util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { useState } from 'react'

type Props = {
	profile: Partial<Profile> | undefined | null
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

	const isGuest = rAuthorizationVar?.Profile?.ProfileType === 'GUEST'

	// const {
	// 	data: GRFRSData,
	// 	loading: GRFRSLoading,
	// 	error: GRFRSError,
	// } = useGetRelationshipFriendRequestStatusQuery({
	// 	skip: !profile.id,
	// 	fetchPolicy: 'network-only',
	// 	variables: {
	// 		profileId: String(profile.id),
	// 	},
	// })

	// if (GRFRSLoading || !GRFRSData) return null

	return (
        <VStack space={'md'} className="rounded-xl flex-1 py-3 px-2">
            <HStack className="items-start">
				{/* <RelationshipModal isOpen={isOpenRelationshipModal} onClose={onCloseRelaationshipModal} /> */}
				<SignupModal isOpen={isOpenSignupModal} onClose={onCloseSignupModal} />

				<Details profile={profile} />
				<Button
					onPress={() => {
						isGuest
							? onOpenSignupModal()
							: router.push({
									pathname: '/(app)/conversation',
									params: {
										roomid: '',
									},
							  })
					}}
					className="rounded-md"
				>
					<Ionicons
						name='chatbubble-ellipses'
						size={28}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.light100
						}
						style={{
							zIndex: 100,
							justifyContent: 'center',
							alignSelf: 'center',
						}}
					/>
				</Button>
			</HStack>
            <Box className="bg-transparent flex-1">
				{profile?.DetailInformation?.description?.length ? (
					<Box className="bg-transparent">
						{!showMore ? (
							<Text numberOfLines={2} className="text-lg">
								{profile.DetailInformation?.description}
							</Text>
						) : (
							<Text className="text-lg">{profile.DetailInformation?.description}</Text>
						)}
						<Button onPress={() => setShowMore(!showMore)} variant={'link'} className="my-2">
							<Text>{showMore ? 'Show Less' : 'Show More'}</Text>
						</Button>
					</Box>
				) : (
					<Box className="my-2">
						<Text className="h-auto text-lg">
							No description available
						</Text>
					</Box>
				)}
			</Box>
        </VStack>
    );
}

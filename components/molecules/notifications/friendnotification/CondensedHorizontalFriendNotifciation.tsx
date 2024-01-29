import { useReactiveVar } from '@apollo/client'
import { HStack, VStack, Button, Text, ButtonText, View } from '@gluestack-ui/themed'
import {
	Request,
	useAcceptFriendRequestMutation,
	useDeclineFriendRequestMutation,
	useDeleteFriendRequestMutation,
	useGetNotificationsLazyQuery,
	useGetNotificationsQuery,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'

interface CondensedHorizontalFriendNotifciationProps<T> {
	item: Request | null | undefined
}

export const CondensedHorizontalFriendNotifciation = <T,>({
	item,
}: CondensedHorizontalFriendNotifciationProps<T>) => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()

	const [deleteFriendRequestMutation, { data: dFRData, loading: dFRLoading, error: dFRError }] =
		useDeleteFriendRequestMutation({
			update(cache, { data }) {
				if (item) {
					const r = cache.evict({ id: cache.identify(item) })
				}
			},
		})

	const [acceptFriendRequestMutation, { data: aFRMData, loading: aFRMLoading, error: aFRMError }] =
		useAcceptFriendRequestMutation({
			onCompleted: data => {
				// data.acceptFriendRequest.__typename === 'Relationship' &&
				// updateQuery(prevData => {
				// 	return {
				// 		...prevData,
				// 		publicProfile: {
				// 			...prevData?.publicProfile,
				// 			relationship: data.acceptFriendRequest,
				// 		},
				// 	}
				// })
			},
		})

	const [declineFriendRequestMutation, { data: dFRMData, loading: dFRMLoading, error: dFRMError }] =
		useDeclineFriendRequestMutation({
			onCompleted: data => {
				// updateQuery(prevData => {
				// 	return {
				// 		...prevData,
				// 		publicProfile: {
				// 			...prevData?.publicProfile,
				// 			relationship: null,
				// 		},
				// 	}
				// })
			},
		})

	const currentUserIsSender = item?.senderProfile?.id === rAuthorizationVar?.Profile?.id

	console.log(`🚀 -------------------------------------------------------------------🚀`)
	console.log(`🚀 ~ rAuthorizationVar?.Profile?.id:`, rAuthorizationVar?.Profile?.id)
	console.log(`🚀 -------------------------------------------------------------------🚀`)

	console.log(`🚀 -----------------------------------------------------🚀`)
	console.log(`🚀 ~ item?.senderProfile?.id:`, item?.senderProfile?.id)
	console.log(`🚀 -----------------------------------------------------🚀`)

	console.log(`🚀 ---------------------------------------------🚀`)
	console.log(`🚀 ~ currentUserIsSender:`, currentUserIsSender)
	console.log(`🚀 ---------------------------------------------🚀`)

	const receiver = item?.recievers[0]

	// console.log('item ----------------------- :>> ', JSON.stringify(item, null, 2))

	const SectionContainer = ({ children }) => {
		return (
			<View
				style={{
					marginHorizontal: 4,
					padding: 10,
					overflow: 'hidden',
					borderBottomWidth: 0.35,
				}}
			>
				{children}
			</View>
		)
	}

	return (
		<>
			{currentUserIsSender ? (
				<SectionContainer>
					<HStack alignItems='center' justifyContent='space-between' space='md' flex={1} h={'100%'}>
						<VStack space='xs' flex={1}>
							<Text flex={1} fontSize={'$sm'} fontWeight='$medium'>
								Barfriend request sent to
							</Text>
							<Text
								flex={1}
								flexWrap='wrap'
								fontSize={'$lg'}
								fontWeight='$medium'
								textTransform='capitalize'
							>
								{receiver?.Profile?.IdentifiableInformation?.fullname}
							</Text>
						</VStack>
						<Button
							rounded={'$lg'}
							variant='outline'
							size='xs'
							disabled={dFRLoading}
							onPress={() => {
								item?.NotificationType === 'FRIEND_REQUEST' &&
									deleteFriendRequestMutation({
										variables: {
											friendRequestId: item.id,
										},
									})
							}}
						>
							<Text fontSize={'$sm'} fontWeight='$bold'>
								Unsend
							</Text>
						</Button>
					</HStack>
				</SectionContainer>
			) : (
				<SectionContainer>
					<HStack w={'$full'} justifyContent='space-between' alignItems='center'>
						<VStack space='sm'>
							<Text
								flex={1}
								flexWrap='wrap'
								fontSize={'$lg'}
								fontWeight='$medium'
								textTransform='capitalize'
							>
								{receiver?.Profile?.IdentifiableInformation?.fullname}
							</Text>
							<Text flex={1} flexWrap='wrap' fontSize={'$sm'} fontWeight='$medium'>
								Wants to be Barfriends
							</Text>
						</VStack>
						<HStack space='sm'>
							<Button
								size='xs'
								variant='link'
								height={28}
								onPress={() => {
									declineFriendRequestMutation({
										variables: {
											friendRequestId: String(item?.id),
											notificationStatusId: String(receiver?.NotificationStatus.id),
										},
									})
								}}
							>
								<Text fontSize={'$sm'} fontWeight='$bold'>
									Decline
								</Text>
							</Button>
							<Button
								size='xs'
								height={28}
								onPress={() => {
									acceptFriendRequestMutation({
										variables: {
											friendRequestId: String(item?.id),
											notificationStatusId: String(receiver?.NotificationStatus.id),
										},
									})
								}}
							>
								<ButtonText fontSize={'$sm'}>Accept</ButtonText>
							</Button>
						</HStack>
					</HStack>
				</SectionContainer>
			)}
		</>
	)
}

{
	/* {currentUserIsSender ? (
				<HStack justifyContent={'space-between'} alignItems={'center'}>
					<Pressable
					// onPress={() => {
					// 	router.navigate({
					// 		pathname: `/(app)/public/personal/${item. ?.IdentifiableInformation?.username}`,
					// 	})
					// }}
					>
						<HStack alignItems={'flex-start'} space={'md'}>
							<Image source={{ uri: receiver?.Profile?.profilePhoto?.url }} style={{ borderRadius: 20 }} />
							<VStack
								sx={{
									mt: -1,
								}}
							>
								<Text fontSize={'$md'} numberOfLines={1}>
									{/* {capitalizeFirstLetter(item.receiverProfile?.IdentifiableInformation?.fullname)} 
									{receiver?.Profile?.IdentifiableInformation?.fullname}
								</Text>
								<Heading fontSize={'$sm'}>@{receiver?.Profile?.IdentifiableInformation?.username}</Heading>
							</VStack>
						</HStack>
					</Pressable>
					<CancelFriendNotificationModal
						profileId={String(receiver?.Profile?.id)}
						friendRequestId={String(receiver?.Profile?.id)}
						isOpen={isOpenCancelFriendNotification}
						onClose={onCloseCancelFriendNotification}
					/>
					<Button
						bg={'$primary500'}
						variant={'outline'}
						size={'sm'}
						rounded={'$md'}
						isDisabled={DFRLoading || AFRLoading}
						px={'$3'}
						mx={'$2'}
						sx={{
							h: 30,
							':disabled': {
								opacity: 100,
							},
						}}
						onPress={() => {
							currentUserIsSender && onOpenCancelFriendNotification()
						}}
					>
						<Text fontSize={'$md'} lineHeight={'$xs'} fontWeight='$black' textTransform='uppercase'>
							Requestedww
						</Text>
					</Button>
				</HStack>
			) : (
				<HStack justifyContent={'space-between'}>
					<Pressable
						onPress={() => {
							router.navigate({
								pathname: `/(app)/public/personal/${receiver?.Profile?.IdentifiableInformation?.username}`,
							})
						}}
					>
						<HStack alignItems={'flex-start'} space={'md'}>
							<Image
								source={{ uri: item.senderProfile?.photos?.url }}
								style={{
									borderRadius: 15,
								}}
								alt={item.senderProfile?.IdentifiableInformation?.fullname || 'Profile photo'}
							/>
							<VStack
								sx={{
									mt: -1,
								}}
							>
								<Text fontSize={'$md'} numberOfLines={1}>
									{/* {capitalizeFirstLetter(item.senderProfile?.IdentifiableInformation?.fullname)}
									{item.senderProfile?.IdentifiableInformation?.fullname}
								</Text>
								<Heading fontSize={'$sm'}>@{item.senderProfile?.IdentifiableInformation?.username}</Heading>
							</VStack>
						</HStack>
					</Pressable>
					<HStack space={'md'} justifyContent={'space-around'} alignItems={'center'}>
						<Button
							px={'$4'}
							py={'$2'}
							rounded={'$md'}
							isDisabled={DFRLoading || AFRLoading}
							sx={{
								':disabled': {
									opacity: 100,
								},
							}}
							onPress={() =>
								acceptFriendRequestMutation({
									variables: {
										notificationStatusId: '',
										friendRequestId: String(item.id),
										venueIdMetAt: '',
									},
								})
							}
						>
							<Text fontWeight='$black' fontSize={'$md'} textTransform='uppercase'>
								Accept
							</Text>
						</Button>
						<Button
							px={'$2'}
							py={'$2'}
							isDisabled={DFRLoading || AFRLoading}
							onPress={() =>
								declineFriendRequestMutation({
									variables: {
										friendRequestId: String(item.id),
									},
								})
							}
						>
							<Ionicons name='close' size={30} rounded={'$full'} />
						</Button>
					</HStack>
				</HStack>
			)} 
		</Box>*/
}

// 	{
//   "__typename": "Request",
//   "NotificationFriendRequest": [
//     {
//       "__typename": "Notifications",
//       "id": "a006c6ba-af96-4ca3-8466-e1ceff0ae169",
//       "profileId": "2f02bfbd-423f-4827-a349-456e0e9ae20f"
//     }
//   ],
//   "NotificationMessage": [],
//   "createdAt": "2024-01-27T18:12:17.132Z",
//   "id": "12d213ee-8f07-4e32-a1da-72f92d67af80",
//   "recievers": [
//     {
//       "__typename": "RequestReceiver",
//       "id": "0b5b1245-98a0-4716-9655-c610272af557"
//     }
//   ],
//   "senderProfile": {
//     "__typename": "Profile",
//     "id": "bfffbcb2-8833-4831-b5ae-bfc680a7d210"
//   },
//   "senderProfileId": "bfffbcb2-8833-4831-b5ae-bfc680a7d210",
//   "updatedAt": "2024-01-27T18:12:17.132Z"
// }

// const [acceptFriendRequestMutation, { data: AFRData, loading: AFRLoading, error: AFRError }] =
// 	useAcceptFriendRequestMutation({
// 		update(cache, { data }) {
// 			const { getNotifications }: any = cache.readQuery({
// 				query: GET_NOTIFICATIONS_QUERY,
// 			})

// 			if (data?.acceptFriendRequest?.id) {
// 				cache.writeQuery({
// 					query: GET_NOTIFICATIONS_QUERY,
// 					data: {
// 						getNotifications: getNotifications.friendRequestNotifications.filter(notification => {
// 							notification.id !== String(data.acceptFriendRequest?.id)
// 						}),
// 					},
// 				})
// 			}
// 		},
// 	})

// const [declineFriendRequestMutation, { data: DFRData, loading: DFRLoading, error: DFRError }] =
// 	useDeleteFriendRequestMutation({
// 		update(cache, { data }) {
// 			if (data?.deleteFriendRequest) {
// 				const { getNotifications }: any = cache.readQuery({
// 					query: GET_NOTIFICATIONS_QUERY,
// 				})
// 				if (data?.deleteFriendRequest) {
// 					const filteredNotification = getNotifications.friendRequestNotifications.filter(
// 						notification => {
// 							if (notification.id === item.id) {
// 								return false
// 							}
// 							return true
// 						},
// 					)

// 					cache.writeQuery({
// 						query: GET_NOTIFICATIONS_QUERY,
// 						data: {
// 							getNotifications: filteredNotification,
// 						},
// 					})
// 				}
// 			}
// 		},
// 	})

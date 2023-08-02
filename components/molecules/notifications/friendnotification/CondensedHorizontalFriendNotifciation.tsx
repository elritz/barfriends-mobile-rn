import { useReactiveVar } from '@apollo/client'
// import CancelFriendNotificationModal from '@components/molecules/modals/cancelfriendnotioficationmodal/CancelFriendNotificationModal'
import { Ionicons } from '@expo/vector-icons'
import { NOTIFICATIONS_QUERY } from '@graphql/DM/profiling/notifications/index.query'
import { useAcceptFriendRequestMutation, useDeleteFriendRequestMutation } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { Image } from 'react-native'

interface CondensedHorizontalFriendNotifciationProps {
	// item: FriendRequestNotification
	item: any
}

export const CondensedHorizontalFriendNotifciation = ({
	item,
}: CondensedHorizontalFriendNotifciationProps) => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const router = useRouter()
	const {
		isOpen: isOpenCancelFriendNotification,
		onOpen: onOpenCancelFriendNotification,
		onClose: onCloseCancelFriendNotification,
	} = useDisclose()

	const [acceptFriendRequestMutation, { data: AFRData, loading: AFRLoading, error: AFRError }] =
		useAcceptFriendRequestMutation({
			update(cache, { data }) {
				const { getNotifications }: any = cache.readQuery({
					query: NOTIFICATIONS_QUERY,
				})

				if (data?.acceptFriendRequest?.id) {
					cache.writeQuery({
						query: NOTIFICATIONS_QUERY,
						data: {
							getNotifications: getNotifications.friendRequestNotifications.filter(notification => {
								notification.id !== String(data.acceptFriendRequest?.id)
							}),
						},
					})
				}
			},
		})

	const [declineFriendRequestMutation, { data: DFRData, loading: DFRLoading, error: DFRError }] =
		useDeleteFriendRequestMutation({
			update(cache, { data }) {
				if (data?.deleteFriendRequest) {
					const { getNotifications }: any = cache.readQuery({
						query: NOTIFICATIONS_QUERY,
					})
					if (data?.deleteFriendRequest) {
						const filteredNotification = getNotifications.friendRequestNotifications.filter(
							notification => {
								if (notification.id === item.id) {
									return false
								}
								return true
							},
						)

						cache.writeQuery({
							query: NOTIFICATIONS_QUERY,
							data: {
								getNotifications: filteredNotification,
							},
						})
					}
				}
			},
		})

	const isSender = item?.senderProfile?.id === rAuthorizationVar?.DeviceProfile?.Profile?.id

	return (
		<Box
			py={'$3'}
			my={'$1'}
			px={'$2'}
			borderBottomColor={'$light300'}
			sx={{
				bg: 'transparent',
				borderBottomWidth: 0.2,
			}}
		>
			{isSender ? (
				<HStack justifyContent={'space-between'} alignItems={'center'}>
					<Pressable
						onPress={() => {
							router.push({
								pathname: '(app)/public/personal',
								params: {
									profileid: String(item.receiverProfile?.id),
								},
							})
						}}
					>
						<HStack alignItems={'flex-start'} space={'md'}>
							<Image
								source={{ uri: item.receiverProfile?.photos?.url }}
								style={{ borderRadius: 20 }}
								alt={item.receiverProfile?.IdentifiableInformation?.fullname || 'Profile photo'}
							/>
							<VStack
								sx={{
									mt: -1,
								}}
							>
								<Text fontSize={'$md'} numberOfLines={1}>
									{capitalizeFirstLetter(item.receiverProfile?.IdentifiableInformation?.fullname)}
								</Text>
								<Heading fontSize={'$sm'}>
									@{item.receiverProfile?.IdentifiableInformation?.username}
								</Heading>
							</VStack>
						</HStack>
					</Pressable>
					{/* <CancelFriendNotificationModal
						profileId={String(item.id)}
						friendRequestId={String(item.id)}
						isOpen={isOpenCancelFriendNotification}
						onClose={onCloseCancelFriendNotification}
					/> */}
					<Button
						colorScheme={'primary'}
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
							isSender && onOpenCancelFriendNotification()
						}}
						isLoadingText={'Requested'}
					>
						<Text fontSize={'$md'} lineHeight={'$xs'} fontWeight='$black' textTransform='uppercase'>
							Requested
						</Text>
					</Button>
				</HStack>
			) : (
				<HStack justifyContent={'space-between'}>
					<Pressable
						onPress={() => {
							router.push({
								pathname: '(app)/public/personal',
								params: {
									profileid: String(item.senderProfile?.id),
								},
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
									{capitalizeFirstLetter(item.senderProfile?.IdentifiableInformation?.fullname)}
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
		</Box>
	)
}

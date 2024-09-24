import { View } from "#/src/components/ui/view";
import { Text } from "#/src/components/ui/text";
import { Button } from "#/src/components/ui/button";
import { VStack } from "#/src/components/ui/vstack";
import { HStack } from "#/src/components/ui/hstack";
import { useReactiveVar } from "@apollo/client";
import {
  Request,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useDeleteFriendRequestMutation,
} from "#/graphql/generated";
import { AuthorizationReactiveVar } from "#/reactive";
import { CloseIcon, Icon } from "#/src/components/ui/icon";
import { Pressable } from "react-native";

interface CondensedHorizontalFriendNotifciationProps<T> {
  item: Request | null | undefined;
}

export const CondensedHorizontalFriendNotifciation = <T,>({
  item,
}: CondensedHorizontalFriendNotifciationProps<T>) => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);

  const [
    deleteFriendRequestMutation,
    { data: dFRData, loading: dFRLoading, error: dFRError },
  ] = useDeleteFriendRequestMutation({
    update(cache, { data }) {
      if (item) {
        const r = cache.evict({ id: cache.identify(item) });
      }
    },
  });

  const [
    acceptFriendRequestMutation,
    { data: aFRMData, loading: aFRMLoading, error: aFRMError },
  ] = useAcceptFriendRequestMutation({
    onCompleted: (data) => {
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
  });

  const [
    declineFriendRequestMutation,
    { data: dFRMData, loading: dFRMLoading, error: dFRMError },
  ] = useDeclineFriendRequestMutation({
    onCompleted: (data) => {
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
  });

  const currentUserIsSender =
    item?.senderProfile?.id === rAuthorizationVar?.Profile?.id;

  const receiver = item?.recievers[0];

  // console.log('item ----------------------- :>> ', JSON.stringify(item, null, 2))

  const SectionContainer = ({ children }) => {
    return (
      <View
        style={{
          padding: 10,
          overflow: "hidden",
          borderBottomWidth: 0.35,
        }}
      >
        {children}
      </View>
    );
  };

  return (
    <>
      {currentUserIsSender ? (
        <SectionContainer>
          <HStack
            space="md"
            className="h-[100%] flex-1 items-center justify-between"
          >
            <VStack space="xs" className="flex-1">
              <Text className="flex-1 flex-wrap text-lg font-medium capitalize">
                {receiver?.Profile?.IdentifiableInformation?.fullname}
              </Text>
            </VStack>
            <Button
              variant={dFRLoading ? "solid" : "outline"}
              size="xs"
              disabled={dFRLoading}
              onPress={() => {
                item?.NotificationType === "FRIEND_REQUEST" &&
                  deleteFriendRequestMutation({
                    variables: {
                      friendRequestId: item.id,
                    },
                  });
              }}
              className="rounded-lg"
            >
              <HStack space={"sm"}>
                <Text className="text-sm font-bold">
                  {dFRLoading ? "Unsent" : "Unsend"}
                </Text>
              </HStack>
            </Button>
          </HStack>
        </SectionContainer>
      ) : (
        <SectionContainer>
          <HStack
            space="md"
            className="h-[100%] w-full flex-1 items-center justify-between"
          >
            <VStack space="sm">
              <Text className="flex-wrap text-lg font-medium capitalize">
                {receiver?.Profile?.IdentifiableInformation?.fullname}
              </Text>
            </VStack>
            {/* <HStack space="sm">
              <Button
                size="xs"
                variant="solid"
                onPress={() => {
                  declineFriendRequestMutation({
                    variables: {
                      friendRequestId: String(item?.id),
                      notificationStatusId: String(
                        receiver?.NotificationStatus.id,
                      ),
                    },
                  });
                }}
                className="h-[28px] rounded-full bg-slate-200 dark:bg-slate-800"
              >
                <Text className="text-sm font-bold">Decline</Text>
              </Button>
              <Icon
                as={CheckIcon}
                className="h-7 w-7 rounded-full bg-primary-500 text-typography-500"
              />
            </HStack> */}
            <HStack space="sm" className="items-center">
              <Pressable
                onPress={() => {
                  declineFriendRequestMutation({
                    variables: {
                      friendRequestId: String(item?.id),
                      notificationStatusId: String(
                        receiver?.NotificationStatus.id,
                      ),
                    },
                  });
                }}
              >
                <Icon
                  as={CloseIcon}
                  className="mr-2 h-6 w-6 text-typography-500"
                />
              </Pressable>
              <Button
                size="xs"
                variant="solid"
                onPress={() => {
                  console.log("ACCEPT FRIEND REQUEST");
                }}
                className="h-[28px] rounded-full"
              >
                <Text className="text-sm font-bold">Accept</Text>
              </Button>
            </HStack>
          </HStack>
        </SectionContainer>
      )}
    </>
  );
};

{
  /* {currentUserIsSender ? (
				<HStack justifyContent={'space-between'} alignItems={'center'}>
					<Pressable
					// onPress={() => {
					// 	router.push({
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
						<Text fontSize={'$md'} lineHeight={'$xs'} fontWeight='$black' >
							Requestedww
						</Text>
					</Button>
				</HStack>
			) : (
				<HStack justifyContent={'space-between'}>
					<Pressable
						onPress={() => {
							router.push({
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
							<Text fontWeight='$black' fontSize={'$md'}>
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

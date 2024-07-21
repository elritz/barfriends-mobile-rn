import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Button, ButtonText } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { Badge, BadgeText } from "#/components/ui/badge";
import { View } from "#/components/ui/view";
import { useReactiveVar } from '@apollo/client'
import Photos from '#/components/screens/public/personal/photos'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import {
	useAcceptFriendRequestMutation,
	useCreateFriendRequestMutation,
	useDeclineFriendRequestMutation,
	useDeleteFriendRequestMutation,
	useGetNotificationsQuery,
	usePublicProfileQuery,
	useRemoveFriendMutation,
} from '#/graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import { FlashList } from '@shopify/flash-list'
import { generateRandomBlurhash } from '#/util/helpers/generateBlurhash'
import useContentInsets from '#/util/hooks/useContentInsets'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useGlobalSearchParams } from 'expo-router'
import { useCallback, useMemo, useRef } from 'react'
import { ScrollView } from 'react-native'

export default () => {
	const params = useGlobalSearchParams()
	const contentInsets = useContentInsets()
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)
	// variables
	const snapPoints = useMemo(() => ['25%', '70%'], [])

	const listItems = [
		{
			title: 'Report',
			type: 'destructive',
		},
		{
			title: 'Block',
			type: 'destructive',
		},
		{
			title: 'Remove Friend',
			type: null,
		},
	]

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])
	const handleCloseModalPress = useCallback(() => {
		bottomSheetModalRef.current?.close()
	}, [])

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index)
	}, [])

	const SectionHeader = ({ title }: { title: string }) => {
		return (
            <Heading className="py-2 text-md font-bold">
                {title}
            </Heading>
        );
	}
	const SectionContainer = ({ children }) => {
		return (
            <BlurView
				style={{
					padding: 15,
					borderRadius: 13,
					overflow: 'hidden',
					backgroundColor: profile?.tonightStory?.emojimood?.colors
						? 'transparent'
						: rThemeVar.colorScheme === 'light'
							? rThemeVar.theme.gluestack.tokens.colors.light100
							: rThemeVar.theme.gluestack.tokens.colors.light800,
				}}
				intensity={80}
				tint={rThemeVar.colorScheme === 'light' ? 'light' : 'dark'}
			>
                {children}
            </BlurView>
        );
	}

	const {
		data,
		loading,
		error,
		updateQuery: pPUpdateQuery,
	} = usePublicProfileQuery({
		skip: !params.username,
		variables: {
			where: {
				IdentifiableInformation: {
					username: {
						equals: String(params.username),
					},
				},
			},
		},
	})

	const { updateQuery: GNUpdateQuery } = useGetNotificationsQuery()

	const [createFriendRequestMutation, { data: cFRData, loading: cFRLoading, error: cFRError }] =
		useCreateFriendRequestMutation({
			variables: {
				receiversProfileId: String(data?.publicProfile?.id),
			},
			onCompleted: data => {
				if (data.createFriendRequest) {
					pPUpdateQuery(prevData => {
						return {
							...prevData,
							publicProfile: {
								...prevData?.publicProfile,
								relationship: data.createFriendRequest,
							},
						}
					})
					GNUpdateQuery(prevData => {
						return {
							...prevData,
							getNotifications: {
								...prevData?.getNotifications,
								friendRequestNotifications: [
									...prevData?.getNotifications?.friendRequestNotifications,
									data.createFriendRequest,
								],
							},
						}
					})
				}
			},
		})

	const [deleteFriendRequestMutation, { data: dFRData, loading: dFRLoading, error: dFRError }] =
		useDeleteFriendRequestMutation({
			onCompleted: data => {
				if (data.deleteFriendRequest) {
					console.log('Friend request sent ==>')
					pPUpdateQuery(prevData => {
						return {
							...prevData,
							publicProfile: {
								...prevData?.publicProfile,
								relationship: null,
							},
						}
					})
				} else {
				}
			},
		})

	const [acceptFriendRequestMutation, { data: aFRMData, loading: aFRMLoading, error: aFRMError }] =
		useAcceptFriendRequestMutation({
			onCompleted: data => {
				data.acceptFriendRequest.__typename === 'Relationship' &&
					pPUpdateQuery(prevData => {
						return {
							...prevData,
							publicProfile: {
								...prevData?.publicProfile,
								relationship: data.acceptFriendRequest,
							},
						}
					})
			},
		})

	const [declineFriendRequestMutation, { data: dFRMData, loading: dFRMLoading, error: dFRMError }] =
		useDeclineFriendRequestMutation({
			onCompleted: data => {
				pPUpdateQuery(prevData => {
					return {
						...prevData,
						publicProfile: {
							...prevData?.publicProfile,
							relationship: null,
						},
					}
				})
			},
		})

	const [removeFriendMutation, { data: rFData, loading: rfLoading, error: rfError }] =
		useRemoveFriendMutation({
			onCompleted: data => {
				pPUpdateQuery(prevData => {
					return {
						...prevData,
						publicProfile: {
							...prevData?.publicProfile,
							relationship: null,
						},
					}
				})
			},
		})

	if (loading)
		return (
            <Text className="text-2xl mt-12">Loading...
                            </Text>
        );

	const profile = data?.publicProfile

	if (!profile) {
		return (
            <Text className="text-2xl mt-12">No profile found
                            </Text>
        );
	}

	const Username = () => {
		return (
            <VStack space='sm' className="flex-1 relative mt-3">
                <HStack className="justify-between">
					<Text
                        numberOfLines={1}
                        className={` ${rThemeVar.colorScheme === 'light' ? "text-light-800" : "text-light-100"} text-sm font-medium absolute -top-15 `}>
						@{profile?.IdentifiableInformation?.username}
					</Text>
					<HStack>
						<Text
                            numberOfLines={2}
                            className={` ${rThemeVar.colorScheme === 'light' ? "text-light-900" : "text-light-100"} leading-2xl text-2xl tracking-sm font-bold `}>
							{profile?.IdentifiableInformation?.fullname}
						</Text>
					</HStack>
				</HStack>
            </VStack>
        );
	}

	const IdentifiableInformation = () => {
		return (<>
            <HStack space='md' className="py-3 items-center">
                <Username />
                {profile?.relationship?.__typename === 'Relationship' && (
                    <Button
                        size='xs'
                        onPress={handlePresentModalPress}
                        className="bg-primary-500 px-2 rounded-lg">
                        <FontAwesome name='user' size={20} color={'white'} />
                    </Button>
                )}
                {rAuthorizationVar?.Profile?.ProfileType !== 'GUEST' && (
                    <Button
                        onPress={() => {
                            console.log('//todo: Message icon to conversation with this person')
                        }}
                        size='xs'
                        className="bg-tertiary-400 rounded-full">
                        <ButtonText className="text-sm mr-2">
                            Message
                        </ButtonText>
                        <Ionicons
                            color={rThemeVar.theme?.gluestack?.tokens.colors.light100}
                            name='chatbubble-ellipses'
                            size={20}
                        />
                    </Button>
                )}
            </HStack>
        </>);
	}

	const TonightVenue = () => {
		return (<>
            <SectionHeader title='Tonight' />
            <Pressable
                onPress={() => {
                    console.log('//todo: Navigate to Public Venue ')
                }}
            >
                <HStack className="justify-between items-center">
                    <HStack space='sm' className="items-center">
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1544450030-1fccab69a2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
                            }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 5,
                            }}
                            placeholder={generateRandomBlurhash()}
                        />
                        <Text className="text-lg">Dallas Night Club</Text>
                    </HStack>
                    <Feather
                        name='arrow-right'
                        size={25}
                        color={
                            rThemeVar.colorScheme === 'light'
                                ? rThemeVar.theme?.gluestack.tokens.colors.light900
                                : rThemeVar.theme?.gluestack.tokens.colors.light100
                        }
                    />
                </HStack>
            </Pressable>
        </>);
	}

	const Relationship = () => {
		return (
            <HStack className="mb-2 items-center justify-between">
                <HStack space='sm' className="items-center">
					{profile?.DetailInformation?.description}
					<Image
						source={{
							uri: 'https://images.unsplash.com/photo-1544450030-1fccab69a2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
						}}
						style={{
							width: 40,
							height: 40,
							borderRadius: 5,
						}}
						placeholder={generateRandomBlurhash()}
					/>
					<HStack className="justify-between flex-1">
						<Text className="text-lg">Christian Firmi</Text>
						<Text className="text-sm italic-[italic]">
							dating
						</Text>
					</HStack>
				</HStack>
            </HStack>
        );
	}

	const FriendRequest = () => {
		switch (profile.relationship?.__typename) {
			case 'Error':
				return (
                    <Box>
                        <Text>{profile.relationship.message}</Text>
                    </Box>
                );
			case 'Request':
				return (<>
                    {profile.relationship.senderProfileId === rAuthorizationVar?.Profile?.id ? (
                        <SectionContainer>
                            <HStack space='md' className="py-3 items-center justify-between flex-1">
                                <Text className="flex-1 flex-wrap text-md font-medium">
                                    You requested to be friends!
                                </Text>
                                <Button
                                    variant='outline'
                                    size='xs'
                                    disabled={dFRLoading}
                                    onPress={() => {
                                        profile.relationship?.__typename === 'Request' &&
                                            deleteFriendRequestMutation({
                                                variables: {
                                                    friendRequestId: profile.relationship.id,
                                                },
                                            })
                                    }}
                                    className="rounded-lg"
                                >
                                    <Text className="text-sm font-bold">
                                        Requested
                                    </Text>
                                </Button>
                            </HStack>
                        </SectionContainer>
                    ) : (
                        <SectionContainer>
                            <HStack className="py-3 w-full justify-between items-center">
                                <Text className="text-md font-medium">
                                    Wants to be Barfriends
                                </Text>
                                <HStack space='sm'>
                                    <Button
                                        size='xs'
                                        variant='link'
                                        onPress={() => {
                                            profile.relationship?.__typename === 'Request' &&
                                                declineFriendRequestMutation({
                                                    variables: {
                                                        friendRequestId: profile.relationship.id,
                                                        notificationStatusId: profile.relationship.recievers[0].NotificationStatus.id,
                                                    },
                                                })
                                        }}
                                        className="h-[28px]"
                                    >
                                        <Text className="text-sm font-bold">
                                            Decline
                                        </Text>
                                    </Button>
                                    <Button
                                        size='xs'
                                        onPress={() => {
                                            profile.relationship?.__typename === 'Request' &&
                                                acceptFriendRequestMutation({
                                                    variables: {
                                                        friendRequestId: profile.relationship.id,
                                                        notificationStatusId: profile.relationship.recievers[0].NotificationStatus.id,
                                                    },
                                                })
                                        }}
                                        className="h-[28px]"
                                    >
                                        <ButtonText className="text-sm">Accept</ButtonText>
                                    </Button>
                                </HStack>
                            </HStack>
                        </SectionContainer>
                    )}
                </>);
			case 'Relationship':
				return (<>
                    {!profile.relationship.id && (
                        <SectionContainer>
                            <HStack className="py-3 w-full justify-between items-center">
                                <Text className="font-medium text-md">
                                    Add to your friends
                                </Text>
                                <Button
                                    disabled={cFRLoading}
                                    size='xs'
                                    onPress={() => createFriendRequestMutation()}
                                    className="rounded-lg"
                                >
                                    <ButtonText className="text-md">Barfriend</ButtonText>
                                </Button>
                            </HStack>
                        </SectionContainer>
                    )}
                </>);
			default:
				return (
                    <SectionContainer>
                        <HStack className="py-3 w-full justify-between items-center">
							<Text className="font-medium text-md">
								Add to your friends
							</Text>
							<Button
								disabled={cFRLoading}
								size='xs'
								onPress={() => createFriendRequestMutation()}
								className="rounded-lg"
							>
								<ButtonText className="text-md">Barfriend</ButtonText>
							</Button>
						</HStack>
                    </SectionContainer>
                );
		}
	}

	const Tags = () => {
		return (
            <HStack space='xs' className="py-2 flex-wrap">
                {profile?.DetailInformation?.Tags.map(interest => {
					return (
                        <Badge
                            key={interest.id}
                            size='lg'
                            variant='solid'
                            className="my-1 p-2 px-3 rounded-lg dark:bg-black bg-light-200">
                            <BadgeText fontSize={'$sm'} textTransform='capitalize' pr={'$0.5'}>
								{interest.emoji}
							</BadgeText>
                            <Text
                                textTransform='capitalize'
                                className="dark:text-white text-black font-medium text-sm">
								{interest.name}
							</Text>
                        </Badge>
                    );
				})}
            </HStack>
        );
	}

	const Description = () => {
		return (
            <HStack space='sm' className="flex-wrap">
                {!profile?.DetailInformation?.description?.length ? (
					<Text className="text-lg font-normal leading-xl">
						{profile?.DetailInformation?.description}
					</Text>
				) : (
					<Text className="text-lg font-normal leading-xl text-center w-full">
						No details yet!
					</Text>
				)}
            </HStack>
        );
	}

	const RelationshipSettingsBottomSheet = () => {
		return (
            <BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				backgroundStyle={{
					backgroundColor:
						rThemeVar.colorScheme === 'light'
							? rThemeVar.theme.gluestack.tokens.colors.light100
							: rThemeVar.theme.gluestack.tokens.colors.light800,
				}}
				handleIndicatorStyle={{
					backgroundColor:
						rThemeVar.colorScheme === 'dark'
							? rThemeVar.theme.gluestack.tokens.colors.light100
							: rThemeVar.theme.gluestack.tokens.colors.light800,
				}}
			>
                <HStack className="items-center">
					<Pressable onPress={handleCloseModalPress}>
						<Ionicons
							name='chevron-back-outline'
							size={35}
							color={
								rThemeVar.colorScheme === 'light'
									? rThemeVar.theme?.gluestack.tokens.colors.light900
									: rThemeVar.theme?.gluestack.tokens.colors.light100
							}
						/>
					</Pressable>
					<Heading>Relationship</Heading>
				</HStack>
                <FlashList
					contentContainerStyle={{ paddingHorizontal: 10 }}
					data={listItems}
					estimatedItemSize={100}
					ListHeaderComponent={() => {
						return (
                            <VStack className="mt-3">
                                <Username />
                                <HStack space='md'>
									{[
										{ icon: '🎈', date: 'Jan 11, 1995' },
										{ icon: '👥', date: 'Jan 11' },
									].map((item, index) => {
										return (
                                            <Badge
                                                key={index}
                                                size='lg'
                                                variant='solid'
                                                className="my-1 p-2 px-3 rounded-full dark:bg-black bg-light-200">
                                                <Text
                                                    textTransform='capitalize'
                                                    className="dark:text-white text-black font-medium text-sm">
													{item.date}
												</Text>
                                            </Badge>
                                        );
									})}
								</HStack>
                            </VStack>
                        );
					}}
					renderItem={({ item }) => {
						return (
                            <View style={{ height: 50 }}>
                                <Text>{item.title}</Text>
                            </View>
                        );
					}}
				/>
            </BottomSheetModal>
        );
	}
	console.log('rAuthorizationVar?.ProfileType :>> ')
	return (
        <BottomSheetModalProvider>
            <LinearGradient
				style={{
					flex: 1,
				}}
				colors={
					profile?.tonightStory?.emojimood?.colors
						? profile?.tonightStory?.emojimood?.colors
						: ['#0000000']
				}
			>
				<RelationshipSettingsBottomSheet />
				<ScrollView contentInset={contentInsets}>
					<VStack space='md' className="mx-3">
						<Photos
							photos={profile?.tonightStory?.photos}
							profilePhoto={profile?.profilePhoto}
							emojimoodsColors={
								profile?.tonightStory?.emojimood?.colors
									? profile?.tonightStory?.emojimood?.colors
									: ['#0000000']
							}
						/>
						{rAuthorizationVar?.Profile?.ProfileType !== 'GUEST' && <FriendRequest />}
						<SectionContainer>
							<IdentifiableInformation />
							<TonightVenue />
							<SectionHeader title='My basics' />
							<Relationship />
							<Tags />
							<SectionHeader title='About me' />
							<Description />
						</SectionContainer>
					</VStack>
				</ScrollView>
			</LinearGradient>
        </BottomSheetModalProvider>
    );
}

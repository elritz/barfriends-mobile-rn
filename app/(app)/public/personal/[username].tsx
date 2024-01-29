import { useReactiveVar } from '@apollo/client'
import Photos from '@components/screens/public/personal/photos'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import { View } from '@gluestack-ui/themed'
import {
	Badge,
	Box,
	Button,
	HStack,
	Heading,
	Pressable,
	Text,
	VStack,
	ButtonText,
} from '@gluestack-ui/themed'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import {
	useAcceptFriendRequestMutation,
	useCreateFriendRequestMutation,
	useDeclineFriendRequestMutation,
	useDeleteFriendRequestMutation,
	useGetNotificationsQuery,
	usePublicProfileQuery,
	useRemoveFriendMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { generateRandomBlurhash } from '@util/helpers/generateBlurhash'
import useContentInsets from '@util/hooks/useContentInsets'
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
			<Heading py={'$2'} fontSize={'$md'} fontWeight='$bold'>
				{title}
			</Heading>
		)
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
		)
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
					console.log('Friend request sent ==>')

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
			<Text fontSize={'$2xl'} mt={'$12'}>
				Loading...
			</Text>
		)

	const profile = data?.publicProfile

	if (!profile) {
		return (
			<Text fontSize={'$2xl'} mt={'$12'}>
				No profile found
			</Text>
		)
	}

	const Username = () => {
		return (
			<VStack flex={1} position='relative' mt={'$3'} space='sm'>
				<HStack justifyContent='space-between'>
					<Text
						fontSize={'$sm'}
						fontWeight={'$medium'}
						position='absolute'
						numberOfLines={1}
						color={rThemeVar.colorScheme === 'light' ? '$light800' : '$light100'}
						sx={{
							top: -15,
						}}
					>
						@{profile?.IdentifiableInformation?.username}
					</Text>
					<HStack>
						<Text
							lineHeight={'$2xl'}
							fontSize={'$2xl'}
							letterSpacing={'$sm'}
							numberOfLines={2}
							fontWeight='$bold'
							color={rThemeVar.colorScheme === 'light' ? '$light900' : '$light100'}
						>
							{profile?.IdentifiableInformation?.fullname}
						</Text>
					</HStack>
				</HStack>
			</VStack>
		)
	}

	const IdentifiableInformation = () => {
		return (
			<>
				<HStack py={'$3'} alignItems='center' space='md'>
					<Username />
					{profile?.relationship?.__typename === 'Relationship' && (
						<Button
							size='xs'
							bg={'$primary500'}
							px={'$2'}
							rounded={'$lg'}
							onPress={handlePresentModalPress}
						>
							<FontAwesome name='user' size={20} color={'white'} />
						</Button>
					)}
					{rAuthorizationVar?.Profile?.ProfileType !== 'GUEST' && (
						<Button
							onPress={() => {
								console.log('//todo: Message icon to conversation with this person')
							}}
							size='xs'
							bg={'$tertiary400'}
							rounded={'$full'}
						>
							<ButtonText fontSize={'$sm'} mr={'$2'}>
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
			</>
		)
	}

	const TonightVenue = () => {
		return (
			<>
				<SectionHeader title='Tonight' />
				<Pressable
					onPress={() => {
						console.log('//todo: Navigate to Public Venue ')
					}}
				>
					<HStack justifyContent='space-between' alignItems='center'>
						<HStack space='sm' alignItems='center'>
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
							<Text fontSize={'$lg'}>Dallas Night Club</Text>
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
			</>
		)
	}

	const Relationship = () => {
		return (
			<HStack mb={'$2'} alignItems='center' justifyContent='space-between'>
				<HStack alignItems='center' space='sm'>
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
					<HStack justifyContent='space-between' flex={1}>
						<Text fontSize={'$lg'}>Christian Firmi</Text>
						<Text fontSize={'$sm'} fontStyle={'italic'}>
							dating
						</Text>
					</HStack>
				</HStack>
			</HStack>
		)
	}

	const FriendRequest = () => {
		switch (profile.relationship?.__typename) {
			case 'Error':
				return (
					<Box>
						<Text>{profile.relationship.message}</Text>
					</Box>
				)
			case 'Request':
				return (
					<>
						{profile.relationship.senderProfileId === rAuthorizationVar?.Profile?.id ? (
							<SectionContainer>
								<HStack py={'$3'} alignItems='center' justifyContent='space-between' space='md' flex={1}>
									<Text flex={1} flexWrap='wrap' fontSize={'$md'} fontWeight='$medium'>
										You requested to be friends!
									</Text>
									<Button
										rounded={'$lg'}
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
									>
										<Text fontSize={'$sm'} fontWeight='$bold'>
											Requested
										</Text>
									</Button>
								</HStack>
							</SectionContainer>
						) : (
							<SectionContainer>
								<HStack py={'$3'} w={'$full'} justifyContent='space-between' alignItems='center'>
									<Text fontSize={'$md'} fontWeight='$medium'>
										Wants to be Barfriends
									</Text>
									<HStack space='sm'>
										<Button
											size='xs'
											variant='link'
											height={28}
											onPress={() => {
												profile.relationship?.__typename === 'Request' &&
													declineFriendRequestMutation({
														variables: {
															friendRequestId: profile.relationship.id,
															notificationStatusId: profile.relationship.recievers[0].NotificationStatus.id,
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
												profile.relationship?.__typename === 'Request' &&
													acceptFriendRequestMutation({
														variables: {
															friendRequestId: profile.relationship.id,
															notificationStatusId: profile.relationship.recievers[0].NotificationStatus.id,
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
			case 'Relationship':
				return (
					<>
						{!profile.relationship.id && (
							<SectionContainer>
								<HStack py={'$3'} w={'$full'} justifyContent='space-between' alignItems='center'>
									<Text fontWeight='$medium' fontSize={'$md'}>
										Add to your friends
									</Text>
									<Button
										rounded={'$lg'}
										disabled={cFRLoading}
										size='xs'
										onPress={() => createFriendRequestMutation()}
									>
										<ButtonText fontSize={'$md'}>Barfriend</ButtonText>
									</Button>
								</HStack>
							</SectionContainer>
						)}
					</>
				)
			default:
				return (
					<SectionContainer>
						<HStack py={'$3'} w={'$full'} justifyContent='space-between' alignItems='center'>
							<Text fontWeight='$medium' fontSize={'$md'}>
								Add to your friends
							</Text>
							<Button
								rounded={'$lg'}
								disabled={cFRLoading}
								size='xs'
								onPress={() => createFriendRequestMutation()}
							>
								<ButtonText fontSize={'$md'}>Barfriend</ButtonText>
							</Button>
						</HStack>
					</SectionContainer>
				)
		}
	}

	const Tags = () => {
		return (
			<HStack py={'$2'} space='xs' flexWrap='wrap'>
				{profile?.DetailInformation?.Tags.map(interest => {
					return (
						<Badge
							key={interest.id}
							size='lg'
							my={'$1'}
							p={'$2'}
							px={'$3'}
							variant='solid'
							borderRadius='$lg'
							sx={{
								_dark: {
									bg: '$black',
								},
								_light: {
									bg: '$light200',
								},
							}}
						>
							<Badge.Text fontSize={'$sm'} textTransform='capitalize' pr={'$0.5'}>
								{interest.emoji}
							</Badge.Text>
							<Text
								sx={{
									_dark: {
										color: '$white',
									},
									_light: {
										color: '$black',
									},
								}}
								fontWeight='$medium'
								fontSize={'$sm'}
								textTransform='capitalize'
							>
								{interest.name}
							</Text>
						</Badge>
					)
				})}
			</HStack>
		)
	}

	const Description = () => {
		return (
			<HStack space='sm' flexWrap='wrap'>
				{!profile?.DetailInformation?.description?.length ? (
					<Text fontSize={'$lg'} fontWeight='$normal' lineHeight={'$xl'}>
						{profile?.DetailInformation?.description}
					</Text>
				) : (
					<Text fontSize={'$lg'} fontWeight='$normal' lineHeight={'$xl'} textAlign='center' w={'$full'}>
						No details yet!
					</Text>
				)}
			</HStack>
		)
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
				<HStack alignItems={'center'}>
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
							<VStack mt={'$3'}>
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
												my={'$1'}
												p={'$2'}
												px={'$3'}
												variant='solid'
												borderRadius='$full'
												sx={{
													_dark: {
														bg: '$black',
													},
													_light: {
														bg: '$light200',
													},
												}}
											>
												<Text
													sx={{
														_dark: {
															color: '$white',
														},
														_light: {
															color: '$black',
														},
													}}
													fontWeight='$medium'
													fontSize={'$sm'}
													textTransform='capitalize'
												>
													{item.date}
												</Text>
											</Badge>
										)
									})}
								</HStack>
							</VStack>
						)
					}}
					renderItem={({ item }) => {
						return (
							<View style={{ height: 50 }}>
								<Text>{item.title}</Text>
							</View>
						)
					}}
				/>
			</BottomSheetModal>
		)
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
					<VStack mx={'$3'} space='md'>
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
	)
}

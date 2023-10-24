// TODO: FN(What functionality was suppose to be here)
import { useReactiveVar } from '@apollo/client'
import WithDeviceProfiles from '@components/molecules/asks/signinup'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import { Entypo } from '@expo/vector-icons'
import {
	Box,
	Button,
	HStack,
	Pressable,
	VStack,
	Heading,
	Icon,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ButtonText,
	CloseIcon,
	Center,
	Text,
} from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { useRef, useState } from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'

export default function DeviceManager() {
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])
	const [selectedProfileId, setSelectedProfileId] = useState('')
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [showModal, setShowModal] = useState(false)
	const ref = useRef(null)

	const { loading } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onError: error => {},
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager
					?.DeviceProfiles as Array<AuthorizationDeviceProfile>
				setProfiles(deviceProfiles)
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceProfile
					AuthorizationReactiveVar(deviceManager)
					setTimeout(
						() =>
							router.push({
								pathname: '/(app)/hometab/venuefeed',
							}),
						1000,
					)
				}
			},
		})

	const switchProfile = item => {
		if (item.isActive) {
			const guestProfile = profiles.filter(item => item?.Profile?.ProfileType === ProfileType.Guest)

			setSelectedProfileId(String(guestProfile[0]?.Profile?.id))
			switchDeviceProfileMutation({
				variables: {
					profileId: String(guestProfile[0]?.Profile?.id),
				},
			})
		} else {
			setSelectedProfileId(item.Profile.id)
			switchDeviceProfileMutation({
				variables: {
					profileId: item.Profile.id,
				},
			})
		}
	}

	const logoutProfile = () => {
		const guestProfile = profiles.map(item => {
			if (item?.Profile?.ProfileType === ProfileType.Guest) return item
		})
		setSelectedProfileId('')
		switchDeviceProfileMutation({
			variables: {
				profileId: String(guestProfile[0]?.Profile?.id),
			},
		})
	}

	return (
		<SafeAreaView style={{ flex: 1, margin: 10 }}>
			<Box bg='$transparent'>
				<WithDeviceProfiles />
			</Box>
			<View style={{ flex: 1 }}>
				{loading ? (
					<VStack my={'$5'} px={'$2'} space={'md'} rounded='$md'>
						{[...Array(3)].map((item, index) => {
							return (
								<Skeleton
									key={index}
									height={80}
									width={'100%'}
									radius={15}
									colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									colors={
										rTheme.colorScheme === 'light'
											? [
													String(rTheme.theme?.gluestack.tokens.colors.light100),
													String(rTheme.theme?.gluestack.tokens.colors.light300),
											  ]
											: [
													String(rTheme.theme?.gluestack.tokens.colors.light900),
													String(rTheme.theme?.gluestack.tokens.colors.light700),
											  ]
									}
								/>
							)
						})}
					</VStack>
				) : (
					<>
						{profiles.length ? (
							<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
								{profiles?.map((item, index) => {
									if (item.Profile?.ProfileType === ProfileType.Guest) {
										return null
									} else {
										return (
											<Pressable key={item.id} onPress={() => switchProfile(item)} sx={{ w: '100%', h: 80 }}>
												<HStack h={80} alignItems='center'>
													<Pressable
														key={item.id}
														onPress={() => (item?.isActive ? logoutProfile() : switchProfile(item))}
													>
														<DeviceManagerProfileItemLarge
															item={item.Profile}
															isActive={item.isActive}
															loading={SWDPLoading}
															selectedProfileId={selectedProfileId}
														/>
													</Pressable>
													<Center h={300}>
														<Button
															variant='link'
															// onPress={() => console.log('pressed')}
															onPress={() => setShowModal(true)}
															ref={ref}
															size='xs'
															hitSlop={10}
														>
															<Entypo
																name={'dots-three-vertical'}
																size={23}
																color={
																	rTheme.colorScheme === 'light'
																		? rTheme.theme?.gluestack.tokens.colors.light900
																		: rTheme.theme?.gluestack.tokens.colors.light100
																}
															/>
														</Button>
														<Modal
															isOpen={showModal}
															onClose={() => {
																setShowModal(false)
															}}
														>
															<ModalBackdrop />
															<ModalContent>
																<ModalHeader>
																	<Heading size='lg'>Engage with Modals</Heading>
																	<ModalCloseButton>
																		<Icon as={CloseIcon} />
																	</ModalCloseButton>
																</ModalHeader>
																<ModalBody>
																	<Text>
																		Elevate user interactions with our versatile modals. Seamlessly integrate
																		notifications, forms, and media displays. Make an impact effortlessly.
																	</Text>
																</ModalBody>
																<ModalFooter>
																	<Button
																		variant='outline'
																		size='sm'
																		action='secondary'
																		mr='$3'
																		onPress={() => {
																			setShowModal(false)
																		}}
																	>
																		<ButtonText>Cancel</ButtonText>
																	</Button>
																	<Button
																		size='sm'
																		action='positive'
																		borderWidth='$0'
																		onPress={() => {
																			setShowModal(false)
																		}}
																	>
																		<ButtonText>Explore</ButtonText>
																	</Button>
																</ModalFooter>
															</ModalContent>
														</Modal>
													</Center>
												</HStack>
											</Pressable>
										)
									}
								})}
							</ScrollView>
						) : null}
					</>
				)}
			</View>
		</SafeAreaView>
	)
}

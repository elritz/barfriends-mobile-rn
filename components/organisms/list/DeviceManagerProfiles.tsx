import { useReactiveVar } from '@apollo/client'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import { Entypo, Ionicons } from '@expo/vector-icons'
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
	useRemoveDeviceProfileFromDeviceManagerMutation,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRef, useState } from 'react'

const DeviceManagerProfiles = () => {
	const [selectedProfileId, setSelectedProfileId] = useState('')
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [showModal, setShowModal] = useState(false)
	const ref = useRef(null)

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager?.DeviceProfiles
				setProfiles(deviceProfiles)
			}
		},
	})

	const [
		removeDeviceProfileFromDeviceManagerMutation,
		{ data: RDPFDMData, loading: RDPFDMLoading, error: RDPFDMError },
	] = useRemoveDeviceProfileFromDeviceManagerMutation()

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: async data => {
				if (data.switchDeviceProfile?.__typename == 'AuthorizationDeviceProfile') {
					const deviceProfile = data.switchDeviceProfile as AuthorizationDeviceProfile

					AuthorizationReactiveVar(deviceProfile)
				}
			},
		})

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

	const switchProfile = item => {
		setSelectedProfileId(item.Profile.id)
		switchDeviceProfileMutation({
			variables: {
				profileId: item.Profile.id,
			},
		})
	}

	if (loading) return null

	return (
		<Center>
			{profiles.length ? (
				<>
					{profiles?.map((item, index) => {
						if (item.Profile?.ProfileType === ProfileType.Guest) return null
						return (
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
										finalFocusRef={ref}
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
						)
					})}
				</>
			) : null}
		</Center>
	)
}

export default DeviceManagerProfiles

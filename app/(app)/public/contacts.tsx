import { useReactiveVar } from '@apollo/client'
import { APP_STORE_URL_LINK } from '@constants/App'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	SEARCH_BAR_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { ContactsReactiveVar, PermissionContactsReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import * as Contacts from 'expo-contacts'
import { useRouter, useSearchParams } from 'expo-router'
import { filter } from 'lodash'
import {
	Heading,
	Box,
	Button,
	Text,
	VStack,
	HStack,
	Skeleton,
	IconButton,
	Icon,
	Checkbox,
	Divider,
	useDisclose,
	Modal,
} from 'native-base'
import { useEffect, useState } from 'react'
import { Alert, Platform, Share } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const params = useSearchParams()
	const insets = useSafeAreaInsets()
	const rContactsVar = useReactiveVar(ContactsReactiveVar)
	const rPermissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)
	const [contact, setContact] = useState<Contacts.Contact | null>(null)
	const [contacts, setContacts] = useState<Contacts.Contact[] | null>(null)
	const { isOpen, onOpen, onClose } = useDisclose()

	useEffect(() => {
		async function getContacts() {
			if (rPermissionContactsVar?.granted) {
				const { data } = await Contacts.getContactsAsync()
				if (data.length) {
					ContactsReactiveVar(data)
					setContacts(data)
				}
				setIsLoading(false)
			}
		}
		getContacts()
	}, [])

	useEffect(() => {
		if (params.searchtext) {
			filterList(params.searchtext)
		} else {
			setContacts(rContactsVar)
		}
	}, [params.searchtext])

	const filterList = text => {
		if (!params?.searchtext?.length) {
			if (rContactsVar && rContactsVar.length) {
				setContacts(rContactsVar)
			}
		} else {
			const filteredContactsData = filter(rContactsVar, item => {
				return contains(item, text.toLowerCase())
			})

			setContacts(filteredContactsData)
		}
	}

	const contains = (item, query) => {
		if (item.name.toLowerCase().includes(query)) {
			return true
		}
		return false
	}

	if (!rPermissionContactsVar?.granted) {
		return (
			<Box safeArea flex={1} mx={2}>
				<VStack space={3} mb={6} alignItems={'center'}>
					<Heading>All Contacts</Heading>
					<Text fontSize={'lg'}>Please allow Barfriends to access your contacts.</Text>
				</VStack>
				<Button
					onPress={() =>
						router.push({
							pathname: '(app)/permission/contacts',
						})
					}
				>
					Continue
				</Button>
			</Box>
		)
	}

	if (isLoading) {
		return (
			<Box m={3} flex={1}>
				<FlashList
					data={[...Array(20)]}
					keyExtractor={(item, index) => index.toString()}
					scrollEnabled={false}
					estimatedItemSize={60}
					keyboardDismissMode='on-drag'
					automaticallyAdjustKeyboardInsets
					renderItem={item => {
						return (
							<HStack h={'65px'} flex={1} justifyContent={'space-between'} space={4} alignItems={'center'}>
								<Skeleton
									speed={0.95}
									_light={{
										startColor: 'coolGray.100',
										endColor: 'coolGray.200',
									}}
									_dark={{
										startColor: 'dark.200',
										endColor: 'dark.300',
									}}
									h='40px'
									flex={1}
									borderRadius={'md'}
								/>
								<Skeleton
									speed={0.95}
									_light={{
										startColor: 'coolGray.100',
										endColor: 'coolGray.200',
									}}
									_dark={{
										startColor: 'dark.200',
										endColor: 'dark.300',
									}}
									h='40px'
									w={'70px'}
									borderRadius={'md'}
								/>
							</HStack>
						)
					}}
				/>
			</Box>
		)
	}

	if (contacts && !contacts.length) {
		return (
			<Box bg={'red.400'}>
				<Heading>!Contacts</Heading>
			</Box>
		)
	}

	const onShare = async () => {
		try {
			const result = await Share.share(
				{
					message: 'Barfriends | The nightlife app',
					url: Platform.OS === 'ios' ? APP_STORE_URL_LINK : '',
				},
				{
					dialogTitle: 'Join me on Barfriends',
					subject: 'Invite to Barfriends',
				},
			)
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			Alert.alert(error.message)
		}
	}

	return (
		<Box flex={1} mx={2}>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content>
					<Modal.CloseButton />
					<Modal.Header fontSize='4xl' fontWeight='bold'>
						{contact?.firstName}&nbsp;{contact?.lastName}
					</Modal.Header>
					<Modal.Body>
						This will remove all data relating to Alex. This action cannot be reversed. Deleted data can
						not be recovered.
					</Modal.Body>
					<Modal.Footer>
						<Button variant='unstyled' mr='1' onPress={onClose}>
							Cancel
						</Button>
						<Button colorScheme='error' onPress={onClose}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
			<Box>
				<Heading>Contacts</Heading>
			</Box>
			<FlashList
				data={contacts}
				numColumns={1}
				showsVerticalScrollIndicator={false}
				estimatedItemSize={60}
				keyboardDismissMode='on-drag'
				contentInset={{
					top: insets.top + SEARCH_BAR_HEIGHT,
					bottom:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
				}}
				keyExtractor={item => item.id}
				renderItem={({ item }) => {
					if (!item.firstName || !item.lastName) {
						return null
					}
					return (
						<>
							<HStack my={2} h={'50px'}>
								<HStack flex={1} alignItems={'center'} justifyContent={'flex-start'}>
									<Text fontSize={'lg'} textTransform={'capitalize'}>
										{item.firstName}&nbsp;{item.lastName}
									</Text>
								</HStack>
								<HStack flex={1} space={3} justifyContent={'flex-end'} alignItems={'center'}>
									<IconButton
										bg={'transparent'}
										icon={
											<Icon
												as={Ionicons}
												name={'share'}
												_light={{
													color: 'light.700',
												}}
												_dark={{
													color: 'dark.700',
												}}
											/>
										}
										onPress={onShare}
										alignSelf={'center'}
										variant={'solid'}
										size={'lg'}
										h={'40px'}
										w={'40px'}
										fontSize={'lg'}
									/>
								</HStack>
							</HStack>
							<Divider />
						</>
					)
				}}
			/>
		</Box>
	)
}

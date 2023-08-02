import { useReactiveVar } from '@apollo/client'
import { Button, Center, Divider, HStack, Heading, Modal, Text, VStack } from '@components/core'
import { LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS } from '@constants/StorageConstants'
import { Ionicons } from '@expo/vector-icons'
import { LocalStoragePreferenceAskNotificationPermissionType } from '@ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	DaysPreferencePermissionInitialState,
	PreferencePermissionNotificationReactiveVar,
} from '@reactive'
import { useRouter } from 'expo-router'

const NotificationNextAskModal = ({ isOpen, onOpen, onClose }) => {
	const router = useRouter()
	const rPreferenceNotificationPermission = useReactiveVar(
		PreferencePermissionNotificationReactiveVar,
	)
	return (
		<Center>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Header>
					<HStack justifyContent='space-between'>
						<Heading>Notifications</Heading>
						<Ionicons name='close' size={20} />
					</HStack>
				</Modal.Header>
				<Modal.Body
					mt={'$2'}
					// _scrollview={{
					// 	scrollEnabled: false,
					// }}
				>
					<Text fontSize={'$lg'} pb={'$3'}>
						Allow notifications, get notified when your friends invite you out, join bars and events in
						your area.
					</Text>
					<VStack space={'md'}>
						<Button
							onPress={async () => {
								await AsyncStorage.setItem(
									LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
									JSON.stringify({
										...DaysPreferencePermissionInitialState,
										numberOfTimesDismissed: rPreferenceNotificationPermission?.numberOfTimesDismissed
											? rPreferenceNotificationPermission.numberOfTimesDismissed + 1
											: 1,
									} as LocalStoragePreferenceAskNotificationPermissionType),
								)
								onClose()
							}}
							variant={'link'}
							size={'lg'}
						>
							<Text>Ask later</Text>
						</Button>
						<Divider />
						<Button
							onPress={() =>
								router.push({
									pathname: '(app)/permission/notifications',
								})
							}
							variant={'link'}
							size={'lg'}
						>
							<Text>Allow</Text>
						</Button>
					</VStack>
				</Modal.Body>
			</Modal>
		</Center>
	)
}

export default NotificationNextAskModal

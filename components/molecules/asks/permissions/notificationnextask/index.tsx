import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";

import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
} from "#/components/ui/modal";

import { Heading } from "#/components/ui/heading";
import { Divider } from "#/components/ui/divider";
import { CloseIcon, Icon } from "#/components/ui/icon";
import { Center } from "#/components/ui/center";
import { Button } from "#/components/ui/button";
import { useReactiveVar } from '@apollo/client'
import { DaysPreferencePermissionInitialState } from '#/constants/Preferences'
import { LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS } from '#/constants/StorageConstants'
import { LocalStoragePreferenceAskNotificationPermissionType } from '#/ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PreferencePermissionNotificationReactiveVar } from '#/reactive'
import { useRouter } from 'expo-router'

const NotificationNextAskModal = ({ isOpen, onOpen, onClose }) => {
	const router = useRouter()
	const rPreferenceNotificationPermission = useReactiveVar(
		PreferencePermissionNotificationReactiveVar,
	)

	const _pressAskLater = async () => {
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
	}

	const _pressDontShowAgain = async () => {
		await AsyncStorage.setItem(
			LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
			JSON.stringify({
				...DaysPreferencePermissionInitialState,
				numberOfTimesDismissed: rPreferenceNotificationPermission?.numberOfTimesDismissed
					? rPreferenceNotificationPermission.numberOfTimesDismissed + 1
					: 1,
				canShowAgain: false,
			} as LocalStoragePreferenceAskNotificationPermissionType),
		)
		onClose()
	}

	return (
        <Center>
            <Modal isOpen={isOpen} onClose={onClose}>
				<ModalBackdrop />
				<ModalContent className="w-[92%]">
					<ModalHeader>
						<Heading>Notifications</Heading>
						<ModalCloseButton>
							<Icon as={CloseIcon} />
						</ModalCloseButton>
					</ModalHeader>

					<ModalBody scrollEnabled={false}>
						<Text className="text-lg pb-3">
							We recommend allowing notifications because you get notified when friends invite you out,
							join bars and events in your area.
						</Text>
						<VStack space={'md'}>
							{rPreferenceNotificationPermission.numberOfTimesDismissed > 5 ? (
								<Button onPress={async () => _pressAskLater()} variant={'link'} size={'lg'}>
									<Text>Don't show again</Text>
								</Button>
							) : (
								<Button onPress={async () => _pressAskLater()} variant={'link'} size={'lg'}>
									<Text>Ask later</Text>
								</Button>
							)}
							<Divider />
							<Button
								onPress={() =>
									router.push({
										pathname: '/(app)/permission/notifications',
									})
								}
								variant={'link'}
								size={'lg'}
							>
								<Text>Allow</Text>
							</Button>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
        </Center>
    );
}

export default NotificationNextAskModal

import { useReactiveVar } from '@apollo/client'
import { DaysPreferencePermissionInitialState } from '@constants/Preferences'
import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@ctypes/preferences'
import { Button, Center, Divider, Modal, Text, VStack } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PreferenceBackgroundLocationPermissionReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

const BackgroundLocationNextAskModal = ({ isOpen, onOpen, onClose }) => {
	const router = useRouter()
	const rPreferenceBackgroundLocationPermission = useReactiveVar(
		PreferenceBackgroundLocationPermissionReactiveVar,
	)

	return (
		<Center>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content sx={{ w: '95%' }}>
					<Modal.Header>Background location</Modal.Header>
					<Modal.CloseButton />
					<Modal.Body mt={'$2'}>
						<Text fontSize={'$lg'} pb={'$3'}>
							By enabling background location, it helps you to go out, join bars and find events.
						</Text>
						<VStack space={'md'}>
							<Button
								onPress={async () => {
									await AsyncStorage.setItem(
										LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
										JSON.stringify({
											...DaysPreferencePermissionInitialState,
											numberOfTimesDismissed: rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
												? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed + 1
												: 1,
										} as LocalStoragePreferenceAskBackgroundLocationPermissionType),
									)
									onClose()
								}}
								variant={'link'}
								size={'lg'}
							>
								<Text fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
									Not now
								</Text>
							</Button>
							<Divider mt={'$1'} />
							<Button
								onPress={() =>
									router.push({
										pathname: '/(app)/permission/backgroundlocation',
									})
								}
								variant={'link'}
								size={'lg'}
							>
								<Text>Continue</Text>
							</Button>
						</VStack>
					</Modal.Body>
				</Modal.Content>
			</Modal>
		</Center>
	)
}

export default BackgroundLocationNextAskModal

import { DaysPreferencePermissionInitialState } from '@constants/Preferences'
import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from '@constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useReactiveVar } from '@apollo/client'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@ctypes/preferences'
import { Button, Center, Divider, Modal, Text, VStack, View } from '@gluestack-ui/themed'
import { PreferenceBackgroundLocationPermissionReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

export default () => {
	const router = useRouter()
	const rPreferenceBackgroundLocationPermission = useReactiveVar(
		PreferenceBackgroundLocationPermissionReactiveVar,
	)

	return (
		<View>
			<Text fontSize={'$lg'} pb={'$3'}>
				By enabling Foreground location, it helps you to go out, join bars and find events.
			</Text>
			<Text fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
				FOREGROUND LOCATION
			</Text>

			<Button variant={'link'} size={'lg'}>
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
		</View>
	)
}

// ;<Modal isOpen={isOpen} onClose={onClose}>
// 	<Modal.Content w={'95%'}>
// 		<Modal.Header>Foreground location</Modal.Header>
// 		<Modal.CloseButton />
// 		<Modal.Body
// 			mt={'$2'}
// 			_scrollview={{
// 				scrollEnabled: false,
// 			}}
// 		>
// 			<Text fontSize={'$lg'} pb={'$3'}>
// 				By enabling foreground location, it helps you to go out, find events and it allows you to join
// 				bars.
// 			</Text>
// 			<VStack space={'md'}>
// 				<Button
// 					onPress={async () => {
// 						const values = {
// 							...DaysPreferencePermissionInitialState,
// 							numberOfTimesDismissed: rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
// 								? rPreferenceForegroundLocationPermission.numberOfTimesDismissed + 1
// 								: 1,
// 						}
// 						await AsyncStorage.setItem(
// 							LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
// 							JSON.stringify(values as LocalStoragePreferenceAskForegroundLocationPermissionType),
// 						)
// 						PreferenceForegroundLocationPermissionReactiveVar({
// 							...values,
// 						})
// 						onClose()
// 					}}
// 					variant={'link'}
// 					size={'lg'}
// 				>
// 					<Text fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
// 						Not now
// 					</Text>
// 				</Button>
// 				<Divider mt={'$1'} />
// 				<Button
// 					onPress={() =>
// 						router.push({
// 							pathname: '/(app)/permission/foregroundlocation',
// 						})
// 					}
// 					variant={'link'}
// 					size={'lg'}
// 				>
// 					<Text>Continue</Text>
// 				</Button>
// 			</VStack>
// 		</Modal.Body>
// 	</Modal.Content>
// </Modal>

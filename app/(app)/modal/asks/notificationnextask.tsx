import { DaysPreferencePermissionInitialState } from '@constants/Preferences'
import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from '@constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useReactiveVar } from '@apollo/client'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@ctypes/preferences'
import { Button, Divider, Modal, Text, VStack, View } from '@gluestack-ui/themed'
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
				NOTIFICATIONS
			</Text>
			<Text fontSize={'$lg'} pb={'$3'}>
				By enabling background location, it helps you to go out, join bars and find events.
			</Text>

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
		</View>
	)
}

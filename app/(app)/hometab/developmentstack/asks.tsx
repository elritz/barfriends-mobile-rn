import {
	NowPreferencePermissionInitialState,
	TomorrowPreferencePermissionInitialState,
} from '@constants/Preferences'
import {
	LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
} from '@constants/StorageConstants'
import { Button, ButtonText, HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PreferenceBackgroundLocationPermissionReactiveVar,
	PreferenceForegroundLocationPermissionReactiveVar,
} from '@reactive'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'
export default function Preferences() {
	const router = useRouter()

	const nextAskAction = [
		{
			title: 'Foreground Location',
			actions: [
				{
					title: 'Reset',
					color: '$error500',
					onPress: async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
							JSON.stringify(NowPreferencePermissionInitialState),
						)
					},
				},
				{
					title: 'Show',
					color: '$green500',
					onPress: async () => {
						router.navigate({
							pathname: '/(app)/modal/asks/foregroundlocationnextask',
						})
					},
				},
				{
					title: 'Dont show again',
					color: '$orange500',
					onPress: async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
							JSON.stringify({
								...TomorrowPreferencePermissionInitialState,
								canShowAgain: false,
							}),
						)
						PreferenceForegroundLocationPermissionReactiveVar({
							...TomorrowPreferencePermissionInitialState,
							canShowAgain: false,
						})
					},
				},
			],
		},
		{
			title: 'Background Location',
			actions: [
				{
					title: 'Reset',
					color: '$error500',
					onPress: async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
							JSON.stringify(NowPreferencePermissionInitialState),
						)
					},
				},
				{
					title: 'Show',
					color: '$green500',
					onPress: async () => {
						router.navigate({
							pathname: '/(app)/modal/asks/backgroundlocationnextask',
						})
					},
				},
				{
					title: 'Dont show again',
					color: '$orange500',
					onPress: async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
							JSON.stringify({
								...TomorrowPreferencePermissionInitialState,
								canShowAgain: false,
							}),
						)
						PreferenceBackgroundLocationPermissionReactiveVar({
							...TomorrowPreferencePermissionInitialState,
							canShowAgain: false,
						})
					},
				},
			],
		},
		{
			title: 'Notification',
			actions: [
				{
					title: 'Reset',
					color: '$error500',
					onPress: async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
							JSON.stringify(NowPreferencePermissionInitialState),
						)
					},
				},
				{
					title: 'Show',
					color: '$green500',
					onPress: async () => {
						router.navigate({
							pathname: '/(app)/modal/asks/notificationnextask',
						})
					},
				},
				{
					title: 'Dont show again',
					color: '$orange500',
					onPress: async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
							JSON.stringify({
								...TomorrowPreferencePermissionInitialState,
								canShowAgain: false,
							}),
						)
						PreferenceBackgroundLocationPermissionReactiveVar({
							...TomorrowPreferencePermissionInitialState,
							canShowAgain: false,
						})
					},
				},
			],
		},
	]

	return (
		<ScrollView contentInset={{ top: 10 }}>
			<VStack>
				<VStack justifyContent={'space-between'} mx={'$2'} space={'lg'}>
					{nextAskAction.map((item, index) => {
						return (
							<VStack key={index}>
								<Heading>{item.title}</Heading>
								<HStack justifyContent={'flex-start'} space={'sm'} mt={'$2'}>
									{item.actions.map((action, index) => {
										return (
											<Button
												key={index}
												size='sm'
												rounded={'$full'}
												bg={action.color}
												onPress={action.onPress}
											>
												<ButtonText
													sx={{
														color: '$white',
													}}
												>
													{action.title}
												</ButtonText>
											</Button>
										)
									})}
								</HStack>
							</VStack>
						)
					})}
				</VStack>
			</VStack>
		</ScrollView>
	)
}

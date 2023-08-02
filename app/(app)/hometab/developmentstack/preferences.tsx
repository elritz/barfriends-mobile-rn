import { useReactiveVar } from '@apollo/client'
import { Box, Divider, HStack, Pressable, Spinner, Text, VStack } from '@components/core'
import {
	TomorrowPreferencePermissionInitialState,
	NowPreferencePermissionInitialState,
} from '@constants/Preferences'
import {
	LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
} from '@constants/StorageConstants'
import { Ionicons, Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PreferenceBackgroundLocationPermissionReactiveVar,
	PreferenceForegroundLocationPermissionReactiveVar,
	PreferencePermissionNotificationReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { useState } from 'react'
import { ScrollView, Alert } from 'react-native'

export default function Preferences() {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [loading, setIsLoading] = useState(false)
	const ITEM_HEIGHT = 60

	return (
		<ScrollView style={{ maxWidth: '100%' }}>
			<VStack mx={'$3'} my={'$5'}>
				<Text textAlign='center' fontSize={'$lg'}>
					These items are for reseting/updating delete the tokens that are saved during Bfs app initial
					render. These preferences are also set when a user interacts with components that ask them to
					set the persisted state or dismiss the prompt.
				</Text>
			</VStack>
			{[
				{
					type: 'token',
					title: 'Notification Permission Preference',
					icon: 'notifications',
					onPress: async () => {
						Alert.alert('Reset Notifications', 'To reset is to set back to default settings', [
							{
								text: 'Reset',
								onPress: async () => {
									setIsLoading(true)
									await AsyncStorage.setItem(
										LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
										JSON.stringify(NowPreferencePermissionInitialState),
									)
									PreferencePermissionNotificationReactiveVar({
										...TomorrowPreferencePermissionInitialState,
									})
								},
								style: 'cancel',
							},
							{
								text: 'Cancel',
								style: 'cancel',
							},
						])
					},
				},
				{
					type: 'token',
					title: 'Foreground location Permission Ask Preference',
					icon: 'location',
					onPress: async () => {
						Alert.alert('Reset Foreground Location', 'To reset is to set back to default settings', [
							{
								text: 'Reset',
								onPress: async () => {
									setIsLoading(true)
									await AsyncStorage.setItem(
										LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
										JSON.stringify(NowPreferencePermissionInitialState),
									)
									PreferenceForegroundLocationPermissionReactiveVar({
										...TomorrowPreferencePermissionInitialState,
									})
								},
								style: 'cancel',
							},
							{
								text: 'Cancel',
								style: 'cancel',
							},
						])
					},
				},
				{
					type: 'token',
					title: 'Background location Permission Ask Preference',
					icon: 'map-sharp',
					onPress: async () => {
						Alert.alert('Reset Background Location', 'To reset is to set back to default settings', [
							{
								text: 'Reset',
								onPress: async () => {
									setIsLoading(true)
									await AsyncStorage.setItem(
										LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
										JSON.stringify(NowPreferencePermissionInitialState),
									)
									PreferenceBackgroundLocationPermissionReactiveVar({
										...TomorrowPreferencePermissionInitialState,
									})
								},
								style: 'cancel',
							},
							{
								text: 'Cancel',
								style: 'cancel',
							},
						])
						setTimeout(() => {
							setIsLoading(false)
						}, 2000)
					},
				},
			].map((item, index) => {
				return (
					<Pressable key={index} onPress={item.onPress}>
						<Divider />
						<HStack
							mx={'$3'}
							space={'md'}
							height={ITEM_HEIGHT}
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<HStack
								space={'md'}
								sx={{
									maxWidth: '80%',
								}}
								alignItems={'center'}
								justifyContent={'flex-start'}
							>
								<Ionicons
									size={25}
									name={item.icon}
									color={
										rTheme.colorScheme === 'light'
											? rTheme.theme?.gluestack.tokens.colors.light900
											: rTheme.theme?.gluestack.tokens.colors.dark900
									}
								/>
								<Text sx={{ maxWidth: 275 }} numberOfLines={2} fontSize={'$md'}>
									{item.title}
								</Text>
							</HStack>
							<Box bg={'transparent'}>
								{loading ? (
									<Spinner />
								) : (
									<Feather
										name={'trash-2'}
										style={{ marginRight: 3 }}
										size={20}
										color={rTheme.theme?.gluestack.tokens.colors.danger500}
									/>
								)}
							</Box>
						</HStack>
						<Divider />
					</Pressable>
				)
			})}
		</ScrollView>
	)
}

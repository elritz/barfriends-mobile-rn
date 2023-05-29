// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it
import PermissionDetailItem from '../PermissionDetailItem'
import { useReactiveVar } from '@apollo/client'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useUpsertDevicePushTokenMutation } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { PermissionNotificationReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useTimer2 from '@util/hooks/useTimer2'
import * as Application from 'expo-application'
import * as Device from 'expo-device'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import { Box, VStack, Button, Divider, Icon, Text, Heading, ScrollView } from 'native-base'
import { useEffect, useRef } from 'react'
import { Alert, AppState, Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To receive messages, venue and event deals around you.',
		iconName: 'ios-location-sharp',
		iconType: Ionicons,
	},
	{
		title: 'How we’ll use this',
		detail: 'To create messages from you to others.',
		iconName: 'android-messages',
		iconType: MaterialCommunityIcons,
	},
	{
		title: 'How these settings work',
		detail:
			'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
		iconName: 'ios-settings-sharp',
		iconType: Ionicons,
	},
]

const NotificationsPermissionScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const router = useRouter()
	const isFocused = useIsFocused()
	const rNotificationsPermission = useReactiveVar(PermissionNotificationReactiveVar)
	const { finished, start, seconds, started } = useTimer2('0:2')

	const [upsertDevicePushTokenMutation, { data, loading, error }] =
		useUpsertDevicePushTokenMutation()

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Notification Permission',
			`Notifications are currently ${capitalizeFirstLetter(
				capitalizeFirstLetter(rNotificationsPermission?.status),
			)}. If you wish to adjust go to your device settings.`,
			[
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{ text: 'Settings', onPress: () => handleOpenPhoneSettings() },
			],
		)

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.NOTIFICATION_SETTINGS)
		}
	}

	const handleRequestPermission = async () => {
		if (Device.isDevice) {
			if (Platform.OS === 'android') {
				Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.HIGH,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: '#ff6f007c',
				})
			}

			const status = await Notifications.requestPermissionsAsync({
				ios: {
					allowAlert: true,
					allowBadge: true,
					allowSound: true,
					allowAnnouncements: true,
					provideAppNotificationSettings: true,
					allowCriticalAlerts: true,
					allowDisplayInCarPlay: true,
				},
			})

			PermissionNotificationReactiveVar(status)

			if (status.granted) {
				const devicetoken = await Notifications.getDevicePushTokenAsync()

				if (Platform.OS === 'ios') {
					const IOSenv = await Application.getIosPushNotificationServiceEnvironmentAsync()

					const expoToken = await Notifications.getExpoPushTokenAsync({
						experienceId: '@barfriends/barfriends',
						applicationId: String(Application.applicationId),
						development: IOSenv === 'development' ? true : false,
					})

					upsertDevicePushTokenMutation({
						variables: {
							appleToken: devicetoken.data,
							expoToken: expoToken.data,
						},
					})
				} else {
					const expoToken = await Notifications.getExpoPushTokenAsync({
						experienceId: '@barfriends/barfriends',
						applicationId: String(Application.applicationId),
					})

					upsertDevicePushTokenMutation({
						variables: {
							androidToken: devicetoken.data,
							expoToken: expoToken.data,
						},
					})
				}
			} else {
				createTwoButtonAlert()
			}
		} else {
			Alert.alert('Must use physical device for Push Notifications')
		}
	}

	useEffect(() => {
		async function loadPermissionsAsync() {
			const status = await Notifications.getPermissionsAsync()
			try {
				PermissionNotificationReactiveVar(status)
			} catch (e) {
				console.warn(e)
			}
		}
		loadPermissionsAsync()
	}, [isFocused])

	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange)
		return () => {
			subscription.remove()
		}
	}, [])

	const handleAppStateChange = async (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
			const status = await Notifications.getPermissionsAsync()
			PermissionNotificationReactiveVar(status)
			if (status.granted && status.status === 'granted') {
				setTimeout(() => {
					router.back()
				}, 2000)
				start()
			}
		}
		appStateRef.current = nextAppState
	}

	finished(() => {
		router.back()
	})

	return (
		<Box style={{ flex: 1 }}>
			<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
				<Box
					borderRadius={'md'}
					h={65}
					w={65}
					alignItems={'center'}
					justifyContent={'center'}
					bg={'#ff7000'}
				>
					<Icon as={Ionicons} color={'secondary.800'} name={'ios-notifications'} size={9} />
				</Box>
				<Divider width={2} style={{ width: 50, marginVertical: 10 }} />
				<Heading
					fontWeight={900}
					fontSize={'3xl'}
					style={{
						width: wp(95),
						maxWidth: 300,
						textAlign: 'center',
					}}
					allowFontScaling
					adjustsFontSizeToFit
					numberOfLines={3}
				>
					Allow Barfriends to send notifications
				</Heading>
			</Box>
			<ScrollView>
				<Box width={wp(95)} style={{ flex: 1, alignSelf: 'center' }}>
					{details.map((item, index) => {
						return (
							<View key={index}>
								<PermissionDetailItem {...item} />
							</View>
						)
					})}
				</Box>
			</ScrollView>
			<VStack safeAreaBottom space={2} w={'full'} alignItems={'center'}>
				<Divider w={'95%'} />
				<Button
					size={'lg'}
					width={'95%'}
					onPress={() =>
						!rNotificationsPermission?.granted
							? rNotificationsPermission?.canAskAgain && !rNotificationsPermission.granted
								? handleRequestPermission()
								: handleOpenPhoneSettings()
							: createTwoButtonAlert()
					}
				>
					{!rNotificationsPermission?.granted
						? rNotificationsPermission?.canAskAgain && !rNotificationsPermission.granted
							? 'Continue'
							: 'Go to Phone Settings'
						: 'Granted'}
				</Button>
				{!started && (
					<Button size={'lg'} width={'95%'} onPress={() => router.back()} variant={'ghost'}>
						<Text fontWeight={'medium'}>Close</Text>
					</Button>
				)}
				{started && <Box h={'20px'}>{<Text fontWeight={'medium'}>Auto close in {seconds}</Text>}</Box>}
			</VStack>
		</Box>
	)
}

export default NotificationsPermissionScreen

// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Divider, Heading, Text, VStack } from '@components/core'
import PermissionDetailItem from '@components/screens/permissions/PermissionDetailItem'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import {
	useGetCurrentPushNotificationTokenLazyQuery,
	useGetCurrentPushNotificationTokenQuery,
	useUpsertDevicePushTokenMutation,
} from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { PermissionNotificationReactiveVar, ThemeReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useTimer2 from '@util/hooks/useTimer2'
import * as Application from 'expo-application'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Alert, AppState, Platform, ScrollView, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const appStateRef = useRef(AppState.currentState)
	const router = useRouter()
	const isFocused = useIsFocused()
	const insets = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rNotificationsPermission = useReactiveVar(PermissionNotificationReactiveVar)
	const { finished, start, seconds, started } = useTimer2('0:2')

	const details = [
		{
			title: 'How you’ll use this',
			detail: 'To receive messages, venue and event deals around you.',
			icon: (
				<Ionicons
					name={'ios-location-sharp'}
					size={25}
					style={{
						marginHorizontal: 7,
					}}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
				/>
			),
		},
		{
			title: 'How we’ll use this',
			detail: 'To create messages from you to others.',
			icon: (
				<MaterialCommunityIcons
					name={'android-messages'}
					size={25}
					style={{
						marginHorizontal: 7,
					}}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
				/>
			),
		},
		{
			title: 'How these settings work',
			detail:
				'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
			icon: (
				<Ionicons
					name={'ios-settings-sharp'}
					size={25}
					style={{
						marginHorizontal: 7,
					}}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
				/>
			),
		},
	]

	const {
		data: GCPNTData,
		loading: GCPNTLoading,
		error: GCPNTError,
	} = useGetCurrentPushNotificationTokenQuery()
	
	const [upsertDevicePushTokenMutation, { data, loading, error }] =
		useUpsertDevicePushTokenMutation()

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Revel Notification Permission',
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
						projectId: Constants.expoConfig?.extra?.eas.projectId,
						applicationId: String(Application.applicationId),
						development: IOSenv === 'development' ? true : false,
					})
					upsertDevicePushTokenMutation({
						variables: {
							token: devicetoken.data,
							expoToken: expoToken.data,
							type: devicetoken.type,
						},
					})
				} else {
					const expoToken = await Notifications.getExpoPushTokenAsync({
						projectId: Constants.expoConfig?.extra?.eas.projectId,
						applicationId: String(Application.applicationId),
					})

					upsertDevicePushTokenMutation({
						variables: {
							token: devicetoken.data,
							expoToken: expoToken.data,
							type: devicetoken.type,
						},
					})
				}
			} else {
				createTwoButtonAlert()
			}
		} else {
			Alert.alert(`Must use physical device for Push Notifications`, [
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{
					text: 'Ok',
					onPress: () => null,
					style: 'default',
					isPreferred: true,
				},
			])
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

	if (GCPNTLoading) {
		return null
	}

	return (
		<Box bg={'$transparent'} style={{ flex: 1 }} mb={'$5'}>
			<Box bg={'$transparent'} alignItems={'center'} justifyContent={'flex-start'} my={'$5'}>
				<Box
					rounded={'$md'}
					sx={{
						h: 65,
						w: 65,
					}}
					alignItems={'center'}
					justifyContent={'center'}
					bg={'#ff7000'}
				>
					<Ionicons
						name='ios-notifications'
						size={30}
						color={rTheme.theme?.gluestack.tokens.colors.secondary900 || 'black'}
					/>
				</Box>
				<Divider width={'$2'} style={{ width: 50, marginVertical: 10 }} />
				<Heading
					fontWeight={'$black'}
					fontSize={'$3xl'}
					style={{
						width: wp(95),
						maxWidth: 300,
						textAlign: 'center',
					}}
					allowFontScaling
					adjustsFontSizeToFit
					numberOfLines={3}
				>
					Allow Revel to send notifications
				</Heading>
			</Box>
			<ScrollView>
				<Box
					bg={'$transparent'}
					sx={{
						w: wp(95),
					}}
					style={{ flex: 1, alignSelf: 'center' }}
				>
					{details.map((item, index) => {
						return (
							<View key={index}>
								<PermissionDetailItem {...item} />
							</View>
						)
					})}
				</Box>
			</ScrollView>
			{rNotificationsPermission?.granted && !data?.upsertDevicePushToken ? (
				<VStack
					space={'md'}
					w={'$full'}
					alignItems={'center'}
					sx={{
						mb: insets.bottom,
					}}
				>
					<Divider
						sx={{
							w: '95%',
						}}
					/>
					<Button size={'lg'} width={'95%'} onPress={() => handleRequestPermission()}>
						<Button.Text>Continue</Button.Text>
					</Button>
					{!started ? (
						<Button size={'lg'} sx={{ width: '95%' }} onPress={() => router.back()} variant={'link'}>
							<Text fontWeight={'$medium'}>Close</Text>
						</Button>
					) : (
						<Button size={'lg'} sx={{ width: '95%' }} onPress={() => router.back()} variant={'link'}>
							{started && (
								<Box
									bg={'$transparent'}
									sx={{
										h: 20,
									}}
								>
									{<Text fontWeight={'$medium'}>Auto close in {seconds}</Text>}
								</Box>
							)}
						</Button>
					)}
				</VStack>
			) : (
				<VStack
					space={'md'}
					w={'$full'}
					alignItems={'center'}
					sx={{
						mb: insets.bottom,
					}}
				>
					<Divider
						sx={{
							w: '95%',
						}}
					/>
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
						<Button.Text>
							{!rNotificationsPermission?.granted
								? rNotificationsPermission?.canAskAgain && !rNotificationsPermission.granted
									? 'Continue'
									: 'Go to Phone Settings'
								: 'Granted'}
						</Button.Text>
					</Button>
					{!started ? (
						<Button size={'lg'} sx={{ width: '95%' }} onPress={() => router.back()} variant={'link'}>
							<Text fontWeight={'$medium'}>Close</Text>
						</Button>
					) : (
						<Button size={'lg'} sx={{ width: '95%' }} onPress={() => router.back()} variant={'link'}>
							{started && (
								<Box
									bg={'$transparent'}
									sx={{
										h: 20,
									}}
								>
									{<Text fontWeight={'$medium'}>Auto close in {seconds}</Text>}
								</Box>
							)}
						</Button>
					)}
				</VStack>
			)}
		</Box>
	)
}

// TODO: FN(Change theme functionality with database and local storage save)
import { useReactiveVar } from '@apollo/client'
import {
	Box,
	Button,
	Divider,
	HStack,
	Heading,
	Pressable,
	Spinner,
	Text,
	Tooltip,
	VStack,
} from '@components/core'
import {
	AUTHORIZATION,
	LOCAL_STORAGE_SEARCH_AREA,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
} from '@constants/StorageConstants'
import {
	DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME,
	DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
} from '@constants/TaskManagerConstants'
import { ENVIRONMENT } from '@env'
import { Feather, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	AuthorizationReactiveVar,
	searchAreaInitialState,
	SearchAreaReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { useDisclose } from '@util/hooks/useDisclose'
import * as Application from 'expo-application'
import * as Clipboard from 'expo-clipboard'
import * as Device from 'expo-device'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import * as Updates from 'expo-updates'
import { useEffect, useState } from 'react'
import { SectionList } from 'react-native'
import { Platform, Linking, AppState, View } from 'react-native'

async function registerBackgroundFetchAsync() {
	await Location.startLocationUpdatesAsync(DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME, {
		accuracy: Location.Accuracy.Balanced,
		deferredUpdatesDistance: 15,
		timeInterval: 5000,
		showsBackgroundLocationIndicator: true,
		deferredUpdatesInterval: ENVIRONMENT === 'development' ? 1000 : 5000,
		distanceInterval: ENVIRONMENT === 'development' ? 0 : 20,
		foregroundService: {
			notificationTitle: 'Location',
			notificationBody: 'Location tracking in background',
			notificationColor: '#fff',
		},
	})
}

async function registerForegroundFetchAsync() {
	await Location.startLocationUpdatesAsync(DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME, {
		accuracy: Location.Accuracy.Balanced,
		deferredUpdatesDistance: 25,
		timeInterval: 5000,
		showsBackgroundLocationIndicator: true,
		deferredUpdatesInterval: ENVIRONMENT === 'development' ? 1000 : 5000,
		distanceInterval: ENVIRONMENT === 'development' ? 0 : 20,
		foregroundService: {
			notificationTitle: 'Location',
			notificationBody: 'Location tracking in background',
			notificationColor: '#fff',
		},
	})
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
	return Location.stopLocationUpdatesAsync(DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME)
}

export default () => {
	const ITEM_HEIGHT = 50
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [token, setToken] = useState('')
	const [pushNotificationToken, setPushNotificationToken] = useState('')
	const [appState, setAppState] = useState(AppState.currentState)
	const [searchAreaDeleteLoading, setSearchAreaDeleteLoading] = useState(false)
	const [authorizationDeleteLoading, setAuthorizationDeleteLoading] = useState(false)

	const {
		isOpen: isForegroundLocationOn,
		onOpen: onOpenForegroundLocationOn,
		onClose: onCloseForegroundLocationOn,
		onToggle: onToggleForegroundLocationOn,
	} = useDisclose()

	const {
		isOpen: isBackgroundLocationOn,
		onOpen: onOpenBackgroundLocationOn,
		onClose: onCloseBackgroundLocationOn,
		onToggle: onToggleBackgroundLocationOn,
	} = useDisclose()

	const {
		isOpen: isOpenToken,
		onOpen: onOpenToken,
		onClose: onCloseToken,
		onToggle: onToggleToken,
	} = useDisclose()

	const {
		isOpen: isOpenProfileId,
		onOpen: onOpenProfileId,
		onClose: onCloseProfileId,
		onToggle: onToggleProfileId,
	} = useDisclose()

	const {
		isOpen: isOpenPushNotif,
		onOpen: onOpenPushNotif,
		onClose: onClosePushNotif,
		onToggle: onTogglePushNotif,
	} = useDisclose()

	const appStateHandleBackgroundLocation = async nextAppState => {
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
		)

		if (isBackgroundLocationOn) {
			if (!hasStarted && nextAppState === 'inactive') {
				await registerBackgroundFetchAsync()
			}
			if (appState !== nextAppState) {
				if (appState.match(/inactive|background/) && nextAppState === 'active') {
					await unregisterBackgroundFetchAsync()
				}
			}
		}

		if (!isBackgroundLocationOn && hasStarted) {
			await unregisterBackgroundFetchAsync()
		}

		AppState.currentState = nextAppState
		setAppState(AppState.currentState)
	}

	async function getApplicationAuthorization() {
		const getAuthorization = await secureStorageItemRead({
			key: AUTHORIZATION,
		})
		setToken(String(getAuthorization))
	}

	async function getPushNotificationToken() {
		const IOSenv = await Application.getIosPushNotificationServiceEnvironmentAsync()

		const expoToken = await Notifications.getExpoPushTokenAsync({
			applicationId: String(Application.applicationId),
			development: IOSenv === 'development' ? true : false,
		})

		setPushNotificationToken(String(expoToken.data))
	}

	useEffect(() => {
		getApplicationAuthorization()
		getPushNotificationToken()
	}, [])

	useEffect(() => {
		const appStateListen = AppState.addEventListener('change', appStateHandleBackgroundLocation)
		return () => {
			appStateListen.remove()
		}
	}, [isBackgroundLocationOn])

	// useEffect(() => {
	// 	registerForPushNotificationsAsync().then(token => setPushNotificationToken(token))

	// 	notificationListener?.current = Notifications.addNotificationReceivedListener(notification => {
	// 		setNotification(notification)
	// 	})

	// 	responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
	// 	})

	// 	return () => {
	// 		Notifications.removeNotificationSubscription(notificationListener.current)
	// 		Notifications.removeNotificationSubscription(responseListener.current)
	// 	}
	// }, [])

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APP_OPS_SETTINGS)
		}
	}

	const toggleForegroundLocationTask = async () => {
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME,
		)
		if (hasStarted) {
			await unregisterBackgroundFetchAsync()
		} else {
			await registerBackgroundFetchAsync()
		}
	}

	// const onReloadPress = useCallback(() => {
	// 	if (Platform.OS === 'web') {
	// 		location.reload()
	// 	} else {
	// 		Updates.reloadAsync()
	// 	}
	// }, [])

	const onReloadPress = async () => {
		if (Platform.OS === 'web') {
			location.reload()
		} else {
			await Updates.reloadAsync()
		}
	}

	const settingsOptions = [
		{
			type: 'setting',
			title: 'Preference modals',
			icon: 'albums',
			onPress: () =>
				router.push({
					pathname: '(app)/hometab/developmentstack/preferences',
				}),
		},
		{
			type: 'setting',
			title: 'Permission modals',
			icon: 'bookmarks',
			onPress: () =>
				router.push({
					pathname: '(app)/hometab/developmentstack/permissionmodals',
				}),
		},
		{
			type: 'setting',
			title: 'Change theme',
			icon: 'color-palette-sharp',
			onPress: () =>
				router.push({
					pathname: '(app)/hometab/developmentstack/theme',
				}),
		},
		{
			type: 'setting',
			title: 'Device settings',
			icon: 'settings',
			onPress: handleOpenPhoneSettings,
		},
		{
			type: 'setting',
			title: 'Refresh',
			icon: 'refresh',
			onPress: onReloadPress,
		},
	]

	const tokenOptions = [
		{
			type: 'token',
			title: 'Theme scheme',
			icon: 'color-palette-sharp',
			onPress: () =>
				router.push({
					pathname: '(app)/hometab/developmentstack/theme',
				}),
		},
		{
			type: 'token',
			title: 'Authorization',
			icon: 'finger-print',
			loading: authorizationDeleteLoading,
			onPress: async () => {
				setAuthorizationDeleteLoading(true)
				await secureStorageItemDelete({
					key: AUTHORIZATION,
				}),
					setTimeout(() => {
						setAuthorizationDeleteLoading(false)
					}, 1500)
			},
		},
		{
			type: 'token',
			title: 'Search area',
			icon: 'map',
			loading: searchAreaDeleteLoading,
			onPress: async () => {
				setSearchAreaDeleteLoading(true)
				await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
				SearchAreaReactiveVar(searchAreaInitialState)
				setTimeout(() => {
					setSearchAreaDeleteLoading(false)
				}, 1500)
			},
		},
		{
			type: 'token',
			title: 'Reset theme',
			icon: 'color-palette-sharp',
			onPress: async () => {
				await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME)
				const initialThemeColorSchemeState = JSON.stringify({
					colorScheme: 'system',
				})
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
					initialThemeColorSchemeState,
				)
			},
		},
	]

	const Item = ({ item, index, loading }) => {
		switch (item.type) {
			case 'setting':
				return (
					<Pressable key={index} onPress={item.onPress}>
						{({ isHovered, isFocused, isPressed }) => {
							return (
								<Box
									sx={{
										_light: {
											bg: isPressed ? '$light100' : 'transparent',
										},
										_dark: {
											bg: isPressed ? '$dark100' : 'transparent',
										},
									}}
									height={ITEM_HEIGHT}
									justifyContent={'space-between'}
								>
									<Divider />
									<HStack px={'$2'} space={'md'} alignItems={'center'}>
										<Ionicons
											size={25}
											name={item.icon}
											color={
												rTheme.colorScheme === 'light'
													? rTheme.theme?.gluestack.tokens.colors.light900
													: rTheme.theme?.gluestack.tokens.colors.dark900
											}
										/>
										<Heading fontSize={'$lg'}>{item.title}</Heading>
									</HStack>
									<Divider />
								</Box>
							)
						}}
					</Pressable>
				)
			case 'token':
				return (
					<Pressable key={index} onPress={item.onPress}>
						{({ isPressed }) => {
							return (
								<Box
									sx={{
										_light: {
											bg: isPressed ? '$light100' : 'transparent',
										},
										_dark: {
											bg: isPressed ? '$dark100' : 'transparent',
										},
									}}
									height={ITEM_HEIGHT}
									justifyContent={'space-between'}
								>
									<Divider />
									<HStack px={'$2'} space={'md'} alignItems={'center'} justifyContent={'space-between'}>
										<HStack space={'md'} alignItems={'center'}>
											<Ionicons
												size={25}
												name={item.icon}
												color={
													rTheme.colorScheme === 'light'
														? rTheme.theme?.gluestack.tokens.colors.light900
														: rTheme.theme?.gluestack.tokens.colors.dark900
												}
											/>
											<Heading fontSize={'$lg'}>{item.title}</Heading>
										</HStack>
										{loading ? (
											<Spinner />
										) : (
											<Feather
												style={{ marginRight: 3 }}
												name='trash'
												size={18}
												color={rTheme.theme?.gluestack.tokens.colors.danger500}
											/>
										)}
									</HStack>
									<Divider />
								</Box>
							)
						}}
					</Pressable>
				)
		}
	}

	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "You've got mail! 📬",
				body: 'Here is the notification body',
				data: { data: 'goes here for link', link: 'What is this link' },
			},
			trigger: { seconds: 5 },
		})
	}

	async function registerForPushNotificationsAsync() {
		let token

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			})
		}

		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!')
				return
			}
			token = (await Notifications.getExpoPushTokenAsync()).data
		} else {
			alert('Must use physical device for Push Notifications')
		}

		return token
	}

	return (
		<Box flex={1} mx={'$3'} bg={'$transparent'}>
			<SectionList
				showsVerticalScrollIndicator={false}
				contentInset={{
					bottom: 100,
				}}
				ListHeaderComponent={() => {
					return (
						<VStack>
							<Box my={5} bg={'$transparent'}>
								<Tooltip
									trigger={() => {
										return (
											<Pressable
												onPress={async () => {
													onToggleToken()
													await Clipboard.setStringAsync(token)
													setTimeout(() => onCloseToken(), 500)
												}}
											>
												<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={'$2'}>
													Token
												</Heading>
											</Pressable>
										)
									}}
									placement='top'
									isOpen={isOpenToken}
									openDelay={500}
								>
									<HStack
										sx={{
											_light: {
												bg: '$light100',
											},
											_dark: {
												bg: '$dark100',
											},
										}}
										rounded={'$md'}
										alignItems={'center'}
										justifyContent={'space-around'}
										py={'$3'}
									>
										<Text
											fontSize={'$md'}
											textTransform={'capitalize'}
											fontWeight={'$black'}
											ellipsizeMode={'tail'}
											flex={1}
											marginLeft={'$5'}
											numberOfLines={1}
										>
											{token}
										</Text>
										<View style={{ marginHorizontal: 2 }}>
											<Feather
												color={rTheme.theme?.gluestack.tokens.colors.primary500}
												size={30}
												name='copy'
											/>
										</View>
									</HStack>
								</Tooltip>
								<Divider my={3} />
								<Tooltip
									placement='top'
									isOpen={isOpenProfileId}
									trigger={() => {
										return (
											<Pressable
												onPress={async () => {
													onToggleProfileId()
													await Clipboard.setStringAsync(String(rAuthorizationVar?.DeviceProfile?.Profile?.id))
													setTimeout(() => onCloseProfileId(), 500)
												}}
											>
												<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={'$2'}>
													Profile ID
												</Heading>
											</Pressable>
										)
									}}
									openDelay={500}
								>
									<HStack
										sx={{
											_light: {
												bg: '$light100',
											},
											_dark: {
												bg: '$dark100',
											},
										}}
										rounded={'$md'}
										alignItems={'center'}
										justifyContent={'space-around'}
										py={'$3'}
									>
										<Text
											fontSize={'$md'}
											textTransform={'capitalize'}
											fontWeight={'$black'}
											ellipsizeMode={'tail'}
											flex={1}
											marginLeft={'$5'}
											numberOfLines={1}
										>
											{rAuthorizationVar?.DeviceProfile?.Profile?.id}
										</Text>
										<View style={{ marginHorizontal: 2 }}>
											<Feather
												color={rTheme.theme?.gluestack.tokens.colors.primary500}
												size={30}
												name='copy'
											/>
										</View>
									</HStack>
								</Tooltip>
								<Divider my={3} />

								<Tooltip
									placement='top'
									isOpen={isOpenPushNotif}
									openDelay={500}
									trigger={() => {
										return (
											<Pressable
												onPress={async () => {
													onTogglePushNotif()
													await Clipboard.setStringAsync(String(pushNotificationToken))
													setTimeout(() => onClosePushNotif(), 500)
												}}
											>
												<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={'$2'}>
													Expo Push Token
												</Heading>
											</Pressable>
										)
									}}
								>
									<HStack
										sx={{
											_light: {
												bg: '$light100',
											},
											_dark: {
												bg: '$dark100',
											},
										}}
										rounded={'$md'}
										alignItems={'center'}
										justifyContent={'space-around'}
										py={'$3'}
									>
										<Text
											fontSize={'$md'}
											textTransform={'capitalize'}
											fontWeight={'$black'}
											ellipsizeMode={'tail'}
											flex={1}
											marginLeft={'$5'}
											numberOfLines={1}
										>
											{pushNotificationToken}
										</Text>
										<View style={{ marginHorizontal: 2 }}>
											<Feather
												color={rTheme.theme?.gluestack.tokens.colors.primary500}
												size={30}
												name='copy'
											/>
										</View>
									</HStack>
								</Tooltip>
								<Divider my={3} />
							</Box>
							<VStack space={'md'} w={'$full'} px={'$10'} my={'$3'}>
								<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={'$2'}>
									Notification
								</Heading>
								<Button
									onPress={async () => {
										await schedulePushNotification()
									}}
								>
									<Text>send notification</Text>
								</Button>
								<Divider />
							</VStack>
							<VStack space={'md'} w={'$full'} px={'$10'} my={'$3'}>
								<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={'$2'}>
									Location tracking
								</Heading>
								<Button
									onPress={toggleForegroundLocationTask}
									isDisabled={isForegroundLocationOn}
									bg='$green400'
								>
									<Text>Start in foreground</Text>
								</Button>
								<Divider />
								<Button
									onPress={toggleForegroundLocationTask}
									isDisabled={!isForegroundLocationOn}
									bg={'$red500'}
								>
									<Text>Stop in foreground</Text>
								</Button>
								<Divider />
								<Button
									onPress={onToggleBackgroundLocationOn}
									isDisabled={isBackgroundLocationOn}
									bg='$green400'
								>
									<Text>Start in background</Text>
								</Button>
								<Divider />
								<Button
									onPress={onToggleBackgroundLocationOn}
									isDisabled={!isBackgroundLocationOn}
									bg='$red400'
								>
									<Text>Stop in background</Text>
								</Button>
							</VStack>
						</VStack>
					)
				}}
				sections={[
					{
						title: 'Settings',
						data: settingsOptions,
					},
					{
						title: 'Tokens',
						data: tokenOptions,
					},
				]}
				// keyExtractor={(item, index) => index}
				renderItem={({ item, index }) => <Item index={index} item={item} />}
				renderSectionHeader={({ section: { title } }) => (
					<Box py={'$3'} rounded={'$none'} bg={'transparent'} justifyContent='center'>
						<Heading mt={'$4'} fontSize={'$2xl'}>
							{title}
						</Heading>
					</Box>
				)}
			/>
		</Box>
	)
}

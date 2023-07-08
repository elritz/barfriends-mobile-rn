// TODO: FN(Open camera app) ln:66
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Divider, Heading, Text, VStack } from '@components/core'
import PermissionDetailItem from '@components/screens/permissions/PermissionDetailItem'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { PermissionCameraReactiveVar, ThemeReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import useTimer2 from '@util/hooks/useTimer2'
import { Camera, requestCameraPermissionsAsync } from 'expo-camera'
import * as Device from 'expo-device'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Alert, AppState, Platform, ScrollView, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To take photos, record videos from your device.',
		icon: <AntDesign name='camera' size={25} />,
	},
	{
		title: 'How we’ll use this',
		detail: 'To show you captured content of visual and audio effects.',
		icon: <MaterialCommunityIcons name={'android-messages'} size={25} />,
	},
	{
		title: 'How theses settings work',
		detail:
			'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
		icon: <Ionicons name={'ios-settings-sharp'} size={25} />,
	},
]

export default () => {
	const router = useRouter()
	const appStateRef = useRef(AppState.currentState)
	const isFocused = useIsFocused()
	const rPermissionCamera = useReactiveVar(PermissionCameraReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const colorScheme = useThemeColorScheme()
	const { finished, start, seconds, started } = useTimer2('0:2')

	// const [cameraPermission, cameraRequestPermission] = Camera.useCameraPermissions()
	// const [micPermission, micRequestPermission] = Camera.useMicrophonePermissions()

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APPLICATION_SETTINGS)
		}
	}
	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Camera Permissions',
			`Camera permissions are currently ${capitalizeFirstLetter(
				capitalizeFirstLetter(rPermissionCamera?.status),
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

	const handleRequestPermission = async () => {
		if (Device.isDevice) {
			const status = await requestCameraPermissionsAsync()

			PermissionCameraReactiveVar(status)

			createTwoButtonAlert()
		}
	}
	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange)
		return () => {
			subscription.remove()
		}
	}, [])

	const handleAppStateChange = async (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
			const status = await Camera.getCameraPermissionsAsync()
			PermissionCameraReactiveVar(status)
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
		<Box bg={'$transparent'} style={{ flex: 1 }}>
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
						color={
							colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
						name='camera'
						size={9}
					/>
				</Box>
				<Divider width={2} style={{ width: 50, marginVertical: 10 }} />
				<Heading
					fontWeight={'$black'}
					style={{
						width: wp(95),
						maxWidth: 300,
						textAlign: 'center',
					}}
					allowFontScaling
					adjustsFontSizeToFit
					numberOfLines={3}
				>
					Allow Barfriends to access your camera
				</Heading>
			</Box>
			<ScrollView>
				<Box style={{ width: wp(95), flex: 1, alignSelf: 'center' }}>
					{details.map((item, index) => {
						return (
							<View key={index}>
								<PermissionDetailItem {...item} />
							</View>
						)
					})}
				</Box>
			</ScrollView>
			<VStack space={'md'} w={'$full'} alignItems={'center'}>
				<Divider w={'95%'} />
				<Button
					size={'lg'}
					sx={{
						w: '95%',
					}}
					onPress={() =>
						!rPermissionCamera?.granted
							? rPermissionCamera?.canAskAgain && !rPermissionCamera.granted
								? handleRequestPermission()
								: handleOpenPhoneSettings()
							: createTwoButtonAlert()
					}
				>
					<Text>
						{!rPermissionCamera?.granted
							? rPermissionCamera?.canAskAgain && !rPermissionCamera.granted
								? 'Continue'
								: 'Go to Phone Settings'
							: 'Granted'}
					</Text>
				</Button>
				{!started && (
					<Button size={'lg'} width={'95%'} onPress={() => router.back()} variant={'link'}>
						<Text fontWeight={'medium'}>Close</Text>
					</Button>
				)}
				{started && (
					<Box
						sx={{
							h: 20,
						}}
					>
						{<Text fontWeight={'medium'}>Auto close in {seconds}</Text>}
					</Box>
				)}
			</VStack>
		</Box>
	)
}

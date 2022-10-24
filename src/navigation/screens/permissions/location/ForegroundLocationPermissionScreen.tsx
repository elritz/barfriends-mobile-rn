import PermissionDetailItem from '../PermissionDetailItem'
import { useReactiveVar } from '@apollo/client'
import IllustrationDynamicLocation from '@assets/images/location/IllustrationDynamicLocation'
import { StackActions, useIsFocused, useNavigation } from '@react-navigation/native'
import { ForegroundLocationPermissionReactiveVar } from '@reactive'
import useTimer2 from '@util/hooks/useTimer2'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import { Box, VStack, Button, Divider, Text, Heading } from 'native-base'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, AppState, Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ThemeContext } from 'styled-components/native'

// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To find venues and event deals around you.',
		iconName: 'ios-location-sharp',
		iconType: 'ionicon',
	},
	{
		title: 'How we’ll use this',
		detail: 'To create your own content and share. ',
		iconName: 'android-messages',
		iconType: 'material-community',
	},
	{
		title: 'How these settings work',
		detail:
			'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
		iconName: 'ios-settings-sharp',
		iconType: 'ionicon',
	},
]

const ForegroundLocationPermissionScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const navigation = useNavigation()
	const isFocused = useIsFocused()
	const themeContext = useContext(ThemeContext)
	const rPermissionLocationVar = useReactiveVar(ForegroundLocationPermissionReactiveVar)
	const { start, seconds, started } = useTimer2('0:2')

	const createTwoButtonAlert = () =>
		Alert.alert('Barfriends Foreground Location Permission', rPermissionLocationVar.status, [
			{
				text: 'Cancel',
				onPress: () => null,
				style: 'cancel',
			},
			{ text: 'Settings', onPress: () => handleOpenPhoneSettings() },
		])

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS)
		}
	}

	const handleRequestPermission = async () => {
		const status = await Location.requestForegroundPermissionsAsync()
		if (status.granted) {
			ForegroundLocationPermissionReactiveVar(status)
			navigation.goBack()
		}
	}

	const handleRequestForegroundLocationPermission = async () => {
		const status = await Location.requestForegroundPermissionsAsync()
		if (status.granted) {
		}
	}

	useEffect(() => {
		async function loadPermissionsAsync() {
			const status = await Location.getForegroundPermissionsAsync()
			try {
				ForegroundLocationPermissionReactiveVar(status)
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
			const locationpermission = await Location.getForegroundPermissionsAsync()
			ForegroundLocationPermissionReactiveVar(locationpermission)
			if (locationpermission.granted && locationpermission.status === 'granted') {
				setTimeout(() => {
					navigation.goBack()
				}, 1500)
			}
			start()
		}
		appStateRef.current = nextAppState
	}

	return (
		<Box safeAreaBottom style={{ flex: 1 }}>
			<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
				<IllustrationDynamicLocation width={60} height={60} />
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
					Allow Barfriends to access your location
				</Heading>
			</Box>
			<Box width={wp(95)} style={{ flex: 1, alignSelf: 'center' }}>
				{details.map((item, index) => {
					return (
						<View key={index}>
							<PermissionDetailItem {...item} />
						</View>
					)
				})}
			</Box>
			<VStack space={2} w={'full'} alignItems={'center'}>
				<Divider w={'95%'} />
				<Button
					size={'lg'}
					width={'95%'}
					onPress={() =>
						!rPermissionLocationVar.granted
							? rPermissionLocationVar?.canAskAgain && !rPermissionLocationVar.granted
								? handleRequestForegroundLocationPermission()
								: handleOpenPhoneSettings()
							: createTwoButtonAlert()
					}
				>
					{!rPermissionLocationVar.granted
						? rPermissionLocationVar?.canAskAgain && !rPermissionLocationVar.granted
							? 'Continue'
							: 'Go to Phone Settings'
						: 'Granted'}
				</Button>
				{!started && (
					<Button size={'lg'} width={'95%'} onPress={() => navigation.goBack()} variant={'ghost'}>
						<Text fontWeight={'medium'}>Close</Text>
					</Button>
				)}
				{started && <Box h={'20px'}>{<Text fontWeight={'medium'}>Auto close in {seconds}</Text>}</Box>}
			</VStack>
		</Box>
	)
}

export default ForegroundLocationPermissionScreen

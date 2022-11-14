import PermissionDetailItem from '../PermissionDetailItem'
import { useReactiveVar } from '@apollo/client'
import IllustrationDynamicLocation from '@assets/images/location/IllustrationDynamicLocation'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ForegroundLocationPermissionReactiveVar, SearchAreaReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import { Button, Heading, VStack } from 'native-base'
import { Box } from 'native-base'
import { Divider } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { Alert, AppState, Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To find venues and event deals around you.',
		iconName: 'ios-location-sharp',
		iconType: Ionicons,
	},
	{
		title: 'How we’ll use this',
		detail: 'To create your own content and share. ',
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

const ForegroundLocationPermissionSearchAreaScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const navigation = useNavigation()
	const isFocused = useIsFocused()
	const rPermissionLocationVar = useReactiveVar(ForegroundLocationPermissionReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Foreground Search Area Location Permission',
			capitalizeFirstLetter(rPermissionLocationVar.status),
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
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS)
		}
	}

	const handleLocationSearchAreaModalNavigation = async () => {
		navigation.navigate('ModalNavigator', {
			screen: 'SearchAreaModalStack',
			params: {
				screen: 'SearchAreaModal',
			},
		})
	}

	const handleRequestForegroundLocationPermission = async () => {
		const success = await useSetSearchAreaWithLocation()
		if (success) {
			navigation.navigate('HomeTabNavigator', {
				screen: 'VenueFeedStack',
				params: {
					screen: 'VenueFeedScreen',
				},
			})
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
					navigation.navigate('HomeTabNavigator', {
						screen: 'VenueFeedStack',
						params: {
							screen: 'VenueFeedScreen',
						},
					})
				}, 1750)
				// TODO: UX() check if location permission is enabled and go somewhere with it
			}
		}
		appStateRef.current = nextAppState
	}

	return (
		<Box safeAreaBottom style={{ flex: 1 }}>
			<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
				<IllustrationDynamicLocation width={60} height={60} />
				<Divider width={2} style={{ width: 50, marginVertical: 10 }} />
				<Heading
					fontWeight={'900'}
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
					variant={'ghost'}
					colorScheme={'secondary'}
					size={'lg'}
					width={'95%'}
					onPress={handleLocationSearchAreaModalNavigation}
				>
					Search location
				</Button>
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
			</VStack>
		</Box>
	)
}

export default ForegroundLocationPermissionSearchAreaScreen

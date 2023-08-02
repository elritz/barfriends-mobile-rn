// TODO: FN(When a useris joined to a venue action must be different) ln:32
import JoinCard from '../../joincard/JoinCard'
import SignupCard from '../../signupcard/SignupCard'
import { useReactiveVar } from '@apollo/client'
import { Box, Text, Heading, Button } from '@components/core'
import { MaterialIcons } from '@expo/vector-icons'
import { useCurrentVenueQuery } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	SearchAreaReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { useDisclose } from '@util/hooks/useDisclose'
import * as Location from 'expo-location'
import { LocationAccuracy } from 'expo-location'
import { useLocalSearchParams } from 'expo-router'
import { getDistance } from 'geolib'
import { uniqueId } from 'lodash'
import { MotiView } from 'moti'
import { useEffect, useState } from 'react'
import { AppState, StyleSheet } from 'react-native'
import { Easing } from 'react-native-reanimated'

const size = 50

const CurrentLocationFromVenueDistance = () => {
	const params = useLocalSearchParams()
	const isFocused = useIsFocused()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const [isLoading, setLoading] = useState<boolean>(true)
	const [distance, setDistance] = useState<number | undefined>()
	const [metric, setMetric] = useState<'km' | 'm' | undefined>('km')
	const [appState, setAppState] = useState(AppState.currentState)
	const {
		isOpen: isForegroundLocationOn,
		onOpen: onOpenForegroundLocationOn,
		onClose: onCloseForegroundLocationOn,
		onToggle: onToggleForegroundLocationOn,
	} = useDisclose()

	const { data, loading, error } = useCurrentVenueQuery({
		fetchPolicy: 'cache-first',
		variables: {
			where: {
				id: {
					equals: String(params.profileid),
				},
			},
			currentLocationCoords: {
				latitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.latitude)
					: Number(rSearchAreaVar?.searchArea.coords.latitude),
				longitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.longitude)
					: Number(rSearchAreaVar?.searchArea.coords.longitude),
			},
		},
		onCompleted: data => {
			if (data?.currentVenue?.distanceInM) {
				if (data?.currentVenue?.distanceInM > 1000) {
					const val = parseInt((data.currentVenue?.distanceInM / 1000).toFixed(1))
					setDistance(val)
					setMetric('km')
				} else {
					setDistance(data?.currentVenue?.distanceInM)
					setMetric('m')
				}
			}
			setTimeout(() => setLoading(false), 2000)
		},
	})

	const getDistanceFromVenue = async ({ vlat, vlng }) => {
		const getLastKnowPosition = await Location.getLastKnownPositionAsync({
			requiredAccuracy: 50,
			maxAge: 1200000,
		})

		if (vlat && vlng) {
			if (getLastKnowPosition && getLastKnowPosition.coords) {
				const dist = getDistance(
					{
						latitude: getLastKnowPosition.coords.latitude,
						longitude: getLastKnowPosition.coords.longitude,
					},
					{
						latitude: vlat,
						longitude: vlng,
					},
				)
				if (data?.currentVenue) {
				}
				if (dist > 1000) {
					const val = parseInt((dist / 1000).toFixed(1))

					setDistance(val)
					setMetric('km')
				} else {
					setDistance(dist)
					setMetric('m')
				}
			}
		} else {
			const currentPosition = await Location.getCurrentPositionAsync({
				accuracy: LocationAccuracy.High,
			})
			const dist = getDistance(
				{ latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude },
				{
					latitude: vlat,
					longitude: vlng,
				},
			)

			if (dist > 1000) {
				const val = parseInt((dist / 1000).toFixed(1))
				setDistance(val)
				setMetric('km')
			} else {
				setDistance(dist)
				setMetric('m')
			}
		}
		setTimeout(() => setLoading(false), 1000)
	}

	useEffect(() => {
		if (rSearchAreaVar.useCurrentLocation) {
			if (AppState.currentState === 'active' && isFocused && distance && !isForegroundLocationOn) {
				if (metric === 'm' && distance < 50) {
					onToggleForegroundLocationOn()
				}
			} else {
				onToggleForegroundLocationOn()
				// unregisterForegroundFetchAsync()
			}
		}
	}, [appState, isFocused])

	// const appStateHandleForegroundLocation = async nextAppState => {
	// 	const hasStarted = await Location.hasStartedLocationUpdatesAsync(FOREGROUND_LOCATION_TASK_NAME)
	// 	if (isForegroundLocationOn && isFocused) {
	// 		if (!hasStarted && nextAppState === 'inactive') {
	// 			await unregisterForegroundFetchAsync()
	// 		}
	// 		if (appState !== nextAppState) {
	// 			if (appState.match(/inactive|background/) && nextAppState === 'active') {
	// 				if (metric === 'm' && distance && distance < 50) {
	// 					await registerForegroundFetchAsync()
	// 				}
	// 				if (!hasStarted && nextAppState === 'inactive') {
	// 					await unregisterForegroundFetchAsync()
	// 				}
	// 			}
	// 		}
	// 	}

	// 	if ((!isForegroundLocationOn && hasStarted) || !isFocused) {
	// 		await unregisterForegroundFetchAsync()
	// 	}

	// 	AppState.currentState = nextAppState
	// 	setAppState(AppState.currentState)
	// }

	// useEffect(() => {
	// 	const appStateListen = AppState.addEventListener('change', appStateHandleForegroundLocation)

	// 	return () => {
	// 		appStateListen.remove()
	// 	}
	// }, [isForegroundLocationOn, appState, isFocused])

	const styles = StyleSheet.create({
		dot: {
			height: size,
			width: size,
			borderRadius: size / 2,
			backgroundColor: '#FF7000',
		},
	})

	useEffect(() => {
		if (!distance) {
			setLoading(true)
			getDistanceFromVenue({
				vlat: Number(params.latitude),
				vlng: Number(params.longitude),
			})
		}
	}, [distance])

	return (
		<>
			{distance && distance > 10 ? (
				<>
					{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType !== 'GUEST' ? (
						<JoinCard />
					) : (
						<SignupCard />
					)}
				</>
			) : (
				<>
					{loading || !data || isLoading ? (
						<Box
							bg={'transparent'}
							style={[
								styles.dot,
								{
									marginLeft: '50%',
									transform: [{ translateX: -size / 2 }],
									alignContent: 'center',
									justifyContent: 'center',
								},
							]}
						>
							{[...Array(3).keys()].map((item, index) => {
								return (
									<MotiView
										key={uniqueId()}
										style={[styles.dot, StyleSheet.absoluteFillObject]}
										from={{
											opacity: 0.5,
											scale: 1,
										}}
										animate={{
											opacity: 0,
											scale: 2,
										}}
										transition={{
											type: 'timing',
											duration: 2000,
											easing: Easing.out(Easing.ease),
											loop: true,
											repeatReverse: true,
											delay: index * 400,
										}}
									/>
								)
							})}
							<MaterialIcons
								style={{ alignSelf: 'center' }}
								size={30}
								name='location-pin'
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light200
										: rTheme.theme?.gluestack.tokens.colors.dark900
								}
							/>
							{/* <Icon
								_light={{
									color: 'light.50',
								}}
								_dark={{
									color: 'dark.50',
								}}
								size={'2xl'}
								name='location-pin'
								as={MaterialIcons}
								alignSelf={'center'}
							/> */}
						</Box>
					) : (
						<Box height={'100%'} justifyContent={'center'} mb={'$5'}>
							<Heading
								textAlign={'center'}
								textTransform={'uppercase'}
								fontWeight={'800'}
								fontSize={'$lg'}
								lineHeight={'$xs'}
							>
								{metric === 'km' ? `In your area` : `You're super close!`}
							</Heading>

							<Box pb={'$1'} alignSelf={'center'} alignItems={'center'} flexDirection={'row'}>
								<MaterialIcons name='location-pin' size={25} />
								<Heading fontSize={'$2xl'} fontWeight={'$black'}>
									{distance}&nbsp;{metric}
								</Heading>
							</Box>
						</Box>
					)}
					{!isLoading && (
						<Button
							variant='link'
							size={'xs'}
							onPress={async () => {
								setLoading(true)
								await getDistanceFromVenue({
									vlat: Number(params.latitude),
									vlng: Number(params.longitude),
								})
							}}
							position={'absolute'}
							alignSelf={'center'}
							bottom={'$1'}
						>
							<Text>Tap to refresh</Text>
						</Button>
					)}
				</>
			)}
		</>
	)
}

export default CurrentLocationFromVenueDistance

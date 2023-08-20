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
import useGetDistance from '@util/hooks/useDistance'
import { useLocalSearchParams } from 'expo-router'
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
	const [appState, setAppState] = useState(AppState.currentState)
	const { refreshLocation, canJoin, distance, distanceInM, isLoading, metric } = useGetDistance()
	const {
		isOpen: isForegroundLocationOn,
		onOpen: onOpenForegroundLocationOn,
		onClose: onCloseForegroundLocationOn,
		onToggle: onToggleForegroundLocationOn,
	} = useDisclose()

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !params.profileid,
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
		onCompleted: async data => {
			await refreshLocation({
				vlat: data.currentVenue?.Venue?.Location?.Geometry?.latitude,
				vlng: data.currentVenue?.Venue?.Location?.Geometry?.longitude,
			})
		},
	})

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
			// setLoading(true)
			const asynFunc = async () => {
				await refreshLocation({
					vlat: Number(params.latitude),
					vlng: Number(params.longitude),
				})
			}
			asynFunc()
		}
	}, [])

	const LoadingAnimationLocation = () => {
		return (
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
			</Box>
		)
	}

	if (isLoading || loading || !data) {
		return <LoadingAnimationLocation />
	}

	return (
		<>
			{canJoin ? (
				<>{rAuthorizationVar?.Profile?.ProfileType !== 'GUEST' ? <JoinCard /> : <SignupCard />}</>
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
					<Button
						variant='link'
						size={'xs'}
						onPress={async () => {
							await refreshLocation({
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
				</Box>
			)}
		</>
	)
}

export default CurrentLocationFromVenueDistance

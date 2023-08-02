// TODO: If user is joined to the venue remove join button show joined
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Heading, Pressable, Text, VStack } from '@components/core'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	ProfileVenue,
	useAddPersonalJoinsVenueMutation,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import useGetDistance from '@util/hooks/useDistance'
import { useRouter } from 'expo-router'
import { useEffect, useState, memo } from 'react'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'

type Props = {
	item: ProfileVenue
	columnIndex: number
}

const VerticalVenueFeedVenueItem = (props: Props) => {
	const router = useRouter()
	const [hideBlur, setHideBlur] = useState(false)
	const [distance, setDistance] = useState(0)
	const [metric, setMetric] = useState('m')
	const [canJoin, setCanJoin] = useState(false)
	const [isJoined, setIsJoined] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const { refreshLocation } = useGetDistance()

	const [addPersonalJoinVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useAddPersonalJoinsVenueMutation({
			variables: {
				profileIdVenue: String(props.item.id),
			},
			onCompleted: async data => {
				if (data.addPersonalJoinsVenue) {
					const profile = data.addPersonalJoinsVenue as Profile
					const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
					const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile
					if (
						profile?.Personal?.LiveOutPersonal?.Out &&
						deviceprofile?.Profile?.Personal?.LiveOutPersonal
					) {
						AuthorizationReactiveVar({
							...deviceManager,
							DeviceProfile: {
								...deviceprofile,
								Profile: {
									...deviceprofile.Profile,
									Personal: {
										...deviceprofile.Profile.Personal,
										LiveOutPersonal: {
											...deviceprofile.Profile.Personal.LiveOutPersonal,
											Out: profile.Personal.LiveOutPersonal.Out,
										},
									},
								},
							},
						})
					}
					setIsJoined(true)
				}
			},
			refetchQueries: [
				{
					query: GET_LIVE_VENUE_TOTALS_QUERY,
					variables: {
						profileIdVenue: props.item.id,
					},
				},
			],
		})

	const [
		removePersonalJoinsVenueMutation,
		{ data: RPJVData, loading: RPJVLoading, error: RPJVError },
	] = useRemovePersonalJoinsVenueMutation({
		onCompleted: async data => {
			if (data.removePersonalJoinsVenue) {
				setIsJoined(false)
				const profile = data.removePersonalJoinsVenue as Profile
				const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
				const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile
				if (
					profile?.Personal?.LiveOutPersonal?.Out &&
					deviceprofile?.Profile?.Personal?.LiveOutPersonal
				) {
					AuthorizationReactiveVar({
						...deviceManager,
						DeviceProfile: {
							...deviceprofile,
							Profile: {
								...deviceprofile.Profile,
								Personal: {
									...deviceprofile.Profile.Personal,
									LiveOutPersonal: {
										...deviceprofile.Profile.Personal.LiveOutPersonal,
										Out: profile.Personal.LiveOutPersonal.Out,
									},
								},
							},
						},
					})
				}
			}
		},
		refetchQueries: [
			{
				query: GET_LIVE_VENUE_TOTALS_QUERY,
				variables: {
					profileIdVenue: props.item.id,
				},
			},
		],
	})

	const setDist = ({ distanceInM }) => {
		if (distanceInM) {
			if (distanceInM > 1000) {
				const val = parseInt((distanceInM / 1000).toFixed(1))
				setDistance(val)
				setMetric('km')
				setCanJoin(false)
			} else {
				setDistance(distanceInM)
				setMetric('m')
				if (distanceInM < 25) {
					setCanJoin(true)
				}
			}
		}
	}

	useEffect(() => {
		if (props.item.distanceInM) {
			setDist({ distanceInM: props.item.distanceInM })
		}
	}, [props.item.distanceInM])

	useEffect(() => {
		if (rAuthorizationVar?.DeviceProfile?.Profile?.Personal) {
			const joinedToVenue =
				rAuthorizationVar.DeviceProfile.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
					return item.venueProfileId
				})

			if (joinedToVenue) {
				setIsJoined(joinedToVenue.includes(String(props.item.id)))
			}
		}
	}, [rAuthorizationVar, isJoined])

	const getTitleCase = str => {
		const titleCase = str
			.toLowerCase()
			.split(' ')
			.map(word => {
				return word.charAt(0).toUpperCase() + word.slice(1)
			})
			.join(' ')

		return titleCase
	}

	const _press = () => {
		// router.push({
		// 	pathname: `(app)/hometab/venuefeedstack/${props.item.id}`,
		// 	params: {
		// 		profileId: String(props.item.id),
		// 		distanceInM: Number(props.item.distanceInM),
		// 		latitude: Number(props.item.Venue?.Location?.Geometry?.latitude),
		// 		longitude: Number(props.item.Venue?.Location?.Geometry?.longitude),
		// 	},
		// })
		router.push({
			pathname: `(app)/public/venue/${props.item.id}`,
			params: {
				profileId: String(props.item.id),
				distanceInM: Number(props.item.distanceInM),
				latitude: Number(props.item.Venue?.Location?.Geometry?.latitude),
				longitude: Number(props.item.Venue?.Location?.Geometry?.longitude),
			},
		})
	}

	const _pressLeave = () => {
		isJoined ? removePersonalJoinsVenueMutation() : addPersonalJoinVenueMutation()
	}

	return (
		<Pressable disabled={JVLoading || RPJVLoading} onPress={() => _press()}>
			{({ isPressed }) => {
				return (
					<VStack
						space={'md'}
						// width={width}
						w={'100%'}
						p={'$1.5'}
						flex={1}
						style={{
							alignSelf: 'center',
							overflow: 'hidden',
						}}
					>
						<Box
							bg='$transparent'
							style={{
								minHeight: 260,
							}}
						>
							<Image
								source={{ uri: props.item.photos[0]?.url }}
								resizeMode='cover'
								onLoadEnd={() => setHideBlur(true)}
								style={{
									...StyleSheet.absoluteFillObject,
									borderRadius: 15,
								}}
							/>
							{!hideBlur && (
								<>
									{props.item.photos[0]?.blurhash && (
										<Blurhash
											blurhash={String(props.item.photos[0].blurhash)}
											style={{
												flex: 1,
												borderRadius: 10,
												overflow: 'hidden',
											}}
										/>
									)}
								</>
							)}
						</Box>

						<VStack space={'md'}>
							<Heading
								fontSize={'$lg'}
								fontWeight={'$bold'}
								textAlign={'left'}
								numberOfLines={2}
								lineHeight={'$xs'}
								ellipsizeMode='tail'
								// underline={isPressed}
							>
								{getTitleCase(props?.item?.IdentifiableInformation?.fullname)}
							</Heading>
							<Heading
								fontSize={'$md'}
								fontWeight={'$bold'}
								lineHeight={'$xs'}
								textAlign={'left'}
								numberOfLines={2}
								ellipsizeMode='tail'
							>
								{distance} {metric}
							</Heading>

							{canJoin ? (
								<>
									<Button
										variant={'solid'}
										onPress={() => _pressLeave()}
										bgColor={isJoined ? '$error500' : '$primary500'}
										rounded={'$md'}
										width={'$full'}
										sx={{
											h: 45,
										}}
									>
										{JVLoading || RPJVLoading ? (
											<Button.Text>{isJoined ? 'Leaving' : 'Joining'}</Button.Text>
										) : (
											<Button.Text>{isJoined ? 'Leave' : 'Join'}</Button.Text>
										)}
									</Button>
								</>
							) : metric === 'm' && distance < 100 ? (
								<Button
									variant={'link'}
									onPress={async () => {
										const { distanceInM } = await refreshLocation({
											vlat: props.item.Venue?.Location?.Geometry?.latitude,
											vlng: props.item.Venue?.Location?.Geometry?.longitude,
										})

										setDist({ distanceInM })
									}}
									rounded={'$md'}
								>
									<Text>Refresh distance</Text>
								</Button>
							) : null}
						</VStack>
					</VStack>
				)
			}}
		</Pressable>
	)
}
export default memo(VerticalVenueFeedVenueItem)

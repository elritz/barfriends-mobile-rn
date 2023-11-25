// TODO: If user is joined to the venue remove join button show joined
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceProfile,
	Profile,
	ProfileVenue,
	useAddPersonalJoinsVenueMutation,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import useGetDistance from '@util/hooks/useDistance'
import { useRouter } from 'expo-router'
import { useEffect, useState, memo, useCallback } from 'react'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'

type Props = {
	item: ProfileVenue
	columnIndex: number
	showJoin: boolean
	showDistance: boolean
}

const VerticalVenueFeedVenueItem: React.FC<Props> = (props: Props) => {
	VerticalVenueFeedVenueItem.defaultProps = {
		showJoin: true,
		showDistance: true,
	}
	const router = useRouter()
	const [hideBlur, setHideBlur] = useState(false)
	const [distance, setDistance] = useState(0)
	const [metric, setMetric] = useState('m')
	const [loadingDistance, setLoadingDistance] = useState(false)
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
					const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile
					if (
						profile?.Personal?.LiveOutPersonal?.Out &&
						deviceprofile?.Profile?.Personal?.LiveOutPersonal
					) {
						AuthorizationReactiveVar({
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
				const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile
				if (
					profile?.Personal?.LiveOutPersonal?.Out &&
					deviceprofile?.Profile?.Personal?.LiveOutPersonal
				) {
					AuthorizationReactiveVar({
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

	const setDist = useCallback(
		({ distanceInM }) => {
			setLoadingDistance(true)
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
			setTimeout(() => {
				setLoadingDistance(false)
			}, 1000)
		},
		[distance],
	)

	useEffect(() => {
		if (props.item.distanceInM) {
			setDist({ distanceInM: props.item.distanceInM })
		}
	}, [props.item.distanceInM])

	useEffect(() => {
		if (rAuthorizationVar?.Profile?.Personal) {
			if (
				rAuthorizationVar?.Profile?.Personal?.LiveOutPersonal?.Out.some(
					item => item.venueProfileId === props.item.id,
				)
			) {
				setIsJoined(true)
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
		router.push({
			pathname: `/(app)/public/venue/${props.item.IdentifiableInformation?.username}`,
			params: {
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
					{props.showDistance && (
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
					)}
					{props.showJoin && (
						<>
							{canJoin ? (
								<Button
									variant={isJoined ? 'outline' : 'solid'}
									onPress={() => _pressLeave()}
									bgColor={isJoined ? '$transparent' : '$primary500'}
									rounded={'$md'}
									size='sm'
									w={'auto'}
								>
									{JVLoading || RPJVLoading ? (
										<Button.Text>{isJoined ? 'Leaving' : 'Joining'}</Button.Text>
									) : (
										<Button.Text>{isJoined ? 'Leave' : 'Join'}</Button.Text>
									)}
								</Button>
							) : metric === 'm' && distance < 100 ? (
								<Button
									variant={'link'}
									isDisabled={loadingDistance}
									onPress={async () => {
										setLoadingDistance(true)
										const { distanceInM } = await refreshLocation({
											vlat: props.item.Venue?.Location?.Geometry?.latitude,
											vlng: props.item.Venue?.Location?.Geometry?.longitude,
										})
										setLoadingDistance(false)
										setDist({ distanceInM })
									}}
									rounded={'$md'}
								>
									<Button.Text>Refresh distance</Button.Text>
								</Button>
							) : null}
						</>
					)}
				</VStack>
			</VStack>
		</Pressable>
	)
}
export default memo(VerticalVenueFeedVenueItem)

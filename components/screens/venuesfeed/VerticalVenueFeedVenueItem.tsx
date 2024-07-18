// TODO: If user is joined to the venue remove join button show joined
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Heading, Pressable, Text, VStack, ButtonText } from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
	Profile,
	ProfileVenue,
} from '#/graphql/generated'
import { AuthorizationReactiveVar } from '#/reactive'
import useGetDistance from '#/util/hooks/useDistance'
import { useRouter } from 'expo-router'
import { useEffect, useState, memo, useCallback } from 'react'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'

type Props = {
	item: Partial<ProfileVenue | null | undefined>
	columnIndex: number
	showJoin?: boolean
	showDistance?: boolean
}

const VerticalVenueFeedVenueItem: React.FC<Props> = ({ showJoin = true, showDistance = true, item }: Props) => {
	const router = useRouter()
	const [hideBlur, setHideBlur] = useState(false)
	const [distance, setDistance] = useState(0)
	const [metric, setMetric] = useState('m')
	const [loadingDistance, setLoadingDistance] = useState(false)
	const [canJoin, setCanJoin] = useState(false)
	const [isJoined, setIsJoined] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const { refreshLocation } = useGetDistance()

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
		if (item?.distanceInM) {
			setDist({ distanceInM: item?.distanceInM })
		}
	}, [item?.distanceInM])

	useEffect(() => {
		if (rAuthorizationVar?.Profile?.Personal) {
			if (
				rAuthorizationVar?.Profile?.Personal?.LiveOutPersonal?.Out.some(
					item => item.venueProfileId === item?.id,
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
			pathname: `/(app)/public/venue/${item?.IdentifiableInformation?.username}`,
			params: {
				venueProfileId: String(item?.id),
				distanceInM: Number(item?.distanceInM),
				latitude: Number(item?.Venue?.Location?.Geometry?.latitude),
				longitude: Number(item?.Venue?.Location?.Geometry?.longitude),
			},
		})
	}

	// const _pressLeave = () => {
	// 	isJoined ? removePersonalJoinsVenueMutation() : addPersonalJoinVenueMutation()
	// }

	return (
		// <Pressable disabled={JVLoading || RPJVLoading} onPress={() => _press()}>
		<Pressable onPress={() => _press()}>
			<VStack
				space={'md'}
				// width={width}
				w={'95%'}
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
						source={{ uri: item?.photos?.[0]?.url }}
						resizeMode='cover'
						onLoadEnd={() => setHideBlur(true)}
						style={{
							...StyleSheet.absoluteFillObject,
							borderRadius: 15,
						}}
					/>
					{!hideBlur && (
						<>
							{item?.photos?.[0]?.blurhash && (
								<Blurhash
									blurhash={String(item.photos[0].blurhash)}
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
						{getTitleCase(item?.IdentifiableInformation?.fullname)}
					</Heading>
					{showDistance && (
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
					{showJoin && (
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
										<ButtonText>{isJoined ? 'Leaving' : 'Joining'}</ButtonText>
									) : (
										<ButtonText>{isJoined ? 'Leave' : 'Join'}</ButtonText>
									)}
								</Button>
							) : metric === 'm' && distance < 100 ? (
								<Button
									variant={'link'}
									isDisabled={loadingDistance}
									onPress={async () => {
										setLoadingDistance(true)
										const { distanceInM } = await refreshLocation({
											vlat: item?.Venue?.Location?.Geometry?.latitude,
											vlng: item?.Venue?.Location?.Geometry?.longitude,
										})
										setLoadingDistance(false)
										setDist({ distanceInM })
									}}
									rounded={'$md'}
								>
									<ButtonText>Refresh distance</ButtonText>
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

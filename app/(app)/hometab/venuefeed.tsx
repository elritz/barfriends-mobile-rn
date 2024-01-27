import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import SearchAreaHeader from '@components/screens/venuesfeed/SearchAreaHeader'
import VenueFeedSearchAreaEmptyState from '@components/screens/venuesfeed/VenueFeedSearchAreaEmptyState'
import MemoizedVerticalVenueFeedVenueItem from '@components/screens/venuesfeed/VerticalVenueFeedVenueItem'
import { Ionicons } from '@expo/vector-icons'
import {
	Box,
	VStack,
	Text,
	Pressable,
	HStack,
	Heading,
	Button,
	ArrowRightIcon,
	ButtonText,
	ButtonIcon,
} from '@gluestack-ui/themed'
import {
	ProfileType,
	ProfileVenue,
	useUpdateComingAreaToBeNotifiedMutation,
	useUpdateH6ComingAreaVoteMutation,
	useVenuesNearbyLazyQuery,
} from '@graphql/generated'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	PermissionForegroundLocationReactiveVar,
	SearchAreaReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { FlashList, MasonryFlashList } from '@shopify/flash-list'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import useContentInsets from '@util/hooks/useContentInsets'
import { useRouter } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { memo, useCallback, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import CountryFlag from 'react-native-country-flag'

export default () => {
	const router = useRouter()
	const contentInsets = useContentInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)

	const rForegroundLocationPermissionVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

	const [
		updateH6VenueRecommendationVoteMutation,
		{ data: UVRData, loading: UVRLoading, error: UVRError },
	] = useUpdateH6ComingAreaVoteMutation()

	const [updateToBeNotifiedMutation, { data: UTBNData, loading: UTBNLoading, error: UTBNError }] =
		useUpdateComingAreaToBeNotifiedMutation()

	// console.log(
	// 	'rForegroundLocationPermissionVar :>> ',
	// 	JSON.stringify(rForegroundLocationPermissionVar, null, 2),
	// )
	// console.log('rSearchAreaVar :>> ', JSON.stringify(rSearchAreaVar, null, 2))
	// console.log('rCurrentLocationVar :>> ', JSON.stringify(rSearchAreaVar, null, 2))
	// console.log(
	// 	'rCurrentLocationVar :>> ',
	// 	JSON.stringify(
	// 		Number(rCurrentLocationVar?.current?.coords.latitude),
	// 		Number(rSearchAreaVar?.searchArea.coords.latitude),
	// 		null,
	// 		2,
	// 	),
	// )

	const [venuesNearbyQuery, { data, loading, error }] = useVenuesNearbyLazyQuery({
		variables: {
			cityName: rSearchAreaVar.useCurrentLocation
				? String(rCurrentLocationVar.reverseGeocoded?.city)
				: String(rSearchAreaVar.searchArea.city.name),
			searchAreaCoords: {
				latitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.latitude)
					: Number(rSearchAreaVar?.searchArea.coords.latitude),
				longitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.longitude)
					: Number(rSearchAreaVar?.searchArea.coords.longitude),
			},
			countryIsoCode: String(rSearchAreaVar?.searchArea.country.isoCode),
			stateIsoCode: String(rSearchAreaVar?.searchArea.state.isoCode),
		},
	})

	const getNearbyVenues = useCallback(async () => {
		if (rForegroundLocationPermissionVar?.granted) {
			if (rSearchAreaVar.useCurrentLocation) {
				await useSetSearchAreaWithLocation()
			}
		}

		if (
			rSearchAreaVar?.searchArea.coords.latitude !== 0 &&
			rSearchAreaVar?.searchArea.coords.longitude !== 0
		) {
			venuesNearbyQuery()
		}
	}, [])

	useEffect(() => {
		if (!data?.venuesNearby) {
			getNearbyVenues()
		}
	}, [])

	const ListheaderComponent = ({ typename }) => {
		return (
			<Box bg={'transparent'} py={'$2'}>
				{/* {ENVIRONMENT === 'development' && <DevActions />} */}
				<VStack bg={'transparent'} space={'md'}>
					{rAuthorizationVar?.Profile?.ProfileType === ProfileType.Guest && (
						<Box mx={'$2'} my={'$2'} p={'$5'} pt={'$10'}>
							<CardPleaseSignup signupTextId={1} />
						</Box>
					)}
					{rSearchAreaVar.searchArea.city.name && <SearchAreaHeader typename={typename || null} />}
					{/* <AdvertismentHorizontal /> */}
					{!rSearchAreaVar.searchArea.city.name && <VenueFeedSearchAreaEmptyState />}
				</VStack>
			</Box>
		)
	}
	const MemoizedListHeaderComponent = memo(ListheaderComponent)

	if (!data?.venuesNearby || loading) {
		return (
			<MasonryFlashList
				numColumns={2}
				onRefresh={getNearbyVenues}
				refreshing={loading}
				estimatedItemSize={260}
				contentInset={{
					...contentInsets,
				}}
				data={[...Array(6)]}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={<MemoizedListHeaderComponent typename={data?.venuesNearby.__typename} />}
				renderItem={({ item }) => {
					return (
						<View style={{ alignSelf: 'center', padding: 5 }}>
							<Skeleton
								height={260}
								width={'100%'}
								radius={15}
								colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
								colors={
									rTheme.colorScheme === 'light'
										? [
												String(rTheme.theme?.gluestack.tokens.colors.light100),
												String(rTheme.theme?.gluestack.tokens.colors.light300),
										  ]
										: [
												String(rTheme.theme?.gluestack.tokens.colors.light800),
												String(rTheme.theme?.gluestack.tokens.colors.light600),
										  ]
								}
							/>
						</View>
					)
				}}
				ItemSeparatorComponent={() => <Box bg='$transparent' h={'$5'} />}
			/>
		)
	}

	const ListFooterComponent = () => {
		const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

		const RecommendedAreaList = () => {
			switch (data.venuesNearby.__typename) {
				case 'VenuesNearbyResponse':
					return (
						<VStack>
							{data.venuesNearby.recommendedAreas?.map((item, index) => {
								const [distance, setDistance] = useState(0)
								const [metric, setMetric] = useState('m')
								const setDist = useCallback(
									({ distanceInM }) => {
										if (distanceInM) {
											if (distanceInM > 1000) {
												const val = parseInt((distanceInM / 1000).toFixed(1))
												setDistance(val)
												setMetric('km')
											} else {
												setDistance(distanceInM)
												setMetric('m')
											}
										}
									},
									[item.distanceInM],
								)

								useEffect(() => {
									if (item.distanceInM) {
										setDist({ distanceInM: item.distanceInM })
									}
								}, [item.distanceInM])
								return (
									<Pressable
										key={item.id + index}
										onPress={() => {
											router.navigate({
												params: {
													venueprofileids: JSON.stringify(item.venuesProfileIds),
													id: item.id,
												},
												pathname: '/(app)/searcharea/searchh3recommendation',
											})
										}}
									>
										<Box
											key={item.id}
											flexDirection='row'
											m={'$2'}
											p={'$3'}
											justifyContent='space-between'
											alignItems='center'
										>
											<VStack>
												<HStack alignItems='center'>
													<Heading
														fontWeight={'$medium'}
														fontSize={'$xl'}
														numberOfLines={1}
														ellipsizeMode={'tail'}
													>
														{item.Area?.Country.flag}
														{item.Area?.City.name}
													</Heading>
													<Text fontSize={'$md'}>
														&nbsp; · &nbsp;
														{distance}&nbsp;
														{metric}
													</Text>
												</HStack>
												<Text>{item.venuesProfileIds.length}&nbsp;venues</Text>
											</VStack>
											<ArrowRightIcon />
										</Box>
									</Pressable>
								)
							})}
						</VStack>
					)
				case 'ComingAreaResponse':
					return (
						<VStack>
							{data.venuesNearby.recommendedAreas?.map((item, index) => {
								return (
									<Pressable
										key={item.id + index}
										onPress={() => {
											router.navigate({
												params: {
													venueprofileids: JSON.stringify(item.venuesProfileIds),
													id: item.id,
												},
												pathname: '/(app)/searcharea/searchh3recommendation',
											})
										}}
									>
										<Box
											key={item.id}
											m={'$2'}
											p={'$3'}
											flexDirection='row'
											justifyContent='space-between'
											alignItems='center'
										>
											<VStack>
												<HStack alignItems='center'>
													<Heading
														fontWeight={'$medium'}
														fontSize={'$xl'}
														numberOfLines={1}
														ellipsizeMode={'tail'}
													>
														{item.Area?.Country.flag}
														{item.Area?.City.name}
													</Heading>
												</HStack>
												<Text>{item.venuesProfileIds.length}&nbsp;venues</Text>
											</VStack>
											<ArrowRightIcon />
										</Box>
									</Pressable>
								)
							})}
						</VStack>
					)
			}
		}

		const _press = async () => {
			rPermissionLocationVar?.granted
				? await useSetSearchAreaWithLocation()
				: router.navigate({
						pathname: '/(app)/permission/foregroundlocation',
				  })
		}

		const RecommendedAreaComponent = () => {
			return (
				<Box m={'$2'}>
					<VStack>
						<VStack space='xs' p={'$3'} flex={1}>
							<Heading>Recommended Areas</Heading>
							<Button variant='link' width={'50%'} size='md' onPress={_press} justifyContent='flex-start'>
								<ButtonText>Filter by distance</ButtonText>
								<ButtonIcon as={ArrowRightIcon} ml='$1' />
							</Button>
						</VStack>
						<RecommendedAreaList />
					</VStack>
				</Box>
			)
		}

		switch (data.venuesNearby.__typename) {
			case 'VenuesNearbyResponse':
				return <RecommendedAreaComponent />
			case 'ComingAreaResponse':
				return <RecommendedAreaComponent />
		}
	}

	const MemoizeFooterComponent = memo(ListFooterComponent)

	if (data.venuesNearby.__typename === 'Error') {
		return (
			<ScrollView>
				<Text>{data.venuesNearby.message}</Text>
			</ScrollView>
		)
	}

	if (data.venuesNearby.__typename === 'ComingAreaResponse') {
		return (
			<FlashList
				data={data.venuesNearby.comingAreas}
				overScrollMode='always'
				keyExtractor={(item, index) => index.toString()}
				onRefresh={getNearbyVenues}
				contentInset={{
					...contentInsets,
				}}
				refreshing={loading}
				estimatedItemSize={30}
				ListHeaderComponent={<MemoizedListHeaderComponent typename={data.venuesNearby.__typename} />}
				renderItem={({ item }) => {
					const lengthOfUpvote = item.Vote.filter(item => {
						return item.upvote
					}).length

					return (
						<Box key={item.id} py={'$1'} m={'$2'} rounded={'$xl'}>
							<HStack flex={1} justifyContent={'space-between'}>
								<HStack px={'$3'} space={'md'} alignItems={'center'}>
									<CountryFlag size={12} isoCode={String(item.Area?.Country.isoCode)} />
									<Text fontSize={'$xl'}>{item.Area?.City.name}</Text>
								</HStack>
								<HStack
									sx={{
										h: 50,
									}}
									space={'md'}
									justifyContent={'flex-end'}
								>
									<Pressable
										onPress={() => {
											updateH6VenueRecommendationVoteMutation({
												variables: {
													comingAreaId: item.id,
												},
											})
										}}
										flexDirection={'row'}
										alignItems={'center'}
									>
										<Text fontWeight={'$medium'} fontSize={'$xl'} mx={'$2'} textAlign={'right'}>
											{lengthOfUpvote}
										</Text>
										<Ionicons
											name='caret-up'
											size={25}
											color={
												rTheme.colorScheme === 'light'
													? item.Vote.some(
															item => item.upvote && item.profileId === rAuthorizationVar?.Profile?.id,
													  )
														? rTheme.theme?.gluestack.tokens.colors.blue500
														: rTheme.theme?.gluestack.tokens.colors.light700
													: item.Vote.some(
															item => item.upvote && item.profileId === rAuthorizationVar?.Profile?.id,
													  )
													? rTheme.theme?.gluestack.tokens.colors.blue500
													: rTheme.theme?.gluestack.tokens.colors.light300
											}
										/>
									</Pressable>
									<Pressable
										px={'$2'}
										sx={{
											w: 50,
										}}
										onPress={() => {
											updateToBeNotifiedMutation({
												variables: {
													comingAreaId: item.id,
												},
											})
										}}
										alignItems={'center'}
										justifyContent={'center'}
									>
										<Ionicons
											name='notifications-sharp'
											size={23}
											color={
												rTheme.colorScheme === 'light'
													? item.toBeNotifiedProfileIds.some(item => item === rAuthorizationVar?.Profile?.id)
														? rTheme.theme?.gluestack.tokens.colors.primary500
														: rTheme.theme?.gluestack.tokens.colors.light700
													: item.toBeNotifiedProfileIds.some(item => item === rAuthorizationVar?.Profile?.id)
													? rTheme.theme?.gluestack.tokens.colors.primary500
													: rTheme.theme?.gluestack.tokens.colors.light300
											}
										/>
									</Pressable>
								</HStack>
							</HStack>
						</Box>
					)
				}}
			/>
		)
	}

	if (data.venuesNearby.__typename === 'VenuesNearbyResponse') {
		return (
			<MasonryFlashList
				overScrollMode='always'
				onRefresh={getNearbyVenues}
				refreshing={loading}
				showsVerticalScrollIndicator={false}
				numColumns={2}
				estimatedItemSize={100}
				scrollEnabled
				contentInset={{
					...contentInsets,
				}}
				data={data?.venuesNearby.venuesNearby}
				renderItem={({ item, index, columnIndex }) => (
					<MemoizedVerticalVenueFeedVenueItem
						key={columnIndex + item.id}
						item={item as ProfileVenue}
						columnIndex={columnIndex}
					/>
				)}
				ItemSeparatorComponent={() => <Box bg={'transparent'} h={'$5'} />}
				keyExtractor={item => item.id}
				ListHeaderComponent={<MemoizedListHeaderComponent typename={data.venuesNearby.__typename} />}
				ListFooterComponent={<MemoizeFooterComponent />}
				automaticallyAdjustContentInsets
			/>
		)
	}
}

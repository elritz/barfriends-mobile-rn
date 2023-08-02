import { useReactiveVar } from '@apollo/client'
import { Box, VStack, Text, Pressable, HStack, Heading } from '@components/core'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import SearchAreaHeader from '@components/screens/venuesfeed/SearchAreaHeader'
import ShowCaseScroll from '@components/screens/venuesfeed/ShowCaseScroll'
import VenueFeedSearchAreaEmptyState from '@components/screens/venuesfeed/VenueFeedSearchAreaEmptyState'
import MemoizedVerticalVenueFeedVenueItem from '@components/screens/venuesfeed/VerticalVenueFeedVenueItem'
import DevActions from '@components/screens/venuesfeed/devactions'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '@constants/ReactNavigationConstants'
import { ENVIRONMENT } from '@env'
import { Ionicons } from '@expo/vector-icons'
import {
	ProfileType,
	useUpdateComingAreaToBeNotifiedMutation,
	useUpdateH6ComingAreaVoteMutation,
	useVenuesNearbyLazyQuery,
} from '@graphql/generated'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	SearchAreaReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { FlashList, MasonryFlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { Skeleton } from 'moti/skeleton'
import { useEffect } from 'react'
import { Dimensions, NativeScrollEvent, ScrollView, View } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const insets = useSafeAreaInsets()
	const contentInsets = useContentInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)
	const width = Dimensions.get('window').width / 2.15

	const [
		updateH6VenueRecommendationVoteMutation,
		{ data: UVRData, loading: UVRLoading, error: UVRError },
	] = useUpdateH6ComingAreaVoteMutation()

	const [updateToBeNotifiedMutation, { data: UTBNData, loading: UTBNLoading, error: UTBNError }] =
		useUpdateComingAreaToBeNotifiedMutation()

	const [venuesNearby, { data, loading, error }] = useVenuesNearbyLazyQuery({
		variables: {
			searchAreaCoords: {
				latitude: Number(rSearchAreaVar?.searchArea?.coords.latitude),
				longitude: Number(rSearchAreaVar?.searchArea?.coords.longitude),
			},
			currentLocationCoords: {
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

	const onPullRefresh = () => {
		if (rSearchAreaVar?.searchArea?.coords.latitude && rSearchAreaVar?.searchArea?.coords.longitude) {
			venuesNearby()
		}
		if (rSearchAreaVar.useCurrentLocation) {
			if (
				rCurrentLocationVar?.current?.coords.latitude &&
				rCurrentLocationVar?.current?.coords.longitude
			) {
				venuesNearby()
			}
		}
	}

	useEffect(() => {
		if (
			!data?.venuesNearby &&
			rSearchAreaVar?.searchArea.coords.latitude &&
			rSearchAreaVar?.searchArea.coords?.longitude
		) {
			venuesNearby()
		}
	}, [])

	const ListheaderComponent = ({ typename }) => {
		return (
			<Box bg={'transparent'} py={'$2'}>
				{/* {ENVIRONMENT === 'development' && <DevActions />} */}

				<VStack bg={'transparent'} space={'md'}>
					{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest && (
						<Box my={'$2'} p={'$5'} pt={'$10'}>
							<CardPleaseSignup signupTextId={1} />
						</Box>
					)}
					{!rSearchAreaVar.searchArea.city.name && !typename && <VenueFeedSearchAreaEmptyState />}
					{rSearchAreaVar.searchArea.city.name && <SearchAreaHeader typename={typename || null} />}
					{/* <Box sx={{ h: 150 }}>
						<Heading>Ad</Heading>
					</Box> */}
					<ShowCaseScroll />
				</VStack>
			</Box>
		)
	}

	const listFooterComponent = () => {
		return null
	}

	if (!data?.venuesNearby || loading) {
		return (
			<MasonryFlashList
				numColumns={2}
				onRefresh={onPullRefresh}
				refreshing={loading}
				estimatedItemSize={260}
				contentInset={{
					...contentInsets,
				}}
				data={[...Array(6)]}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={<ListheaderComponent typename={data?.venuesNearby.__typename} />}
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
												String(rTheme.theme?.gluestack.tokens.colors.dark100),
												String(rTheme.theme?.gluestack.tokens.colors.dark300),
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
				onRefresh={onPullRefresh}
				contentInset={{
					...contentInsets,
				}}
				refreshing={loading}
				estimatedItemSize={30}
				ListHeaderComponent={<ListheaderComponent typename={data.venuesNearby.__typename} />}
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
											name='md-caret-up'
											size={30}
											color={
												rTheme.colorScheme === 'light'
													? item.toBeNotifiedProfileIds.some(
															item => item === rAuthorizationVar?.DeviceProfile?.Profile?.id,
													  )
														? rTheme.theme?.gluestack.tokens.colors.blue500
														: rTheme.theme?.gluestack.tokens.colors.light700
													: item.toBeNotifiedProfileIds.some(
															item => item === rAuthorizationVar?.DeviceProfile?.Profile?.id,
													  )
													? rTheme.theme?.gluestack.tokens.colors.blue500
													: rTheme.theme?.gluestack.tokens.colors.dark700
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
											name='ios-notifications-sharp'
											size={25}
											color={
												rTheme.colorScheme === 'light'
													? item.toBeNotifiedProfileIds.some(
															item => item === rAuthorizationVar?.DeviceProfile?.Profile?.id,
													  )
														? rTheme.theme?.gluestack.tokens.colors.primary500
														: rTheme.theme?.gluestack.tokens.colors.light700
													: item.toBeNotifiedProfileIds.some(
															item => item === rAuthorizationVar?.DeviceProfile?.Profile?.id,
													  )
													? rTheme.theme?.gluestack.tokens.colors.primary500
													: rTheme.theme?.gluestack.tokens.colors.dark700
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
				onRefresh={onPullRefresh}
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
					<MemoizedVerticalVenueFeedVenueItem index={index} item={item} columnIndex={columnIndex} />
				)}
				ItemSeparatorComponent={() => <Box bg={'transparent'} h={'$5'} />}
				keyExtractor={item => item.id}
				ListHeaderComponent={ListheaderComponent}
				ListFooterComponent={listFooterComponent}
				automaticallyAdjustContentInsets
			/>
		)
	}
}

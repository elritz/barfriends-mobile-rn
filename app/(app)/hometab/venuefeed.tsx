import { useReactiveVar } from '@apollo/client'
import {
	Box,
	VStack,
	Text,
	Pressable,
	HStack,
	Heading,
	Button,
	ArrowUpIcon,
	ArrowRightIcon,
} from '@components/core'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import SearchAreaHeader from '@components/screens/venuesfeed/SearchAreaHeader'
import ShowCaseScroll from '@components/screens/venuesfeed/ShowCaseScroll'
import VenueFeedSearchAreaEmptyState from '@components/screens/venuesfeed/VenueFeedSearchAreaEmptyState'
import MemoizedVerticalVenueFeedVenueItem from '@components/screens/venuesfeed/VerticalVenueFeedVenueItem'
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
	PermissionForegroundLocationReactiveVar,
	SearchAreaReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { FlashList, MasonryFlashList } from '@shopify/flash-list'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import useContentInsets from '@util/hooks/useContentInsets'
import { useRouter } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { useEffect } from 'react'
import { Dimensions, NativeScrollEvent, ScrollView, View } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const router = useRouter()
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

	const [venuesNearbyQuery, { data, loading, error }] = useVenuesNearbyLazyQuery({
		variables: {
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

	const onPullRefresh = () => {
		venuesNearbyQuery()
	}

	useEffect(() => {
		if (!data?.venuesNearby) {
			venuesNearbyQuery()
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
					<ShowCaseScroll />
					{!rSearchAreaVar.searchArea.city.name && <VenueFeedSearchAreaEmptyState />}
				</VStack>
			</Box>
		)
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

	const ListFooterComponent = () => {
		const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
		const RecommendedAreaList = () => {
			switch (data.venuesNearby.__typename) {
				case 'VenuesNearbyResponse':
					console.log('data.venuesNearby.recommendedAreas :>> ', data.venuesNearby.recommendedAreas)
					return (
						<VStack>
							{data.venuesNearby.recommendedAreas?.map(item => {
								return (
									<Pressable
										onPress={() => {
											router.push({
												params: {
													id: item.id,
												},
												pathname: '(app)/searcharea/searchh3recommendation',
											})
										}}
									>
										<Box key={item.id} flexDirection='row' m={'$2'} p={'$3'} justifyContent='space-between'>
											<VStack>
												<Heading
													fontWeight={'$medium'}
													fontSize={'$lg'}
													numberOfLines={1}
													ellipsizeMode={'tail'}
												>
													{item.Area?.City.name}
												</Heading>
												<Text>{item.Area?.Country.name}</Text>
											</VStack>
											<VStack alignItems='center'>
												<Text>{item.venuesProfileIds.length}</Text>
												<Text>venues</Text>
											</VStack>
											<Text>{item.distanceInM}</Text>
										</Box>
									</Pressable>
								)
							})}
						</VStack>
					)
				case 'ComingAreaResponse':
					return (
						<VStack>
							{data.venuesNearby.recommendedAreas?.map(item => {
								return (
									<Pressable
										onPress={() => {
											router.push({
												params: {
													id: item.id,
												},
												pathname: '(app)/searcharea/searchh3recommendation',
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
												<Heading
													fontWeight={'$medium'}
													fontSize={'$lg'}
													numberOfLines={1}
													ellipsizeMode={'tail'}
												>
													{item.Area?.City.name}
												</Heading>
												<Text>{item.Area?.Country.name}</Text>
											</VStack>
											<HStack alignItems='center' space='sm'>
												<VStack alignItems='center'>
													<Text>{item.venuesProfileIds.length}</Text>
													<Text>venues</Text>
												</VStack>
												<ArrowRightIcon />
											</HStack>
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
				: router.push({
						pathname: '(app)/permission/foregroundlocation',
				  })
		}

		return (
			<VStack>
				<VStack space='xs' p={'$2'} flex={1}>
					<Heading>Recommended Areas</Heading>
					<Button variant='link' width={'50%'} size='md' onPress={_press} justifyContent='flex-start'>
						<Button.Text>Filter by distance</Button.Text>
						<Button.Icon as={ArrowRightIcon} ml='$1' />
					</Button>
				</VStack>
				<RecommendedAreaList />
			</VStack>
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
				ListFooterComponent={ListFooterComponent}
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
													? item.toBeNotifiedProfileIds.some(item => item === rAuthorizationVar?.Profile?.id)
														? rTheme.theme?.gluestack.tokens.colors.blue500
														: rTheme.theme?.gluestack.tokens.colors.light700
													: item.toBeNotifiedProfileIds.some(item => item === rAuthorizationVar?.Profile?.id)
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
													? item.toBeNotifiedProfileIds.some(item => item === rAuthorizationVar?.Profile?.id)
														? rTheme.theme?.gluestack.tokens.colors.primary500
														: rTheme.theme?.gluestack.tokens.colors.light700
													: item.toBeNotifiedProfileIds.some(item => item === rAuthorizationVar?.Profile?.id)
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
				ListHeaderComponent={<ListheaderComponent typename={data.venuesNearby.__typename} />}
				ListFooterComponent={ListFooterComponent}
				automaticallyAdjustContentInsets
			/>
		)
	}
}

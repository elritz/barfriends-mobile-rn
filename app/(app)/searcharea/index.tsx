import { useReactiveVar } from '@apollo/client'
import { Box, Button, HStack, Heading, Text, VStack } from '@components/core'
import LocationPermissionItemEmptyState from '@components/organisms/list/searchareafiltering/LocationPermissionItemEmptyState'
import SearchAreaLocationPermissionItem from '@components/organisms/list/searchareafiltering/SearchAreaLocationPermissionItem'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar } from '@reactive'
import useContentInsets from '@util/hooks/useContentInsets'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const router = useRouter()
	const contentInsets = useContentInsets()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const searchAreaLocation = [
		{ name: 'Country', value: rSearchAreaVar?.searchArea.country.name },
		{ name: 'State', value: rSearchAreaVar?.searchArea.state.name },
		{ name: 'City', value: rSearchAreaVar?.searchArea.city.name },
	]

	const searchAreaDistances = [
		{ kRing: 1, distance: 30 },
		{ kRing: 2, distance: 60 },
		{ kRing: 3, distance: 80 },
	]

	const handleSearchAreaKRing = async item => {
		SearchAreaReactiveVar({
			...rSearchAreaVar,
			kRing: {
				distance: item.distance,
				value: item.kRing,
			},
		})
		await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(rSearchAreaVar))
	}

	const switchRouter = value => {
		switch (value) {
			case 'City':
				if (rSearchAreaVar?.searchArea.country.isoCode && rSearchAreaVar?.searchArea.state.isoCode) {
					router.push({
						pathname: '(app)/searcharea/searchstatecities',
						params: {
							countryIsoCode: rSearchAreaVar.searchArea.country.isoCode,
							stateIsoCode: rSearchAreaVar.searchArea.state.isoCode,
						},
					})
				}
				break
			case 'State':
				if (rSearchAreaVar?.searchArea.country.isoCode && rSearchAreaVar?.searchArea.state.isoCode) {
					router.push({
						pathname: '(app)/searcharea/searchcountrystate',
						params: {
							countryIsoCode: rSearchAreaVar.searchArea.country.isoCode,
						},
					})
				}
				break
			case 'Country':
				if (rSearchAreaVar?.searchArea.country.isoCode && rSearchAreaVar?.searchArea.state.isoCode) {
					router.push({
						pathname: '(app)/searcharea/searchcountry',
					})
				}
				break
			default:
				router.push({
					pathname: '(app)/searcharea/searchcountry',
				})
		}
	}

	return (
		<ScrollView
			style={{
				marginHorizontal: 4,
				flex: 1,
			}}
			contentInset={{
				...contentInsets,
			}}
		>
			<VStack space={'md'} my={'$4'} mx={'$2'}>
				<Box bg={'$transparent'}>
					<VStack space='sm'>
						<Heading fontSize={'$lg'} lineHeight={'$sm'}>
							Distance{`\n`}
							<Text fontSize={'$md'} lineHeight={'$sm'}>
								Around&nbsp;{rSearchAreaVar.kRing.distance}&nbsp;km away.
							</Text>
						</Heading>

						<HStack space={'md'} justifyContent={'space-around'}>
							{searchAreaDistances.map((item, index) => {
								return (
									<Button
										key={index}
										variant={rSearchAreaVar?.kRing.value === item.kRing ? 'solid' : 'outline'}
										sx={{
											_light: {
												bg: rSearchAreaVar?.kRing.value === item.kRing ? '$primary500' : '$white',
											},
											_dark: {
												bg: rSearchAreaVar?.kRing.value === item.kRing ? '$primary500' : '$black',
											},
										}}
										style={{
											borderColor: rSearchAreaVar?.kRing.value === item.kRing ? '#ff700000' : '#ff7000',
											borderWidth: 1,
										}}
										onPress={() => handleSearchAreaKRing(item)}
										flex={1}
										height={50}
									>
										<Text
											sx={{
												_dark: {
													color: rSearchAreaVar?.kRing.value === item.kRing ? 'white' : '$white',
												},
												_light: {
													color: rSearchAreaVar?.kRing.value === item.kRing ? 'white' : '$coolGray900',
												},
												fontWeight: rSearchAreaVar?.kRing.value === item.kRing ? '$medium' : '$medium',
											}}
										>
											{item.distance}
										</Text>
									</Button>
								)
							})}
						</HStack>
					</VStack>
				</Box>
				<VStack space={'md'}>
					<HStack space={'md'}>
						{!rSearchAreaVar?.searchArea.country.name ||
						!rSearchAreaVar?.searchArea.state.name ||
						!rSearchAreaVar?.searchArea.city.name ? (
							<Box p={'$5'}>
								<Box
									alignItems={'center'}
									style={{
										width: '100%',
									}}
									my={'$2'}
								>
									<Heading fontSize={'$lg'} lineHeight={'$sm'}>
										Find Venues Near{`\n`}
										<Text fontSize={'$md'} lineHeight={'$sm'}>
											Find your area and we will show you what we have for venues.
										</Text>
									</Heading>
								</Box>
								<Button
									onPress={() => {
										router.push({
											pathname: '(app)/searcharea/searchcountry',
										})
									}}
								>
									<Text fontSize={'$lg'}>Search area</Text>
								</Button>
								<LocationPermissionItemEmptyState />
							</Box>
						) : (
							<VStack flex={1} space={'md'}>
								<Heading fontSize={'$lg'} lineHeight={'$sm'}>
									Search area{`\n`}
									<Text fontSize={'$md'} lineHeight={'$sm'}>
										{rSearchAreaVar?.useCurrentLocation
											? 'You are currently using your devices location to show you venues nearby.'
											: 'Use your location to automatically set your area.'}
									</Text>
								</Heading>

								<HStack space={'md'}>
									{searchAreaLocation.map((item, index) => {
										return (
											<Button
												key={index}
												bg={!rSearchAreaVar?.useCurrentLocation ? '$primary500' : '$blue500'}
												variant={'solid'}
												// isDisabled
												sx={{
													':disabled': {
														opacity: 1,
													},
												}}
												onPress={() => switchRouter(item.name)}
												flex={1}
												height={50}
											>
												<Text
													ellipsizeMode={'tail'}
													numberOfLines={1}
													sx={{
														_dark: {
															color: 'white',
														},
														_light: {
															color: 'white',
														},
														fontWeight: 'medium',
													}}
												>
													{item.value}
												</Text>
											</Button>
										)
									})}
								</HStack>
								<SearchAreaLocationPermissionItem />
							</VStack>
						)}
					</HStack>
				</VStack>
			</VStack>
		</ScrollView>
	)
}

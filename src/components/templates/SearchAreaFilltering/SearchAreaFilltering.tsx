import LocationPermissionItem from './LocationPermissionItem'
import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { SearchAreaReactiveVar } from '@reactive'
import { Box, Heading, Text, HStack, Button, ScrollView } from 'native-base'
import { Icon } from 'native-base'

// TODO: FN(Flatlist with data of recent SearchArea with onPress to switch to it)
// TODO: FN(Use hometown location, Use current town location)

const scrollViewMarginX = '3'

const SearchAreaFilltering = () => {
	const navigation = useNavigation()
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
					navigation.navigate('ModalNavigator', {
						screen: 'SearchAreaModalStack',
						params: {
							screen: 'SearchStateCitiesTextScreen',
							params: {
								country: rSearchAreaVar?.searchArea.country.isoCode,
								state: rSearchAreaVar.searchArea.state.isoCode,
							},
						},
					})
				}
				break
			default:
				navigation.navigate('ModalNavigator', {
					screen: 'SearchAreaModalStack',
					params: {
						screen: 'SearchCountryTextScreen',
						params: {
							searchText: '',
						},
					},
				})
		}
	}

	const ListheaderComponent = () => {
		return (
			<Box my={4}>
				<Heading size={'lg'}>Search area</Heading>
				<HStack my={2} space={3}>
					{!rSearchAreaVar?.searchArea.country.name ||
					!rSearchAreaVar?.searchArea.state.name ||
					!rSearchAreaVar?.searchArea.city.name ? (
						<></>
					) : (
						<>
							{searchAreaLocation.map((item, index) => {
								console.log('item :>> ', item)
								return (
									<Button
										key={index}
										colorScheme={'primary'}
										variant={'solid'}
										_text={{
											ellipsizeMode: 'tail',
											numberOfLines: 1,
											_dark: {
												color: 'white',
											},
											_light: {
												color: 'white',
											},
											fontWeight: 'medium',
										}}
										onPress={() => switchRouter(item.name)}
										flex={1}
										height={50}
									>
										{item.value}
									</Button>
								)
							})}
						</>
					)}
				</HStack>
				<Box mt={4}>
					<LocationPermissionItem />
				</Box>
			</Box>
		)
	}

	return (
		<Box mx={scrollViewMarginX} flex={1}>
			<Box my={4}>
				<Heading size={'lg'}>Distance</Heading>
				<Text fontSize={'lg'}>Up to&nbsp;{rSearchAreaVar.kRing.distance}&nbsp;km away</Text>
				<HStack my={2} space={3}>
					{searchAreaDistances.map((item, index) => {
						return (
							<Button
								key={index}
								variant={rSearchAreaVar?.kRing.value === item.kRing ? 'solid' : 'outline'}
								colorScheme={rSearchAreaVar?.kRing.value === item.kRing ? 'primary' : 'white'}
								_text={{
									_dark: {
										color: rSearchAreaVar?.kRing.value === item.kRing ? 'white' : 'red.200',
									},
									_light: {
										color: rSearchAreaVar?.kRing.value === item.kRing ? 'white' : 'coolGray.900',
									},
									fontWeight: rSearchAreaVar?.kRing.value === item.kRing ? 'medium' : 'medium',
								}}
								style={{
									borderColor: rSearchAreaVar?.kRing.value === item.kRing ? '#ff700000' : '#ff7000',
									borderWidth: 1,
								}}
								onPress={() => handleSearchAreaKRing(item)}
								flex={1}
								height={50}
							>
								{item.distance}
							</Button>
						)
					})}
				</HStack>
				<ListheaderComponent />
			</Box>
		</Box>
	)
}

export default SearchAreaFilltering

import { useReactiveVar } from '@apollo/client'
import LocationPermissionItemEmptyState from '@components/organisms/list/searchareafiltering/LocationPermissionItemEmptyState'
import SearchAreaLocationPermissionItem from '@components/organisms/list/searchareafiltering/SearchAreaLocationPermissionItem'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { Ionicons } from '@expo/vector-icons'
import {
	Box,
	Button,
	ButtonText,
	Divider,
	HStack,
	Heading,
	Text,
	VStack,
} from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar, ThemeReactiveVar } from '@reactive'
import useContentInsets from '@util/hooks/useContentInsets'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'

export default () => {
	const router = useRouter()
	const contentInsets = useContentInsets()

	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

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
					router.navigate({
						pathname: '/(app)/searcharea/searchstatecities',
						params: {
							countryIsoCode: rSearchAreaVar.searchArea.country.isoCode,
							stateIsoCode: rSearchAreaVar.searchArea.state.isoCode,
						},
					})
				}
				break
			case 'State':
				if (rSearchAreaVar?.searchArea.country.isoCode && rSearchAreaVar?.searchArea.state.isoCode) {
					router.navigate({
						pathname: '/(app)/searcharea/searchcountrystate',
						params: {
							countryIsoCode: rSearchAreaVar.searchArea.country.isoCode,
						},
					})
				}
				break
			case 'Country':
				if (rSearchAreaVar?.searchArea.country.isoCode && rSearchAreaVar?.searchArea.state.isoCode) {
					router.navigate({
						pathname: '/(app)/searcharea/searchcountry',
					})
				}
				break
			default:
				router.navigate({
					pathname: '/(app)/searcharea/searchcountry',
				})
		}
	}

	return (
		<ScrollView
			contentInset={contentInsets}
			style={{
				marginHorizontal: 4,
				flex: 1,
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

						<HStack mt={'$3'} space={'md'} justifyContent={'space-around'}>
							{searchAreaDistances.map((item, index) => {
								return (
									<Button
										key={index}
										variant={rSearchAreaVar?.kRing.value === item.kRing ? 'solid' : 'outline'}
										sx={{
											_light: {
												bg: rSearchAreaVar?.kRing.value === item.kRing ? '$primary500' : '$light100',
											},
											_dark: {
												bg: rSearchAreaVar?.kRing.value === item.kRing ? '$primary500' : '$light900',
											},
										}}
										borderRadius={'$xl'}
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
												fontWeight: rSearchAreaVar?.kRing.value === item.kRing ? '$bold' : '$bold',
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
				<Divider my={'$3'} width={'$4/5'} alignSelf='center' />
				<VStack space={'md'}>
					<HStack space={'md'}>
						{!rSearchAreaVar?.searchArea.country.name ||
						!rSearchAreaVar?.searchArea.state.name ||
						!rSearchAreaVar?.searchArea.city.name ? (
							<Box p={'$5'}>
								<VStack space={'md'}>
									<VStack space={'md'} mb={'$2'}>
										<Heading fontSize={'$2xl'} lineHeight={'$md'}>
											Search For Your Area
										</Heading>
										<Text fontSize={'$lg'} lineHeight={'$sm'}>
											Find your area and we will show you what we have for venues.
										</Text>
									</VStack>
									<Button
										onPress={() => {
											router.navigate({
												pathname: '/(app)/searcharea/searchcountry',
											})
										}}
									>
										<ButtonText fontSize={'$lg'}>Find Area</ButtonText>
									</Button>
									<LocationPermissionItemEmptyState />
								</VStack>
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

								<HStack mt={'$3'} space={'md'}>
									{searchAreaLocation.map((item, index) => {
										return (
											<Button
												key={index}
												bg={!rSearchAreaVar?.useCurrentLocation ? '$light800' : '$blue600'}
												variant={'solid'}
												// isDisabled
												sx={{
													':disabled': {
														opacity: 1,
													},
												}}
												onPress={() => switchRouter(item.name)}
												flex={1}
												borderRadius={'$xl'}
												height={40}
											>
												<ButtonText
													ellipsizeMode={'tail'}
													numberOfLines={1}
													sx={{
														fontWeight: 'medium',
													}}
												>
													{item.value}
												</ButtonText>
											</Button>
										)
									})}
								</HStack>
								<SearchAreaLocationPermissionItem />
								<HStack justifyContent='flex-end'>
									<Button
										rounded={'$lg'}
										onPress={() => {
											router.navigate({
												pathname: '/(app)/searcharea/searchcountry',
											})
										}}
									>
										<ButtonText>Find new Area</ButtonText>
										<Ionicons
											color={
												rTheme.colorScheme === 'light'
													? rTheme.theme?.gluestack.tokens.colors.light100
													: rTheme.theme?.gluestack.tokens.colors.light100
											}
											name='arrow-forward'
											size={27}
											style={{
												marginLeft: 8,
											}}
										/>
									</Button>
								</HStack>
							</VStack>
						)}
					</HStack>
				</VStack>
			</VStack>
		</ScrollView>
	)
}

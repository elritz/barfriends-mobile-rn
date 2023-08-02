import { Form } from './_layout'
import { useReactiveVar } from '@apollo/client'
import { Box, Button, HStack, Heading, Text, VStack } from '@components/core'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { CityResponseObject, useGetAllCitiesByStateQuery } from '@graphql/generated'
import { LocalStoragePreferenceSearchAreaType } from '@ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchAreaReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useRouter, useGlobalSearchParams } from 'expo-router'
import { filter, uniqueId } from 'lodash'
import { Skeleton } from 'moti/skeleton'
import { memo, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(When done save this data to the backend as recent SearchAreas)
type CityState = {
	title: string
	cities: CityResponseObject[] | undefined | null
}
export default function SearchAreaStateCities() {
	const router = useRouter()
	const params = useGlobalSearchParams()
	const contentInsets = useContentInsets()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const [popularCities, setPopularCities] = useState<CityResponseObject[] | undefined | null>([])
	const [allCities, setAllCities] = useState<CityResponseObject[] | undefined | null>([])
	const [searchCities, setSearchCities] = useState<CityState>()

	const formContext = useFormContext<Form>()
	const { watch, getValues, setValue, handleSubmit } = formContext

	const { data, loading, error } = useGetAllCitiesByStateQuery({
		skip: !params.countryIsoCode || !params.stateIsoCode,
		variables: {
			countryIsoCode: String(params.countryIsoCode),
			stateIsoCode: String(params.stateIsoCode),
		},
		onError: error => {},
		onCompleted: data => {
			if (data.getAllCitiesByState) {
				setPopularCities(data.getAllCitiesByState.popularCities)
				setAllCities(data.getAllCitiesByState.allCities)
			}
		},
	})

	const filterList = text => {
		if (!params?.searchtext?.length && data?.getAllCitiesByState?.allCities?.length) {
			if (data.getAllCitiesByState) {
				setSearchCities({
					title: ``,
					cities: [],
				})
			}
		}

		const filteredAllCitiesData = filter(data?.getAllCitiesByState.allCities, item => {
			return contains(item, text.toLowerCase())
		})
		setSearchCities({
			title: `"${text.toLowerCase()}"`,
			cities: [...filteredAllCitiesData],
		})
	}

	const contains = (item, query) => {
		if (item.name.toLowerCase().includes(query)) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (params.searchtext && params.searchtext.length) {
			filterList(params.searchtext)
		} else {
			if (data?.getAllCitiesByState) {
				setSearchCities({
					title: ``,
					cities: [],
				})
			}
		}
	}, [params.searchtext])

	if (loading || !allCities) {
		return (
			<Box bg={'$transparent'} flex={1}>
				<FlashList
					data={[...Array(20)]}
					contentInset={{
						...contentInsets,
					}}
					contentContainerStyle={{
						paddingHorizontal: 10,
					}}
					keyExtractor={(item, index) => 'key' + index}
					estimatedItemSize={50}
					keyboardDismissMode={'on-drag'}
					ItemSeparatorComponent={() => {
						return (
							<View
								style={{
									marginVertical: 4,
								}}
							/>
						)
					}}
					renderItem={({ index, item }) => {
						return (
							<Skeleton
								key={index}
								height={50}
								width={'100%'}
								radius={10}
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
						)
					}}
				/>
			</Box>
		)
	}

	function CityItem({ index, item }) {
		const _pressItem = async item => {
			setValue('city', {
				name: item.name,
				isoCode: '',
				coords: {
					latitude: Number(item.latitude),
					longitude: Number(item.longitude),
				},
			})
			const { country, state, city } = getValues()
			const newSearchAreaValue: LocalStoragePreferenceSearchAreaType = {
				...rSearchAreaVar,
				useCurrentLocation: false,
				searchArea: {
					country,
					state,
					city,
					coords: {
						latitude: city.coords.latitude,
						longitude: city.coords.longitude,
					},
				},
			}

			await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(newSearchAreaValue))
			SearchAreaReactiveVar({
				...newSearchAreaValue,
			})
			router.push({
				pathname: '(app)/searcharea',
			})
		}

		return (
			<Button
				onPress={() => _pressItem(item)}
				key={index}
				w={'$full'}
				isFocused
				sx={{
					h: 50,
					my: 4,
					py: 0,
					px: 2,
					justifyContent: 'space-between',
					_light: {
						bg: watch('city.name') === item.name ? '$primary500' : '$light50',
					},
					_dark: {
						bg: watch('city.name') === item.name ? '$primary500' : '$dark100',
					},
				}}
				rounded={'$md'}
				justifyContent='flex-start'
			>
				<Text
					fontWeight={'$medium'}
					fontSize={'$lg'}
					numberOfLines={1}
					ellipsizeMode={'tail'}
					ml={'$3'}
				>
					{item.name}
				</Text>
				<HStack justifyContent='flex-end' space={'md'} alignItems={'center'} mr={'$2'}>
					{item.venuesInArea && item.venuesInArea > 1 ? (
						<VStack>
							<Text textAlign={'center'} fontWeight={'$bold'} fontSize={'$md'} numberOfLines={1}>
								{item.venuesInArea}
							</Text>
							<Text textAlign={'center'} fontWeight={'$light'} fontSize={'$sm'} numberOfLines={1}>
								Venues
							</Text>
						</VStack>
					) : null}
					{watch('city.name') === item.name ? (
						<Button onPress={() => _pressItem(item)} rounded={'$full'} bg='$blue500' size='xs'>
							<Button.Text fontSize={'$xs'}>Continue</Button.Text>
						</Button>
					) : null}
				</HStack>
			</Button>
		)
	}

	const MemoizedItem = memo(CityItem)

	if (searchCities && searchCities.title && searchCities.cities) {
		return (
			<Box bg={'$transparent'} flex={1}>
				<FlashList
					data={searchCities.cities}
					scrollEnabled={true}
					keyboardDismissMode='on-drag'
					estimatedItemSize={50}
					keyExtractor={(item, index) => {
						return uniqueId().toString()
					}}
					ListHeaderComponent={() => {
						return (
							<Box bg={'transparent'} mb={'$4'} mx={'$3'}>
								<Heading mx={'$3'} fontSize={'$2xl'}>
									{searchCities.title}
								</Heading>
							</Box>
						)
					}}
					renderItem={({ item, index }) => {
						return <MemoizedItem index={index} item={item} />
					}}
					ItemSeparatorComponent={() => {
						return (
							<View
								style={{
									marginVertical: 4,
								}}
							/>
						)
					}}
					contentInset={{
						...contentInsets,
					}}
				/>
			</Box>
		)
	}

	return (
		<Box bg={'$transparent'} flex={1}>
			<FlashList
				data={allCities}
				scrollEnabled={true}
				automaticallyAdjustContentInsets
				automaticallyAdjustKeyboardInsets
				automaticallyAdjustsScrollIndicatorInsets
				keyboardDismissMode='on-drag'
				estimatedItemSize={50}
				keyExtractor={(item, index) => 'key' + index}
				ListHeaderComponent={() => {
					return (
						<Box bg={'transparent'} mb={'$4'}>
							{popularCities && popularCities.length ? (
								<Box bg={'$transparent'} mb={'$4'}>
									<Heading mb={'$4'}>Popular</Heading>
									{popularCities.map((item, index) => {
										return <MemoizedItem key={uniqueId()} index={index} item={item} />
									})}
								</Box>
							) : null}
							<Heading>All Cities</Heading>
						</Box>
					)
				}}
				renderItem={({ item, index }) => {
					return <MemoizedItem index={index} item={item} />
				}}
				ItemSeparatorComponent={() => {
					return (
						<View
							style={{
								marginVertical: 4,
							}}
						/>
					)
				}}
				contentInset={{
					...contentInsets,
				}}
				contentContainerStyle={{
					paddingHorizontal: 10,
				}}
			/>
		</Box>
	)
}

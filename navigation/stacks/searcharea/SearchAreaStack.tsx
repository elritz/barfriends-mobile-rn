import { useReactiveVar } from '@apollo/client'
import NavigationDragIcon from '@components/atoms/icons/navigationdragicon/NavigationDragIcon'
import ExploreSearchInputDisabled from '@components/molecules/search/explore/ExploreSearchInputDisabled'
import SearchAreaCountryTextScreenInput from '@components/molecules/search/searcharea/SearchAreaCountryTextScreenInput'
import SearchAreaModal from '@navigation/screens/modals/searcharea/SearchAreaModal'
import SearchAreaCountries from '@navigation/screens/search/searcharea/SearchAreaCountries'
import SearchAreaCountryStates from '@navigation/screens/search/searcharea/SearchAreaCountryStates'
import SearchAreaStateCities from '@navigation/screens/search/searcharea/SearchAreaStateCities'
import { LocalStoragePreferenceSearchAreaType2, PlaceType } from '@preferences'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SearchAreaReactiveVar } from '@reactive'
import { ModalNavigatorParamList, SearchAreaStackParamList } from '@types'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { Box, VStack } from 'native-base'
import { useContext, useEffect, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Platform, View, StyleSheet } from 'react-native'
import { ThemeContext } from 'styled-components/native'

// TODO: FN(SearchArea complete) ln:95 --  get the initial state for these values to also be able to tell which is checked

const ScreenStack = createStackNavigator<SearchAreaStackParamList>()

export type HorizontalCityItemProps = {
	countryCode: string
	latitude: string
	longitude: string
	name: string
	stateCode: string
}
export type HorizontalStateItemProps = {
	countryCode: string
	isoCode: string
	latitude: string
	longitude: string
	name: string
}

export type HorizontalCountryItemProps = {
	currency: string
	flag?: string
	isoCode: string
	latitude: string
	longitude: string
	name: string
	phonecode: string
	timezones: Timezone[]
}

type Timezone = {
	abbreviation: string
	gmtOffset: string
	gmtOffsetName: string
	tzName: string
	zoneName: string
}

export type Form = {
	searchtext?: string
	country: PlaceType
	state: PlaceType
	city: PlaceType
	done: boolean
}
export type SearchAreaStackRouteProp = RouteProp<ModalNavigatorParamList, 'SearchAreaModalStack'>

function SearchAreaStackNavigation() {
	const navigation = useNavigation()
	const route = useRoute<SearchAreaStackRouteProp>()
	const router = useRouter()
	const themeContext = useContext(ThemeContext)
	const colorScheme = useThemeColorScheme()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const methods = useForm<Form>({
		defaultValues: {
			searchtext: '',
			country: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			state: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			city: {
				name: '',
				isoCode: '',
				coords: {
					latitude: 0,
					longitude: 0,
				},
			},
			done: false,
		},
	})

	const getData = async () => {
		try {
			if (rSearchAreaVar != null) {
				methods.setValue('city', rSearchAreaVar.searchArea.city)
				methods.setValue('country', rSearchAreaVar.searchArea.country)
				methods.setValue('state', rSearchAreaVar.searchArea.state)
			} else {
				console.log('TODO =========>')
			}
		} catch (e) {
			// error reading value
		}
	}

	useEffect(() => {
		getData()
	}, [])

	const onSubmit = data => console.log()

	const handleNavigationToNewSearchAreaForm = () => {
		// navigation.navigate('ModalNavigator', {
		// 	screen: 'SearchAreaModalStack',
		// 	params: {
		// 		screen: 'SearchCountryTextScreen',
		// 		params: {
		// 			searchText: '',
		// 		},
		// 	},
		// })
	}

	const searchBarTitle = useMemo(() => {
		switch (route?.params?.screen) {
			case 'SearchCountryTextScreen':
				return 'Search country'
			case 'SearchCountryStatesTextScreen':
				return 'Search state'
			case 'SearchStateCitiesTextScreen':
				return 'Search city'
		}
	}, [route])

	return (
		<FormProvider {...methods}>
			<ScreenStack.Navigator
				screenOptions={{
					transitionSpec: {
						open: {
							animation: 'timing',
							config: {
								duration: 0,
							},
						},
						close: {
							animation: 'timing',
							config: {
								duration: 150,
							},
						},
					},
					header: () => {
						return (
							<VStack flexDirection={'column-reverse'} alignItems={'center'}>
								<SearchAreaCountryTextScreenInput
									name='searchtext'
									label=''
									placeholder={searchBarTitle}
									keyboardType='default'
								/>
								<NavigationDragIcon />
							</VStack>
						)
					},
				}}
			>
				<ScreenStack.Screen
					name='SearchAreaModal'
					component={SearchAreaModal}
					options={{
						header: () => {
							return (
								<VStack flexDirection={'column-reverse'} alignItems={'center'} pb={2}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
									) : (
										<Box background={'secondary.50'} style={[StyleSheet.absoluteFill]} />
									)}
									<ExploreSearchInputDisabled onPress={handleNavigationToNewSearchAreaForm} />
									<NavigationDragIcon />
								</VStack>
							)
						},
					}}
				/>
				<ScreenStack.Screen name='SearchCountryTextScreen' component={SearchAreaCountries} />
				<ScreenStack.Screen name='SearchCountryStatesTextScreen' component={SearchAreaCountryStates} />
				<ScreenStack.Screen name='SearchStateCitiesTextScreen' component={SearchAreaStateCities} />
			</ScreenStack.Navigator>
		</FormProvider>
	)
}

export default SearchAreaStackNavigation

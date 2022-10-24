import { useReactiveVar } from '@apollo/client'
import NavigationDragIcon from '@components/atoms/icons/navigationdragicon/NavigationDragIcon'
import SearchInputDisabled from '@components/molecules/search/explore/ExploreSearchInputDisabled'
import SearchAreaCountryTextScreenInput from '@components/molecules/search/searcharea/SearchAreaCountryTextScreenInput'
import SearchAreaModal from '@navigation/screens/modals/searcharea/SearchAreaModal'
import SearchAreaCountries from '@navigation/screens/search/searcharea/SearchAreaCountries'
import SearchAreaCountryStates from '@navigation/screens/search/searcharea/SearchAreaCountryStates'
import SearchAreaStateCities from '@navigation/screens/search/searcharea/SearchAreaStateCities'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SearchAreaReactiveVar, ThemeReactiveVar } from '@reactive'
import { SearchAreaStackParamList } from '@types'
import { BlurView } from 'expo-blur'
import { VStack } from 'native-base'
import { useContext, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Platform, View, StyleSheet } from 'react-native'
import { ThemeContext } from 'styled-components/native'

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

function SearchAreaStackNavigation() {
	const navigation = useNavigation()
	const route = useRoute()
	const themeContext = useContext(ThemeContext)
	const theme = useReactiveVar(ThemeReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const methods = useForm({
		defaultValues: {
			searchtext: '',
			country: '',
			state: '',
			city: '',
			latitude: '',
			longitude: '',
			done: false,
		},
	})

	const getData = async () => {
		try {
			if (rSearchAreaVar != null) {
				methods.setValue('city', rSearchAreaVar.city)
				methods.setValue('country', rSearchAreaVar.country)
				methods.setValue('state', rSearchAreaVar.state)
			} else {
				console.log('do nothing')
			}
		} catch (e) {
			// error reading value
		}
	}

	useEffect(() => {
		getData()
	}, [])

	// get the initial state for these values to also be able to tell which is checked
	const onSubmit = data => console.log(data)

	const handleNavigationToExploreText = () => {
		navigation.navigate('ModalNavigator', {
			screen: 'SearchAreaModalStack',
			params: {
				screen: 'SearchCountryTextScreen',
			},
		})
	}

	const getTitle = () => {
		switch (route.params?.screen) {
			case 'SearchCountryTextScreen':
				return 'Search country'
			case 'SearchCountryStatesTextScreen':
				return 'Search state'
			case 'SearchStateCitiesTextScreen':
				return 'Search city'
		}
	}

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
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={theme} intensity={80} />
								) : (
									<View
										style={[
											StyleSheet.absoluteFill,
											{ backgroundColor: themeContext.palette.primary.background },
										]}
									/>
								)}
								<SearchAreaCountryTextScreenInput
									name='searchtext'
									label=''
									placeholder={getTitle()}
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
								<VStack flexDirection={'column-reverse'} alignItems={'center'}>
									{Platform.OS === 'ios' ? (
										<BlurView style={StyleSheet.absoluteFill} tint={theme} intensity={80} />
									) : (
										<View
											style={[
												StyleSheet.absoluteFill,
												{ backgroundColor: themeContext.palette.primary.background },
											]}
										/>
									)}
									<SearchInputDisabled onPress={handleNavigationToExploreText} />
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

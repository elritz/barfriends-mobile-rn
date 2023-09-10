import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Box, VStack } from '@components/core'
import SearchInput from '@components/molecules/search/searchinput/SearchInput'
import SearchInputSearchArea from '@components/molecules/search/searchinput/SearchInputSearchArea'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { PlaceType } from '@ctypes/preferences'
import { SearchAreaReactiveVar, ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import { Stack } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { Platform, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
	country: PlaceType
	state: PlaceType
	city: PlaceType
	done: boolean
}

export default function _layout() {
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT

	const methods = useForm<Form>({
		defaultValues: {
			...rSearchAreaVar.searchArea,
			done: false,
		},
	})

	return (
		<FormProvider {...methods}>
			<Stack
				screenOptions={{
					headerShown: true,
					headerTransparent: true,
					headerTitle: 'Search Area',
					headerLeft: () => {
						return <ChevronBackArrow />
					},
				}}
			>
				<Stack.Screen
					name={'index'}
					options={{
						contentStyle: {
							// backgroundColor: rTheme.colorScheme === 'dark' ? 'black' : 'white',
						},
					}}
				/>
				<Stack.Screen name={'searchh3recommendation'} />
				<Stack.Screen
					name={'searchcountry'}
					options={{
						animation: 'fade',
						headerShown: true,
						headerTransparent: true,
						header: () => {
							return (
								<Box>
									<VStack justifyContent={'flex-start'}>
										<SearchInputSearchArea placeholder='Search countries' />
									</VStack>
								</Box>
							)
						},
					}}
				/>
				<Stack.Screen
					name={'searchcountrystate'}
					options={{
						animation: 'fade',
						headerShown: true,
						headerTransparent: true,
						header: () => {
							return (
								<Box>
									<VStack justifyContent={'flex-start'}>
										<SearchInputSearchArea placeholder='Search states' />
									</VStack>
								</Box>
							)
						},
					}}
				/>
				<Stack.Screen
					name={'searchstatecities'}
					options={{
						animation: 'fade',
						headerShown: true,
						headerTransparent: true,
						header: () => {
							return (
								<Box>
									<VStack justifyContent={'flex-start'}>
										<SearchInputSearchArea placeholder='Search cities' />
									</VStack>
								</Box>
							)
						},
					}}
				/>
			</Stack>
		</FormProvider>
	)
}

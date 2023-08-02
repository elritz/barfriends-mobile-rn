import { useReactiveVar } from '@apollo/client'
import { Box, VStack } from '@components/core'
import SearchInput from '@components/molecules/search/searchinput/SearchInput'
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
					headerShown: false,
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
				<Stack.Screen
					name={'searchcountry'}
					options={{
						animation: 'fade',
						contentStyle: {
							// backgroundColor: rTheme.colorScheme === 'dark' ? 'black' : 'white',
						},
						header: () => {
							return (
								<VStack
									justifyContent={'flex-end'}
									sx={{
										pt: insets.top,
										h,
										_light: { bg: '$light100' },
										_dark: { bg: '$dark50' },
									}}
									pb={'$2'}
								>
									{Platform.OS === 'ios' ? (
										<BlurView
											style={StyleSheet.absoluteFill}
											tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
											intensity={80}
										/>
									) : (
										<Box bg='$transparent' style={[StyleSheet.absoluteFill]} />
									)}
									<SearchInput placeholder='Search country' />
								</VStack>
							)
						},
					}}
				/>
				<Stack.Screen
					name={'searchcountrystate'}
					options={{
						animation: 'fade',
						contentStyle: {
							// backgroundColor: rTheme.colorScheme === 'dark' ? 'black' : 'white',
						},
						header: () => {
							return (
								<VStack
									justifyContent={'flex-end'}
									sx={{
										pt: insets.top,
										h,
										_light: { bg: '$light100' },
										_dark: { bg: '$dark50' },
									}}
									pb={'$2'}
								>
									{Platform.OS === 'ios' ? (
										<BlurView
											style={StyleSheet.absoluteFill}
											tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
											intensity={80}
										/>
									) : (
										<Box bg='$transparent' style={[StyleSheet.absoluteFill]} />
									)}
									<SearchInput placeholder='Search states' />
								</VStack>
							)
						},
					}}
				/>
				<Stack.Screen
					name={'searchstatecities'}
					options={{
						animation: 'fade',
						contentStyle: {
							// backgroundColor: rTheme.colorScheme === 'dark' ? 'black' : 'white',
						},
						header: () => {
							return (
								<VStack
									justifyContent={'flex-end'}
									pb={'$3'}
									sx={{
										pt: insets.top + 5,
									}}
								>
									{Platform.OS === 'ios' ? (
										<BlurView
											style={StyleSheet.absoluteFill}
											tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
											intensity={80}
										/>
									) : (
										<Box bg='$transparent' style={[StyleSheet.absoluteFill]} />
									)}
									<SearchInput placeholder='Search cities' />
								</VStack>
							)
						},
					}}
				/>
			</Stack>
		</FormProvider>
	)
}

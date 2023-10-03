// TODO: UX() location icon when searchArea is using Currently Location over preset
import { useReactiveVar } from '@apollo/client'
import { Box, HStack, Pressable, Text } from '@gluestack-ui/themed'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { LocalStoragePreferenceSearchAreaType } from '@ctypes/preferences'
import { FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PermissionForegroundLocationReactiveVar,
	SearchAreaReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { capitalizeFirstLetter } from '@util/helpers/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import * as IntentLauncher from 'expo-intent-launcher'
import { useCallback } from 'react'
import { Alert, Linking, Platform } from 'react-native'

const SearchAreaLocationPermissionItem = () => {
	const rPermissionForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const newSearchArea: LocalStoragePreferenceSearchAreaType = {
		...rSearchAreaVar,
		useCurrentLocation: false,
	}

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Revel Location Permission',
			capitalizeFirstLetter(rPermissionForegroundLocationVar?.status),
			[
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{ text: 'Settings', onPress: () => handleOpenPhoneSettings() },
			],
		)

	const handleOpenPhoneSettings = useCallback(async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS)
		}
	}, [])

	return (
		<Pressable
			onPress={async () => {
				!rSearchAreaVar?.useCurrentLocation
					? !rPermissionForegroundLocationVar?.granted
						? rPermissionForegroundLocationVar?.canAskAgain && !rPermissionForegroundLocationVar.granted
							? await useSetSearchAreaWithLocation()
							: createTwoButtonAlert()
						: await useSetSearchAreaWithLocation()
					: (SearchAreaReactiveVar({
							...newSearchArea,
							useCurrentLocation: false,
					  }),
					  await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(newSearchArea)))
			}}
		>
			{({ isHovered, isFocused, isPressed }) => {
				return (
					<HStack
						bg='$transparent'
						rounded={'$lg'}
						overflow='hidden'
						sx={{
							h: 50,
							_light: {
								bg: isPressed
									? '#ffffff40'
									: rSearchAreaVar?.useCurrentLocation
									? '$light300'
									: '$light300',
							},
							_dark: {
								bg: isPressed ? '#00000040' : rSearchAreaVar?.useCurrentLocation ? '$blue500' : '$light700',
							},
						}}
						p={'$3'}
						justifyContent={'space-between'}
					>
						<Text
							textAlign={'left'}
							fontWeight={'$medium'}
							fontSize={'$lg'}
							ellipsizeMode={'tail'}
							alignSelf={'center'}
							color={rTheme.colorScheme === 'light' ? '$black' : '$white'}
						>
							{rSearchAreaVar?.useCurrentLocation ? 'Using current location' : 'Use current location'}
						</Text>
						<Box
							sx={{
								h: 35,
								w: 35,
								_light: {
									bg: rSearchAreaVar?.useCurrentLocation ? '$light800' : '$light200',
								},
								_dark: {
									bg: rSearchAreaVar?.useCurrentLocation ? '$light800' : '$light500',
								},
							}}
							alignSelf={'center'}
							alignItems={'center'}
							justifyContent={'center'}
							rounded={'$full'}
						>
							<FontAwesome5
								size={14}
								name={'location-arrow'}
								style={{
									borderRadius: 25,
									color: rSearchAreaVar?.useCurrentLocation
										? 'white'
										: rTheme.theme?.gluestack.tokens.colors.blue500,
								}}
							/>
						</Box>
					</HStack>
				)
			}}
		</Pressable>
	)
}

export default SearchAreaLocationPermissionItem

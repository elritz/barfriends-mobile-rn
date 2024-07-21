import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { HStack } from "#/components/ui/hstack";
import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_SEARCH_AREA } from '#/constants/StorageConstants'
import { LocalStoragePreferenceSearchAreaType } from '#/ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PermissionForegroundLocationReactiveVar, SearchAreaReactiveVar } from '#/reactive'
import { capitalizeFirstLetter } from '#/util/helpers/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '#/util/hooks/searcharea/useSetSearchAreaWithLocation'
import * as IntentLauncher from 'expo-intent-launcher'
import { Alert, Linking, Platform } from 'react-native'

// TODO: UX() location icon when searchArea is using Currently Location over preset

const LocationPermissionItemEmptyState = () => {
	const rPermissionForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const newSearchArea: LocalStoragePreferenceSearchAreaType = {
		...rSearchAreaVar,
		useCurrentLocation: false,
	}

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Location Permission',
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

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS)
		}
	}

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
            className="rounded-xl pressed:bg-primary-500">
            <HStack className="p-3 justify-between">
				<Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    className="w-[100%] text-center font-semibold text-lg self-center">
					{rSearchAreaVar?.useCurrentLocation ? 'Using current location' : 'Use current location'}
				</Text>
			</HStack>
        </Pressable>
    );
}

export default LocationPermissionItemEmptyState

import { useReactiveVar } from '@apollo/client'
import { TomorrowPreferencePermissionInitialState } from '@constants/Preferences'
import { LOCAL_STORAGE_INFORMATION_JOIN_VENUE } from '@constants/StorageConstants'
import { DefaultPreferenceToPermissionType } from '@ctypes/preferences'
import {
	Box,
	HStack,
	Heading,
	Pressable,
	VStack,
	Text,
	Button,
	ButtonText,
} from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { InformationJoinVenueReactiveVar } from '@reactive'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { AnimatePresence } from 'moti'

export default function InformationJoinVenue() {
	const rInformationJoinVenue = useReactiveVar(InformationJoinVenueReactiveVar)

	return (
		<Box>
			{rInformationJoinVenue?.canShowAgain &&
			DateTime.fromISO(rInformationJoinVenue?.dateToShowAgain) <= DateTime.now() ? (
				<AnimatePresence key={uniqueId()}>
					<Box mt={'$4'} m={'$2'} p={'$3'}>
						<VStack space='sm'>
							<Heading>Are you here! Want to socialize?</Heading>
							<Text>
								Signed up and you'll be able to join! Then chat, ask to dance or get a drink with other
								patrons!
							</Text>
							<HStack my={'$2'} justifyContent='space-between' alignItems='center'>
								<Pressable
									onPress={async () => {
										await AsyncStorage.setItem(
											LOCAL_STORAGE_INFORMATION_JOIN_VENUE,
											JSON.stringify({
												...TomorrowPreferencePermissionInitialState,
												numberOfTimesDismissed: rInformationJoinVenue?.numberOfTimesDismissed
													? rInformationJoinVenue.numberOfTimesDismissed + 1
													: 1,
												canShowAgain: false,
											} as DefaultPreferenceToPermissionType),
										)
										InformationJoinVenueReactiveVar({
											...TomorrowPreferencePermissionInitialState,
										})
									}}
								>
									<Text textDecorationLine='underline'>Don't show this again</Text>
								</Pressable>
								<Button
									size='sm'
									sx={{
										_light: {
											backgroundColor: '$light300',
										},
										_dark: {
											backgroundColor: '$light700',
										},
									}}
									onPress={async () => {
										await AsyncStorage.setItem(
											LOCAL_STORAGE_INFORMATION_JOIN_VENUE,
											JSON.stringify({
												...TomorrowPreferencePermissionInitialState,
												numberOfTimesDismissed: rInformationJoinVenue?.numberOfTimesDismissed
													? rInformationJoinVenue.numberOfTimesDismissed + 1
													: 1,
											} as DefaultPreferenceToPermissionType),
										)
										InformationJoinVenueReactiveVar({
											...TomorrowPreferencePermissionInitialState,
										})
									}}
								>
									<ButtonText
										sx={{
											_light: {
												color: '$light800',
											},
											_dark: {
												color: '$light300',
											},
										}}
									>
										Ok, got it
									</ButtonText>
								</Button>
							</HStack>
						</VStack>
					</Box>
				</AnimatePresence>
			) : null}
		</Box>
	)
}

import { useReactiveVar } from '@apollo/client'
import { Box, HStack, Heading, Pressable, VStack, Text, Button } from '@components/core'
import { TomorrowPreferencePermissionInitialState } from '@constants/Preferences'
import { LOCAL_STORAGE_INFORMATION_JOIN_VENUE } from '@constants/StorageConstants'
import { DefaultPreferenceToPermissionType } from '@ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { InformationJoinVenueReactiveVar } from '@reactive'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { AnimatePresence } from 'moti'

export default function InformationJoinVenue() {
	const rInformationJoinVenue = useReactiveVar(InformationJoinVenueReactiveVar)

	return (
		<>
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
											backgroundColor: '$dark200',
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
									<Button.Text
										sx={{
											_light: {
												color: '$light800',
											},
											_dark: {
												color: '$dark800',
											},
										}}
									>
										Ok, got it
									</Button.Text>
								</Button>
							</HStack>
						</VStack>
					</Box>
				</AnimatePresence>
			) : null}
		</>
	)
}

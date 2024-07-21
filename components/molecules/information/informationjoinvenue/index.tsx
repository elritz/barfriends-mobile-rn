import { Button, ButtonText } from "#/components/ui/button";
import { Text } from "#/components/ui/text";
import { VStack } from "#/components/ui/vstack";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import { TomorrowPreferencePermissionInitialState } from '#/constants/Preferences'
import { LOCAL_STORAGE_INFORMATION_JOIN_VENUE } from '#/constants/StorageConstants'
import { DefaultPreferenceToPermissionType } from '#/ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { InformationJoinVenueReactiveVar } from '#/reactive'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { AnimatePresence } from 'moti'

export default function InformationJoinVenue() {
	const rInformationJoinVenue = useReactiveVar(InformationJoinVenueReactiveVar)

	return (
        <Box>
            {rInformationJoinVenue?.canShowAgain &&
			DateTime.fromISO(String(rInformationJoinVenue?.dateToShowAgain)) <= DateTime.now() ? (
				<AnimatePresence key={uniqueId()}>
					<Box className="mt-4 m-2 p-3">
						<VStack space='sm'>
							<Heading>Are you here! Want to socialize?</Heading>
							<Text>
								Signed up and you'll be able to join! Then chat, ask to dance or get a drink with other
								patrons!
							</Text>
							<HStack className="my-2 justify-between items-center">
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
									<Text className="underline">Don't show this again</Text>
								</Pressable>
								<Button
                                    size='sm'
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
                                    className="rounded-full bg-light-300  dark:bg-light-700">
									<ButtonText
										className="text-light-800  dark:text-light-300"
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
    );
}

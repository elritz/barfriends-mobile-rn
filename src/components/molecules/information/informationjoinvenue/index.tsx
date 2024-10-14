import { Button, ButtonText } from "#/src/components/ui/button";
import { Text } from "#/src/components/ui/text";
import { VStack } from "#/src/components/ui/vstack";
import { Pressable } from "#/src/components/ui/pressable";
import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { TomorrowPreferencePermissionInitialState } from "#/src/constants/Preferences";
import { LOCAL_STORAGE_INFORMATION_JOIN_VENUE } from "#/src/constants/StorageConstants";
import { DefaultPreferenceToPermissionType } from "#/types/preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InformationJoinVenueReactiveVar } from "#/reactive";
import { uniqueId } from "lodash";
import { DateTime } from "luxon";
import { AnimatePresence } from "moti";

export default function InformationJoinVenue() {
  const rInformationJoinVenue = useReactiveVar(InformationJoinVenueReactiveVar);

  return (
    <Box>
      {rInformationJoinVenue?.canShowAgain &&
      DateTime.fromISO(String(rInformationJoinVenue?.dateToShowAgain)) <=
        DateTime.now() ? (
        <AnimatePresence key={uniqueId()}>
          <Box className="m-2 mt-4 p-3">
            <VStack space="sm">
              <Heading>Are you here! Want to socialize?</Heading>
              <Text>
                Signed up and you'll be able to join! Then chat, ask to dance or
                get a drink with other patrons!
              </Text>
              <HStack className="my-2 items-center justify-between">
                <Pressable
                  onPress={async () => {
                    await AsyncStorage.setItem(
                      LOCAL_STORAGE_INFORMATION_JOIN_VENUE,
                      JSON.stringify({
                        ...TomorrowPreferencePermissionInitialState,
                        numberOfTimesDismissed:
                          rInformationJoinVenue?.numberOfTimesDismissed
                            ? rInformationJoinVenue.numberOfTimesDismissed + 1
                            : 1,
                        canShowAgain: false,
                      } as DefaultPreferenceToPermissionType),
                    );
                    InformationJoinVenueReactiveVar({
                      ...TomorrowPreferencePermissionInitialState,
                    });
                  }}
                >
                  <Text className="underline">Don't show this again</Text>
                </Pressable>
                <Button
                  size="sm"
                  onPress={async () => {
                    await AsyncStorage.setItem(
                      LOCAL_STORAGE_INFORMATION_JOIN_VENUE,
                      JSON.stringify({
                        ...TomorrowPreferencePermissionInitialState,
                        numberOfTimesDismissed:
                          rInformationJoinVenue?.numberOfTimesDismissed
                            ? rInformationJoinVenue.numberOfTimesDismissed + 1
                            : 1,
                      } as DefaultPreferenceToPermissionType),
                    );
                    InformationJoinVenueReactiveVar({
                      ...TomorrowPreferencePermissionInitialState,
                    });
                  }}
                  className="rounded-full bg-light-300 dark:bg-light-700"
                >
                  <ButtonText className="text-light-800 dark:text-light-300">
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

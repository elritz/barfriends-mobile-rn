import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Divider } from "#/src/components/ui/divider";
import { Button } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import ForegroundLocationNextAskModal from "#/src/components/molecules/asks/permissions/foregroundlocationnextask";
import { LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION } from "#/src/constants/StorageConstants";
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from "#/types/preferences";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PermissionForegroundLocationReactiveVar,
  PreferenceForegroundLocationPermissionReactiveVar,
} from "#/reactive";
import { TomorrowPreferencePermissionInitialState } from "#/src/constants/Preferences";
import { useDisclose } from "#/src/util/hooks/useDisclose";
import { useRouter } from "expo-router";
import { uniqueId } from "lodash";
import { DateTime } from "luxon";
import { MotiView } from "moti";
import { Pressable } from "react-native";

export default function ForegroundLocationPermissionFullSection() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclose();
  const rPermissionLocationVar = useReactiveVar(
    PermissionForegroundLocationReactiveVar,
  );
  const rPreferenceForegroundLocationPermission = useReactiveVar(
    PreferenceForegroundLocationPermissionReactiveVar,
  );
  return (
    <>
      <ForegroundLocationNextAskModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      {rPreferenceForegroundLocationPermission?.canShowAgain &&
        DateTime.fromISO(
          String(rPreferenceForegroundLocationPermission?.dateToShowAgain),
        ) <= DateTime.now() && (
          <Box key={uniqueId()}>
            {!rPermissionLocationVar?.granted && (
              <MotiView
                from={{
                  opacity: 0,
                  scale: 1,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
              >
                <HStack className="w-[95%] justify-end">
                  <Pressable onPress={onOpen}>
                    <EvilIcons size={25} name="close" />
                  </Pressable>
                  <Pressable onPress={onOpen}>
                    <EvilIcons size={25} name={"close"} />
                  </Pressable>
                </HStack>
                <VStack space={"md"} className="my-3 items-center">
                  <Heading
                    style={{
                      width: "100%",
                    }}
                    className="text-md text-center"
                  >
                    Enable Location
                  </Heading>
                  <Text style={{ width: "100%" }} className="text-lg">
                    Using your current location will automatically show you
                    what's near you based on where you are.
                  </Text>
                  <Button
                    onPress={() =>
                      router.push({
                        pathname: "/(app)/permission/foregroundlocation",
                      })
                    }
                    size={"sm"}
                    className="mt-4 w-[85%]"
                  >
                    <Text className="text-lg font-bold">
                      Use Current Location
                    </Text>
                  </Button>
                  <Button
                    variant={"link"}
                    onPress={async () => {
                      const values = {
                        ...TomorrowPreferencePermissionInitialState,
                        numberOfTimesDismissed:
                          rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
                            ? rPreferenceForegroundLocationPermission.numberOfTimesDismissed +
                              1
                            : 1,
                      };
                      await AsyncStorage.setItem(
                        LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
                        JSON.stringify(
                          values as LocalStoragePreferenceAskForegroundLocationPermissionType,
                        ),
                      );
                      PreferenceForegroundLocationPermissionReactiveVar({
                        ...values,
                      });
                    }}
                    className="w-[90%]"
                  >
                    <Text className="self-center text-lg font-bold">
                      Not now
                    </Text>
                  </Button>
                </VStack>
              </MotiView>
            )}
            <Divider className="mt-1" />
          </Box>
        )}
    </>
  );
}

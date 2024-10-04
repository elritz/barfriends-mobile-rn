import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Pressable } from "#/src/components/ui/pressable";
import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Divider } from "#/src/components/ui/divider";
import { Button } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import BackgroundLocationNextAsk from "#/src/components/molecules/asks/permissions/backgroundlocationnextask";
import { TomorrowPreferencePermissionInitialState } from "#/src/constants/Preferences";
import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from "#/src/constants/StorageConstants";
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from "#/types/preferences";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PermissionBackgroundLocationReactiveVar,
  PreferenceBackgroundLocationPermissionReactiveVar,
} from "#/reactive";
import { useDisclose } from "#/src/util/hooks/useDisclose";
import { useRouter } from "expo-router";
import { uniqueId } from "lodash";
import { DateTime } from "luxon";
import { MotiView } from "moti";

export default function PreferenceBackgroundLocationPermissionFullSection() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclose();
  const rPermissionBackgroundLocationVar = useReactiveVar(
    PermissionBackgroundLocationReactiveVar,
  );
  const rPreferenceBackgroundLocationPermission = useReactiveVar(
    PreferenceBackgroundLocationPermissionReactiveVar,
  );

  return (
    <>
      <BackgroundLocationNextAsk />
      {rPreferenceBackgroundLocationPermission?.canShowAgain &&
        DateTime.fromISO(
          rPreferenceBackgroundLocationPermission?.dateToShowAgain.toString(),
        ) <= DateTime.now() && (
          <Box key={uniqueId()}>
            <Divider />
            {!rPermissionBackgroundLocationVar?.granted && (
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
                <VStack space={"sm"} className="my-3 items-center">
                  <HStack className="w-[95%] justify-end">
                    <Pressable onPress={onOpen}>
                      <EvilIcons size={25} name="close" />
                    </Pressable>
                  </HStack>
                  <Heading
                    style={{
                      width: "100%",
                    }}
                    className="text-md text-center"
                  >
                    Enable More Features
                  </Heading>
                  <Text className="text-md w-[90%] text-center">
                    Turn on "always allow" and find better deals at venues, be
                    notified when you can join, and when friends near you are
                    going out.
                  </Text>
                  <Button
                    onPress={() =>
                      router.push({
                        pathname: "/(app)/permission/backgroundlocation",
                      })
                    }
                    size={"sm"}
                    className="mt-4 w-[85%]"
                  >
                    <Text className="text-lg font-bold">
                      Use "always allow"
                    </Text>
                  </Button>
                  <Button
                    variant={"link"}
                    onPress={async () => {
                      await AsyncStorage.setItem(
                        LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
                        JSON.stringify({
                          ...TomorrowPreferencePermissionInitialState,
                          numberOfTimesDismissed:
                            rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
                              ? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed +
                                1
                              : 1,
                        } as LocalStoragePreferenceAskBackgroundLocationPermissionType),
                      );
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

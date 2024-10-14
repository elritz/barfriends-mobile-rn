import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Heading } from "#/src/components/ui/heading";
import { Divider } from "#/src/components/ui/divider";
import { Button, ButtonText } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import {
  PermissionNotificationReactiveVar,
  PreferencePermissionNotificationReactiveVar,
} from "#/reactive";
import { useRouter } from "expo-router";
import { uniqueId } from "lodash";
import { DateTime } from "luxon";
import { AnimatePresence, MotiView } from "moti";

export default function PreferenceNotificationPermission() {
  const router = useRouter();
  const rPreferencePermissionNotificationVar = useReactiveVar(
    PreferencePermissionNotificationReactiveVar,
  );
  const rPermissionNotificationVar = useReactiveVar(
    PermissionNotificationReactiveVar,
  );

  return (
    <AnimatePresence key={uniqueId()}>
      {!rPermissionNotificationVar?.granted &&
        rPreferencePermissionNotificationVar?.canShowAgain &&
        DateTime.fromISO(
          rPreferencePermissionNotificationVar?.dateToShowAgain.toString(),
        ) <= DateTime.now() && (
          <Box key={uniqueId()} className="bg-transparent">
            <MotiView
              from={{
                opacity: 0,
                scale: 1,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exitTransition={{
                type: "timing",
                duration: 3500,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
            >
              <VStack space={"md"} className="items-center">
                <Heading className="text-center text-xl font-black">
                  Stay Up to Date
                </Heading>
                <Text style={{ width: "90%" }} className="text-md text-center">
                  Turn on notification to hear about deals, events, messages,
                  friend requests.
                </Text>
                <Button
                  onPress={() =>
                    router.push({
                      pathname: "/(app)/permission/notifications",
                    })
                  }
                  className="w-[85%] rounded-md"
                >
                  <ButtonText className="text-lg font-bold">
                    Continue
                  </ButtonText>
                </Button>
                <Button
                  variant={"link"}
                  onPress={() => {
                    router.push({
                      pathname: "/(app)/modal/asks/notificationnextask",
                    });
                  }}
                  className="w-[90%]"
                >
                  <Text className="self-center text-lg font-bold">Not now</Text>
                </Button>
              </VStack>
            </MotiView>
            <Divider className="my-2" />
          </Box>
        )}
    </AnimatePresence>
  );
}

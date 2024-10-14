import { Pressable } from "#/src/components/ui/pressable";
import { HStack } from "#/src/components/ui/hstack";
import { Box } from "#/src/components/ui/box";
import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Modal } from "#/src/components/ui/modal";
import { Heading } from "#/src/components/ui/heading";
import { Divider } from "#/src/components/ui/divider";
import { Center } from "#/src/components/ui/center";
import { Button, ButtonText } from "#/src/components/ui/button";
import { useReactiveVar } from "@apollo/client";
import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from "#/src/constants/StorageConstants";
import { TomorrowPreferencePermissionInitialState } from "#/src/constants/Preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PreferenceBackgroundLocationPermissionReactiveVar,
  ThemeReactiveVar,
} from "#/reactive";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DefaultPreferenceToPermissionType } from "#/types/preferences";

const BackgroundLocationNextAsk = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const rPreferenceBackgroundLocationPermissionVar = useReactiveVar(
    PreferenceBackgroundLocationPermissionReactiveVar,
  );

  return (
    <Box style={{ flex: 1 }} className="mb-5 bg-transparent">
      <VStack space={"md"} className="my-5 justify-start">
        {/* <IllustrationDynamicLocation width={60} height={60} />
				<Divider width={'$2'} style={{ width: 50, marginVertical: 10 }} /> */}
        <Heading
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={3}
          className="px-2 text-xl font-black"
        >
          Background Location
        </Heading>
        <Text
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={3}
          className="px-2 text-xl"
        >
          By enabling background location, it helps you to go out, join bars and
          find events.
        </Text>
      </VStack>
      <HStack className="m-2 items-center justify-between">
        <Pressable
          onPress={async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                numberOfTimesDismissed:
                  rPreferenceBackgroundLocationPermissionVar?.numberOfTimesDismissed
                    ? rPreferenceBackgroundLocationPermissionVar.numberOfTimesDismissed +
                      1
                    : 1,
                canShowAgain: false,
              } as DefaultPreferenceToPermissionType),
            );
            PreferenceBackgroundLocationPermissionReactiveVar({
              ...TomorrowPreferencePermissionInitialState,
            });
          }}
        >
          <Text className="underline">Don't show this again</Text>
        </Pressable>
        <Button
          size="sm"
          // sx={{
          // 	_light: {
          // 		backgroundColor: '$light300',
          // 	},
          // 	_dark: {
          // 		backgroundColor: '$light700',
          // 	},
          // }}
          onPress={async () => {
            router.push({
              pathname: "/(app)/permission/backgroundlocation",
            });
          }}
          className="rounded-full"
        >
          <ButtonText className="text-white">Continue</ButtonText>
        </Button>
      </HStack>
      <Divider className="w-[95%] self-center" />
    </Box>
  );
};

export default BackgroundLocationNextAsk;

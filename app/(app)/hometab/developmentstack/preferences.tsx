import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Spinner } from "#/src/components/ui/spinner";
import { Pressable } from "#/src/components/ui/pressable";
import { HStack } from "#/src/components/ui/hstack";
import { Divider } from "#/src/components/ui/divider";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import {
  TomorrowPreferencePermissionInitialState,
  NowPreferencePermissionInitialState,
} from "#/src/constants/Preferences";
import {
  LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
} from "#/src/constants/StorageConstants";
import { Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PreferenceBackgroundLocationPermissionReactiveVar,
  PreferenceForegroundLocationPermissionReactiveVar,
  PreferencePermissionNotificationReactiveVar,
  ThemeReactiveVar,
} from "#/reactive";
import { useState } from "react";
import { ScrollView, Alert } from "react-native";

export default function Preferences() {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const [loading, setIsLoading] = useState(false);
  const ITEM_HEIGHT = 60;

  return (
    <ScrollView style={{ maxWidth: "100%" }}>
      <VStack className="mx-3 my-5">
        <Text className="text-center text-lg">
          These items are for reseting/updating delete the tokens that are saved
          during Barfriends app initial render. These preferences are also set
          when a user interacts with components that ask them to set the
          persisted state or dismiss the prompt.
        </Text>
      </VStack>
      {[
        {
          type: "token",
          title: "Notification Permission Preference",
          icon: "notifications",
          onPress: async () => {
            Alert.alert(
              "Reset Notifications",
              "To reset is to set back to default settings",
              [
                {
                  text: "Reset",
                  onPress: async () => {
                    setIsLoading(true);
                    await AsyncStorage.setItem(
                      LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
                      JSON.stringify(NowPreferencePermissionInitialState),
                    );
                    PreferencePermissionNotificationReactiveVar({
                      ...TomorrowPreferencePermissionInitialState,
                    });
                  },
                  style: "cancel",
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ],
            );
          },
        },
        {
          type: "token",
          title: "Foreground location Permission Ask Preference",
          icon: "location",
          onPress: async () => {
            Alert.alert(
              "Reset Foreground Location",
              "To reset is to set back to default settings",
              [
                {
                  text: "Reset",
                  onPress: async () => {
                    setIsLoading(true);
                    await AsyncStorage.setItem(
                      LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
                      JSON.stringify(NowPreferencePermissionInitialState),
                    );
                    PreferenceForegroundLocationPermissionReactiveVar({
                      ...TomorrowPreferencePermissionInitialState,
                    });
                  },
                  style: "cancel",
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ],
            );
          },
        },
        {
          type: "token",
          title: "Background location Permission Ask Preference",
          icon: "map-sharp",
          onPress: async () => {
            Alert.alert(
              "Reset Background Location",
              "To reset is to set back to default settings",
              [
                {
                  text: "Reset",
                  onPress: async () => {
                    setIsLoading(true);
                    await AsyncStorage.setItem(
                      LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
                      JSON.stringify(NowPreferencePermissionInitialState),
                    );
                    PreferenceBackgroundLocationPermissionReactiveVar({
                      ...TomorrowPreferencePermissionInitialState,
                    });
                  },
                  style: "cancel",
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ],
            );
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          },
        },
      ].map((item, index) => {
        return (
          <Pressable key={index} onPress={item.onPress}>
            <Divider />
            <HStack
              space={"md"}
              className={`h-[${ITEM_HEIGHT}px] mx-3 items-center justify-between`}
            >
              <HStack
                space={"md"}
                className="max-w-[80%] items-center justify-start"
              >
                <Ionicons
                  size={25}
                  name={item.icon as any}
                  color={
                    rTheme.colorScheme === "light"
                      ? rTheme.theme?.gluestack.tokens.colors.light900
                      : rTheme.theme?.gluestack.tokens.colors.light100
                  }
                />
                <Text numberOfLines={2} className="text-md max-w-[275px]">
                  {item.title}
                </Text>
              </HStack>
              <Box className="bg-transparent">
                {loading ? (
                  <Spinner />
                ) : (
                  <Feather
                    name={"trash-2"}
                    style={{ marginRight: 3 }}
                    size={20}
                    color={rTheme.theme?.gluestack.tokens.colors.error500}
                  />
                )}
              </Box>
            </HStack>
            <Divider />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

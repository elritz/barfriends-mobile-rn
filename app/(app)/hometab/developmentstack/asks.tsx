import { VStack } from "#/src/components/ui/vstack";
import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Button, ButtonText } from "#/src/components/ui/button";
import {
  NowPreferencePermissionInitialState,
  TomorrowPreferencePermissionInitialState,
} from "#/src/constants/Preferences";
import {
  LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
} from "#/src/constants/StorageConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PreferenceBackgroundLocationPermissionReactiveVar,
  PreferenceForegroundLocationPermissionReactiveVar,
} from "#/reactive";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
export default function Preferences() {
  const router = useRouter();

  const nextAskAction = [
    {
      title: "Foreground Location",
      actions: [
        {
          title: "Reset",
          color: "$error500",
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
              JSON.stringify(NowPreferencePermissionInitialState),
            );
          },
        },
        {
          title: "Show",
          color: "$green500",
          onPress: async () => {
            router.push({
              pathname: "/(app)/modal/asks/foregroundlocationnextask",
            });
          },
        },
        {
          title: "Dont show again",
          color: "$orange500",
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              }),
            );
            PreferenceForegroundLocationPermissionReactiveVar({
              ...TomorrowPreferencePermissionInitialState,
              canShowAgain: false,
            });
          },
        },
      ],
    },
    {
      title: "Background Location",
      actions: [
        {
          title: "Reset",
          color: "$error500",
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
              JSON.stringify(NowPreferencePermissionInitialState),
            );
          },
        },
        {
          title: "Show",
          color: "$green500",
          onPress: async () => {
            router.push({
              pathname: "/(app)/modal/asks/backgroundlocationnextask",
            });
          },
        },
        {
          title: "Dont show again",
          color: "$orange500",
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              }),
            );
            PreferenceBackgroundLocationPermissionReactiveVar({
              ...TomorrowPreferencePermissionInitialState,
              canShowAgain: false,
            });
          },
        },
      ],
    },
    {
      title: "Notification",
      actions: [
        {
          title: "Reset",
          color: "$error500",
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
              JSON.stringify(NowPreferencePermissionInitialState),
            );
          },
        },
        {
          title: "Show",
          color: "$green500",
          onPress: async () => {
            router.push({
              pathname: "/(app)/modal/asks/notificationnextask",
            });
          },
        },
        {
          title: "Dont show again",
          color: "$orange500",
          onPress: async () => {
            await AsyncStorage.setItem(
              LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
              JSON.stringify({
                ...TomorrowPreferencePermissionInitialState,
                canShowAgain: false,
              }),
            );
            PreferenceBackgroundLocationPermissionReactiveVar({
              ...TomorrowPreferencePermissionInitialState,
              canShowAgain: false,
            });
          },
        },
      ],
    },
  ];

  return (
    <ScrollView contentInset={{ top: 10 }}>
      <VStack>
        <VStack space={"lg"} className="mx-2 justify-between">
          {nextAskAction.map((item, index) => {
            return (
              <VStack key={index}>
                <Heading>{item.title}</Heading>
                <HStack space={"sm"} className="mt-2 justify-start">
                  {item.actions.map((action, index) => {
                    return (
                      <Button
                        key={index}
                        size="sm"
                        onPress={action.onPress}
                        className={` bg-${action.color} rounded-full`}
                      >
                        <ButtonText className="text-white">
                          {action.title}
                        </ButtonText>
                      </Button>
                    );
                  })}
                </HStack>
              </VStack>
            );
          })}
        </VStack>
      </VStack>
    </ScrollView>
  );
}

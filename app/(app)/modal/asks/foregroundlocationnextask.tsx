import { View } from "#/components/ui/view";
import { VStack } from "#/components/ui/vstack";
import { ScrollView } from "#/components/ui/scroll-view";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Divider } from "#/components/ui/divider";
import { Button, ButtonText } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { Badge, BadgeText } from "#/components/ui/badge";
import {
  DaysPreferencePermissionInitialState,
  HalfMonthPreferencePermissionInitialState,
  MonthsPreferencePermissionInitialState,
} from "#/constants/Preferences";
import { LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION } from "#/constants/StorageConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useReactiveVar } from "@apollo/client";
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from "#/ctypes/preferences";
import {
  PreferenceForegroundLocationPermissionReactiveVar,
  PreferencePermissionNotificationReactiveVar,
  ThemeReactiveVar,
} from "#/reactive";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import PermissionDetailItem from "#/components/screens/permissions/PermissionDetailItem";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Controller, useForm } from "react-hook-form";
import useTimer2 from "#/util/hooks/useTimer2";
import { DateTime } from "luxon";

export default () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const rPreferenceForegroundLocationPermission = useReactiveVar(
    PreferenceForegroundLocationPermissionReactiveVar,
  );
  const { start, seconds, started, finished } = useTimer2("0:4");

  const details = [
    {
      title: "How you’ll use this",
      detail: `You'll find venues and event deals around you.`,
      icon: (
        <Ionicons
          name="location-sharp"
          size={25}
          style={{
            marginHorizontal: 7,
          }}
          color={
            rTheme.colorScheme === "light"
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      ),
    },
    {
      title: "How we’ll use this",
      detail: `To notifiy you about event, friend and deal activities you'll be interested in.`,
      icon: (
        <MaterialCommunityIcons
          name="android-messages"
          size={25}
          style={{
            marginHorizontal: 7,
          }}
          color={
            rTheme.colorScheme === "light"
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      ),
    },
    {
      title: "Update these settings work",
      detail:
        "You can change your choices at any time in your app settings. If you allow access now, you wont have to again.",
      icon: (
        <Ionicons
          name="settings-sharp"
          size={25}
          style={{
            marginHorizontal: 7,
          }}
          color={
            rTheme.colorScheme === "light"
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      ),
    },
  ];

  const laterOptions = [
    {
      title: "Never again",
      value: 0,
    },
    {
      title: "1 Day",
      value: 1,
    },
    // {
    // 	title: '5 Days',
    // 	value: 5,
    // },
    {
      title: "10 Days",
      value: 10,
    },
    // {
    // 	title: '1 Month',
    // 	value: 30,
    // },
    {
      title: "3 Months",
      value: 90,
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: {
      value: 10,
    },
  });

  const onSubmit = (data) => {
    switch (data.value) {
      case 0:
        AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
          JSON.stringify({
            ...DaysPreferencePermissionInitialState,
            numberOfTimesDismissed:
              rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
                ? rPreferenceForegroundLocationPermission.numberOfTimesDismissed +
                  1
                : 1,
            canShowAgain: false,
          } as LocalStoragePreferenceAskForegroundLocationPermissionType),
        );
        PreferencePermissionNotificationReactiveVar({
          ...DaysPreferencePermissionInitialState,
          canShowAgain: false,
        });
      case 1:
        AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
          JSON.stringify({
            ...DaysPreferencePermissionInitialState,
            dateToShowAgain: DateTime.now().plus({ days: 2 }),
            numberOfTimesDismissed:
              rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
                ? rPreferenceForegroundLocationPermission.numberOfTimesDismissed +
                  1
                : 1,
            canShowAgain: false,
          } as LocalStoragePreferenceAskForegroundLocationPermissionType),
        );
        PreferencePermissionNotificationReactiveVar({
          ...DaysPreferencePermissionInitialState,
          canShowAgain: false,
        });
      case 5:
        AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
          JSON.stringify({
            ...DaysPreferencePermissionInitialState,
            numberOfTimesDismissed:
              rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
                ? rPreferenceForegroundLocationPermission.numberOfTimesDismissed +
                  1
                : 1,
            canShowAgain: true,
          } as LocalStoragePreferenceAskForegroundLocationPermissionType),
        );
        PreferencePermissionNotificationReactiveVar({
          ...DaysPreferencePermissionInitialState,
        });
      case 10:
        AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
          JSON.stringify({
            ...DaysPreferencePermissionInitialState,
            numberOfTimesDismissed:
              rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
                ? rPreferenceForegroundLocationPermission.numberOfTimesDismissed +
                  1
                : 1,
            canShowAgain: true,
          } as LocalStoragePreferenceAskForegroundLocationPermissionType),
        );
        PreferencePermissionNotificationReactiveVar({
          ...DaysPreferencePermissionInitialState,
          dateToShowAgain: DateTime.now().plus({ days: 10 }),
        });
      case 15:
        AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
          JSON.stringify({
            ...HalfMonthPreferencePermissionInitialState,
            numberOfTimesDismissed:
              rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
                ? rPreferenceForegroundLocationPermission.numberOfTimesDismissed +
                  1
                : 1,
            canShowAgain: true,
          } as LocalStoragePreferenceAskForegroundLocationPermissionType),
        );
        PreferencePermissionNotificationReactiveVar({
          ...DaysPreferencePermissionInitialState,
          dateToShowAgain: DateTime.now().plus({ days: 15 }),
        });
      case 30:
        AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
          JSON.stringify({
            ...MonthsPreferencePermissionInitialState,
            dateToShowAgain: DateTime.now().plus({ months: 1 }),
            numberOfTimesDismissed:
              rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
                ? rPreferenceForegroundLocationPermission.numberOfTimesDismissed +
                  1
                : 1,
            canShowAgain: true,
          } as LocalStoragePreferenceAskForegroundLocationPermissionType),
        );
        PreferencePermissionNotificationReactiveVar({
          ...DaysPreferencePermissionInitialState,
          dateToShowAgain: DateTime.now().plus({ months: 1 }),
        });
      case 90:
        AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
          JSON.stringify({
            ...MonthsPreferencePermissionInitialState,
            dateToShowAgain: DateTime.now().plus({ months: 3 }),
            numberOfTimesDismissed:
              rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
                ? rPreferenceForegroundLocationPermission.numberOfTimesDismissed +
                  1
                : 1,
            canShowAgain: true,
          } as LocalStoragePreferenceAskForegroundLocationPermissionType),
        );
        PreferencePermissionNotificationReactiveVar({
          ...DaysPreferencePermissionInitialState,
        });
    }

    start();
  };

  finished(() => {
    router.canGoBack()
      ? router.back()
      : router.push({
          pathname: "/(app)/hometab/venuefeed",
        });
  });

  return (
    <View className="flex-1">
      <View className="my-5 items-center justify-start">
        <Heading
          style={{
            textAlign: "center",
          }}
          allowFontScaling
          adjustsFontSizeToFit
          numberOfLines={3}
          className="px-2 text-3xl font-black"
        >
          Barfriends Foreground Location Reminder
        </Heading>
        <Divider style={{ width: 50, marginVertical: 10 }} className="w-2" />
      </View>
      <ScrollView>
        <View className="w-[undefined] flex-1 self-center bg-transparent">
          {details.map((item, index) => {
            return (
              <View key={item.title}>
                <PermissionDetailItem {...item} />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <VStack space={"md"} className="mx-2 mb-[undefined]">
        <Button
          size={"md"}
          onPress={() =>
            router.push({
              pathname: "/(app)/permission/foregroundlocation",
            })
          }
        >
          <ButtonText>Enable Foreground Location</ButtonText>
        </Button>
        <Divider className="w-[95%] self-center" />
        <Controller
          control={control}
          name="value"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <HStack space={"md"} className="justify-around">
                {laterOptions.map((item) => {
                  return (
                    <Pressable
                      key={item.value}
                      onPress={() => onChange(item.value)}
                    >
                      <Badge
                        size="lg"
                        variant="solid"
                        className={` ${value === item.value ? "dark:bg-primary-500" : "dark:bg-black"} ${value === item.value ? "bg-primary-500" : "bg-light-200"} rounded-lg p-2 px-3`}
                      >
                        <BadgeText
                          className={`font-medium capitalize ${value === item.value ? "dark:bg-primary-500" : "dark:bg-black"} ${value === item.value ? "bg-primary-500" : "bg-light-200"} `}
                        >
                          {item.title}
                        </BadgeText>
                      </Badge>
                    </Pressable>
                  );
                })}
              </HStack>
            );
          }}
        />
        <HStack className="mx-2 items-center justify-between">
          <>
            {!started ? (
              <Button
                size={"lg"}
                onPress={() =>
                  router.canGoBack()
                    ? router.back()
                    : router.push({
                        pathname: "/(app)/hometab/venuefeed",
                      })
                }
                variant={"link"}
              >
                <ButtonText className="font-medium">Close</ButtonText>
              </Button>
            ) : (
              <Button
                size={"lg"}
                onPress={() => router.back()}
                variant={"link"}
              >
                {started && (
                  <Box className="h-[24px] bg-transparent">
                    {
                      <ButtonText className="font-medium">
                        Auto close in {seconds}
                      </ButtonText>
                    }
                  </Box>
                )}
              </Button>
            )}
          </>
          <HStack space={"md"}>
            <Button
              isDisabled={isSubmitted}
              size={"md"}
              onPress={handleSubmit(onSubmit)}
              className="rounded-full bg-blue-600"
            >
              <ButtonText>
                {isSubmitted
                  ? "Updated"
                  : isSubmitting
                    ? "Updating"
                    : "Continue"}
              </ButtonText>
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </View>
  );
};

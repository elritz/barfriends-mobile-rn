import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { Button } from "#/components/ui/button";
// TODO: FX() Settings still needs to be done
import { useReactiveVar } from "@apollo/client";
import { SEARCH_BAR_HEIGHT } from "#/constants/ReactNavigationConstants";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { usePublicVenueQuery } from "#/graphql/generated";
import {
  CurrentLocationReactiveVar,
  SearchAreaReactiveVar,
  ThemeReactiveVar,
} from "#/reactive";
import { BlurView } from "expo-blur";
import {
  Stack,
  useLocalSearchParams,
  useRouter,
  router as xRouter,
} from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { VStack } from "#/components/ui/vstack";
import { Alert, Platform, Pressable, Share } from "react-native";
import * as Clipboard from "expo-clipboard";

export default () => {
  const NAVIGATION_BUTTON_HEIGHT = 38;
  const insets = useSafeAreaInsets();
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar);
  const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar);
  const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15;
  const h = insets.top + HEADER_HEIGHT;
  const router = useRouter();
  const params = useLocalSearchParams();
  const link = `https://barfriends.com/app/public/venue?profileid=${params.venueProfileId}`;
  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: "Barfriends | The nightlife app",
          url: Platform.OS === "ios" ? link : "",
        },
        {
          dialogTitle: "Join me on Barfriends",
          subject: "Invite to Barfriends",
        },
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const {
    data: venueData,
    loading,
    error,
  } = usePublicVenueQuery({
    skip: !params.username,

    fetchPolicy: "network-only",
    variables: {
      where: {
        IdentifiableInformation: {
          username: {
            equals: String(params.username),
          },
        },
      },
      currentLocationCoords: {
        latitude: rSearchAreaVar.useCurrentLocation
          ? Number(rCurrentLocationVar?.current?.coords.latitude)
          : Number(rSearchAreaVar?.searchArea.coords.latitude),
        longitude: rSearchAreaVar.useCurrentLocation
          ? Number(rCurrentLocationVar?.current?.coords.longitude)
          : Number(rSearchAreaVar?.searchArea.coords.longitude),
      },
    },
  });

  return (
    <Stack>
      <Stack.Screen
        name={"[username]"}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          presentation: "modal",
          animation: "fade",
          header: () => {
            return (
              <BlurView
                style={{
                  paddingTop: insets.top,
                  paddingBottom: 4,
                }}
                intensity={60}
                tint={rTheme.colorScheme === "light" ? "light" : "dark"}
              >
                <VStack>
                  <HStack
                    space="md"
                    className="items-center justify-between px-3"
                  >
                    <HStack
                      space={"md"}
                      className="flex-1 items-center justify-start"
                    >
                      <Button
                        variant="link"
                        onPress={() => {
                          xRouter.canGoBack()
                            ? router.back()
                            : router.replace({
                                pathname: "/(app)/hometab/venuefeed",
                              });
                        }}
                        className={` height-${NAVIGATION_BUTTON_HEIGHT} rounded-full`}
                      >
                        <Ionicons
                          name="chevron-back-outline"
                          size={30}
                          color={
                            rTheme.colorScheme === "light"
                              ? rTheme.theme?.gluestack.tokens.colors.light900
                              : rTheme.theme?.gluestack.tokens.colors.light100
                          }
                        />
                      </Button>
                    </HStack>
                    {loading ? null : (
                      <Text
                        className={` ${rTheme.colorScheme === "light" ? "text-light-900" : "text-light-100"} text-lg font-medium`}
                      >
                        {venueData?.publicVenue?.Venue?.name}
                      </Text>
                    )}
                    <HStack
                      space={"md"}
                      className="flex-1 items-center justify-end"
                    >
                      <Button
                        variant="link"
                        onPress={() => router.back()}
                        size="xs"
                        className={` height-${NAVIGATION_BUTTON_HEIGHT} rounded-full`}
                      >
                        <Entypo
                          name={"dots-three-vertical"}
                          size={23}
                          color={
                            rTheme.colorScheme === "light"
                              ? rTheme.theme?.gluestack.tokens.colors.light900
                              : rTheme.theme?.gluestack.tokens.colors.light100
                          }
                        />
                      </Button>
                      <Button
                        onPress={onShare}
                        variant={"solid"}
                        size={"lg"}
                        className="self-center bg-transparent"
                      >
                        <Ionicons
                          name={"share"}
                          size={23}
                          color={
                            rTheme.colorScheme === "light"
                              ? rTheme.theme?.gluestack.tokens.colors.light900
                              : rTheme.theme?.gluestack.tokens.colors.light100
                          }
                        />
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>
              </BlurView>
            );
          },
        }}
      />
    </Stack>
  );
};

import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Box } from "#/components/ui/box";
import ChevronBackArrow from "#/components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow";
import { SEARCH_BAR_HEIGHT } from "#/constants/ReactNavigationConstants";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useReactiveVar } from "@apollo/client";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";

export default () => {
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15;
  const h = insets.top + HEADER_HEIGHT;
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={"index"}
        options={{
          header: () => {
            return (
              <VStack
                style={{
                  paddingTop: insets.top,
                  backgroundColor:
                    rTheme.colorScheme === "light"
                      ? rTheme.theme?.gluestack.tokens.colors.light100
                      : rTheme.theme?.gluestack.tokens.colors.light900,
                }}
                className={` h-${h} justify-end bg-light-100 pb-2 pt-[undefined] dark:bg-light-900`}
              >
                <Box className="bg-transparent">
                  <Text
                    adjustsFontSizeToFit
                    className="leading-2xl text-center text-xl font-black capitalize"
                  >
                    {rAuthorizationVar?.ProfileType !== "GUEST" &&
                      rAuthorizationVar?.Profile?.IdentifiableInformation
                        ?.username}
                  </Text>
                  <Text
                    adjustsFontSizeToFit
                    className="leading-2xl text-center text-3xl font-black capitalize"
                  >
                    {String.fromCharCode(60)}
                    {process.env.EXPO_PUBLIC_NODE_ENV}{" "}
                    {String.fromCharCode(47, 62)}
                  </Text>
                </Box>
              </VStack>
            );
          },
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={"permissionmodals"}
        options={{
          headerBackground: () => <></>,
          headerShown: true,
          title: "Permissions",
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"preferences"}
        options={{
          headerBackground: () => <></>,
          headerShown: true,
          title: "Preferences",
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"asks"}
        options={{
          headerBackground: () => <></>,
          headerShown: true,
          title: "Asks",
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={"theme"}
        options={{
          headerBackground: () => <></>,
          headerShown: true,
          title: "Themes",
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
    </Stack>
  );
};

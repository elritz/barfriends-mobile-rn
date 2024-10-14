import { VStack } from "#/src/components/ui/vstack";
import { Pressable } from "#/src/components/ui/pressable";
import { Heading } from "#/src/components/ui/heading";
import { Divider } from "#/src/components/ui/divider";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";
import { useToggleTheme } from "#/src/util/hooks/theme/useToggleTheme";
import { router } from "expo-router";

export default () => {
  const rThemeVar = useReactiveVar(ThemeReactiveVar);
  const [toggleColorScheme] = useToggleTheme();

  const setTheme = async ({
    colorScheme,
  }: {
    colorScheme: "light" | "dark" | "system";
  }) => {
    await toggleColorScheme({ colorScheme });
    router.back();
  };

  return (
    <Box className="flex-1">
      <VStack space={"md"} className="w-full justify-around py-4">
        <Pressable
          onPress={async () => {
            await setTheme({ colorScheme: "light" });
          }}
          className="flex-row items-center justify-between px-4"
        >
          <Heading size={"md"} className="font-[normal]">
            Light
          </Heading>
          {rThemeVar.localStorageColorScheme === "light" && (
            <Ionicons
              size={30}
              color={rThemeVar.theme?.gluestack.tokens.colors.primary500}
              name={"checkmark-circle"}
            />
          )}
        </Pressable>
        <Divider />
        <Pressable
          onPress={async () => {
            await setTheme({ colorScheme: "dark" });
          }}
          className="flex-row items-center justify-between px-4"
        >
          <Heading className="text-md font-[normal]">Dark</Heading>
          {rThemeVar.localStorageColorScheme === "dark" && (
            <Ionicons
              size={30}
              color={rThemeVar.theme?.gluestack.tokens.colors.primary500}
              name={"checkmark-circle"}
            />
          )}
        </Pressable>
        <Divider />
        <Pressable
          onPress={async () => {
            await setTheme({ colorScheme: "system" });
          }}
          className="flex-row items-center justify-between px-4"
        >
          <Heading size={"md"} className="font-[normal]">
            System
          </Heading>
          {rThemeVar.localStorageColorScheme === "system" && (
            <Ionicons
              size={30}
              color={rThemeVar.theme?.gluestack.tokens.colors.primary500}
              name={"checkmark-circle"}
            />
          )}
        </Pressable>
        <Divider />
      </VStack>
    </Box>
  );
};

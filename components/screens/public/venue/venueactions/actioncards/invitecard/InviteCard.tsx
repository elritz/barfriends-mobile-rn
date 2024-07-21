import { Text } from "#/components/ui/text";
import { Box } from "#/components/ui/box";
import { VStack } from "#/components/ui/vstack";
import { Heading } from "#/components/ui/heading";
import { Button, ButtonText } from "#/components/ui/button";
import { useReactiveVar } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { PermissionContactsReactiveVar, ThemeReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";

export default function InviteCard() {
  const router = useRouter();
  const rPermissionContactsVar = useReactiveVar(PermissionContactsReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);
  return (
    <VStack className="mb-2 w-full flex-1 justify-between">
      <VStack className="mt-4 w-full items-start">
        <Box className="h-8 w-8 items-center justify-center rounded-md bg-red-400">
          <Ionicons
            name="people"
            size={23}
            color={
              rTheme.colorScheme === "light"
                ? rTheme.theme?.gluestack.tokens.colors.light900
                : rTheme.theme?.gluestack.tokens.colors.light100
            }
          />
        </Box>
        <Heading className="leading-xs mt-2 text-lg font-black uppercase">
          Share
        </Heading>
        <Text>Invite to barfriends and to this venue</Text>
      </VStack>
      <Button
        size={"lg"}
        onPress={() => {
          rPermissionContactsVar?.granted
            ? router.push({
                pathname: "/public/contacts",
              })
            : router.push({
                pathname: "/(app)/permission/contacts",
              });
        }}
        className="mt-2 w-full items-center justify-center rounded-xl"
      >
        <ButtonText>Invite</ButtonText>
      </Button>
    </VStack>
  );
}

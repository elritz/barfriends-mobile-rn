import { Center } from "#/src/components/ui/center";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";

export default function ProfilePhotoEmptyState() {
  const rTheme = useReactiveVar(ThemeReactiveVar);

  return (
    <Box className="h-[100%] justify-center">
      <Center>
        <Ionicons
          size={40}
          name={"person"}
          color={
            rTheme.colorScheme === "light"
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      </Center>
      <Box className="absolute -bottom-2 -right-3 items-center justify-center rounded-full border-2 border-light-700 dark:border-light-400">
        <Ionicons
          name="arrow-up-circle"
          color={
            rTheme.colorScheme === "light"
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
          size={26}
          style={{
            borderRadius: 50,
            zIndex: 10,
          }}
        />
      </Box>
    </Box>
  );
}

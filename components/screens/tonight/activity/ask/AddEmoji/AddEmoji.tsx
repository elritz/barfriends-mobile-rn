import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";

const AddEmoji = () => {
  const router = useRouter();
  const rTheme = useReactiveVar(ThemeReactiveVar);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(app)/modal/emojimood",
        })
      }
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
      }}
    >
      <Box className="h-16 w-16 items-center justify-center rounded-md bg-amber-500">
        <MaterialIcons
          size={30}
          name="emoji-emotions"
          color={
            rTheme.colorScheme === "light"
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      </Box>
      <Heading className="leading-lg mt-3 text-center text-lg font-black uppercase">
        Add an emojimood
      </Heading>
    </Pressable>
  );
};

export default AddEmoji;

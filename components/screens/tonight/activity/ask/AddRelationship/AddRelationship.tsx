import { Heading } from "#/components/ui/heading";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";

const AddRelationship = ({}) => {
  const rTheme = useReactiveVar(ThemeReactiveVar);

  return (
    <Box className="h-[200px] flex-1 items-center justify-center rounded-lg bg-light-100 dark:bg-light-800">
      <Box className="h-16 w-16 items-center justify-center rounded-md border-2 border-primary-500">
        <FontAwesome5
          name={"hand-holding-heart"}
          size={30}
          color={
            rTheme.colorScheme === "light"
              ? rTheme.theme?.gluestack.tokens.colors.light900
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      </Box>
      <Heading className="text-center text-lg font-black">
        Add relationship
      </Heading>
    </Box>
  );
};

export default AddRelationship;

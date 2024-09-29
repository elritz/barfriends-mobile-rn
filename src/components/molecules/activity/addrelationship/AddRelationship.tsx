import { Heading } from "#/src/components/ui/heading";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";
import { useRefreshDeviceManagerQuery } from "#/graphql/generated";
import { Color } from "#/src/util/helpers/color";
import useEmojimoodTextColor from "#/hooks/useTextContrast copy";

const AddRelationship: React.FC<ActivityCardProps> = ({
  isEmojimoodDynamic = false,
}) => {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const textColor = useEmojimoodTextColor({
    isEmojimoodDynamic: isEmojimoodDynamic,
  });
  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery({
    fetchPolicy: "cache-first",
  });

  if (
    rdmData?.refreshDeviceManager?.__typename === "AuthorizationDeviceProfile"
  ) {
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
        <Heading
          style={{
            color: textColor,
          }}
          className="text-center text-lg font-black uppercase"
        >
          Add relationship
        </Heading>
      </Box>
    );
  }
};

export default AddRelationship;

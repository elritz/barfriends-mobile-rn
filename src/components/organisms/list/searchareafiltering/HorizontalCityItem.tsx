import { Text } from "#/src/components/ui/text";
import { HStack } from "#/src/components/ui/hstack";
import { useReactiveVar } from "@apollo/client";
import { HorizontalCityItemProps } from "#/app/(app)/searcharea/_layout";
import { Feather } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";
import { useFormContext } from "react-hook-form";
import { ListRenderItemInfo } from "react-native";

const HorizontalCityItem = ({
  index,
  item,
}: ListRenderItemInfo<HorizontalCityItemProps>) => {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const formContext = useFormContext();
  const { watch } = formContext;

  return (
    <HStack
      key={index}
      className={` ${rTheme.colorScheme === "light" ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} mx-3 my-1 justify-between rounded-full px-4 py-4`}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode={"tail"}
        className="-mt-0.5 text-center text-lg font-medium"
      >
        {item.name}
      </Text>
      {watch("city") === item.name ? (
        <Feather
          name="check"
          size={26}
          color={rTheme.theme?.gluestack.tokens.colors.blueGray700}
        />
      ) : null}
    </HStack>
  );
};

export default HorizontalCityItem;

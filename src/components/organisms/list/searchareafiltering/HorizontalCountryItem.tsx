import { Text } from "#/src/components/ui/text";
import { HStack } from "#/src/components/ui/hstack";
import { useReactiveVar } from "@apollo/client";
import { HorizontalCountryItemProps } from "#/app/(app)/searcharea/_layout";
import { Feather } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";
import { useFormContext } from "react-hook-form";
import { ListRenderItemInfo } from "react-native";

const HorizontalCountryItem = ({
  index,
  item,
}: ListRenderItemInfo<HorizontalCountryItemProps>) => {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const formContext = useFormContext();
  const { watch } = formContext;

  return (
    <HStack
      key={index}
      className={` ${rTheme.colorScheme === "light" ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} `}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode={"tail"}
        className="-mt-0.5 text-center font-[medium] text-lg"
      >
        {item.flag}
        {` `}
        {item.name}
      </Text>
      {watch("country") === item.name ? (
        <Feather
          size={30}
          name="check"
          color={rTheme.theme?.gluestack.tokens.colors.blueGray700}
        />
      ) : null}
    </HStack>
  );
};

export default HorizontalCountryItem;

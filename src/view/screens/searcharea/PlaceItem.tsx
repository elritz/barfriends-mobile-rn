import { Button, ButtonText } from "#/src/components/ui/button";
import { Form } from "#/app/(app)/searcharea/_layout";
import { useFormContext } from "react-hook-form";

export default function PlaceItem({ item, onPress, index, itemType }) {
  const formContext = useFormContext<Form>();
  const { watch } = formContext;

  return (
    <Button
      key={index}
      isFocused
      onPress={() => onPress()}
      className={` ${watch("country.name") === item.name ? "bg-primary-500" : "bg-light-900"} h-[50px] w-full justify-start justify-between rounded-md px-2 py-0`}
    >
      <ButtonText
        numberOfLines={1}
        ellipsizeMode={"tail"}
        className="ml-3 mt-0.5 text-center text-xl font-medium"
      >
        {item?.flag}
        {` `}
        <ButtonText
          numberOfLines={1}
          ellipsizeMode={"tail"}
          className="text-lg font-medium"
        >
          {item.name}
        </ButtonText>
      </ButtonText>
    </Button>
  );
}

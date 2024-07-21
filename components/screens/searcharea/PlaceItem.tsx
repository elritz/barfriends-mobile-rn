import { Button, ButtonText } from "#/components/ui/button";
import { Form } from '#/app/(app)/searcharea/_layout'
import { useFormContext } from 'react-hook-form'

export default function PlaceItem({ item, onPress, index, itemType }) {
	const formContext = useFormContext<Form>()
	const { watch } = formContext

	return (
        <Button
            key={index}
            isFocused
            onPress={() => onPress()}
            className={` ${watch('country.name') === item.name ? "bg-primary-500" : "bg-light-900"} w-full h-[50px]  py-0  px-2  justify-between rounded-md justify-start `}>
            <ButtonText
                numberOfLines={1}
                ellipsizeMode={'tail'}
                className="mt-0.5 ml-3 text-center font-medium text-xl">
				{item?.flag}
				{` `}
				<ButtonText numberOfLines={1} ellipsizeMode={'tail'} className="font-medium text-lg">
					{item.name}
				</ButtonText>
			</ButtonText>
        </Button>
    );
}

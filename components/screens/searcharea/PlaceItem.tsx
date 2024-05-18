import { Form } from '#/app/(app)/searcharea/_layout'
import { Button, ButtonText } from '@gluestack-ui/themed'
import { useFormContext } from 'react-hook-form'

export default function PlaceItem({ item, onPress, index, itemType }) {
	const formContext = useFormContext<Form>()
	const { watch } = formContext

	return (
		<Button
			key={index}
			w={'$full'}
			isFocused
			sx={{
				h: 50,
				py: 0,
				px: 2,
				justifyContent: 'space-between',
				_light: {
					bg: watch('country.name') === item.name ? '$primary500' : '$light900',
				},
			}}
			rounded={'$md'}
			onPress={() => onPress()}
			justifyContent='flex-start'
		>
			<ButtonText
				mt={'$0.5'}
				ml={'$3'}
				textAlign={'center'}
				fontWeight={'$medium'}
				fontSize={'$xl'}
				numberOfLines={1}
				ellipsizeMode={'tail'}
			>
				{item?.flag}
				{` `}
				<ButtonText fontWeight={'$medium'} fontSize={'$lg'} numberOfLines={1} ellipsizeMode={'tail'}>
					{item.name}
				</ButtonText>
			</ButtonText>
		</Button>
	)
}

import { Form } from '@app/(app)/searcharea/_layout'
import { Button } from '@components/core'
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
					bg: watch('country.name') === item.name ? '$primary500' : '$dark50',
				},
			}}
			rounded={'$md'}
			onPress={() => onPress()}
			justifyContent='flex-start'
		>
			<Button.Text
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
				<Button.Text fontWeight={'$medium'} fontSize={'$lg'} numberOfLines={1} ellipsizeMode={'tail'}>
					{item.name}
				</Button.Text>
			</Button.Text>
		</Button>
	)
}

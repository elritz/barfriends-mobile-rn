import { useReactiveVar } from '@apollo/client'
import { HorizontalCityItemProps } from '@app/(app)/searcharea/_layout'
import { HStack, Text } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { useFormContext } from 'react-hook-form'
import { ListRenderItemInfo } from 'react-native'

const HorizontalCityItem = ({ index, item }: ListRenderItemInfo<HorizontalCityItemProps>) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const formContext = useFormContext()
	const { watch } = formContext

	return (
		<HStack
			key={index}
			bg={
				rTheme.colorScheme === 'light'
					? rTheme.theme?.gluestack.tokens.colors.light100
					: rTheme.theme?.gluestack.tokens.colors.dark100
			}
			py={'$4'}
			px={'$4'}
			my={'$1'}
			mx={'$3'}
			justifyContent={'space-between'}
			rounded={'$full'}
		>
			<Text
				sx={{
					mt: -0.5,
				}}
				textAlign={'center'}
				fontWeight={'$medium'}
				fontSize={'$lg'}
				numberOfLines={1}
				ellipsizeMode={'tail'}
			>
				{item.name}
			</Text>
			{watch('city') === item.name ? (
				<Feather name='check' size={26} color={rTheme.theme?.gluestack.tokens.colors.blueGray700} />
			) : null}
		</HStack>
	)
}

export default HorizontalCityItem

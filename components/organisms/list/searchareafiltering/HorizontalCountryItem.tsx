import { useReactiveVar } from '@apollo/client'
import { HorizontalCountryItemProps } from '@app/(app)/searcharea/_layout'
import { HStack, Text } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { useFormContext } from 'react-hook-form'
import { ListRenderItemInfo } from 'react-native'

const HorizontalCountryItem = ({ index, item }: ListRenderItemInfo<HorizontalCountryItemProps>) => {
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
		>
			<Text
				sx={{
					marginTop: -0.5,
				}}
				textAlign={'center'}
				fontWeight={'medium'}
				fontSize={'$lg'}
				numberOfLines={1}
				ellipsizeMode={'tail'}
			>
				{item.flag}
				{` `}
				{item.name}
			</Text>
			{watch('country') === item.name ? (
				<Feather size={30} name='check' color={rTheme.theme?.gluestack.tokens.colors.blueGray700} />
			) : null}
		</HStack>
	)
}

export default HorizontalCountryItem

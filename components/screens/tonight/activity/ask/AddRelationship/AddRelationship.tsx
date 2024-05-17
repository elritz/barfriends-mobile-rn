import { useReactiveVar } from '@apollo/client'
import { Box, Heading } from '@gluestack-ui/themed'
import { FontAwesome5 } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'

const AddRelationship = ({ }) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<Box
			flex={1}
			sx={{
				h: 200,
			}}
			justifyContent={'center'}
			alignItems={'center'}
			rounded='$lg'
			px={'$5'}
		>
			<Box
				rounded={'$md'}
				justifyContent={'center'}
				alignItems={'center'}
				h={'$16'} w={'$16'}
				borderColor={'$primary500'}
				borderWidth={'$2'}
			>
				<FontAwesome5
					name={'hand-holding-heart'}
					size={30}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
				/>
			</Box>
			<Heading fontWeight={'$black'} fontSize={'$lg'} textAlign='center'>
				Add relationship
			</Heading>
		</Box>
	)
}

export default AddRelationship

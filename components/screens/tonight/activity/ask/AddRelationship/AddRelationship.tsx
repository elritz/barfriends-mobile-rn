import { useReactiveVar } from '@apollo/client'
import { Box, Heading } from '@components/core'
import { FontAwesome5 } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'

const AddRelationship = ({}) => {
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
				bg={'$amber200'}
				sx={{
					h: 60,
					w: 60,
				}}
				borderColor={'$primary500'}
				borderWidth={'$2'}
			>
				<FontAwesome5
					name={'hand-holding-heart'}
					size={30}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
				/>
			</Box>
			<Heading
				mt={'$3'}
				textAlign={'center'}
				fontSize={'$lg'}
				fontWeight={'$bold'}
				lineHeight={'$lg'}
				textTransform='uppercase'
			>
				Add a relationship
			</Heading>
		</Box>
	)
}

export default AddRelationship

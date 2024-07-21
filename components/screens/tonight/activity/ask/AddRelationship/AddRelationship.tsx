import { Heading } from "#/components/ui/heading";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import { FontAwesome5 } from '@expo/vector-icons'
import { ThemeReactiveVar } from '#/reactive'

const AddRelationship = ({ }) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
        <Box className="flex-1 h-[200px] justify-center items-center rounded-lg px-5">
            <Box
                className="rounded-md justify-center items-center h-16 w-16 border-primary-500 border-2">
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
            <Heading className="font-black text-lg text-center">
				Add relationship
			</Heading>
        </Box>
    );
}

export default AddRelationship

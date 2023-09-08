import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Pressable } from '@components/core'
import { MaterialIcons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

const AddEmoji = () => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: '/(app)/modal/Emojimood',
				})
			}
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				paddingVertical: 10,
			}}
		>
			<Box bg='$amber400' h={'$16'} w={'$16'} alignItems='center' justifyContent='center'>
				<MaterialIcons
					size={30}
					name='emoji-emotions'
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
				fontWeight={'$black'}
				textTransform={'uppercase'}
				lineHeight={'$lg'}
			>
				Add an emojimood
			</Heading>
		</Pressable>
	)
}

export default AddEmoji

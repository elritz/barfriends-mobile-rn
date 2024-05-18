import { useReactiveVar } from '@apollo/client'
import { AddIcon, Button, Text, Input } from '@gluestack-ui/themed'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '#/reactive'
import { ScrollView } from 'react-native'

export default function NewConversation() {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	return (
		<>
			<Input
				variant='underlined'
				alignItems='center'
				px={'$4'}
				borderWidth={'$0'}
				sx={{
					borderBottomWidth: 1,
					borderTopWidth: 1,
					borderColor: '$gray300',
				}}
			>
				<Text color='$gray400' mr={'$2'} fontSize={'$sm'}>
					To:
				</Text>
				<Input.Input
					autoFocus
					borderWidth={'$0'}
					returnKeyType='default'
					underlineColorAndroid='transparent'
					keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
					sx={{}}
				/>
				{/* EditIcon is imported from 'lucide-react-native' */}
				<Button
					size='sm'
					// bg='transparent'
					px={'$0'}
					h={'$5'}
					w={'$5'}
					hitSlop={{
						top: 12,
						bottom: 12,
						left: 12,
						right: 12,
					}}
					rounded={'$full'}
					borderWidth={'$1'}
					borderColor='$primary500'
					onPress={() => {
						console.log('OPEN SECONDARY modal')
					}}
				>
					<Button.Icon as={AddIcon} />
				</Button>
			</Input>
			<ScrollView></ScrollView>
			<Text> NEW conversation</Text>
		</>
	)
}

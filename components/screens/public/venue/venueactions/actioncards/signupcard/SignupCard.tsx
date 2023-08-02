import { Heading, Text, Box, Button, VStack } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function SignupCard() {
	const router = useRouter()
	return (
		<VStack flexDirection={'column'} justifyContent={'space-around'} height={'100%'}>
			<VStack space={'md'} flex={1} justifyContent={'flex-start'}>
				<Heading
					textTransform={'uppercase'}
					lineHeight={'$xs'}
					fontSize={'$lg'}
					fontWeight={'$black'}
					mt={'$5'}
				>
					Sign up, Join, Socialize
				</Heading>
				<Text>Also focused on stuff</Text>
			</VStack>
			<Box bg={'transparent'}>
				<Button
					p={3.5}
					w={'$full'}
					onPress={() => {
						router.push({ pathname: '(app)/credential/personalcredentialstack/getstarted' })
					}}
					size={'lg'}
					bg={'$primary600'}
				>
					<Text>Continue</Text>
					<Feather name='arrow-right' size={20} color={'white'} />
				</Button>
			</Box>
		</VStack>
	)
}

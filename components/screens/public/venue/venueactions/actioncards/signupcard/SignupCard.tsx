import { Feather } from '@expo/vector-icons'
import { Heading, Text, Box, Button, VStack, ButtonText, HStack } from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

export default function SignupCard() {
	const router = useRouter()
	return (
		<VStack flex={1} justifyContent='space-between' flexDirection={'column'}>
			<View>
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
			</View>
			<HStack justifyContent='center'>
				<Button
					p={3.5}
					w={'$full'}
					size={'lg'}
					alignItems='center'
					justifyContent='center'
					rounded={'$full'}
					onPress={() => {
						router.push({ pathname: '/(credential)/personalcredentialstack/getstarted' })
					}}
				>
					<ButtonText>Continue</ButtonText>
					<Feather name='arrow-right' size={20} color={'white'} />
				</Button>
			</HStack>
		</VStack>
	)
}

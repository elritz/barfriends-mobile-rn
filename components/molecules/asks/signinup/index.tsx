import { Box, Button, ButtonText, Divider, Text, VStack } from '@gluestack-ui/themed'
import GetSignInUpText from '@util/helpers/data/SignupinText'
import { useRouter } from 'expo-router'

export default () => {
	const router = useRouter()
	const text = GetSignInUpText()

	return (
		<Box bg='$transparent'>
			<VStack flexDirection='column' justifyContent='center' space='md' alignItems='center'>
				<Text allowFontScaling fontWeight='$bold' alignSelf='center' textAlign='center'>
					{text[1].subTitle}
				</Text>
				<Button
					onPress={() =>
						router.push({
							pathname: '/(credential)/personalcredentialstack/getstarted',
						})
					}
					sx={{
						w: '95%',
					}}
					mt={'$4'}
					rounded={'$lg'}
				>
					<ButtonText textTransform='uppercase' fontWeight='$bold' fontSize={'$lg'}>
						Sign up
					</ButtonText>
				</Button>
				<Button
					variant='link'
					onPress={() =>
						router.push({
							pathname: '/(credential)/logincredentialstack/authenticator',
						})
					}
				>
					<Text textTransform='uppercase' fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
						Log in
					</Text>
				</Button>
			</VStack>
			<Divider my={'$5'} />
		</Box>
	)
}

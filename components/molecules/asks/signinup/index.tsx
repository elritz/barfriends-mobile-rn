import { Box, Button, Center, Divider, Text, VStack } from '@components/core'
import GetSignInUpText from '@util/helpers/data/SignupinText'
import { useRouter } from 'expo-router'

export default () => {
	const router = useRouter()
	const text = GetSignInUpText()

	return (
		<Box bg='$transparent'>
			<VStack flexDirection='column' justifyContent='center' space='md'>
				<Text allowFontScaling fontWeight='$bold' alignSelf='center' textAlign='center'>
					{text[1].subTitle}
				</Text>
				<Button
					onPress={() =>
						router.push({
							pathname: '(credential)/personalcredentialstack/getstarted',
						})
					}
					sx={{
						w: '95%',
					}}
					my={'$4'}
					rounded={'$md'}
				>
					<Button.Text textTransform='uppercase' fontWeight='$bold' fontSize={'$lg'}>
						Sign up
					</Button.Text>
				</Button>
				<Button
					variant='link'
					onPress={() =>
						router.push({
							pathname: '/(credential)/logincredentialstack/authenticator',
						})
					}
					sx={{
						w: '95%',
					}}
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

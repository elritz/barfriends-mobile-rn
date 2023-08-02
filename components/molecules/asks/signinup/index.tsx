import { Box, Button, Center, Divider, Text } from '@components/core'
import GetSignInUpText from '@helpers/data/SignupinText'
import { useRouter } from 'expo-router'

export default () => {
	const router = useRouter()
	const text = GetSignInUpText()

	return (
		<Box bg='$transparent'>
			<Center flexDirection='column'>
				<Text allowFontScaling fontWeight='$bold' alignSelf='center' textAlign='center'>
					{text[1].subTitle}
				</Text>
				<Button
					onPress={() =>
						router.push({
							pathname: '(app)/credential/personalcredentialstack/getstarted',
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
							pathname: '(app)/credential/logincredentialstack/authenticator',
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
			</Center>
			<Divider my={'$5'} />
		</Box>
	)
}

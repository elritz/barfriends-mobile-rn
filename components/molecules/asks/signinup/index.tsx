import { Box, Button, ButtonText, Divider, Text, VStack } from '@gluestack-ui/themed'
import GetSignInUpText from '#/util/helpers/data/SignupinText'
import { useRouter } from 'expo-router'

export default () => {
	const router = useRouter()
	const text = GetSignInUpText()

	return (
		<Box bg='$transparent'>
			<VStack flexDirection='column' space='md'>
				<Text allowFontScaling fontWeight='$bold' alignSelf='center' textAlign='center'>
					{text[1].subTitle}
				</Text>
				<VStack space={'md'} alignItems='center'>
					<Button
						onPress={() =>
							router.replace({
								pathname: '/(credential)/personalcredentialstack/getstarted',
							})
						}
						sx={{
							w: '85%',
						}}
						rounded={'$md'}
					>
						<ButtonText fontWeight='$bold' fontSize={'$lg'}>
							Sign up
						</ButtonText>
					</Button>
					<Button
						sx={{
							w: '90%',
						}}
						variant={'link'}
						onPress={() =>
							router.push({
								pathname: '/(credential)/logincredentialstack/authenticator',
							})
						}
					>
						<Text fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
							Log in
						</Text>
					</Button>
				</VStack>
			</VStack>
			<Divider my={'$5'} />
		</Box>
	)
}

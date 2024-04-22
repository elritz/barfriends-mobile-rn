import DeviceManagerProfiles from '@components/organisms/list/DeviceManagerProfiles'
import { VStack, Text, Button, Pressable, Heading, ButtonText, Divider } from '@gluestack-ui/themed'
import GetSignInUpText from '@util/helpers/data/SignupinText'
import { router, useRouter } from 'expo-router'

const text = GetSignInUpText()

type Props = {
	signupTextId?: number
}
export default (props: Props) => {

	const _pressToLogin = () => {
		router.push({
			pathname: '/(credential)/logincredentialstack/authenticator',
		})
	}
	const _pressToSignup = () => {
		router.push({
			pathname: '/(credential)/personalcredentialstack/getstarted',
		})
	}

	return (
		<VStack space='lg'>
			<VStack alignItems='center'>
				<Heading
					numberOfLines={3}
					ellipsizeMode='tail'
					adjustsFontSizeToFit
					minimumFontScale={0.5}
					pb={2}
					w={265}
					alignSelf='center'
					textAlign='center'
					textTransform='uppercase'
					fontWeight={'$black'}
					fontSize={'$xl'}
				>
					{text[props.signupTextId || 1].title}
				</Heading>
				<Text
					allowFontScaling
					fontWeight='$bold'
					textAlign={'center'}
					alignSelf={'center'}
					fontSize={'$lg'}
				>
					{/* {text[props.signupTextId ?? 1].subTitle} */}
					Cool slogans here
				</Text>
				<Text fontSize={'$sm'} color='$coolGray500' fontWeight='$bold'>
					2 min
				</Text>
			</VStack>
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
			<DeviceManagerProfiles />
		</VStack>
	)
}

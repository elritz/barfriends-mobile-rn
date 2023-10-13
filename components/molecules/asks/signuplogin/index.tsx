import DeviceManagerProfiles from '@components/organisms/list/DeviceManagerProfiles'
import { VStack, Text, Button, Pressable, Heading, Box, ButtonText } from '@gluestack-ui/themed'
import GetSignInUpText from '@util/helpers/data/SignupinText'
import { useRouter } from 'expo-router'

const text = GetSignInUpText()

type Props = {
	signupTextId?: number
}
export default (props: Props) => {
	const router = useRouter()

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
			<VStack w={'$full'} alignItems={'center'} space={'md'}>
				<Button
					onPress={_pressToSignup}
					sx={{
						w: '95%',
					}}
					rounded={'$md'}
				>
					<ButtonText
						textTransform='uppercase'
						fontWeight='$bold'
						fontSize={'$lg'}
						// _text={{ textTransform: 'uppercase', fontWeight: '700', fontSize: 'lg' }}
					>
						Sign up
					</ButtonText>
				</Button>
				<Pressable onPress={_pressToLogin}>
					<Text textTransform='uppercase' fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
						Log in
					</Text>
				</Pressable>
			</VStack>
			<DeviceManagerProfiles />
		</VStack>
	)
}

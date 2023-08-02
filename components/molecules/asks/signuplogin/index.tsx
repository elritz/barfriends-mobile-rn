import { VStack, Text, Button, Center, Pressable, Heading, Box } from '@components/core'
import DeviceManagerProfiles from '@components/organisms/list/DeviceManagerProfiles'
import GetSignInUpText from '@helpers/data/SignupinText'
import { useRouter } from 'expo-router'

const text = GetSignInUpText()

type Props = {
	signupTextId?: number
}
export default (props: Props) => {
	const router = useRouter()

	const _pressToLogin = () => {
		router.push({
			pathname: '(app)/credential/logincredentialstack/authenticator',
		})
	}

	return (
		<VStack space='lg'>
			<Box bg='$transparent'>
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
					{text[props.signupTextId ?? 1].title}
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
			</Box>
			<VStack w={'$full'} alignItems={'center'} space={'lg'}>
				<Button
					onPress={() =>
						router.push({
							pathname: '(app)/credential/personalcredentialstack',
						})
					}
					sx={{
						w: '95%',
					}}
					rounded={'$md'}
				>
					<Text
						textTransform='uppercase'
						fontWeight='$bold'
						fontSize={'$lg'}
						// _text={{ textTransform: 'uppercase', fontWeight: '700', fontSize: 'lg' }}
					>
						Sign up
					</Text>
				</Button>
				<Pressable w={'100%'} onPress={_pressToLogin}>
					<Text textTransform='uppercase' fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
						Log in
					</Text>
				</Pressable>
			</VStack>
			<DeviceManagerProfiles />
		</VStack>
	)
}

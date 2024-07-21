import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Divider } from "#/components/ui/divider";
import { Button, ButtonText } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import GetSignInUpText from '#/util/helpers/data/SignupinText'
import { useRouter } from 'expo-router'

export default () => {
	const router = useRouter()
	const text = GetSignInUpText()

	return (
        <Box className="bg-transparent">
            <VStack space='md' className="flex-column">
				<Text allowFontScaling className="font-bold self-center text-center">
					{text[1].subTitle}
				</Text>
				<VStack space={'md'} className="items-center">
					<Button
                        onPress={() =>
							router.replace({
								pathname: '/(credential)/personalcredentialstack/getstarted',
							})
						}
                        className="w-[85%] rounded-md">
						<ButtonText className="font-bold text-lg">
							Sign up
						</ButtonText>
					</Button>
					<Button
						variant={'link'}
						onPress={() =>
							router.push({
								pathname: '/(credential)/logincredentialstack/authenticator',
							})
						}
						className="w-[90%]"
					>
						<Text className="text-lg font-bold self-center">
							Log in
						</Text>
					</Button>
				</VStack>
			</VStack>
            <Divider className="my-5" />
        </Box>
    );
}

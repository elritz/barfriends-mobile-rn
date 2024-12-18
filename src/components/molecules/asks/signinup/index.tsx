import {useRouter} from 'expo-router'

import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Divider} from '#/src/components/ui/divider'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import GetSignInUpText from '#/src/util/helpers/data/SignupinText'

const Signup = () => {
  const router = useRouter()
  const text = GetSignInUpText()

  return (
    <Box className="bg-transparent">
      <VStack space="md" className="flex-column">
        <Text allowFontScaling className="self-center text-center font-bold">
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
            <ButtonText className="text-lg font-bold">Sign up</ButtonText>
          </Button>
          <Button
            variant={'link'}
            onPress={() =>
              router.push({
                pathname: '/(credential)/logincredentialstack/authenticator',
              })
            }
            className="w-[90%]">
            <Text className="self-center text-lg font-bold">Log in</Text>
          </Button>
        </VStack>
      </VStack>
      <Divider className="my-5" />
    </Box>
  )
}

export default Signup

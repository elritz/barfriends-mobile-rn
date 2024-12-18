import {router} from 'expo-router'

import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

const SignupLogin = () => {
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
    <VStack space="lg">
      <VStack className="items-center">
        <Heading
          numberOfLines={3}
          ellipsizeMode="tail"
          adjustsFontSizeToFit
          minimumFontScale={0.5}
          className="w-[265px] self-center pb-2 text-center text-xl font-black uppercase">
          Ready steady party.
        </Heading>
        <Text
          allowFontScaling
          className="self-center text-center text-lg font-bold">
          Cool slogans here
        </Text>
        <Text className="text-sm font-bold text-coolGray-500">2 min</Text>
      </VStack>
      <VStack space={'md'} className="items-center">
        <Button onPress={_pressToSignup} className="w-[85%] rounded-md">
          <ButtonText className="text-lg font-bold">Sign up</ButtonText>
        </Button>
        <Button variant={'link'} onPress={_pressToLogin} className="w-[90%]">
          <Text className="self-center text-lg font-bold">Log in</Text>
        </Button>
      </VStack>
    </VStack>
  )
}

export default SignupLogin

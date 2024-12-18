import {View} from 'react-native'
import {useRouter} from 'expo-router'
import {Feather} from '@expo/vector-icons'

import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

export default function SignupCard() {
  const router = useRouter()
  return (
    <VStack className="flex-column flex-1 justify-between">
      <View>
        <Heading className="leading-xs mt-5 text-lg font-black uppercase">
          Sign up, Join, Socialize
        </Heading>
        <Text>Also focused on stuff</Text>
      </View>
      <HStack className="justify-center">
        <Button
          size={'lg'}
          onPress={() => {
            router.push({
              pathname: '/(credential)/personalcredentialstack/getstarted',
            })
          }}
          className="w-full items-center justify-center rounded-full p-3.5">
          <ButtonText>Continue</ButtonText>
          <Feather name="arrow-right" size={20} color={'white'} />
        </Button>
      </HStack>
    </VStack>
  )
}

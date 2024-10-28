import {useRouter} from 'expo-router'

import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {VStack} from '#/src/components/ui/vstack'

export default function AskForegroundLocationPermission() {
  const router = useRouter()

  return (
    <VStack className="flex-column h-[100%] justify-around">
      <Heading className="leading-xs mt-5 flex-1 text-lg font-black uppercase">
        See how close you are?
      </Heading>
      <Button
        size={'lg'}
        onPress={() =>
          router.push({
            pathname: '/(app)/permission/foregroundlocation',
          })
        }>
        <ButtonText>Continue</ButtonText>
      </Button>
    </VStack>
  )
}

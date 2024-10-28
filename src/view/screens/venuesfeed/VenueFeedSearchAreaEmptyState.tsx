import {useRouter} from 'expo-router'

import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import PermissionButtonSearchAreaLocation from './PermissionButtonSearchAreaLocation'

export default function VenueFeedSearchAreaEmptyState() {
  const router = useRouter()

  const _pressToSearchArea = () => {
    router.push({
      pathname: '/(app)/searcharea/',
    })
  }

  return (
    <Box className="mx-2 rounded-md p-5">
      <Heading
        numberOfLines={3}
        ellipsizeMode="tail"
        adjustsFontSizeToFit
        minimumFontScale={0.5}
        className="w-[265px] self-center pb-2 text-center text-xl font-black uppercase">
        Where are your venues?
      </Heading>
      <Text className="text-lg">
        Finding venues using your device location, or find venues with Search
        Area filtering.
      </Text>
      <VStack space={'lg'} className="w-full items-center">
        <PermissionButtonSearchAreaLocation />
        <Pressable
          accessibilityRole="button"
          onPress={_pressToSearchArea}
          className="w-[100%]">
          <Text className="self-center text-lg font-bold uppercase">
            Find area
          </Text>
        </Pressable>
      </VStack>
    </Box>
  )
}

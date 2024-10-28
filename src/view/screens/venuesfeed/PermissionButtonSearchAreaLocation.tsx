import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'

import {PermissionsReactiveVar} from '#/reactive'
import {Button, ButtonText} from '#/src/components/ui/button'

export default function PermissionButtonSearchAreaLocation() {
  const route = useRouter()
  const rPerm = useReactiveVar(PermissionsReactiveVar)

  const _press = async () => {
    rPerm?.locationForeground.granted
      ? route.push({
          pathname: '/(app)/searcharea/',
        })
      : route.push({
          pathname: '/(app)/permission/foregroundlocation',
        })
  }

  return (
    <Button
      onPress={async () => await _press()}
      className="mt-4 w-[95%] rounded-md">
      <ButtonText className="text-lg font-bold uppercase">CONTINUE</ButtonText>
    </Button>
  )
}

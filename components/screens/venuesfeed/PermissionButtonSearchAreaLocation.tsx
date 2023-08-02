import { useReactiveVar } from '@apollo/client'
import { Button } from '@components/core'
import { PermissionForegroundLocationReactiveVar } from '@reactive'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { useRouter } from 'expo-router'

export default function PermissionButtonSearchAreaLocation() {
	const route = useRouter()
	const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

	const _press = async () => {
		rPermissionLocationVar?.granted
			? await useSetSearchAreaWithLocation()
			: route.push({
					pathname: '(app)/permission/foregroundlocation',
			  })
	}

	return (
		<Button w={'100%'} size={'lg'} onPress={async () => await _press()} mt={'$4'}>
			<Button.Text fontSize={'$lg'} fontWeight={'$bold'}>
				CONTINUE
			</Button.Text>
		</Button>
	)
}

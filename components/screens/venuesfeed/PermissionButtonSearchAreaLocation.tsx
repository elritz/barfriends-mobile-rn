import { useReactiveVar } from '@apollo/client'
import { Button, ButtonText } from '@gluestack-ui/themed'
import { PermissionForegroundLocationReactiveVar } from '#/reactive'
import { useRouter } from 'expo-router'

export default function PermissionButtonSearchAreaLocation() {
	const route = useRouter()
	const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

	const _press = async () => {
		rPermissionLocationVar?.granted
			? route.push({
					pathname: '/(app)/searcharea/',
			  })
			: route.push({
					pathname: '/(app)/permission/foregroundlocation',
			  })
	}

	return (
		<Button w={'95%'} onPress={async () => await _press()} mt={'$4'} rounded={'$md'}>
			<ButtonText textTransform='uppercase' fontWeight='$bold' fontSize={'$lg'}>
				CONTINUE
			</ButtonText>
		</Button>
	)
}

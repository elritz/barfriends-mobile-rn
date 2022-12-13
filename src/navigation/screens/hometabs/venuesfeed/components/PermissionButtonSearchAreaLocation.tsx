import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { PermissionForegroundLocationReactiveVar } from '@reactive'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { Button } from 'native-base'

export default function PermissionButtonSearchAreaLocation() {
	const navigation = useNavigation()
	const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

	const handleLocationPermissionNavigation = async () => {
		navigation.navigate('PermissionNavigator', {
			screen: 'ForegroundLocationPermissionSearchAreaScreen',
		})
	}

	return (
		<Button
			variant='solid'
			onPress={async () =>
				rPermissionLocationVar?.granted
					? await useSetSearchAreaWithLocation()
					: await handleLocationPermissionNavigation()
			}
			mt={15}
			w={'85%'}
			_text={{
				fontSize: 'lg',
				fontWeight: 'bold',
			}}
		>
			Continue
		</Button>
	)
}
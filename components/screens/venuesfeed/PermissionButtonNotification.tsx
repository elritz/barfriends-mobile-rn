import { useReactiveVar } from '@apollo/client'
import { Button } from '@components/core'
import { PermissionNotificationReactiveVar } from '@reactive'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { useRouter } from 'expo-router'

export default function SearchAreaLocationPermissionButton() {
	const router = useRouter()
	const rPermissionNotificationVar = useReactiveVar(PermissionNotificationReactiveVar)

	const _press = async () => {
		rPermissionNotificationVar?.granted
			? await useSetSearchAreaWithLocation()
			: router.push({
					pathname: '(app)/permission/notifications',
			  })
	}

	return (
		<Button variant='solid' onPress={async () => _press()} sx={{ mt: 15, w: '85%' }}>
			<Button.Text>Continue</Button.Text>
		</Button>
	)
}

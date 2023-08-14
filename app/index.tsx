import { useReactiveVar } from '@apollo/client'
import Auth from '@components/layouts/Auth'
import Theme from '@components/layouts/Theme'
import { AuthorizationReactiveVar } from '@reactive'
import { Slot } from 'expo-router'

export default function index() {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	if (!rAuthorizationVar) {
		return (
			<Theme>
				<Slot initialRouteName='(app)/error' />
			</Theme>
		)
	}

	return (
		<Theme>
			<Slot initialRouteName='(app)/error' />
		</Theme>
	)
}

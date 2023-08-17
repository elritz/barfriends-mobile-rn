import Auth from '@components/layouts/Auth'
import Theme from '@components/layouts/Theme'
import { Stack } from 'expo-router'

export default function _layout() {
	return (
		<Auth>
			<Theme>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name={'index'} />
					<Stack.Screen name={'network'} />
				</Stack>
			</Theme>
		</Auth>
	)
}

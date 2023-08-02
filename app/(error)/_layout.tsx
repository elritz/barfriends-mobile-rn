import Auth from '@components/layouts/Auth'
import { Stack } from 'expo-router'

export default function _layout() {
	return (
		<Auth>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name={'index'} />
			</Stack>
		</Auth>
	)
}

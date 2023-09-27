import { Stack } from 'expo-router'

export default function _layout() {
	return (
		<Stack
			screenOptions={{
				// headerTransparent: true,
				headerShown: false,
			}}
		>
			<Stack.Screen name={'index'} />
		</Stack>
	)
}

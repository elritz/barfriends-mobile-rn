// TODO: FX() Settings still needs to be done
import { useReactiveVar } from '@apollo/client'
import { ThemeReactiveVar } from '@reactive'
import { Stack } from 'expo-router'

export default () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name={'[profileid]'} />
		</Stack>
	)
}

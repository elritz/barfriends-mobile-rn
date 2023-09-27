// TODO: FX() Settings still needs to be done
import { useReactiveVar } from '@apollo/client'
import { Button, HStack } from '@components/core'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { Stack, useRouter, router } from 'expo-router'

export default () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	// const router = useRouter()

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

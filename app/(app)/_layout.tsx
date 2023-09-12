import { useReactiveVar } from '@apollo/client'
import { VStack } from '@components/core'
import SearchInput from '@components/molecules/search/searchinput/SearchInput'
import { ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import { Stack, useSegments } from 'expo-router'

export default () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const segments = useSegments()

	return (
		<Stack
			initialRouteName='hometab'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={'hometab'}
				options={{
					animation: 'fade',
				}}
			/>
			<Stack.Screen
				name={'explore'}
				options={{
					animation: 'fade',
				}}
			/>
			<Stack.Screen
				name={'modal'}
				options={{
					presentation: 'modal',
					animation: 'fade',
				}}
			/>
			<Stack.Screen name={'public'} />
			<Stack.Screen
				name={'searcharea'}
				options={{
					animation: 'fade',
				}}
			/>
			<Stack.Screen name={'permission'} options={{ presentation: 'modal' }} />
			<Stack.Screen name={'settings'} options={{ presentation: 'fullScreenModal' }} />
		</Stack>
	)
}

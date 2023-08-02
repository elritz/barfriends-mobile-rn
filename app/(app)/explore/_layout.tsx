import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Stack, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function _layout() {
	const router = useRouter()
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT

	return (
		<Stack
			initialRouteName='index'
			screenOptions={{
				headerShown: false,
				animation: 'fade',
			}}
		>
			<Stack.Screen options={{}} name={'index'} />
			<Stack.Screen
				name={'searchtext'}
				options={{
					animation: 'fade',
				}}
			/>
			<Stack.Screen
				name={'searchresults'}
				options={{
					animation: 'fade',
				}}
			/>
		</Stack>
	)
}

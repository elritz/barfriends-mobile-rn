import { useReactiveVar } from '@apollo/client'
import { Box, HStack, Icon, Text, VStack } from '@components/core'
import { Entypo } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import useContentInsets from '@util/hooks/useContentInsets'
import { BlurView } from 'expo-blur'
import { Stack } from 'expo-router'

export default function _layout() {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const insets = useContentInsets()
	console.log('🚀 ~ file: _layout.tsx:22 ~ _layout ~ insets.top :', insets.top)
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

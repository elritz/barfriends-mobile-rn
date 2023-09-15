import { Button, Text } from '@components/core'
import { Stack, router } from 'expo-router'

export default () => {
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
				name={'newconversation'}
				options={{
					headerShown: true,
					animation: 'fade_from_bottom',
					presentation: 'modal',
					headerTitle: () => (
						<Text fontWeight='$bold' fontSize={'$md'}>
							New Message
						</Text>
					),
					headerRight: () => {
						return (
							<Button
								onPress={() =>
									router.canGoBack() ? router.back() : router.push({ pathname: '/(app)/hometab/venuefeed' })
								}
								size='md'
								variant='link'
							>
								<Button.Text>Cancel</Button.Text>
							</Button>
						)
					},
				}}
			/>
			<Stack.Screen
				name={'friendslist'}
				options={{
					headerShown: false,
					presentation: 'modal',
					animation: 'slide_from_right',
				}}
			/>
			<Stack.Screen
				name={'conversation'}
				options={{
					headerShown: false,
					animation: 'slide_from_right',
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

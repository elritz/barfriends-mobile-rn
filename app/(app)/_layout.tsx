
import ChevronBackArrow from '#/components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Button, ButtonText, Heading, Text, Box } from '@gluestack-ui/themed'
import { Stack, router } from 'expo-router'

export default () => {
	return (
		<Stack
			initialRouteName='hometab'
			screenOptions={{
				headerTransparent: true,
				animation: 'fade',
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={'hometab'}
				options={{
					animation: 'default',
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
									router.canGoBack()
										? router.back()
										: router.push({ pathname: '/(app)/hometab/venuefeed' })
								}
								size='md'
								variant='link'
							>
								<Text>Cancel</Text>
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
			/>
			<Stack.Screen
				name={'animatedconversation'}
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
					animation: 'default',
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

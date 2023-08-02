import { useReactiveVar } from '@apollo/client'
import { VStack } from '@components/core'
import Auth from '@components/layouts/Auth'
import SearchInput from '@components/molecules/search/searchinput/SearchInput'
import { ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import { Stack, useSegments } from 'expo-router'

export default () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const segments = useSegments()

	return (
		<Auth>
			<Stack
				initialRouteName='hometab/venuefeed'
				screenOptions={{
					headerShown:
						segments.includes('messagestack') ||
						segments.includes('venuefeed') ||
						segments.includes('searcharea') ||
						segments.includes('tonight') ||
						segments.includes('explore'),
					headerTransparent: true,
					header: () => {
						return (
							<BlurView
								style={{
									backgroundColor: segments.includes('tonight')
										? 'transparent'
										: rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light100
										: rTheme.theme?.gluestack.tokens.colors.dark50,
								}}
								intensity={segments.includes('tonight') ? 70 : 0}
								tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							>
								<VStack
									justifyContent={'flex-start'}
									sx={{
										_light: { bg: !segments.includes('tonight') ? '$light100' : 'transparent' },
										_dark: { bg: !segments.includes('tonight') ? '$dark50' : 'transparent' },
									}}
								>
									<SearchInput />
								</VStack>
							</BlurView>
						)
					},
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
				<Stack.Screen name={'modal'} options={{ animation: 'fade' }} />
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
		</Auth>
	)
}

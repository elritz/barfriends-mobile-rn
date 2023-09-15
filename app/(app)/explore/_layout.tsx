import { useReactiveVar } from '@apollo/client'
import { VStack } from '@components/core'
import SearchInputResults from '@components/molecules/search/searchinput/SearchInputResults'
import SearchInputText from '@components/molecules/search/searchinput/SearchInputText'
import { ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import { Stack } from 'expo-router'

export default function _layout() {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<Stack
			initialRouteName='index'
			screenOptions={{
				// headerShown: false,
				animation: 'fade',
				gestureDirection: 'horizontal',
			}}
		>
			<Stack.Screen options={{}} name={'index'} />
			<Stack.Screen
				name={'searchtext'}
				options={{
					headerShown: true,
					headerTransparent: true,
					animation: 'fade',
					header: () => {
						return (
							<BlurView
								style={{
									backgroundColor:
										rTheme.colorScheme === 'light'
											? rTheme.theme?.gluestack.tokens.colors.light100
											: rTheme.theme?.gluestack.tokens.colors.dark50,
								}}
								intensity={70}
								tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							>
								<VStack
									justifyContent={'flex-start'}
									sx={{
										_light: { bg: '$light100' },
										_dark: { bg: '$dark50' },
									}}
								>
									<SearchInputText />
								</VStack>
							</BlurView>
						)
					},
				}}
			/>
			<Stack.Screen
				name={'searchresults'}
				options={{
					animation: 'fade',
					headerTransparent: true,
					header: () => {
						return (
							<BlurView intensity={70} tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
								<VStack
									justifyContent={'flex-start'}
									sx={{
										_light: { bg: '$light100' },
										_dark: { bg: '$dark50' },
									}}
								>
									<SearchInputResults />
								</VStack>
							</BlurView>
						)
					},
				}}
			/>
		</Stack>
	)
}

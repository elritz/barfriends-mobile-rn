import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Box, Text, VStack } from '@components/core'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { ENVIRONMENT } from '@env'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={'index'}
				options={{
					header: () => {
						return (
							<VStack
								justifyContent={'flex-end'}
								sx={{
									pt: insets.top,
									h,
									_light: { bg: '$light100' },
									_dark: { bg: '$dark50' },
								}}
								pb={'$2'}
							>
								<Box bg={'transparent'}>
									<Text
										adjustsFontSizeToFit
										fontSize={'$3xl'}
										lineHeight={'$2xl'}
										textAlign={'center'}
										textTransform={'capitalize'}
										fontWeight={'$black'}
									>
										{String.fromCharCode(60)}
										{ENVIRONMENT} {String.fromCharCode(47, 62)}
									</Text>
								</Box>
							</VStack>
						)
					},
					headerShown: true,
				}}
			/>
			<Stack.Screen
				name={'permissionmodals'}
				options={{
					headerBackground: () => <></>,
					headerShown: true,
					title: 'Permissions',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<Stack.Screen
				name={'preferences'}
				options={{
					headerBackground: () => <></>,
					headerShown: true,
					title: 'Preferences',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<Stack.Screen
				name={'theme'}
				options={{
					headerBackground: () => <></>,
					headerShown: true,
					title: 'Themes',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
		</Stack>
	)
}

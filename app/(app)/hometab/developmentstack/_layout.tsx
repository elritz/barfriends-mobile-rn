import ChevronBackArrow from '#/components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Box, Text, VStack } from '@gluestack-ui/themed'
import { SEARCH_BAR_HEIGHT } from '#/constants/ReactNavigationConstants'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useReactiveVar } from '@apollo/client'
import { AuthorizationReactiveVar } from '#/reactive'

export default () => {
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

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
									_dark: { bg: '$light900' },
								}}
								pb={'$2'}
							>
								<Box bg={'transparent'}>
									<Text
										adjustsFontSizeToFit
										fontSize={'$xl'}
										lineHeight={'$2xl'}
										textAlign={'center'}
										textTransform={'capitalize'}
										fontWeight={'$black'}
									>
										{rAuthorizationVar?.ProfileType !== 'GUEST' &&
											rAuthorizationVar?.Profile?.IdentifiableInformation?.username}
									</Text>
									<Text
										adjustsFontSizeToFit
										fontSize={'$3xl'}
										lineHeight={'$2xl'}
										textAlign={'center'}
										textTransform={'capitalize'}
										fontWeight={'$black'}
									>
										{String.fromCharCode(60)}
										{process.env.EXPO_PUBLIC_APP_ENV} {String.fromCharCode(47, 62)}
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
				name={'asks'}
				options={{
					headerBackground: () => <></>,
					headerShown: true,
					title: 'Asks',
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

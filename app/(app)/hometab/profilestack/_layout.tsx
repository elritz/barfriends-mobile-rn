import { useReactiveVar } from '@apollo/client'
import { Box, Button, HStack, Heading, VStack } from '@components/core'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import * as Haptics from 'expo-haptics'
import { Stack, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function _layout() {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const insets = useSafeAreaInsets()

	return (
		<Stack
			screenOptions={{
				gestureEnabled: false,
				headerTransparent: false,
				headerShown: true,
				headerStyle: {
					backgroundColor:
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light100
							: rTheme.theme?.gluestack.tokens.colors.dark50,
				},
				// headerTitle: '',
				header: () => (
					<VStack sx={{ mt: insets.top }}>
						<HStack
							pb={'$2'}
							mx={'$2'}
							justifyContent='space-between'
							// position={'relative'}
							// flex={1}
						>
							<Box bg='$transparent' justifyContent='center' flex={1}>
								{rAuthorizationVar?.Profile?.ProfileType === 'GUEST' ? (
									<Heading fontSize={'$xl'} fontWeight='$black'>
										Revel
									</Heading>
								) : (
									<Button
										variant='link'
										onPress={async () => {
											await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
											router.push('/(app)/modal/DeviceManager')
										}}
									>
										<HStack ml={'$2'} space={'md'} alignItems={'center'} justifyContent='flex-start' flex={1}>
											<Button.Text
												fontSize={'$xl'}
												sx={{
													maxWidth: 195,
													_dark: {
														color: '$white',
													},
													_light: {
														color: '$black',
													},
												}}
												adjustsFontSizeToFit
												ellipsizeMode={'tail'}
											>
												{rAuthorizationVar?.Profile?.IdentifiableInformation?.username}
											</Button.Text>
											<Ionicons
												name={'chevron-down'}
												size={26}
												color={
													rTheme.colorScheme === 'light'
														? rTheme.theme?.gluestack.tokens.colors.light900
														: rTheme.theme?.gluestack.tokens.colors.dark900
												}
												style={{
													marginLeft: -10,
													// position: 'absolute',
													// top: 3,
													// right: -15,
												}}
											/>
										</HStack>
									</Button>
								)}
							</Box>

							<Button
								variant='link'
								onPress={() =>
									router.push({
										pathname: '/(app)/settings',
									})
								}
							>
								<MaterialCommunityIcons
									name={'dots-horizontal'}
									size={30}
									color={
										rTheme.colorScheme === 'light'
											? rTheme.theme?.gluestack.tokens.colors.light900
											: rTheme.theme?.gluestack.tokens.colors.dark900
									}
								/>
							</Button>
						</HStack>
					</VStack>
				),
			}}
		>
			<Stack.Screen name={'UserProfileScreen'} />
		</Stack>
	)
}

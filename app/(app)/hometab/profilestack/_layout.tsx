import { VStack } from "#/components/ui/vstack";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Button, ButtonText } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import * as Haptics from 'expo-haptics'
import { Stack, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function _layout() {
	const router = useRouter()
	const insets = useSafeAreaInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<Stack
			screenOptions={{
				// gestureEnabled: false,
				headerTransparent: false,
				headerShown: true,
				headerStyle: {
					backgroundColor:
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light100
							: rTheme.theme?.gluestack.tokens.colors.light900,
				},
				// headerTitle: '',
				header: () => (
					<VStack style={{ paddingTop: insets.top, }} className="mt-[undefined]">
						<HStack className="pb-2 mx-2 justify-between">
							<Box className="bg-transparent justify-center flex-1">
								{rAuthorizationVar?.Profile?.ProfileType === 'GUEST' ? (
									<Heading className="text-xl font-black">
										Barfriends
									</Heading>
								) : (
									<Button
										variant='link'
										onPress={async () => {
											await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
											router.push({
												pathname: `/(app)/modal/devicemanager/deviceprofilemanager`,
											})
										}}
									>
										<HStack space={'md'} className="ml-2 items-center justify-start flex-1">
											<ButtonText
												adjustsFontSizeToFit
												ellipsizeMode={'tail'}
												className="text-xl max-w-[195px]  dark:text-white text-black">
												{rAuthorizationVar?.Profile?.IdentifiableInformation?.username}
											</ButtonText>
											<Ionicons
												name={'chevron-down'}
												size={26}
												color={
													rTheme.colorScheme === 'light'
														? rTheme.theme?.gluestack.tokens.colors.light900
														: rTheme.theme?.gluestack.tokens.colors.light100
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
											: rTheme.theme?.gluestack.tokens.colors.light100
									}
								/>
							</Button>
						</HStack>
					</VStack>
				),
			}}
		>
			<Stack.Screen name={'userprofile'} />
		</Stack>
	);
}

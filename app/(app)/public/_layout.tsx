// TODO: FX() Settings still needs to be done
import { useReactiveVar } from '@apollo/client'
import SearchInput from '@components/molecules/search/searchinput/SearchInput'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { Button, HStack, Text, VStack } from '@gluestack-ui/themed'
import { ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import { Stack, router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const NAVIGATION_BUTTON_HEIGHT = 38
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT

	return (
		<Stack>
			<Stack.Screen
				name={'venue'}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name={'personal'}
				options={{
					headerShown: true,
					headerTransparent: true,
					headerBlurEffect: rTheme.colorScheme === 'light' ? 'light' : 'dark',
					header: () => {
						return (
							<BlurView
								style={{
									paddingTop: insets.top,
									paddingBottom: 4,
								}}
								intensity={60}
								tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							>
								<HStack justifyContent='space-between' space='md' px={'$3'} alignItems={'center'}>
									<HStack flex={1} justifyContent={'flex-start'} space={'md'} alignItems={'center'}>
										<Button
											// bg={rTheme.colorScheme === 'light' ? '$light50' : '$light900'}
											variant='link'
											rounded={'$full'}
											height={NAVIGATION_BUTTON_HEIGHT}
											onPress={() => {
												router.canGoBack()
													? router.back()
													: router.replace({
															pathname: '/(app)/hometab/venuefeed',
													  })
											}}
										>
											<Ionicons
												name='chevron-back-outline'
												size={30}
												color={
													rTheme.colorScheme === 'light'
														? rTheme.theme?.gluestack.tokens.colors.light900
														: rTheme.theme?.gluestack.tokens.colors.light100
												}
											/>
										</Button>
									</HStack>
									<Text>⭐️</Text>
									<HStack flex={1} justifyContent={'flex-end'} space={'md'} alignItems={'center'}>
										<Button
											height={NAVIGATION_BUTTON_HEIGHT}
											// bg={rTheme.colorScheme === 'light' ? '$light50' : '$light900'}
											rounded={'$full'}
											variant='link'
											onPress={() =>
												router.push({
													pathname: '/(app)/public/personal/settings',
													params: {
														username: 'test',
													},
												})
											}
											size='xs'
										>
											<Entypo
												name={'dots-three-vertical'}
												size={23}
												color={
													rTheme.colorScheme === 'light'
														? rTheme.theme?.gluestack.tokens.colors.light900
														: rTheme.theme?.gluestack.tokens.colors.light100
												}
											/>
										</Button>
									</HStack>
								</HStack>
							</BlurView>
						)
					},
				}}
			/>
			<Stack.Screen
				name={'contacts'}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerLeft: () => (
						<HStack
							justifyContent={'flex-start'}
							maxWidth={'90%'}
							space={'md'}
							alignItems={'center'}
							ml={'$2'}
						>
							<Button
								onPress={() => router.back()}
								rounded={'$full'}
								size='xs'
								my={'$2'}
								mr={'$2'}
								bg={rTheme.colorScheme === 'light' ? '$light50' : '$light900'}
							>
								<Ionicons name='chevron-back-outline' size={30} />
							</Button>
						</HStack>
					),
					contentStyle: {
						backgroundColor:
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light100
								: rTheme.theme?.gluestack.tokens.colors.light900,
					},
					headerTransparent: true,
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
								<SearchInput />
							</VStack>
						)
					},
				}}
			/>
		</Stack>
	)
}

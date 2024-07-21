import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { Button } from "#/components/ui/button";
// TODO: FX() Settings still needs to be done
import { useReactiveVar } from '@apollo/client'
import SearchInput from '#/components/molecules/search/searchinput/SearchInput'
import { SEARCH_BAR_HEIGHT } from '#/constants/ReactNavigationConstants'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { ThemeReactiveVar } from '#/reactive'
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
                                <HStack space='md' className="justify-between px-3 items-center">
									<HStack space={'md'} className="flex-1 justify-start items-center">
										<Button
                                            // bg={rTheme.colorScheme === 'light' ? '$light50' : '$light900'}
                                            variant='link'
                                            onPress={() => {
												router.canGoBack()
													? router.back()
													: router.replace({
															pathname: '/(app)/hometab/venuefeed',
													  })
											}}
                                            className={` height-${NAVIGATION_BUTTON_HEIGHT} rounded-full `}>
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
									<HStack space={'md'} className="flex-1 justify-end items-center">
										<Button
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
                                            className={` height-${NAVIGATION_BUTTON_HEIGHT} rounded-full `}>
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
                        );
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
						<HStack space={'md'} className="justify-start max-w-[90%] items-center ml-2">
							<Button
                                onPress={() => router.back()}
                                size='xs'
                                className={` ${rTheme.colorScheme === 'light' ? "bg-light-50" : "bg-light-900"} rounded-full my-2 mr-2 `}>
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
                                className={` h-${h} justify-end pt-[undefined]  bg-light-100  dark:bg-light-900 pb-2 `}>
                                <SearchInput />
                            </VStack>
                        );
					},
				}}
			/>
        </Stack>
    );
}

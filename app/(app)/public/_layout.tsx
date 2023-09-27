// TODO: FX() Settings still needs to be done
import { useReactiveVar } from '@apollo/client'
import { Button, HStack, VStack } from '@components/core'
import SearchInput from '@components/molecules/search/searchinput/SearchInput'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { Stack, router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const insets = useSafeAreaInsets()
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT

	return (
		<Stack>
			<Stack.Screen
				options={{
					headerShown: true,
					headerTransparent: true,
					headerStyle: {
						backgroundColor: 'transparent',
					},
					presentation: 'modal',
					animation: 'fade',
					headerLeft: () => (
						<Button
							onPress={() => {
								router.canGoBack()
									? router.back()
									: router.replace({
											pathname: '/(app)/hometab/venuefeed',
									  })
							}}
							rounded={'$full'}
							size='xs'
							bg={rTheme.colorScheme === 'light' ? '$light50' : '$dark50'}
						>
							<Ionicons
								name='md-chevron-back-outline'
								size={30}
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light900
										: rTheme.theme?.gluestack.tokens.colors.dark900
								}
							/>
						</Button>
					),
					headerRight: () => (
						<Button
							onPress={() => router.back()}
							rounded={'$full'}
							size='xs'
							my={'$2'}
							mr={'$2'}
							bg={rTheme.colorScheme === 'light' ? '$light50' : '$dark50'}
						>
							<Entypo
								name='dots-three-vertical'
								size={23}
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light900
										: rTheme.theme?.gluestack.tokens.colors.dark900
								}
							/>
						</Button>
					),
					headerTitle: '',
				}}
				name={'venue'}
			/>
			<Stack.Screen
				name={'personal'}
				options={{
					headerShown: true,
					// headerTransparent: true,
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerLeft: () => (
						<HStack
							justifyContent={'flex-start'}
							sx={{
								maxWidth: '90%',
							}}
							space={'md'}
							alignItems={'center'}
							ml={'$2'}
							mb={'$1'}
						>
							<Button
								bg={rTheme.colorScheme === 'light' ? '$light50' : '$dark50'}
								rounded={'$full'}
								onPress={() => {
									router.canGoBack()
										? router.back()
										: router.replace({
												pathname: '/(app)/hometab/venuefeed',
										  })
								}}
							>
								<Ionicons
									name='md-chevron-back-outline'
									size={30}
									color={
										rTheme.colorScheme === 'light'
											? rTheme.theme?.gluestack.tokens.colors.light900
											: rTheme.theme?.gluestack.tokens.colors.dark900
									}
								/>
							</Button>
						</HStack>
					),
					headerRight: () => (
						<Button
							mb={'$1'}
							bg={rTheme.colorScheme === 'light' ? '$light50' : '$dark50'}
							rounded={'$full'}
							onPress={() => router.back()}
							mr={'$2'}
							py={'$1'}
						>
							<Entypo name={'dots-three-vertical'} size={20} />
						</Button>
					),
					headerTitle: '',
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
							space={'$md'}
							alignItems={'center'}
							ml={'$2'}
						>
							<Button
								onPress={() => router.back()}
								rounded={'$full'}
								size='xs'
								my={'$2'}
								mr={'$2'}
								bg={rTheme.colorScheme === 'light' ? '$light50' : '$dark50'}
							>
								<Ionicons name='md-chevron-back-outline' size={30} />
							</Button>
						</HStack>
					),
					contentStyle: {
						backgroundColor:
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light100
								: rTheme.theme?.gluestack.tokens.colors.dark100,
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
									_dark: { bg: '$dark50' },
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

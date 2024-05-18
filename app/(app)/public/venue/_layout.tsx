// TODO: FX() Settings still needs to be done
import { useReactiveVar } from '@apollo/client'
import { SEARCH_BAR_HEIGHT } from '#/constants/ReactNavigationConstants'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Button, HStack, Text } from '@gluestack-ui/themed'
import { usePublicVenueQuery } from '#/graphql/generated'
import { CurrentLocationReactiveVar, SearchAreaReactiveVar, ThemeReactiveVar } from '#/reactive'
import { BlurView } from 'expo-blur'
import { Stack, useLocalSearchParams, useRouter, router as xRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const NAVIGATION_BUTTON_HEIGHT = 38
	const insets = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)
	const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + 15
	const h = insets.top + HEADER_HEIGHT
	const router = useRouter()
	const params = useLocalSearchParams()

	const {
		data: venueData,
		loading,
		error,
	} = usePublicVenueQuery({
		skip: !params.username,

		fetchPolicy: 'network-only',
		variables: {
			where: {
				IdentifiableInformation: {
					username: {
						equals: String(params.username),
					},
				},
			},
			currentLocationCoords: {
				latitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.latitude)
					: Number(rSearchAreaVar?.searchArea.coords.latitude),
				longitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.longitude)
					: Number(rSearchAreaVar?.searchArea.coords.longitude),
			},
		},
	})

	return (
		<Stack>
			<Stack.Screen
				name={'[username]'}
				options={{
					headerShown: true,
					headerTransparent: true,
					headerStyle: {
						backgroundColor: 'transparent',
					},
					presentation: 'modal',
					animation: 'fade',
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
											variant='link'
											rounded={'$full'}
											height={NAVIGATION_BUTTON_HEIGHT}
											onPress={() => {
												xRouter.canGoBack()
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
									{loading ? null : (
										<Text
											fontSize={'$lg'}
											fontWeight='$medium'
											color={rTheme.colorScheme === 'light' ? '$light900' : '$light100'}
										>
											{venueData?.publicVenue?.Venue?.name}
										</Text>
									)}
									<HStack flex={1} justifyContent={'flex-end'} space={'md'} alignItems={'center'}>
										<Button
											height={NAVIGATION_BUTTON_HEIGHT}
											// bg={rTheme.colorScheme === 'light' ? '$light50' : '$light900'}
											rounded={'$full'}
											variant='link'
											onPress={() => router.back()}
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
		</Stack>
	)
}

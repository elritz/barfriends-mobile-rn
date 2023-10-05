import { useReactiveVar } from '@apollo/client'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { Box, Button, Divider, HStack, Heading, Pressable, VStack } from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
	useGetAllThemesQuery,
	useRefreshDeviceManagerMutation,
	useUpdateThemeManagerSwitchThemeMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import useContentInsets from '@util/hooks/useContentInsets'
import { router } from 'expo-router'
import { useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Preferences() {
	const insets = useSafeAreaInsets()
	const contentInsets = useContentInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [toggleColorScheme, switchTheme] = useToggleTheme()

	const { data: GATData, loading: GATLoading, error } = useGetAllThemesQuery()

	const [updateSwitchTheme] = useUpdateThemeManagerSwitchThemeMutation({
		onCompleted: data => {
			refreshMutation()
		},
	})

	const [refreshMutation, { data, loading }] = useRefreshDeviceManagerMutation({
		onCompleted: data => {
			if (data.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile') {
				const deviceProfile = data.refreshDeviceManager as AuthorizationDeviceProfile
				AuthorizationReactiveVar(deviceProfile)
				setTheme({ colorScheme: rTheme.localStorageColorScheme })
				setTimeout(() => {
					router.back()
				}, 500)
			}
			if (data.refreshDeviceManager?.__typename === 'Error') {
				// setTimeout(() => {
				// 	router.push('/(app)/hometab/venuefeed')
				// }, 1)
			}
		},
	})

	const setTheme = async ({ colorScheme }: { colorScheme: 'light' | 'dark' | 'system' }) => {
		toggleColorScheme({ colorScheme })
	}

	const renderItem = useCallback(
		({ item }) => {
			const company = {
				dark: [
					item.theme.styled.dark.palette.company.primary,
					item.theme.styled.dark.palette.company.secondary,
					item.theme.styled.dark.palette.company.tertiary,
				],
				light: [
					item.theme.styled.light.palette.company.primary,
					item.theme.styled.light.palette.company.secondary,
					item.theme.styled.light.palette.company.tertiary,
				],
			}

			const revel = {
				dark: [
					item.theme.styled.dark.palette.revel.primary,
					item.theme.styled.dark.palette.revel.secondary,
					item.theme.styled.dark.palette.revel.tertiary,
				],
				light: [
					item.theme.styled.light.palette.revel.primary,
					item.theme.styled.light.palette.revel.secondary,
					item.theme.styled.light.palette.revel.tertiary,
				],
			}

			return (
				<Pressable
					onPress={() => {
						console.log('preessed :>> ')
						updateSwitchTheme({
							variables: {
								id: item.id,
								themeId: item.id,
							},
						})
					}}
				>
					<Box
						key={item.id}
						m={'$3'}
						style={{
							flex: 1,
						}}
						py={'$4'}
						px={'$2'}
						rounded={'$md'}
						borderWidth={'$2'}
						borderColor={
							AuthorizationReactiveVar()?.Profile?.ThemeManager?.ProfileTheme[0]?.Theme.id === item.id
								? '$primary400'
								: 'transparent'
						}
					>
						<VStack flexDirection={'row'} flexWrap={'wrap'} justifyContent='space-around' space={'md'}>
							{rTheme.colorScheme === 'light' ? (
								<>
									{revel.light.map((item, index) => {
										return (
											<Box
												key={index}
												alignSelf={'center'}
												style={{
													backgroundColor: item,
													width: 25,
													height: 25,
												}}
												m={'$2'}
											/>
										)
									})}
								</>
							) : (
								<>
									{revel.dark.map((item, index) => {
										return (
											<Box
												key={index}
												alignSelf={'center'}
												style={{
													backgroundColor: item,
													width: 40,
													height: 40,
												}}
												m={'$2'}
											/>
										)
									})}
								</>
							)}
						</VStack>

						<Divider my={'$3'} />
						<VStack flexDirection={'row'} flexWrap={'wrap'} justifyContent='space-around' space={'$md'}>
							{rTheme.colorScheme === 'light' ? (
								<>
									{company.light.map((item, index) => {
										return (
											<Box
												key={index}
												alignSelf={'center'}
												style={{
													backgroundColor: item,
													width: 40,
													height: 40,
												}}
												m={'$2'}
											/>
										)
									})}
								</>
							) : (
								<>
									{company.dark.map((item, index) => {
										return (
											<Box
												key={index}
												alignSelf={'center'}
												style={{
													backgroundColor: item,
													width: 30,
													height: 30,
												}}
												m={'$2'}
											/>
										)
									})}
								</>
							)}
						</VStack>
						<Heading
							mt={'$4'}
							fontWeight={'$bold'}
							textTransform={'capitalize'}
							textAlign={'center'}
							fontSize={'$xl'}
						>
							{item.name}
						</Heading>
					</Box>
				</Pressable>
			)
		},
		[rTheme.colorScheme],
	)

	if (GATLoading || !GATData?.getAllThemes) return null

	return (
		<FlashList
			estimatedItemSize={30}
			data={GATData.getAllThemes}
			keyExtractor={(item, index) => index.toString()}
			numColumns={2}
			contentContainerStyle={{
				paddingHorizontal: 10,
			}}
			contentInset={{
				top: contentInsets.top,
				bottom:
					insets.bottom !== 0
						? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
						: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
			}}
			renderItem={renderItem}
			ListHeaderComponent={() => {
				return (
					<HStack py={'$4'} w={'$full'} space={'lg'} justifyContent={'space-around'}>
						<Button
							onPress={async () => {
								await setTheme({ colorScheme: 'light' })
							}}
							bg={'$light50'}
							flex={1}
							borderColor={rTheme.localStorageColorScheme === 'light' ? '$primary300' : 'transparent'}
							borderWidth={'$2'}
						>
							<Button.Text color={'$black'}>Light</Button.Text>
						</Button>
						<Button
							flex={1}
							onPress={async () => {
								await setTheme({ colorScheme: 'dark' })
							}}
							bg={'$light800'}
							borderColor={rTheme.localStorageColorScheme === 'dark' ? '$primary300' : 'transparent'}
							borderWidth={'$2'}
						>
							<Button.Text color={'$white'}>Dark</Button.Text>
						</Button>
						<Button
							onPress={async () => {
								await setTheme({ colorScheme: 'system' })
							}}
							bg={rTheme.colorScheme === 'light' ? '$light100' : '$light800'}
							flex={1}
							borderColor={rTheme.localStorageColorScheme === 'system' ? '$primary300' : 'transparent'}
							borderWidth={'$2'}
						>
							<Button.Text color={rTheme.colorScheme === 'light' ? '$black' : '$white'}>
								System
							</Button.Text>
						</Button>
					</HStack>
				)
			}}
		/>
	)
}

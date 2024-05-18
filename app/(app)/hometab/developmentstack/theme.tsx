import { useReactiveVar } from '@apollo/client'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '#/constants/ReactNavigationConstants'
import {
	Box,
	Button,
	ButtonText,
	Divider,
	HStack,
	Heading,
	Pressable,
	VStack,
} from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
	useGetAllThemesQuery,
	useRefreshDeviceManagerMutation,
	useUpdateThemeManagerSwitchThemeMutation,
} from '#/graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useToggleTheme } from '#/util/hooks/theme/useToggleTheme'
import useContentInsets from '#/util/hooks/useContentInsets'
import { router } from 'expo-router'
import { useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Gluestack = {
	primary0: string
	primary50: string
	tertiary0: string
	primary100: string
	primary200: string
	primary300: string
	primary400: string
	primary500: string
	primary600: string
	primary700: string
	primary800: string
	primary900: string
	primary950: string
	secondary0: string
	tertiary50: string
	secondary50: string
	tertiary100: string
	tertiary200: string
	tertiary300: string
	tertiary400: string
	tertiary500: string
	tertiary600: string
	tertiary700: string
	tertiary800: string
	tertiary900: string
	tertiary950: string
	secondary100: string
	secondary200: string
	secondary300: string
	secondary400: string
	secondary500: string
	secondary600: string
	secondary700: string
	secondary800: string
	secondary900: string
	secondary950: string
}

type Theme = {
	card: string
	text: string
	border: string
	primary: string
	background: string
	notification: string
}

type ReactNavigation = {
	dark: Theme
	light: Theme
}

type Item = {
	index: number
	item: {
		id: string
		name: string
		theme: {
			gluestack: Gluestack
			reactnavigation: ReactNavigation
		}
	}
}

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
		onError: error => {
			console.log('errorwwww :>> ', error)
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
		onError: error => {
			console.log('error :>> ', error)
		},
	})

	const setTheme = async ({ colorScheme }: { colorScheme: 'light' | 'dark' | 'system' }) => {
		toggleColorScheme({ colorScheme })
	}

	const renderItem: ListRenderItem<Item> = useCallback(
		({ item, index }) => {
			if (!item?.item) return null
			const gluestack = item.item.theme.gluestack
			const reactnavigation = item.item.theme.reactnavigation
			return (
				<Pressable
					onPress={() => {
						updateSwitchTheme({
							variables: {
								id: item.item.id,
								themeId: item.item.id,
							},
						})
					}}
				>
					<Box
						key={item.item.id}
						m={'$3'}
						style={{
							flex: 1,
						}}
						py={'$4'}
						px={'$2'}
						rounded={'$md'}
						borderWidth={'$2'}
						borderColor={
							AuthorizationReactiveVar()?.Profile?.ThemeManager?.ProfileTheme[0]?.Theme.id === item.item.id
								? '$primary400'
								: 'transparent'
						}
					>
						<VStack flexDirection={'row'} flexWrap={'wrap'} justifyContent='space-around' space={'md'}>
							{rTheme.colorScheme === 'light' ? (
								<>
									{Object.entries(gluestack).map((item, index) => {
										return (
											<Box
												key={index}
												alignSelf={'center'}
												style={{
													backgroundColor: item[1],
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
									{Object.entries(gluestack).map((item, index) => {
										return (
											<Box
												key={index}
												alignSelf={'center'}
												style={{
													backgroundColor: item[1],
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
						<Heading
							mt={'$4'}
							fontWeight={'$bold'}
							textTransform={'capitalize'}
							textAlign={'center'}
							fontSize={'$xl'}
						>
							{item.item.name}
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
			data={GATData.getAllThemes.map((theme, index) => ({
				index,
				item: theme,
			}))}
			keyExtractor={(item, index) => index.toString()}
			numColumns={1}
			contentContainerStyle={{
				paddingHorizontal: 10,
			}}
			contentInset={{
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
							<ButtonText color={'$black'}>Light</ButtonText>
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
							<ButtonText color={'$white'}>Dark</ButtonText>
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
							<ButtonText color={rTheme.colorScheme === 'light' ? '$black' : '$white'}>System</ButtonText>
						</Button>
					</HStack>
				)
			}}
		/>
	)
}

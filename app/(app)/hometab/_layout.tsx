import { useReactiveVar } from '@apollo/client'
import { VStack } from '@components/core'
import SearchInput from '@components/molecules/search/searchinput/SearchInput'
import SearchInputVenueFeed from '@components/molecules/search/searchinput/SearchInputVenueFeed'
import DevelopmentTab from '@components/molecules/tabbaricons/hometabicons/developmenttab'
import MessageTab from '@components/molecules/tabbaricons/hometabicons/messagestab'
import ProfileTab from '@components/molecules/tabbaricons/hometabicons/profiletab'
import TonightTab from '@components/molecules/tabbaricons/hometabicons/tonighttab'
import VenueFeedTab from '@components/molecules/tabbaricons/hometabicons/venuefeedtab'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '@constants/ReactNavigationConstants'
import { ITabColor } from '@ctypes/app'
import { ENVIRONMENT } from '@env'
import { ProfileType } from '@graphql/generated'
import { AuthorizationReactiveVar, TermsServiceReactiveVar, ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import { Tabs, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const segments = useSegments()
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTermsServiceVar = useReactiveVar(TermsServiceReactiveVar)

	useEffect(() => {
		if (rTermsServiceVar.update) {
			router.push({
				pathname: '/(information)/updatelatestprivacytermsservice',
			})
		}
	}, [])

	console.log(
		'rAuthorizationVar?.Profile?.ProfileType :>> ',
		rAuthorizationVar?.Profile?.ProfileType,
	)

	return (
		<Tabs
			initialRouteName='venuefeed'
			screenOptions={{
				// tabBarBackground: () => <Box style={[StyleSheet.absoluteFill]} />,
				tabBarBackground: () => (
					<BlurView
						tint={rTheme.deviceColorScheme === 'light' ? 'light' : 'dark'}
						intensity={70}
						style={[StyleSheet.absoluteFill]}
					/>
				),
				tabBarStyle: {
					height:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
					position: 'absolute',
					alignItems: 'center',
					elevation: 0, // for Android
					borderTopWidth: 0,
				},
				headerShown: true,
				tabBarShowLabel: false,
				headerTransparent: true,
				header: () => {
					return (
						<BlurView
							style={{
								backgroundColor: segments.includes('tonight')
									? 'transparent'
									: rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light100
									: rTheme.theme?.gluestack.tokens.colors.dark50,
							}}
							intensity={70}
							tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
						>
							<VStack
								justifyContent={'flex-start'}
								// sx={{
								// 	_light: { bg: !segments.includes('tonight') ? '$light100' : 'transparent' },
								// 	_dark: { bg: !segments.includes('tonight') ? '$dark50' : 'transparent' },
								// }}
							>
								<SearchInputVenueFeed placeholder='Explore' />
							</VStack>
						</BlurView>
					)
				},
			}}
		>
			<Tabs.Screen
				name='venuefeed'
				options={{
					// headerShown: false,
					href: '/(app)/hometab/venuefeed',
					tabBarLabel: 'outaboot',
					tabBarShowLabel: false,
					tabBarIcon: ({ color, focused }: ITabColor) => (
						<VenueFeedTab color={color} focused={focused} />
					),
				}}
			/>
			<Tabs.Screen
				name={'tonight'}
				options={{
					href: '/(app)/hometab/tonight',
					// headerShown: false,
					tabBarLabel: 'tonight',
					tabBarIcon: ({ color, focused }: ITabColor) => <TonightTab color={color} focused={focused} />,
				}}
			/>
			<Tabs.Screen
				name='messagestack'
				options={{
					// headerShown: false,
					tabBarLabel: 'messages',
					tabBarShowLabel: false,
					tabBarIcon: ({ color, focused }: ITabColor) => <MessageTab color={color} focused={focused} />,
				}}
			/>
			<Tabs.Screen
				name='profilestack'
				options={{
					headerShown: false,
					tabBarLabel: 'profile',
					tabBarShowLabel: false,
					tabBarIcon: ({ color, focused }: ITabColor) => <ProfileTab color={color} focused={focused} />,
				}}
			/>
			<Tabs.Screen
				name='developmentstack'
				options={{
					href: ENVIRONMENT === 'development' ? '/(app)/hometab/developmentstack' : null,
					headerShown: false,
					tabBarLabel: 'development',
					tabBarShowLabel: false,
					tabBarIcon: ({ color, focused }: ITabColor) => (
						<DevelopmentTab color={color} focused={focused} />
					),
				}}
			/>
		</Tabs>
	)
}

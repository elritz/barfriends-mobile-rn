import SearchAccounts from '@navigation/screens/search/textsearchtabs/SearchAccounts'
import SearchTop from '@navigation/screens/search/textsearchtabs/SearchTop'
import SearchVenues from '@navigation/screens/search/textsearchtabs/SearchVenues'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useRoute } from '@react-navigation/native'
import { SearchResultTabStackParamList } from '@types'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createMaterialTopTabNavigator<SearchResultTabStackParamList>()

interface IColor {
	color: string
}

function SearchFilterTabStack() {
	const themeContext = useContext(ThemeContext)
	const route: any = useRoute()

	return (
		<ScreenStack.Navigator
			tabBarPosition='top'
			screenOptions={{
				tabBarStyle: {
					backgroundColor: themeContext.palette.primary.background,
					marginTop: 105,
				},
				tabBarShowLabel: true,
				tabBarContentContainerStyle: {
					height: 40,
					alignItems: 'center',
				},
				tabBarIndicatorStyle: {
					backgroundColor: themeContext.palette.active.color.primary,
					bottom: -2,
					borderBottomWidth: 3,
					borderRadius: 0,
				},
				tabBarLabelStyle: {
					fontSize: 15,
					fontWeight: '500',
					textTransform: 'capitalize',
				},
			}}
		>
			<ScreenStack.Screen
				name='TopScreen'
				component={SearchTop}
				options={{
					tabBarLabel: 'Top',
				}}
				initialParams={{
					searchText: route.params.params.searchText,
				}}
			/>
			<ScreenStack.Screen
				name='VenueScreen'
				component={SearchVenues}
				options={{
					tabBarLabel: 'Venues',
				}}
				initialParams={{
					searchText: route.params.params.searchText,
				}}
			/>
			<ScreenStack.Screen
				name='UserScreen'
				component={SearchAccounts}
				options={{
					tabBarLabel: 'Accounts',
				}}
				initialParams={{
					searchText: route.params.params.searchText,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default SearchFilterTabStack

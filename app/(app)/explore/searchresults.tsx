import { useReactiveVar } from '@apollo/client'
import { Text } from '@components/core'
import SearchAccounts from '@components/screens/search/textsearchtabs/SearchAccounts'
import SearchVenues from '@components/screens/search/textsearchtabs/SearchVenues'
import { ThemeReactiveVar } from '@reactive'
import useContentInsets from '@util/hooks/useContentInsets'
import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

const renderScene = SceneMap({
	second: SearchAccounts,
	third: SearchVenues,
})

export default function searchresulttabs() {
	const contentInsets = useContentInsets()
	const layout = useWindowDimensions()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		// { key: 'first', title: 'Top' },
		{ key: 'second', title: 'Accounts' },
		{ key: 'third', title: 'Venues' },
	])

	const renderTabBar = props => (
		<TabBar
			{...props}
			indicatorStyle={{
				backgroundColor: rTheme.theme?.gluestack.tokens.colors.primary500,
			}}
			style={{
				backgroundColor:
					rTheme.colorScheme === 'dark'
						? rTheme.theme?.gluestack.tokens.colors.dark50
						: rTheme.theme?.gluestack.tokens.colors.light50,
			}}
			renderLabel={({ route, focused, color }) => {
				return <Text style={{ margin: 8 }}>{route.title}</Text>
			}}
		/>
	)

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			renderTabBar={renderTabBar}
			onIndexChange={setIndex}
			style={{
				top: contentInsets.top,
			}}
			initialLayout={{ width: layout.width }}
		/>
	)
}

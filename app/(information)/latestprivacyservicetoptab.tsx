import { useReactiveVar } from '@apollo/client'
import { Text } from '@components/core'
import Privacy from '@components/screens/information/privacyserviceterms/Privacy'
import Service from '@components/screens/information/privacyserviceterms/Service'
import { ThemeReactiveVar } from '@reactive'
import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

const renderScene = SceneMap({
	second: Privacy,
	third: Service,
})

export default () => {
	const layout = useWindowDimensions()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: 'second', title: 'Services' },
		{ key: 'third', title: 'Privacy' },
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
			initialLayout={{ width: layout.width }}
		/>
	)
}

import { useReactiveVar } from '@apollo/client'
import VenueFeedSearchInput from '@components/molecules/search/venuefeed/VenueFeedSearchInput'
import VenueFeedScreen from '@navigation/screens/hometabs/venuesfeed/VenueFeedScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeReactiveVar } from '@reactive'
import { HomeTabStackParamList } from '@types'
import { BlurView } from 'expo-blur'
import { Box, VStack } from 'native-base'
import { useContext } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createStackNavigator<HomeTabStackParamList>()

function VenueFeedStack() {
	const themeContext = useContext(ThemeContext)

	return (
		<ScreenStack.Navigator initialRouteName='VenueFeedScreen'>
			<ScreenStack.Screen
				name='VenueFeedScreen'
				component={VenueFeedScreen}
				options={{
					headerShown: true,
					headerTransparent: true,
					gestureResponseDistance: 240,
					gestureDirection: 'horizontal',
					header: () => {
						return (
							<VStack height={105} justifyContent={'flex-end'} pb={2}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={themeContext.theme} intensity={80} />
								) : (
									<Box style={[StyleSheet.absoluteFill]} />
								)}
								<VenueFeedSearchInput />
							</VStack>
						)
					},
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default VenueFeedStack

import MessagesScreen from '@navigation/screens/hometabs/messages/Messages'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MessagesTabStackParamList } from '@types'

const ScreenStack = createNativeStackNavigator<MessagesTabStackParamList>()

function MessagesStack() {
	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				name='MessagesScreen'
				component={MessagesScreen}
				options={{
					headerShown: false,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default MessagesStack

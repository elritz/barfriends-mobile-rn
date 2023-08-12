import { ScrollView, Text } from 'react-native'

export default () => {
	return (
		<ScrollView style={{ backgroundColor: 'blue', flex: 1, marginVertical: 50 }}>
			<Text>No Network connection!!</Text>
		</ScrollView>
	)
}

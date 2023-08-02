import { Button, Center, Heading, Text } from '@components/core'
import { router } from 'expo-router'
import { SafeAreaView, ScrollView } from 'react-native'

export default () => {
	return (
		<SafeAreaView>
			<ScrollView>
				<Center>
					<Heading>No Network connection!!</Heading>
					<Heading>Pull to refresh</Heading>
				</Center>
				<Button
					mx={'$4'}
					onPress={() => {
						setTimeout(() => {
							router.push({
								pathname: '(app)/hometab/venuefeed',
							})
						}, 1)
					}}
				>
					<Text>Try Again</Text>
				</Button>
			</ScrollView>
		</SafeAreaView>
	)
}

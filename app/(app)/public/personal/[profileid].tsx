import { Box, Text } from '@components/core'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

export default () => {
	const params = useLocalSearchParams()
	return (
		<ScrollView>
			<Box
				sx={{
					h: 200,
				}}
				h={200}
				bg={'$dark50'}
			>
				<Text fontSize={'$lg'} color={'$warmGray50'}>
					{params.profileid}
				</Text>
			</Box>
		</ScrollView>
	)
}

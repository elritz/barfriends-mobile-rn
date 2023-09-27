import { Box, Text } from '@components/core'
import Photos from '@components/screens/public/personal/photos'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

export default () => {
	const params = useLocalSearchParams()

	console.log('🚀 ~ file: [profileid].tsx:9 ~ params:', params.profileid)

	return (
		<ScrollView>
			<Box flex={1} bg='$red400' rounded={'$none'}>
				<Photos />
				<Box>
					<Text fontSize={'$lg'}>{params.profileid}</Text>
					<Text fontSize={'$lg'}>{params.profileid}</Text>
				</Box>
			</Box>
		</ScrollView>
	)
}

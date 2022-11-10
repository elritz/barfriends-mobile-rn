import ShowCaseScroll from './ShowCaseScroll'
import { Box, ScrollView, View, VStack } from 'native-base'

const ExploreScreen = () => {
	return (
		<Box style={{ flex: 1 }}>
			<ScrollView>
				<ShowCaseScroll />
			</ScrollView>
		</Box>
	)
}
export default ExploreScreen

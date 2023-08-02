// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import JoinVenue from '@components/atoms/buttons/joinvenue/JoinVenue'
import { HStack, Heading, Text, VStack } from '@components/core'
import { View } from 'react-native'

export default function JoinCard() {
	return (
		<VStack flex={1} justifyContent='space-between' flexDirection={'column'}>
			<View>
				<Heading
					textTransform={'uppercase'}
					lineHeight={'$xs'}
					fontSize={'$lg'}
					fontWeight={'$black'}
					mt={'$5'}
				>
					You've{'\n'}arrived!
				</Heading>
				<Text>Join the venue now</Text>
			</View>
			<HStack>
				<JoinVenue />
			</HStack>
		</VStack>
	)
}

import { HStack, Text } from '@components/core'
import { ComingArea } from '@graphql/generated'
import CountryFlag from 'react-native-country-flag'

type Prop = {
	item: ComingArea
}
export default function ComingAreaItem({ item }: Prop) {
	return (
		<HStack mx={'$2'}>
			<HStack alignItems={'center'} flex={1} space={'md'}>
				<CountryFlag isoCode={item.Area?.Country.isoCode} size={15} />
				<Text fontSize={'$md'}>
					{item.Area?.Country.name}, {item.Area?.State.isoCode}, {item.Area?.City.name}
				</Text>
			</HStack>
			<Text>{item.timesRequested}</Text>
		</HStack>
	)
}

import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { ComingArea } from '#/graphql/generated'
import CountryFlag from 'react-native-country-flag'

type Prop = {
	item: ComingArea
}
export default function ComingAreaItem({ item }: Prop) {
	return (
        <HStack className="mx-2">
            <HStack space={'md'} className="items-center flex-1">
				<CountryFlag isoCode={String(item.Area?.Country.isoCode)} size={15} />
				<Text className="text-md">
					{item.Area?.Country.name}, {item.Area?.State.isoCode}, {item.Area?.City.name}
				</Text>
			</HStack>
            <Text>{item.timesRequested}</Text>
        </HStack>
    );
}

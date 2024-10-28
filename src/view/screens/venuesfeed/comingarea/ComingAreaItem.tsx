import CountryFlag from 'react-native-country-flag'

import {ComingArea} from '#/graphql/generated'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'

type Prop = {
  item: ComingArea
}
export default function ComingAreaItem({item}: Prop) {
  return (
    <HStack className="mx-2">
      <HStack space={'md'} className="flex-1 items-center">
        <CountryFlag isoCode={String(item.Area?.Country.isoCode)} size={15} />
        <Text className="text-md">
          {item.Area?.Country.name}, {item.Area?.State.isoCode},{' '}
          {item.Area?.City.name}
        </Text>
      </HStack>
      <Text>{item.timesRequested}</Text>
    </HStack>
  )
}

import {View} from 'react-native'
import {useGlobalSearchParams} from 'expo-router'
import {useReactiveVar} from '@apollo/client'

import {usePublicVenueQuery} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import UberButton from './UberButton'

export default function UberCard() {
  const params = useGlobalSearchParams()
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const {} = usePublicVenueQuery({
    skip: !params.venueProfileId || !rAuthorizationVar,
    fetchPolicy: 'cache-only',
    variables: {
      where: {
        IdentifiableInformation: {
          username: {
            equals: String(params.username),
          },
        },
      },
    },
  })

  // const urlUberWithVenue = `https://m.uber.com/ul/?client_id=${process.env.UBER_CLIENT_ID_KEY}&action=setPickup&pickup[my_location]&pickup[nickname]=MyLocation&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=${PData?.publicVenue?.Venue?.Location?.Geometry?.latitude}&dropoff[longitude]=${PData?.publicVenue?.Venue?.Location?.Geometry?.longitude}&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`
  // const urlUber = `https://m.uber.com/ul/?client_id=${process.env.UBER_CLIENT_ID_KEY}&action=setPickup&pickup[my_location]&pickup[nickname]=MyLocation&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`

  // const handleUberWithVenuePress = useCallback(async () => {
  //   const supported = await Linking.canOpenURL(urlUberWithVenue)

  //   if (supported) {
  //     await Linking.openURL(urlUberWithVenue)
  //   } else {
  //     Alert.alert(`Couldn't open the Uber! Do you have it installed?`)
  //   }
  // }, [urlUberWithVenue])

  // const handleUberNoVenuePress = useCallback(async () => {
  //   const supported = await Linking.canOpenURL(urlUber)

  //   if (supported) {
  //     await Linking.openURL(urlUber)
  //   } else {
  //     Alert.alert(`Couldn't open the Uber! Do you have it installed?`)
  //   }
  // }, [urlUber])

  return (
    <VStack className="flex-column flex-1 justify-between">
      <View>
        <Heading className="leading-xs mt-5 text-lg font-black uppercase">
          Request a ride now
        </Heading>
        <Text>Focused on safety, wherever you go</Text>
      </View>
      <HStack className="justify-center">
        <UberButton params={params} />
      </HStack>
    </VStack>
  )
}

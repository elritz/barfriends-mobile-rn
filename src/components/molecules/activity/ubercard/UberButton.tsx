import {useCallback} from 'react'
import {Alert, Linking} from 'react-native'
import {useReactiveVar} from '@apollo/client'
import {FontAwesome5} from '@expo/vector-icons'

import {usePublicVenueQuery} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import {Button, ButtonText} from '#/src/components/ui/button'

interface UberButtonParams {
  venueProfileId?: string
  username: string
}

export default function UberButton({params}: {params: UberButtonParams}) {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const {data: PData, loading: PLoading} = usePublicVenueQuery({
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

  const urlUberWithVenue = `https://m.uber.com/ul/?client_id=${process.env.UBER_CLIENT_ID_KEY}&action=setPickup&pickup[my_location]&pickup[nickname]=MyLocation&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=${PData?.publicVenue?.Venue?.Location?.Geometry?.latitude}&dropoff[longitude]=${PData?.publicVenue?.Venue?.Location?.Geometry?.longitude}&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`
  const urlUber = `https://m.uber.com/ul/?client_id=${process.env.UBER_CLIENT_ID_KEY}&action=setPickup&pickup[my_location]&pickup[nickname]=MyLocation&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`

  const handleUberWithVenuePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(urlUberWithVenue)

    if (supported) {
      await Linking.openURL(urlUberWithVenue)
    } else {
      Alert.alert(`Couldn't open the Uber! Do you have it installed?`)
    }
  }, [urlUberWithVenue])

  const handleUberNoVenuePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(urlUber)

    if (supported) {
      await Linking.openURL(urlUber)
    } else {
      Alert.alert(`Couldn't open the Uber! Do you have it installed?`)
    }
  }, [urlUber])

  return (
    <Button
      size={'lg'}
      onPress={() => {
        !params.venueProfileId ||
        (!PData?.publicVenue?.Venue?.Location?.Geometry?.latitude &&
          !PData?.publicVenue?.Venue?.Location?.Geometry?.latitude)
          ? handleUberNoVenuePress()
          : handleUberWithVenuePress()
      }}
      className="w-full items-center justify-center rounded-xl bg-black">
      <FontAwesome5 name={'uber'} color={'white'} size={20} />
      <ButtonText className="ml-2 dark:color-white">
        {PLoading ? 'loading' : 'Open Uber'}
      </ButtonText>
    </Button>
  )
}

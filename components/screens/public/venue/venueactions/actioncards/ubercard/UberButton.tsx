import { useReactiveVar } from '@apollo/client'
import { UBER_CLIENT_ID_KEY } from '@env'
import { FontAwesome5 } from '@expo/vector-icons'
import { Button, ButtonText } from '@gluestack-ui/themed'
import { usePublicVenueQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useCallback } from 'react'
import { Alert, Linking } from 'react-native'

export default function UberButton({ params }) {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const {
		data: PData,
		loading: PLoading,
		error: PError,
	} = usePublicVenueQuery({
		skip: !params.profileid || !rAuthorizationVar,
		fetchPolicy: 'cache-only',
		variables: {
			where: {
				id: { equals: String(params.profileid) },
			},
		},
	})

	const urlUberWithVenue = `https://m.uber.com/ul/?client_id=${UBER_CLIENT_ID_KEY}&action=setPickup&pickup[my_location]&pickup[nickname]=MyLocation&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=${PData?.publicVenue?.Venue?.Location?.Geometry?.latitude}&dropoff[longitude]=${PData?.publicVenue?.Venue?.Location?.Geometry?.longitude}&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`
	const urlUber = `https://m.uber.com/ul/?client_id=${UBER_CLIENT_ID_KEY}&action=setPickup&pickup[my_location]&pickup[nickname]=MyLocation&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`

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
			bg={'$black'}
			p={3.5}
			w={'$full'}
			size={'lg'}
			alignItems='center'
			justifyContent='center'
			rounded={'$full'}
			onPress={() => {
				!params.profileid ||
				(!PData?.publicVenue?.Venue?.Location?.Geometry?.latitude &&
					!PData?.publicVenue?.Venue?.Location?.Geometry?.latitude)
					? handleUberNoVenuePress()
					: handleUberWithVenuePress()
			}}
		>
			<FontAwesome5 name={'uber'} color={'white'} size={20} />
			<ButtonText ml={'$1'}>{PLoading ? 'loading' : 'Open Uber'}</ButtonText>
		</Button>
	)
}

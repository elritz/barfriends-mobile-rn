// TODO: FX() Need profile item id for routing
// TODO: UX() Item need to be updated for messageboard route
// TODO: UX() Item need to be updated for Personal data, loading, error
import { Pressable } from '@components/core'
import { Profile } from '@graphql/generated'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { View } from 'react-native'

type PersonalAtVenueProps = {
	item: Profile // Personal
}

const PersonalAtVenue = ({ item }: PersonalAtVenueProps) => {
	const router = useRouter()
	return (
		<Pressable
			key={uniqueId()}
			flexGrow={1}
			mx={'$1'}
			alignSelf={'center'}
			onPress={() => {
				router.push({
					pathname: '(app)/public/venue',
					params: {
						profileid: '',
					},
				})
			}}
		>
			{/* <Image
				source={{ uri: item.photos[0].url }}
				alt={'User image'}
				borderRadius={'xl'}
				style={{
					width: '100%',
					height,
					borderWidth: 3,
					borderColor: 'white',
				}}
			/> */}
			<View
				style={{
					width: '100%',
					justifyContent: 'flex-start',
				}}
			>
				{/* <Text fontSize={'xs'}>{item.name}</Text> */}
			</View>
		</Pressable>
	)
}

export default PersonalAtVenue

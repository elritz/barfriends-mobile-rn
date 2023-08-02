import Actions from './actions/Actions'
import { HStack, VStack } from '@components/core'
import CurrentVenue from '@components/screens/public/personal/currentvenue/CurrentVenue'
import Relationships from '@components/screens/public/personal/relationship/Relationships'
import { PersonalProfileStackParamList } from '@ctypes/app'
import { useProfileQuery } from '@graphql/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'

export type PublicPersonalRouteProp = RouteProp<
	PersonalProfileStackParamList,
	'PublicPersonalScreen'
>

const PersonalScreen = (props: any) => {
	const route = useRoute<PublicPersonalRouteProp>()

	const {
		data: PQData,
		loading: PQLoading,
		error: PQError,
	} = useProfileQuery({
		skip: !route.params?.profileId,
		variables: {
			where: {
				id: {
					equals: route.params.profileId,
				},
			},
		},
		onCompleted: data => {},
	})

	if (PQLoading && !PQData?.profile) return null

	return (
		<ScrollView
			style={{
				paddingTop: 4,
				marginHorizontal: 3,
			}}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
		>
			{/* <Photos story={PQData?.profile?.tonightStory} photo={PQData?.profile?.photos[0]} /> */}
			{/* <ProfilePhoto /> */}
			<VStack space={'$3'}>
				<Actions profile={PQData?.profile} />
				<HStack
					space={'md'}
					sx={{
						h: 200,
					}}
				>
					{PQData?.profile?.Personal?.LiveOutPersonal?.Out.length ? <CurrentVenue /> : null}
					<Relationships />
				</HStack>
			</VStack>
		</ScrollView>
	)
}

export default PersonalScreen

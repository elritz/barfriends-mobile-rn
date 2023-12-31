import Actions from './actions/Actions'
import { HStack, VStack } from '@gluestack-ui/themed'
import CurrentVenue from '@components/screens/public/personal/currentvenue/CurrentVenue'
import Relationships from '@components/screens/public/personal/relationship/Relationships'
import { Profile, useProfileQuery } from '@graphql/generated'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'

const PersonalScreen = (props: any) => {
	const route = useRoute()

	const {
		data: PQData,
		loading: PQLoading,
		error: PQError,
	} = useProfileQuery({
		skip: !(route.params as { username?: string })?.username,
		variables: {
			where: {
				IdentifiableInformation: {
					username: {
						equals: String((route.params as { username?: string })?.username),
					},
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
			<VStack space={'md'}>
				<Actions profile={PQData?.profile as Profile} />
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

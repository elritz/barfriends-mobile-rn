// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import { useReactiveVar } from '@apollo/client'
import { Button, HStack, Heading, Text, VStack } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useGlobalSearchParams } from 'expo-router'

export default function LeaveSection() {
	const params = useGlobalSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const [removePersonalJoinsVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useRemovePersonalJoinsVenueMutation({
			onCompleted: async data => {
				if (data.removePersonalJoinsVenue) {
					const profile = data.removePersonalJoinsVenue as Profile
					const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
					const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile
					if (
						profile?.Personal?.LiveOutPersonal?.Out &&
						deviceprofile?.Profile?.Personal?.LiveOutPersonal
					) {
						AuthorizationReactiveVar({
							...deviceManager,
							DeviceProfile: {
								...deviceprofile,
								Profile: {
									...deviceprofile.Profile,
									Personal: {
										...deviceprofile.Profile.Personal,
										LiveOutPersonal: {
											...deviceprofile.Profile.Personal.LiveOutPersonal,
											Out: profile.Personal.LiveOutPersonal.Out,
										},
									},
								},
							},
						})
					}
				}
			},
			refetchQueries: [
				{
					query: GET_LIVE_VENUE_TOTALS_QUERY,
					variables: {
						profileidVenue: params.profileid,
					},
				},
			],
		})

	if (
		rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out[0]?.venueProfileId ===
		params.profileid
	) {
		return (
			<HStack mt={'$3'} px={'$3'} justifyContent={'space-between'} w={'$full'}>
				<HStack alignItems={'center'}>
					<Heading
						fontWeight={'$black'}
						textTransform={'uppercase'}
						fontSize={'$md'}
						numberOfLines={1}
						sx={{
							h: 20,
							lineHeight: 20,
						}}
					>
						You're joined{'\n'}
					</Heading>
				</HStack>
				<Button
					onPress={() => {
						removePersonalJoinsVenueMutation()
					}}
					justifyContent='space-between'
					rounded={'$md'}
				>
					<Ionicons
						name={'ios-exit'}
						size={25}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
					/>
					<Text>{JVLoading ? 'Leaving' : 'Leave'}</Text>
				</Button>
			</HStack>
		)
	} else {
		return null
	}
}

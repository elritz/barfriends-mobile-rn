// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import { useReactiveVar } from '@apollo/client'
import { Button, HStack, Heading, ButtonText } from '@gluestack-ui/themed'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceProfile,
	Profile,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useGlobalSearchParams } from 'expo-router'

export default function LeaveSection() {
	const params = useGlobalSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [removePersonalJoinsVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useRemovePersonalJoinsVenueMutation({
			onCompleted: async data => {
				if (data.removePersonalJoinsVenue) {
					const profile = data.removePersonalJoinsVenue as Profile
					const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile
					if (
						profile?.Personal?.LiveOutPersonal?.Out &&
						deviceprofile?.Profile?.Personal?.LiveOutPersonal
					) {
						AuthorizationReactiveVar({
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
						})
					}
				}
			},
			refetchQueries: [
				{
					query: GET_LIVE_VENUE_TOTALS_QUERY,
					variables: {
						profileidVenue: params.venueProfileId,
					},
				},
			],
		})

	if (
		rAuthorizationVar?.Profile?.Personal?.LiveOutPersonal?.Out.some(
			item => item.venueProfileId === params.venueProfileId,
		)
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
					size='sm'
					variant='outline'
				>
					<ButtonText>{JVLoading ? 'Leaving' : 'Leave'}</ButtonText>
				</Button>
			</HStack>
		)
	} else {
		return null
	}
}

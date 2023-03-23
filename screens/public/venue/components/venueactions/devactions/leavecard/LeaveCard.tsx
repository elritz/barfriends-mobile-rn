import { useReactiveVar } from '@apollo/client'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	ClientDeviceManager,
	ClientDeviceProfile,
	Profile,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { useRouter, useSearchParams } from 'expo-router'
import { Button, VStack, Box } from 'native-base'
import { useEffect, useState } from 'react'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function LeaveCard() {
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [isLeaving, setIsLeaving] = useState(false)
	const [isJoined, setIsJoined] = useState(false)
	const [outId, setOutId] = useState('')

	useEffect(() => {
		const joinedToVenue =
			rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
				return item.venueProfileId
			})
		const out = rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.find(
			item => item.venueProfileId === String(params.profileid),
		)
		if (out) {
			setOutId(out.id)
		}

		setIsJoined(joinedToVenue?.includes(String(params.profileid)))
	}, [rAuthorizationVar, isJoined])

	const [removePersonalJoinsVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useRemovePersonalJoinsVenueMutation({
			variables: {
				outId,
			},
			onCompleted: async data => {
				if (data.removePersonalJoinsVenue) {
					const profile = data.removePersonalJoinsVenue as Profile
					const deviceManager = rAuthorizationVar as ClientDeviceManager
					const deviceprofile = rAuthorizationVar?.DeviceProfile as ClientDeviceProfile
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
						profileIdVenue: String(params.profileid),
					},
				},
			],
		})

	return (
		<VStack>
			<Box>
				<Button
					onPress={() => {
						removePersonalJoinsVenueMutation()
					}}
					textAlign={'center'}
					backgroundColor={'red.600'}
					borderRadius={'lg'}
					_text={{
						fontWeight: '700',
						fontSize: 'md',
					}}
					isDisabled={!isJoined}
					isLoading={JVLoading}
					w={'100'}
				>
					{isLeaving ? 'Leaving' : 'Leave'}
				</Button>
			</Box>
		</VStack>
	)
}
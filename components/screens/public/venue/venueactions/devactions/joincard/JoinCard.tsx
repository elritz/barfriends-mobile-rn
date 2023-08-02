// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import { useReactiveVar } from '@apollo/client'
import { Box, Button, CheckCircleIcon, VStack } from '@components/core'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useAddPersonalJoinsVenueMutation,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

export default function JoinCard() {
	const params = useLocalSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [outId, setOutId] = useState('')
	const [isJoined, setIsJoined] = useState(false)

	useEffect(() => {
		if (rAuthorizationVar?.DeviceProfile?.Profile?.Personal) {
			const joinedToVenue =
				rAuthorizationVar.DeviceProfile.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
					return item.venueProfileId
				})
			const out = rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.find(
				item => item.venueProfileId === params.profileid,
			)
			if (out) {
				setOutId(out.id)
			}
			if (joinedToVenue) {
				setIsJoined(joinedToVenue.includes(String(params.profileid)))
			}
		}
	}, [rAuthorizationVar, isJoined])

	const [addPersonalJoinVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useAddPersonalJoinsVenueMutation({
			variables: {
				profileIdVenue: String(params.profileid),
			},
			onCompleted: async data => {
				if (data.addPersonalJoinsVenue) {
					const profile = data.addPersonalJoinsVenue as Profile
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
					setIsJoined(true)
				}
			},
			refetchQueries: [
				{
					query: GET_LIVE_VENUE_TOTALS_QUERY,
					variables: {
						profileIdVenue: params.profileid,
					},
				},
			],
		})

	const [
		removePersonalJoinsVenueMutation,
		{ data: RPJVData, loading: RPJVLoading, error: RPJVError },
	] = useRemovePersonalJoinsVenueMutation({
		onCompleted: async data => {
			if (data.removePersonalJoinsVenue) {
				setIsJoined(false)
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
					profileIdVenue: params.profileid,
				},
			},
		],
	})

	return (
		<VStack>
			<Box bg={'transparent'}>
				<Button
					onPress={() => {
						if (rAuthorizationVar?.DeviceProfile) {
							isJoined ? removePersonalJoinsVenueMutation() : addPersonalJoinVenueMutation()
						}
					}}
					isDisabled={JVLoading || RPJVLoading}
					rounded={'$md'}
					sx={{
						w: 100,
					}}
				>
					<Button.Text>{!JVLoading ? (isJoined ? 'Joined' : 'Join') : 'Joining'}</Button.Text>
					{isJoined && <CheckCircleIcon size='5' mt='0.5' color='white' />}
				</Button>
			</Box>
		</VStack>
	)
}

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import { useReactiveVar } from '@apollo/client'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useAddPersonalTotalsVenueMutation,
	useProfileLazyQuery,
	useRemovePersonalTotalsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import { Button, VStack, Box, CheckCircleIcon } from 'native-base'
import { useEffect, useState } from 'react'

export default function TotalCard() {
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [isTotaled, setIsTotaled] = useState(false)

	const [
		addPersonalTotalsVenueMutation,
		{ data: APTVData, loading: APTVLoading, error: APTVError },
	] = useAddPersonalTotalsVenueMutation({
		variables: {
			profileIdVenue: String(params.profileid),
		},
		onCompleted: async data => {
			profileQuery({
				variables: {
					where: {
						id: {
							equals: rAuthorizationVar?.DeviceProfile?.Profile?.id,
						},
					},
				},
				onCompleted: data => {
					if (data.profile) {
						const profile = data.profile as Profile
						const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
						const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile

						AuthorizationReactiveVar({
							...deviceManager,
							DeviceProfile: {
								...deviceprofile,
								Profile: profile,
							},
						})
						const totaledToVenue = data?.profile?.Personal?.LiveOutPersonal?.Out.map(item => {
							return item.venueProfileId
						})
						if (totaledToVenue) {
							setIsTotaled(totaledToVenue.includes(params.profileid))
						}
					}
				},
			})
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
	const [
		removePersonalTotalsVenueMutation,
		{ data: RPTVData, loading: RPTVLoading, error: RPTVError },
	] = useRemovePersonalTotalsVenueMutation({
		variables: {
			profileIdVenue: String(params.profileid),
		},
		onCompleted: async data => {
			profileQuery({
				variables: {
					where: {
						id: {
							equals: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
						},
					},
				},
				onCompleted: data => {
					if (data.profile) {
						const profile = data.profile as Profile
						const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
						const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile

						AuthorizationReactiveVar({
							...deviceManager,
							DeviceProfile: {
								...deviceprofile,
								Profile: profile,
							},
						})
						const totaledToVenue = data?.profile?.Personal?.LiveOutPersonal?.Out.map(item => {
							return item.venueProfileId
						})

						setIsTotaled(totaledToVenue.includes(params.profileid))
					}
				},
			})
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

	const [profileQuery, { data: PData, loading: PLoading, error: PError }] = useProfileLazyQuery()

	useEffect(() => {
		if (rAuthorizationVar?.DeviceProfile?.Profile?.Personal) {
			const totaledToVenue =
				rAuthorizationVar.DeviceProfile.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
					return item.venueProfileId
				})

			if (totaledToVenue) {
				setIsTotaled(totaledToVenue.includes(String(params.profileid)))
			}
		}
	}, [])

	return (
		<VStack>
			<Box>
				<Button
					onPress={() => {
						if (rAuthorizationVar?.DeviceProfile) {
							!isTotaled ? addPersonalTotalsVenueMutation() : removePersonalTotalsVenueMutation()
						}
					}}
					bg={'blue.500'}
					width={'full'}
					borderRadius={'md'}
					textAlign={'center'}
					_text={{
						fontWeight: '700',
						fontSize: 'md',
					}}
					w={'100'}
					rightIcon={isTotaled && <CheckCircleIcon size='5' mt='0.5' color='white' />}
				>
					{!APTVLoading ? <>{isTotaled ? 'Totaled' : 'Total'}</> : 'Totaling'}
				</Button>
			</Box>
		</VStack>
	)
}
import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { CheckCircleIcon } from "#/components/ui/icon";
import { Button, ButtonIcon, ButtonText } from "#/components/ui/button";
// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import { useReactiveVar } from '@apollo/client'
// import { GET_LIVE_VENUE_TOTALS_QUERY } from '#/graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceProfile,
	Profile,
	// useAddPersonalTotalsVenueMutation,
	useProfileLazyQuery,
	// useRemovePersonalTotalsVenueMutation,
} from '#/graphql/generated'
import { AuthorizationReactiveVar } from '#/reactive'
import { useGlobalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

export default function TotalCard() {
	const params = useGlobalSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [isTotaled, setIsTotaled] = useState(false)

	// const [
	// 	addPersonalTotalsVenueMutation,
	// 	{ data: APTVData, loading: APTVLoading, error: APTVError },
	// ] = useAddPersonalTotalsVenueMutation({
	// 	variables: {
	// 		profileIdVenue: String(params.venueProfileId),
	// 	},
	// 	onCompleted: async data => {
	// 		profileQuery({
	// 			variables: {
	// 				where: {
	// 					id: {
	// 						equals: rAuthorizationVar?.Profile?.id,
	// 					},
	// 				},
	// 			},
	// 			onCompleted: data => {
	// 				if (data.profile) {
	// 					const profile = data.profile as Profile
	// 					const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile

	// 					AuthorizationReactiveVar({
	// 						...deviceprofile,
	// 						Profile: profile,
	// 					})
	// 					const totaledToVenue: String[] | undefined =
	// 						data?.profile?.Personal?.LiveOutPersonal?.Out.map(item => {
	// 							return item.venueProfileId
	// 						})
	// 					if (totaledToVenue) {
	// 						setIsTotaled(totaledToVenue.includes(String(params.venueProfileId)))
	// 					}
	// 				}
	// 			},
	// 		})
	// 	},
	// 	refetchQueries: [
	// 		{
	// 			query: GET_LIVE_VENUE_TOTALS_QUERY,
	// 			variables: {
	// 				profileIdVenue: String(params.venueProfileId),
	// 			},
	// 		},
	// 	],
	// })

	// const [
	// 	removePersonalTotalsVenueMutation,
	// 	{ data: RPTVData, loading: RPTVLoading, error: RPTVError },
	// ] = useRemovePersonalTotalsVenueMutation({
	// 	variables: {
	// 		profileIdVenue: String(params.venueProfileId),
	// 	},
	// 	onCompleted: async data => {
	// 		profileQuery({
	// 			variables: {
	// 				where: {
	// 					id: {
	// 						equals: String(rAuthorizationVar?.Profile?.id),
	// 					},
	// 				},
	// 			},
	// 			onCompleted: data => {
	// 				if (data.profile) {
	// 					const profile = data.profile as Profile
	// 					const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile

	// 					AuthorizationReactiveVar({
	// 						...deviceprofile,
	// 						Profile: profile,
	// 					})
	// 					const totaledToVenue: String[] | undefined =
	// 						data?.profile?.Personal?.LiveOutPersonal?.Out.map(item => {
	// 							return item.venueProfileId
	// 						})
	// 					if (totaledToVenue) {
	// 						setIsTotaled(totaledToVenue.includes(String(params.venueProfileId)))
	// 					}
	// 				}
	// 			},
	// 		})
	// 	},
	// 	refetchQueries: [
	// 		{
	// 			query: GET_LIVE_VENUE_TOTALS_QUERY,
	// 			variables: {
	// 				profileIdVenue: String(params.venueProfileId),
	// 			},
	// 		},
	// 	],
	// })

	const [profileQuery, { data: PData, loading: PLoading, error: PError }] = useProfileLazyQuery()

	useEffect(() => {
		if (rAuthorizationVar?.Profile?.Personal) {
			const totaledToVenue = rAuthorizationVar.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
				return item.venueProfileId
			})

			if (totaledToVenue) {
				setIsTotaled(totaledToVenue.includes(String(params.venueProfileId)))
			}
		}
	}, [])

	return (
        <VStack>
            <Button className="bg-blue-500 rounded-md">
				{isTotaled && <ButtonIcon as={CheckCircleIcon} size={'md'} className="mr-1 text-white" />}
				<ButtonText className="text-white">{isTotaled ? 'Totaled' : 'Total'}</ButtonText>
			</Button>
        </VStack>
    );
}

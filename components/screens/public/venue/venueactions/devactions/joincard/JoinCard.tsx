// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import { Box, Button, CheckCircleIcon, VStack, ButtonText, ButtonIcon } from '@gluestack-ui/themed'
import {
	useAddPersonalJoinsVenue2Mutation,
	useGetLiveVenueTotalsV2Query,
	useRefreshDeviceManagerQuery,
} from '#/graphql/generated'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

export default function JoinCard() {
	const params = useLocalSearchParams()
	const [isJoined, setIsJoined] = useState(false)
	const { data: rdmData, loading: rdmLoading, error: rdmError } =
		useRefreshDeviceManagerQuery({
			fetchPolicy: 'cache-first',
		})

	const { data: glvtData, loading: glvtLoading, error: glvtError } = useGetLiveVenueTotalsV2Query({
		skip: !String(params.venueProfileId),
		fetchPolicy: 'cache-first',
		variables: {
			profileIdVenue: String(params.venueProfileId),
		},
		onCompleted: async data => {
			if (data.getLiveVenueTotalsV2.__typename === 'LiveVenueTotals2') {
				data.getLiveVenueTotalsV2.out?.some(item => {
					if (data.getLiveVenueTotalsV2.__typename === 'LiveVenueTotals2' && rdmData?.refreshDeviceManager.__typename === 'AuthorizationDeviceProfile') {
						if (item.personalProfileId === rdmData?.refreshDeviceManager.Profile?.id) {
							setIsJoined(true)
						}
					}
				})
			}
		}
	})

	const [addPersonalJoinVenue2Mutation, { data: JVData2, loading: JVLoading2, error: JVError2 }] = useAddPersonalJoinsVenue2Mutation({

		variables: {
			profileIdVenue: String(params.venueProfileId),
		},
		update: (cache, { data }) => {
			if (data?.addPersonalJoinsVenue2.__typename === 'LiveVenueTotals2') {

				cache.modify({
					id: cache.identify(data.addPersonalJoinsVenue2),
					fields: {
						joined: () => data.addPersonalJoinsVenue2.__typename === 'LiveVenueTotals2' && data.addPersonalJoinsVenue2.joined ? data.addPersonalJoinsVenue2.joined : 0,
						totaled: () => data.addPersonalJoinsVenue2.__typename === 'LiveVenueTotals2' && data.addPersonalJoinsVenue2.totaled ? data.addPersonalJoinsVenue2.totaled : 0,
						// out: () => data.addPersonalJoinsVenue2.__typename === 'LiveVenueTotals2' && data.addPersonalJoinsVenue2.updateOut ? [data.addPersonalJoinsVenue2.updateOut] : []
						out(existingOut, { toReference }) {

							return [...existingOut, data?.addPersonalJoinsVenue2.updateOut]
						}
					}
				})
			}

			if (data?.addPersonalJoinsVenue2.__typename === 'LiveVenueTotals2' && rdmData?.refreshDeviceManager.__typename === 'AuthorizationDeviceProfile') {
				if (rdmData.refreshDeviceManager.Profile?.Personal?.LiveOutPersonal) {

					cache.modify({
						id: cache.identify(rdmData.refreshDeviceManager.Profile?.Personal?.LiveOutPersonal),
						fields: {
							Out(existingOut, { toReference }) {
								return [...existingOut, toReference(data?.addPersonalJoinsVenue2.updateOut, true)]
							}
						}
					})
				}


			}
		}
	})

	useEffect(() => {
		if (glvtData && glvtData.getLiveVenueTotalsV2.__typename === 'LiveVenueTotals2') {
			if (glvtData.getLiveVenueTotalsV2.out?.length) {
				glvtData.getLiveVenueTotalsV2.out?.some(item => {
					if (glvtData.getLiveVenueTotalsV2.__typename === 'LiveVenueTotals2' && rdmData?.refreshDeviceManager.__typename === 'AuthorizationDeviceProfile') {
						if (item.personalProfileId === rdmData?.refreshDeviceManager.Profile?.id) {
							setIsJoined(true)
						} else {
							setIsJoined(false)
						}
					}
				})
			} else {
				setIsJoined(false)
			}
		}
	}, [rdmData, glvtData])

	return (
		<VStack>
			<Box bg={'transparent'}>
				<Button
					onPress={() => {
						addPersonalJoinVenue2Mutation()
					}}
					isDisabled={JVLoading2 || isJoined}
					rounded={'$md'}
				>
					<ButtonText>{!JVLoading2 ? (isJoined ? 'Joined' : 'Join') : 'Joining'}</ButtonText>
					{isJoined && <ButtonIcon as={CheckCircleIcon} size={'md'} ml={'$1'} color='$white' />}
				</Button>
			</Box>
		</VStack>
	)
}

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import { useReactiveVar } from '@apollo/client'
import { Button, HStack, Heading, ButtonText } from '@gluestack-ui/themed'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceProfile,
	Profile,
	useGetLiveVenueTotalsV2Query,
	useRefreshDeviceManagerQuery,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useGlobalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

export default function LeaveSection() {
	const params = useGlobalSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
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


	useEffect(() => {
		if (glvtData && glvtData.getLiveVenueTotalsV2.__typename === 'LiveVenueTotals2') {
			if (glvtData.getLiveVenueTotalsV2.out?.length) {
				glvtData.getLiveVenueTotalsV2.out?.some(item => {
					console.log('--------------------- :>> ', item);
					if (glvtData.getLiveVenueTotalsV2.__typename === 'LiveVenueTotals2' && rdmData?.refreshDeviceManager.__typename === 'AuthorizationDeviceProfile') {
						if (item.personalProfileId === rdmData?.refreshDeviceManager.Profile?.id) {
							setIsJoined(true)
						} else {
							setIsJoined(false)
						}
					}
				})
			} else {
				console.log('here :>> ',);
				setIsJoined(false)
			}
		}
	}, [glvtData])


	if (rdmData?.refreshDeviceManager.__typename === 'Error') {
		return null
	}

	if (rdmData?.refreshDeviceManager.__typename === 'AuthorizationDeviceProfile') {
		return (
			<>{isJoined ?
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
							console.log("TODO LEAVE")
							// removePersonalJoinsVenueMutation()
						}}
						justifyContent='space-between'
						rounded={'$md'}
						size='sm'
						variant='outline'
					>
						{/* <ButtonText>{JVLoading ? 'Leaving' : 'Leave'}</ButtonText> */}
						<ButtonText>{'Leave'}</ButtonText>
					</Button>
				</HStack> : <></>
			}
			</>
		)
	}
}
import {useLocalSearchParams} from 'expo-router'

import {
  useGetLiveVenueTotalsV2Query,
  useRefreshDeviceManagerQuery,
  useRemoveAllJoinedTotalFromVenueMutation,
} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {VStack} from '#/src/components/ui/vstack'

export default function LeaveAllCard() {
  const params = useLocalSearchParams()

  const {data: rdmData} = useRefreshDeviceManagerQuery()

  const {data: glvtData, loading: glvtLoading} = useGetLiveVenueTotalsV2Query({
    skip: !String(params.venueProfileId),
    fetchPolicy: 'cache-first',
    variables: {
      profileIdVenue: String(params.venueProfileId),
    },
  })

  const [removeAllJoinedTotaledVenueMutation, {loading: rpjvLoading}] =
    useRemoveAllJoinedTotalFromVenueMutation({
      variables: {
        profileIdVenue: String(params.venueProfileId),
      },
      update: (cache, {data}) => {
        if (
          data?.removeAllJoinedTotalFromVenue?.__typename ===
            'LiveVenueTotals2' &&
          rdmData?.refreshDeviceManager?.__typename ===
            'AuthorizationDeviceProfile'
        ) {
          if (
            glvtData?.getLiveVenueTotalsV2?.__typename === 'LiveVenueTotals2'
          ) {
            if (
              rdmData.refreshDeviceManager.Profile?.Personal?.LiveOutPersonal
            ) {
              cache.modify({
                id: cache.identify(
                  rdmData.refreshDeviceManager.Profile?.Personal
                    ?.LiveOutPersonal,
                ),
                fields: {
                  Out() {
                    return []
                  },
                },
              })
            }
          }
        }
      },
    })

  return (
    <VStack>
      <Box className="bg-transparent">
        <Button
          onPress={() => {
            removeAllJoinedTotaledVenueMutation()
          }}
          isDisabled={glvtLoading || rpjvLoading}
          className="rounded-md bg-error-600">
          <ButtonText>{rpjvLoading ? 'Leaving All' : 'Leave All'}</ButtonText>
        </Button>
      </Box>
    </VStack>
  )
}

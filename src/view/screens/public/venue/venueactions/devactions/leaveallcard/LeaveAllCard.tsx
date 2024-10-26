import {VStack} from '#/src/components/ui/vstack'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Box} from '#/src/components/ui/box'
import {
  useGetLiveVenueTotalsV2Query,
  useRefreshDeviceManagerQuery,
  useRemoveAllJoinedTotalFromVenueMutation,
} from '#/graphql/generated'
import {useLocalSearchParams} from 'expo-router'
import {useEffect, useState} from 'react'

export default function LeaveAllCard() {
  const params = useLocalSearchParams()

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery()

  const {
    data: glvtData,
    loading: glvtLoading,
    error: glvtError,
  } = useGetLiveVenueTotalsV2Query({
    skip: !String(params.venueProfileId),
    fetchPolicy: 'cache-first',
    variables: {
      profileIdVenue: String(params.venueProfileId),
    },
  })

  const [
    removeAllJoinedTotaledVenueMutation,
    {data: rpjvData, loading: rpjvLoading, error: rpjvError},
  ] = useRemoveAllJoinedTotalFromVenueMutation({
    variables: {
      profileIdVenue: String(params.venueProfileId),
    },
    onError: error => {
      // TODO: Handle error
    },
    update: (cache, {data}) => {
      if (
        data?.removeAllJoinedTotalFromVenue.__typename === 'LiveVenueTotals2' &&
        rdmData?.refreshDeviceManager.__typename ===
          'AuthorizationDeviceProfile'
      ) {
        if (glvtData?.getLiveVenueTotalsV2.__typename === 'LiveVenueTotals2') {
          if (rdmData.refreshDeviceManager.Profile?.Personal?.LiveOutPersonal) {
            cache.modify({
              id: cache.identify(
                rdmData.refreshDeviceManager.Profile?.Personal?.LiveOutPersonal,
              ),
              fields: {
                Out(existingItemsRefs, {readField}) {
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

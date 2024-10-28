import {useEffect, useState} from 'react'
import {useLocalSearchParams} from 'expo-router'

import {
  useGetLiveVenueTotalsV2Query,
  useRefreshDeviceManagerQuery,
  useRemovePersonalJoinsVenue2Mutation,
  useRemovePersonalTotalsVenue2Mutation,
} from '#/graphql/generated'
import {Button, ButtonText} from '#/src/components/ui/button'
import {VStack} from '#/src/components/ui/vstack'

export default function LeaveCard() {
  const params = useLocalSearchParams()
  const [isTotaled, setIsTotaled] = useState(false)

  const {data: rdmData} = useRefreshDeviceManagerQuery()

  const {data: glvtData} = useGetLiveVenueTotalsV2Query({
    skip: !String(params.venueProfileId),
    fetchPolicy: 'cache-first',
    variables: {
      profileIdVenue: String(params.venueProfileId),
    },
    onCompleted: async data => {
      if (data.getLiveVenueTotalsV2?.__typename === 'LiveVenueTotals2') {
        data.getLiveVenueTotalsV2.out?.some(item => {
          if (
            data.getLiveVenueTotalsV2?.__typename === 'LiveVenueTotals2' &&
            rdmData?.refreshDeviceManager?.__typename ===
              'AuthorizationDeviceProfile'
          ) {
            if (
              item.personalProfileId ===
              rdmData?.refreshDeviceManager.Profile?.id
            ) {
              setIsTotaled(true)
            }
          }
        })
      }
    },
  })

  const [removePersonalJoinsVenueMutation, {loading: JVLoading}] =
    useRemovePersonalTotalsVenue2Mutation({
      variables: {
        profileIdVenue: String(params.venueProfileId),
      },
      update: (cache, {data}) => {
        if (glvtData?.getLiveVenueTotalsV2?.__typename === 'LiveVenueTotals2') {
          if (data?.removePersonalTotalsVenue2?.updateOut?.id) {
            if (
              rdmData?.refreshDeviceManager?.Profile?.Personal?.LiveOutPersonal
            ) {
              const tobeRemoved = cache.identify(
                data.removePersonalTotalsVenue2.updateOut,
              )
              cache.modify({
                id: cache.identify(
                  rdmData.refreshDeviceManager.Profile?.Personal
                    ?.LiveOutPersonal,
                ),
                fields: {
                  Out(existingItemsRefs, {toReference}) {
                    return existingItemsRefs.filter(
                      itemRef => itemRef === toReference(tobeRemoved),
                    )
                  },
                },
              })
            }
          }
        }

        if (
          data?.removePersonalTotalsVenue2?.__typename === 'LiveVenueTotals2' &&
          rdmData?.refreshDeviceManager?.__typename ===
            'AuthorizationDeviceProfile'
        ) {
          setIsTotaled(false)
          if (data.removePersonalTotalsVenue2.updateOut?.id) {
            const tobeRemoved = cache.identify(
              data.removePersonalTotalsVenue2.updateOut,
            )
            cache.modify({
              id: cache.identify(data.removePersonalTotalsVenue2),
              fields: {
                joined: () =>
                  data.removePersonalTotalsVenue2?.__typename ===
                    'LiveVenueTotals2' && data.removePersonalTotalsVenue2.joined
                    ? data.removePersonalTotalsVenue2.joined
                    : 0,
                totaled: () =>
                  data.removePersonalTotalsVenue2?.__typename ===
                    'LiveVenueTotals2' &&
                  data.removePersonalTotalsVenue2.totaled
                    ? data.removePersonalTotalsVenue2.totaled
                    : 0,
                out(existingItemsRefs, {toReference}) {
                  return existingItemsRefs.filter(
                    itemRef => itemRef === toReference(tobeRemoved),
                  )
                },
              },
            })
          }
        }
      },
    })

  useEffect(() => {
    if (
      glvtData &&
      glvtData.getLiveVenueTotalsV2?.__typename === 'LiveVenueTotals2'
    ) {
      if (glvtData.getLiveVenueTotalsV2.out?.length) {
        glvtData.getLiveVenueTotalsV2.out?.some(item => {
          if (
            glvtData.getLiveVenueTotalsV2?.__typename === 'LiveVenueTotals2' &&
            rdmData?.refreshDeviceManager?.__typename ===
              'AuthorizationDeviceProfile'
          ) {
            if (
              item.personalProfileId ===
              rdmData?.refreshDeviceManager.Profile?.id
            ) {
              setIsTotaled(true)
            } else {
              setIsTotaled(false)
            }
          }
        })
      } else {
        setIsTotaled(false)
      }
    }
  }, [rdmData, glvtData])

  return (
    <VStack>
      <Button
        onPress={() => {
          removePersonalJoinsVenueMutation()
        }}
        isDisabled={!isTotaled || JVLoading}
        className="rounded-md bg-blue-600">
        <ButtonText className="text-white">Leave Totaled</ButtonText>
      </Button>
    </VStack>
  )
}

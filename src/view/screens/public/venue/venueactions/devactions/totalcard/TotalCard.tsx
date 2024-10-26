import {VStack} from '#/src/components/ui/vstack'
import {Text} from '#/src/components/ui/text'
import {CheckCircleIcon} from '#/src/components/ui/icon'
import {Button, ButtonIcon, ButtonText} from '#/src/components/ui/button'
// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import {useReactiveVar} from '@apollo/client'
// import { GET_LIVE_VENUE_TOTALS_QUERY } from '#/graphql/DM/profiling/out/index.query'
import {
  AuthorizationDeviceProfile,
  Profile,
  useAddPersonalTotalsVenue2Mutation,
  useGetLiveVenueTotalsV2Query,
  useProfileLazyQuery,
  useRefreshDeviceManagerQuery,
  // useRemovePersonalTotalsVenueMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import {useGlobalSearchParams} from 'expo-router'
import {useEffect, useState} from 'react'

export default function TotalCard() {
  const params = useGlobalSearchParams()
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const [isTotaled, setIsTotaled] = useState(false)

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

  const [
    addPersonalTotalsVenueMutation,
    {data: APTVData, loading: APTVLoading, error: APTVError},
  ] = useAddPersonalTotalsVenue2Mutation({
    variables: {
      profileIdVenue: String(params.venueProfileId),
    },
    update: (cache, {data}) => {
      if (data?.addPersonalTotalsVenue2?.__typename === 'LiveVenueTotals2') {
        cache.modify({
          id: cache.identify(data.addPersonalTotalsVenue2),
          fields: {
            joined: () =>
              data.addPersonalTotalsVenue2?.__typename === 'LiveVenueTotals2' &&
              data.addPersonalTotalsVenue2.joined
                ? data.addPersonalTotalsVenue2.joined
                : 0,
            totaled: () =>
              data.addPersonalTotalsVenue2?.__typename === 'LiveVenueTotals2' &&
              data.addPersonalTotalsVenue2.totaled
                ? data.addPersonalTotalsVenue2.totaled
                : 0,
            out(existingOut, {toReference}) {
              return [...existingOut, data?.addPersonalTotalsVenue2.updateOut]
            },
          },
        })
      }

      if (
        data?.addPersonalTotalsVenue2?.__typename === 'LiveVenueTotals2' &&
        rdmData?.refreshDeviceManager?.__typename ===
          'AuthorizationDeviceProfile'
      ) {
        if (rdmData.refreshDeviceManager.Profile?.Personal?.LiveOutPersonal) {
          cache.modify({
            id: cache.identify(
              rdmData.refreshDeviceManager.Profile?.Personal?.LiveOutPersonal,
            ),
            fields: {
              Out(existingOut, {toReference}) {
                return [
                  ...existingOut,
                  toReference(data?.addPersonalTotalsVenue2?.updateOut, true),
                ]
              },
            },
          })
        }
      }
    },
  })

  const [profileQuery, {data: PData, loading: PLoading, error: PError}] =
    useProfileLazyQuery()

  useEffect(() => {
    if (
      glvtData &&
      glvtData.getLiveVenueTotalsV2?.__typename === 'LiveVenueTotals2'
    ) {
      if (glvtData.getLiveVenueTotalsV2?.out?.length) {
        glvtData.getLiveVenueTotalsV2?.out?.some(item => {
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
        onPress={() => addPersonalTotalsVenueMutation()}
        className="rounded-md bg-blue-600">
        {isTotaled && (
          <ButtonIcon
            as={CheckCircleIcon}
            size={'md'}
            className="mr-1 text-white"
          />
        )}
        <ButtonText className="text-white">
          {isTotaled ? 'Totaled' : 'Total'}
        </ButtonText>
      </Button>
    </VStack>
  )
}

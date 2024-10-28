import {useEffect, useState} from 'react'
import {useLocalSearchParams} from 'expo-router'

import {
  useAddPersonalJoinsVenue2Mutation,
  useGetLiveVenueTotalsV2Query,
  useRefreshDeviceManagerQuery,
} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonIcon, ButtonText} from '#/src/components/ui/button'
import {CheckCircleIcon} from '#/src/components/ui/icon'
import {VStack} from '#/src/components/ui/vstack'

export default function JoinCard() {
  const params = useLocalSearchParams()
  const [isJoined, setIsJoined] = useState(false)
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
              setIsJoined(true)
            }
          }
        })
      }
    },
  })

  const [addPersonalJoinVenue2Mutation, {loading: JVLoading2}] =
    useAddPersonalJoinsVenue2Mutation({
      variables: {
        profileIdVenue: String(params.venueProfileId),
      },
      update: (cache, {data}) => {
        if (data?.addPersonalJoinsVenue2?.__typename === 'LiveVenueTotals2') {
          cache.modify({
            id: cache.identify(data.addPersonalJoinsVenue2),
            fields: {
              joined: () =>
                data.addPersonalJoinsVenue2?.__typename ===
                  'LiveVenueTotals2' && data.addPersonalJoinsVenue2.joined
                  ? data.addPersonalJoinsVenue2.joined
                  : 0,
              totaled: () =>
                data.addPersonalJoinsVenue2?.__typename ===
                  'LiveVenueTotals2' && data.addPersonalJoinsVenue2.totaled
                  ? data.addPersonalJoinsVenue2.totaled
                  : 0,
              out(existingOut) {
                return [...existingOut, data?.addPersonalJoinsVenue2?.updateOut]
              },
            },
          })
        }

        if (
          data?.addPersonalJoinsVenue2?.__typename === 'LiveVenueTotals2' &&
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
                    toReference(data?.addPersonalJoinsVenue2?.updateOut, true),
                  ]
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
          if (item.type === 'JOIN') {
            if (
              glvtData.getLiveVenueTotalsV2?.__typename ===
                'LiveVenueTotals2' &&
              rdmData?.refreshDeviceManager?.__typename ===
                'AuthorizationDeviceProfile'
            ) {
              if (
                item.personalProfileId ===
                rdmData?.refreshDeviceManager.Profile?.id
              ) {
                setIsJoined(true)
              } else {
                setIsJoined(false)
              }
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
      <Box className="bg-transparent">
        <Button
          onPress={() => addPersonalJoinVenue2Mutation()}
          isDisabled={JVLoading2 || isJoined}
          className="rounded-md">
          <ButtonText>
            {!JVLoading2 ? (isJoined ? 'Joined' : 'Join') : 'Joining'}
          </ButtonText>
          {isJoined && (
            <ButtonIcon
              as={CheckCircleIcon}
              size={'md'}
              className="ml-1 text-white"
            />
          )}
        </Button>
      </Box>
    </VStack>
  )
}

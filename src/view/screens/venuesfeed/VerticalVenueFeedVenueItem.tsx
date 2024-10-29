import {memo, useCallback, useEffect, useState} from 'react'
import {Image} from 'react-native'
import {StyleSheet} from 'react-native'
import {Blurhash} from 'react-native-blurhash'
import {useRouter} from 'expo-router'
// TODO: If user is joined to the venue remove join button show joined
import {useReactiveVar} from '@apollo/client'

import {ProfileVenue, useRefreshDeviceManagerQuery} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'
import {VStack} from '#/src/components/ui/vstack'

type Props = {
  item: Partial<ProfileVenue | null | undefined>
  columnIndex: number
  showJoin?: boolean
  showDistance?: boolean
}

const VerticalVenueFeedVenueItem: React.FC<Props> = ({
  showDistance = true,
  item: venueProfile,
}: Props) => {
  const router = useRouter()
  const [hideBlur, setHideBlur] = useState(false)
  const [distance, setDistance] = useState(0)
  const [metric, setMetric] = useState('m')
  const [_, setLoadingDistance] = useState(false)
  const [__, setCanJoin] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

  const setDist = useCallback(({distanceInM}: {distanceInM: number}) => {
    setLoadingDistance(true)
    if (distanceInM) {
      if (distanceInM > 1000) {
        const val = parseInt((distanceInM / 1000).toFixed(1), 10)
        setDistance(val)
        setMetric('km')
        setCanJoin(false)
      } else {
        setDistance(distanceInM)
        setMetric('m')
        if (distanceInM < 25) {
          setCanJoin(true)
        }
      }
    }
    setTimeout(() => {
      setLoadingDistance(false)
    }, 1000)
  }, [])

  const {} = useRefreshDeviceManagerQuery({
    onCompleted(data) {
      if (
        data.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
      ) {
        if (
          data.refreshDeviceManager?.Profile?.Personal?.LiveOutPersonal?.Out.some(
            item => venueProfile?.venueProfileId === item?.id,
          )
        ) {
          setIsJoined(true)
        }
      }
    },
  })

  useEffect(() => {
    if (venueProfile?.distanceInM) {
      setDist({distanceInM: venueProfile?.distanceInM})
    }
  }, [setDist, venueProfile?.distanceInM])

  useEffect(() => {}, [rAuthorizationVar, isJoined])

  const getTitleCase = (str: string) => {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map((word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join(' ')

    return titleCase
  }

  const _press = () => {
    router.push({
      pathname: `/(app)/public/venue/[username]`,
      params: {
        username: String(venueProfile?.IdentifiableInformation?.username),
        venueProfileId: String(venueProfile?.id),
        distanceInM: Number(venueProfile?.distanceInM),
        latitude: Number(venueProfile?.Venue?.Location?.Geometry?.latitude),
        longitude: Number(venueProfile?.Venue?.Location?.Geometry?.longitude),
      },
    })
  }

  return (
    <Pressable accessibilityRole="button" onPress={() => _press()}>
      <VStack
        space={'md'}
        style={{
          alignSelf: 'center',
          overflow: 'hidden',
        }}
        className="w-[95%] flex-1 p-1.5">
        <Box
          style={{
            minHeight: 260,
          }}>
          <Image
            accessibilityIgnoresInvertColors
            source={{uri: venueProfile?.photos?.[0]?.url}}
            resizeMode="cover"
            onLoadEnd={() => setHideBlur(true)}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 15,
            }}
          />
          {!hideBlur && (
            <>
              {venueProfile?.photos?.[0]?.blurhash && (
                <Blurhash
                  blurhash={String(venueProfile.photos[0].blurhash)}
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                />
              )}
            </>
          )}
        </Box>

        <VStack space={'md'}>
          <Heading
            numberOfLines={2}
            // underline={isPressed}
            ellipsizeMode="tail"
            className="leading-xs text-left text-lg font-bold dark:color-white">
            {getTitleCase(
              venueProfile?.IdentifiableInformation?.fullname ?? '',
            )}
          </Heading>
          {showDistance && (
            <Heading
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-md leading-xs text-left font-bold dark:color-white">
              {distance} {metric}
            </Heading>
          )}
        </VStack>
      </VStack>
    </Pressable>
  )
}
export default memo(VerticalVenueFeedVenueItem)

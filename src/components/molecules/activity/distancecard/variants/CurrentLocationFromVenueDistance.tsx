import {Button} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {Text} from '#/src/components/ui/text'
import {Box} from '#/src/components/ui/box'
// TODO: FN(When a useris joined to a venue action must be different) ln:32

import SignupCard from '../../signupcard/SignupCard'
import {useReactiveVar} from '@apollo/client'
import {MaterialIcons} from '@expo/vector-icons'
import {
  useGetLiveVenueTotalsV2Query,
  usePublicVenueQuery,
} from '#/graphql/generated'
import {useIsFocused} from '@react-navigation/native'
import {
  AuthorizationReactiveVar,
  CurrentLocationReactiveVar,
  SearchAreaReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {useDisclose} from '#/src/util/hooks/useDisclose'
import useGetDistance from '#/src/util/hooks/useDistance'
import {useLocalSearchParams} from 'expo-router'
import {uniqueId} from 'lodash'
import {MotiView} from 'moti'
import {useEffect, useState} from 'react'
import {AppState, StyleSheet} from 'react-native'
import {Easing} from 'react-native-reanimated'
import JoinCard from '#/src/view/screens/public/venue/venueactions/devactions/joincard/JoinCard'

const size = 50

const CurrentLocationFromVenueDistance = () => {
  const params = useLocalSearchParams()
  const isFocused = useIsFocused()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
  const [appState, setAppState] = useState(AppState.currentState)
  const {refreshLocation, canJoin, distance, distanceInM, isLoading, metric} =
    useGetDistance()

  const [friends, setFriends] = useState({value: 0})

  const {
    isOpen: isForegroundLocationOn,
    onOpen: onOpenForegroundLocationOn,
    onClose: onCloseForegroundLocationOn,
    onToggle: onToggleForegroundLocationOn,
  } = useDisclose()

  const {data, loading, error} = usePublicVenueQuery({
    skip: !params.username,
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        IdentifiableInformation: {
          username: {
            equals: String(params.username),
          },
        },
      },
      currentLocationCoords: {
        latitude: rSearchAreaVar.useCurrentLocation
          ? Number(rCurrentLocationVar?.current?.coords.latitude)
          : Number(rSearchAreaVar?.searchArea.coords.latitude),
        longitude: rSearchAreaVar.useCurrentLocation
          ? Number(rCurrentLocationVar?.current?.coords.longitude)
          : Number(rSearchAreaVar?.searchArea.coords.longitude),
      },
    },
    onCompleted: async data => {
      await refreshLocation({
        vlat: data.publicVenue?.Venue?.Location?.Geometry?.latitude,
        vlng: data.publicVenue?.Venue?.Location?.Geometry?.longitude,
      })
    },
  })

  const {
    data: d,
    loading: l,
    error: e,
  } = useGetLiveVenueTotalsV2Query({
    skip: !String(params.venueProfileId),
    variables: {
      profileIdVenue: String(params.venueProfileId),
    },
    onCompleted: async data => {
      if (data.getLiveVenueTotalsV2.__typename === 'LiveVenueTotals2') {
        setFriends({
          value: 1,
        })
      }
    },
  })

  useEffect(() => {
    if (rSearchAreaVar.useCurrentLocation) {
      if (
        AppState.currentState === 'active' &&
        isFocused &&
        distance &&
        !isForegroundLocationOn
      ) {
        if (metric === 'm' && distance < 50) {
          onToggleForegroundLocationOn()
        }
      } else {
        onToggleForegroundLocationOn()
        // unregisterForegroundFetchAsync()
      }
    }
  }, [appState, isFocused])

  const styles = StyleSheet.create({
    dot: {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: '#FF7000',
    },
  })

  const LoadingAnimationLocation = () => {
    return (
      <Box
        style={[
          styles.dot,
          {
            marginLeft: '50%',
            transform: [{translateX: -size / 2}],
            alignContent: 'center',
            justifyContent: 'center',
          },
        ]}
        className="bg-transparent">
        {[...Array(3).keys()].map((item, index) => {
          return (
            <MotiView
              key={uniqueId()}
              style={[styles.dot, StyleSheet.absoluteFillObject]}
              from={{
                opacity: 0.5,
                scale: 1,
              }}
              animate={{
                opacity: 0,
                scale: 2,
              }}
              transition={{
                type: 'timing',
                duration: 2000,
                easing: Easing.out(Easing.ease),
                loop: true,
                repeatReverse: true,
                delay: index * 400,
              }}
            />
          )
        })}
        <MaterialIcons
          style={{alignSelf: 'center'}}
          size={30}
          name="location-pin"
          color={
            rTheme.colorScheme === 'light'
              ? rTheme.theme?.gluestack.tokens.colors.light200
              : rTheme.theme?.gluestack.tokens.colors.light100
          }
        />
      </Box>
    )
  }

  if (isLoading || loading || !data) {
    return <LoadingAnimationLocation />
  }

  return (
    <>
      {canJoin ? (
        <>
          {rAuthorizationVar?.Profile?.ProfileType !== 'GUEST' ? (
            <JoinCard />
          ) : (
            <SignupCard />
          )}
        </>
      ) : (
        <Box className="-mt-2 h-[100%] items-center justify-center bg-transparent">
          <>
            <Heading className="leading-xs text-md text-center font-[800]">
              {metric === 'km'
                ? distance < 20
                  ? `In your area`
                  : `Pretty distant `
                : `You're super close!`}
            </Heading>
            <Box className="flex-row items-center self-center bg-transparent pb-1">
              <MaterialIcons
                color={rTheme.theme?.gluestack.tokens.colors.blue500}
                name="location-pin"
                size={25}
              />
              <Heading className="text-2xl font-black">
                {distance}&nbsp;{metric}
              </Heading>
            </Box>
          </>
          <Button
            variant="link"
            size={'xs'}
            onPress={async () =>
              await refreshLocation({
                vlat: data.publicVenue?.Venue?.Location?.Geometry?.latitude,
                vlng: data.publicVenue?.Venue?.Location?.Geometry?.longitude,
              })
            }
            className="absolute bottom-1 mb-2 self-center">
            <Text>Tap to refresh</Text>
          </Button>
        </Box>
      )}
    </>
  )
}

export default CurrentLocationFromVenueDistance

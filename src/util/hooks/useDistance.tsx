import {useCallback, useState} from 'react'
import * as Location from 'expo-location'
import {getDistance} from 'geolib'
import {
  GeolibLatitudeInputValue,
  GeolibLongitudeInputValue,
} from 'geolib/es/types'

type DistMetric = {
  distanceInM: number
  metric: string
  distance: number
  isLoading: boolean
}
type RefreshLocationInputType = {
  vlat: GeolibLatitudeInputValue
  vlng: GeolibLongitudeInputValue
}

type DistanceHookType = {
  metric: string
  distanceInM: number
  distance: number
  canJoin: boolean
  isLoading: boolean
  refreshLocation: ({vlat, vlng}: {vlat: any; vlng: any}) => Promise<DistMetric>
}

const useGetDistance = (): DistanceHookType => {
  const [canJoin, setCanJoin] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [distance, setDistance] = useState<number>(0)
  const [distanceInM, setDistanceInM] = useState<number>(0)
  const [metric, setMetric] = useState<'km' | 'm'>('km')

  const refreshLocation = useCallback(
    async ({vlat, vlng}: RefreshLocationInputType): Promise<DistMetric> => {
      setLoading(true)
      const getLastKnowPosition = await Location.getLastKnownPositionAsync({
        requiredAccuracy: 50,
        maxAge: 1200000,
      })

      if (vlat && vlng) {
        if (getLastKnowPosition && getLastKnowPosition.coords) {
          const dist = getDistance(
            {
              latitude: getLastKnowPosition.coords.latitude,
              longitude: getLastKnowPosition.coords.longitude,
            },
            {
              latitude: vlat,
              longitude: vlng,
            },
          )
          setDistanceInM(dist)

          if (dist > 1000) {
            const val = parseInt((dist / 1000).toFixed(1))
            setDistance(val)
            setMetric('km')
            setCanJoin(false)
          } else {
            setDistance(dist)
            setMetric('m')
            if (dist < 25) {
              setCanJoin(true)
            } else {
              setCanJoin(false)
            }
          }
        }
      } else {
        const currentPosition = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.High,
        })
        const dist = getDistance(
          {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
          },
          {
            latitude: vlat,
            longitude: vlng,
          },
        )
        setDistanceInM(dist)
        if (dist > 1000) {
          const val = parseInt((dist / 1000).toFixed(1), 10)
          setDistance(val)
          setMetric('km')
          setCanJoin(false)
        } else {
          setDistance(dist)
          setMetric('m')
          if (dist < 25) {
            setCanJoin(true)
          } else {
            setCanJoin(false)
          }
        }
      }
      setTimeout(() => setLoading(false), 1000)
      return {
        metric,
        distance,
        distanceInM,
        isLoading,
      }
    },
    [],
  )

  return {
    canJoin,
    distanceInM,
    metric,
    distance,
    isLoading,
    refreshLocation,
  }
}

export default useGetDistance

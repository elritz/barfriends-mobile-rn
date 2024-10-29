import {useCallback, useState} from 'react'

type DistMetric = {
  distanceInM: number | undefined
  metric: string | undefined
  distance: number | undefined
  isLoading: boolean
}

type ConvertDistanceInputType = {
  distanceInM: number
}

type DistanceHookType = {
  metric: string | undefined
  distanceInM: number | undefined
  distance: number | undefined
  canJoin: boolean | undefined
  isLoading: boolean
  convertDistance: ({distanceInM}: {distanceInM: number}) => Promise<DistMetric>
}

const useConvertDistance = (): DistanceHookType => {
  const [canJoin, setCanJoin] = useState<boolean>(false)
  const [isLoading] = useState<boolean>(true)
  const [distance, setDistance] = useState<number | undefined>()
  const [distanceInM, setDistanceInM] = useState<number | undefined>()
  const [metric, setMetric] = useState<'km' | 'm' | undefined>('km')

  const convertDistance = useCallback(
    async ({distanceInM}: ConvertDistanceInputType): Promise<DistMetric> => {
      setDistanceInM(distanceInM)
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
        } else {
          setCanJoin(false)
        }
      }

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
    convertDistance,
  }
}

export default useConvertDistance

import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { GeolibInputCoordinates, GeolibLatitudeInputValue, GeolibLongitudeInputValue } from 'geolib/es/types';
import { useCallback, useState } from 'react';


type DistMetric = {
	distanceInM: number | undefined
	metric: string | undefined
	distance: number | undefined
	isLoading: boolean
}
type RefreshLocationInputType = {
	vlat: GeolibLatitudeInputValue
	vlng: GeolibLongitudeInputValue
}

type DistanceHookType = {
	metric: string | undefined
	distanceInM: number | undefined
	distance: number | undefined
	isLoading: boolean
	refreshLocation: ({ vlat, vlng }: { vlat: any; vlng: any }) => Promise<DistMetric>
}

const useGetDistance = (): DistanceHookType => {
	const [isLoading, setLoading] = useState<boolean>(true)
	const [distance, setDistance] = useState<number | undefined>()
	const [distanceInM, setDistanceInM] = useState<number | undefined>()
	const [metric, setMetric] = useState<'km' | 'm' | undefined>('km')

	const refreshLocation = useCallback(
		async ({ vlat, vlng }: RefreshLocationInputType): Promise<DistMetric> => {
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
					} else {
						setDistance(dist)
						setMetric('m')
					}
				}
			} else {
				const currentPosition = await Location.getCurrentPositionAsync({
					accuracy: Location.LocationAccuracy.High,
				})
				const dist = getDistance(
					{ latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude },
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
				} else {
					setDistance(dist)
					setMetric('m')
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
		distanceInM,
		metric,
		distance,
		isLoading,
		refreshLocation,
	}
}

export default useGetDistance
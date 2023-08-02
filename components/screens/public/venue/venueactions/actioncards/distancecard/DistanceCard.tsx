import AskForegroundLocationPermission from './variants/AskLocationPermission'
import CurrentLocationFromVenueDistance from './variants/CurrentLocationFromVenueDistance'
import { useReactiveVar } from '@apollo/client'
import { Box } from '@components/core'
import { PermissionForegroundLocationReactiveVar } from '@reactive'

export default function DistanceCard() {
	const rPermissionForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

	return (
		<Box bg={'transparent'} flexDirection={'column'} justifyContent={'space-around'} height={'100%'} w={'100%'}>
			{rPermissionForegroundLocationVar?.granted ? (
				<CurrentLocationFromVenueDistance />
			) : (
				<AskForegroundLocationPermission />
			)}
		</Box>
	)
}

import { Box } from "#/components/ui/box";
import AskForegroundLocationPermission from './variants/AskLocationPermission'
import CurrentLocationFromVenueDistance from './variants/CurrentLocationFromVenueDistance'
import { useReactiveVar } from '@apollo/client'
import { PermissionForegroundLocationReactiveVar } from '#/reactive'

export default function DistanceCard() {
	const rPermissionForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

	return (
        <Box className="bg-transparent flex-column justify-around h-[100%] w-[100%]">
            {rPermissionForegroundLocationVar?.granted ? (
				<CurrentLocationFromVenueDistance />
			) : (
				<AskForegroundLocationPermission />
			)}
        </Box>
    );
}

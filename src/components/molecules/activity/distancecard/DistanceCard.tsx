import { Box } from "#/src/components/ui/box";
import AskForegroundLocationPermission from "./variants/AskLocationPermission";
import CurrentLocationFromVenueDistance from "./variants/CurrentLocationFromVenueDistance";
import { useReactiveVar } from "@apollo/client";
import { PermissionForegroundLocationReactiveVar } from "#/reactive";

export default function DistanceCard() {
  const rPermissionForegroundLocationVar = useReactiveVar(
    PermissionForegroundLocationReactiveVar,
  );

  return (
    <Box className="flex-column h-[100%] w-[100%] justify-around bg-transparent">
      {rPermissionForegroundLocationVar?.granted ? (
        <CurrentLocationFromVenueDistance />
      ) : (
        <AskForegroundLocationPermission />
      )}
    </Box>
  );
}

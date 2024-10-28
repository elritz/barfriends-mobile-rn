import {useReactiveVar} from '@apollo/client'

import {PermissionsReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import AskForegroundLocationPermission from './variants/AskLocationPermission'
import CurrentLocationFromVenueDistance from './variants/CurrentLocationFromVenueDistance'

export default function DistanceCard() {
  const rPerm = useReactiveVar(PermissionsReactiveVar)

  return (
    <Box className="flex-column h-[100%] w-[100%] justify-around bg-transparent">
      {rPerm?.locationForeground.granted ? (
        <CurrentLocationFromVenueDistance />
      ) : (
        <AskForegroundLocationPermission />
      )}
    </Box>
  )
}

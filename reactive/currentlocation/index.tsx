import { makeVar } from '@apollo/client'
import { InitialStateLocation } from '@constants/Preferences'
import { LocationType } from '@ctypes/preferences'

export const CurrentLocationReactiveVar = makeVar<LocationType>(InitialStateLocation)

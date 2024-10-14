import { makeVar } from "@apollo/client";
import { InitialStateLocation } from "#/src/constants/Preferences";
import { LocationType } from "#/types/preferences";

export const CurrentLocationReactiveVar =
  makeVar<LocationType>(InitialStateLocation);

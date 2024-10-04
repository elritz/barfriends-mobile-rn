import { makeVar } from "@apollo/client";
import {
  InitialStateBackgroundLocationPermission,
  InitialStateForegroundLocationPermission,
} from "#/src/constants/Preferences";
import { LocationPermissionResponse } from "expo-location";

export const PermissionForegroundLocationReactiveVar =
  makeVar<LocationPermissionResponse | null>(
    InitialStateForegroundLocationPermission,
  );

export const PermissionBackgroundLocationReactiveVar =
  makeVar<LocationPermissionResponse | null>(
    InitialStateBackgroundLocationPermission,
  );

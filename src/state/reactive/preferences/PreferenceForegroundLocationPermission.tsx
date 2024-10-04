import { makeVar } from "@apollo/client";
import { NowPreferencePermissionInitialState } from "#/src/constants/Preferences";
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from "#/types/preferences";

export const PreferenceForegroundLocationPermissionReactiveVar =
  makeVar<LocalStoragePreferenceAskForegroundLocationPermissionType | null>(
    NowPreferencePermissionInitialState,
  );

import { makeVar } from "@apollo/client";
import { NowPreferencePermissionInitialState } from "#/src/constants/Preferences";
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from "#/types/preferences";

export const PreferenceBackgroundLocationPermissionReactiveVar =
  makeVar<LocalStoragePreferenceAskBackgroundLocationPermissionType | null>(
    NowPreferencePermissionInitialState,
  );

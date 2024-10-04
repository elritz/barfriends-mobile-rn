import { makeVar } from "@apollo/client";
import { NowPreferencePermissionInitialState } from "#/src/constants/Preferences";
import { LocalStoragePreferenceAskNotificationPermissionType } from "#/types/preferences";

export const PreferencePermissionNotificationReactiveVar =
  makeVar<LocalStoragePreferenceAskNotificationPermissionType | null>(
    NowPreferencePermissionInitialState,
  );

import { makeVar } from "@apollo/client";
import { InitalStateStorage } from "#/src/constants/Preferences";
import { LocalStoragePreferenceSearchAreaType } from "#/types/preferences";

export const SearchAreaReactiveVar =
  makeVar<LocalStoragePreferenceSearchAreaType>(
    InitalStateStorage.preferences.searcharea,
  );

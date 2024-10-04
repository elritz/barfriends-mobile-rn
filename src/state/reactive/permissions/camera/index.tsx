import { makeVar } from "@apollo/client";
import { InitialStatePermissionCamera } from "#/src/constants/Preferences";
import { PermissionResponse } from "expo-camera/legacy";

export const PermissionCameraReactiveVar = makeVar<PermissionResponse | null>(
  InitialStatePermissionCamera,
);

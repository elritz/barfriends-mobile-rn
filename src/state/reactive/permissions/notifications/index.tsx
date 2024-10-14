import { makeVar } from "@apollo/client";
import { InitialStatePermissionNotifications } from "#/src/constants/Preferences";
import { NotificationPermissionsStatus } from "expo-notifications";

export const PermissionNotificationReactiveVar =
  makeVar<NotificationPermissionsStatus | null>(
    InitialStatePermissionNotifications,
  );

import { makeVar } from "@apollo/client";
import {
  InitialStateDeviceNetwork,
  InitialStateServerNetwork,
} from "#/src/constants/Preferences";
import { ServerNetworkType } from "#/types/preferences";
import { NetworkState } from "expo-network";

export const DeviceNetworkInfoReactiveVar = makeVar<NetworkState | null>(
  InitialStateDeviceNetwork,
);

export const ServerNetworkReactiveVar = makeVar<ServerNetworkType | null>(
  InitialStateServerNetwork,
);

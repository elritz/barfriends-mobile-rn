import { makeVar } from '@apollo/client'
import { InitialStateDeviceNetwork, InitialStateServerNetwork } from '@constants/Preferences'
import { ServerNetworkType } from '@ctypes/preferences'
import { NetworkState } from 'expo-network'

export const DeviceNetworkInfoReactiveVar = makeVar<NetworkState | null>(InitialStateDeviceNetwork)

export const ServerNetworkReactiveVar = makeVar<ServerNetworkType | null>(InitialStateServerNetwork)

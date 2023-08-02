import { makeVar } from '@apollo/client'
import { NetworkState, NetworkStateType } from 'expo-network'

export const DeviceNetworkInitialState: NetworkState = {
	isConnected: true,
	isInternetReachable: true,
	type: NetworkStateType.CELLULAR,
}

export const DeviceNetworkInfoReactiveVar = makeVar<NetworkState | null>(DeviceNetworkInitialState)

type ServerNetworkType = {
	isConnected: Boolean
}

export const ServerNetworkInitialState: ServerNetworkType = {
	isConnected: true,
}

export const ServerNetworkReactiveVar = makeVar<ServerNetworkType | null>(ServerNetworkInitialState)

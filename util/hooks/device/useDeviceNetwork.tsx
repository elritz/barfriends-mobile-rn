import NetInfo from '@react-native-community/netinfo'
import { DeviceNetworkInfoReactiveVar } from '@reactive'
import { useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'

export default function useDeviceNetwork() {
	const appState = useRef(AppState.currentState)
	const [appStateVisible, setAppStateVisible] = useState(appState.current)
	const [isLoadingComplete, setLoadingComplete] = useState(false)

	useEffect(() => {
		const subscription = AppState.addEventListener('change', _handleAppStateChange)
		return () => {
			subscription.remove()
		}
	}, [])

	const _handleAppStateChange = nextAppState => {
		if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
			NetInfo.fetch().then(state => {
				DeviceNetworkInfoReactiveVar({ ...state })
			})
		}

		appState.current = nextAppState
		setAppStateVisible(appState.current)
	}

	useEffect(() => {
		async function getDeviceNetworkInfo() {
			NetInfo.fetch().then(state => {
				DeviceNetworkInfoReactiveVar({ ...state })
			})
			try {
			} catch (e) {
				console.warn(e)
			} finally {
				setLoadingComplete(true)
			}
		}
		getDeviceNetworkInfo()
	}, [])

	return isLoadingComplete
}

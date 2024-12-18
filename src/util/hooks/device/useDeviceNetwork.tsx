import {useEffect, useRef, useState} from 'react'
import {AppState} from 'react-native'
import * as Network from 'expo-network'

import {DeviceNetworkInfoReactiveVar} from '#/reactive'

export default function useDeviceNetwork() {
  const appState = useRef(AppState.currentState)
  const [_, setAppStateVisible] = useState(appState.current)
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    )
    return () => {
      subscription.remove()
    }
  }, [])

  const _handleAppStateChange = async (nextAppState: string) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const state = await Network.getNetworkStateAsync()
      DeviceNetworkInfoReactiveVar({...state})
    }

    appState.current = nextAppState
    setAppStateVisible(appState.current)
  }

  useEffect(() => {
    async function getDeviceNetworkInfo() {
      const state = await Network.getNetworkStateAsync()
      DeviceNetworkInfoReactiveVar({...state})
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

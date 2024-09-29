// TODO: This is incomplete, was maybe suppose to take over the _layout screen
import {
	PermissionBackgroundLocationReactiveVar,
	PermissionForegroundLocationReactiveVar,
	PermissionNotificationReactiveVar,
} from '#/reactive'
import { getBackgroundPermissionsAsync, getForegroundPermissionsAsync } from 'expo-location'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'

export default function usePermission() {
	const [isLoadingComplete, setLoadingComplete] = useState(false)
	useEffect(() => {
		async function loadForegroundPermissionsAsync() {
			const status = await getForegroundPermissionsAsync()
			try {
				PermissionForegroundLocationReactiveVar(status)
			} catch (e) {
				console.warn(`Foreground Location Permission Error`, e)
			}
		}
		async function loadBackgroundPermissionAsync() {
			const status = await getBackgroundPermissionsAsync()
			try {
				PermissionBackgroundLocationReactiveVar(status)
			} catch (e) {
				console.warn(`Background Location Permission Error`, e)
			}
		}
		async function loadNotificationPermissionAsync() {
			const status = await Notifications.getPermissionsAsync()
			try {
				PermissionNotificationReactiveVar(status)
			} catch (e) {
				console.warn(`Notifications Permission Error`, e)
			} finally {
				setLoadingComplete(true)
			}
		}

		loadForegroundPermissionsAsync()
		loadBackgroundPermissionAsync()
		loadNotificationPermissionAsync()
	}, [])

	return isLoadingComplete
}

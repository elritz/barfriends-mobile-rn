import { makeVar } from '@apollo/client'
import { NotificationPermissionsStatus } from 'expo-notifications'
import { PermissionStatus } from 'expo-permissions'

export const permissionNotificationsInitialState: NotificationPermissionsStatus = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
	ios: {
		alertStyle: 0,
		allowsAlert: false,
		allowsAnnouncements: false,
		allowsBadge: false,
		allowsCriticalAlerts: null,
		allowsDisplayInCarPlay: null,
		allowsDisplayInNotificationCenter: true,
		allowsDisplayOnLockScreen: false,
		allowsPreviews: 2,
		allowsSound: false,
		providesAppNotificationSettings: true,
		status: 3,
	},
}

export const PermissionNotificationReactiveVar = makeVar<NotificationPermissionsStatus | null>(
	permissionNotificationsInitialState,
)

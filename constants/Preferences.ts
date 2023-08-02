import { DefaultPreferenceToPermission } from '@ctypes/preferences'
import { DateTime } from 'luxon'

export const NowPreferencePermissionInitialState: DefaultPreferenceToPermission = {
	dateToShowAgain: DateTime.now(),
	numberOfTimesDismissed: 0,
	canShowAgain: true,
}

export const TomorrowPreferencePermissionInitialState: DefaultPreferenceToPermission = {
	dateToShowAgain: DateTime.now().plus({ days: 1 }),
	numberOfTimesDismissed: 0,
	canShowAgain: true,
}
export const DaysPreferencePermissionInitialState: DefaultPreferenceToPermission = {
	dateToShowAgain: DateTime.now().plus({ days: 7 }),
	numberOfTimesDismissed: 0,
	canShowAgain: true,
}

export const MonthsPreferencePermissionInitialState: DefaultPreferenceToPermission = {
	dateToShowAgain: DateTime.now().plus({ months: 1 }),
	numberOfTimesDismissed: 0,
	canShowAgain: true,
}

import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceSystemsOfUnitsType } from '@ctypes/preferences'
import { DateTime } from 'luxon'

export enum SystemsOfUnits {
	Imperial = 'Imperial',
	Metric = 'Metric',
}

export const PreferenceSystemsOfUnitsInitialState: LocalStoragePreferenceSystemsOfUnitsType = {
	canShowAgain: true,
	numberOfTimesDismissed: 0,
	dateToShowAgain: DateTime.now(),
	system: SystemsOfUnits.Metric,
}

export const PreferenceSystemsOfUnitsReactiveVar =
	makeVar<LocalStoragePreferenceSystemsOfUnitsType | null>(PreferenceSystemsOfUnitsInitialState)

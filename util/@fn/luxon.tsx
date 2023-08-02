import { DateTime } from 'luxon'

const calcDateDiffFromNow = (date: Date): unknown => {
	const i1 = DateTime.utc()
	const i2 = DateTime.fromISO(date.toISOString())
	i2.diff(i1).toObject()
	const difference = i1.diff(i2, ['years', 'months', 'days', 'hours']).toObject()
	return difference
}

export default calcDateDiffFromNow

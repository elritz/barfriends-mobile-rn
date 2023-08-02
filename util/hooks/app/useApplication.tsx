import * as Application from 'expo-application'

const applicationName = (): string | null => Application.applicationName

const applicationLastUpdate = async (): Promise<Date | null> => Application.getLastUpdateTimeAsync()
const getIosIdForVendorAsync = async (): Promise<string | null> =>
	Application.getIosIdForVendorAsync()
const getAndroidIdForVendorAsync = async (): Promise<string | null> => Application.androidId

export {
	applicationName,
	applicationLastUpdate,
	getIosIdForVendorAsync,
	getAndroidIdForVendorAsync,
}

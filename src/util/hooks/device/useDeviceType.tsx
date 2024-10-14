import * as Device from 'expo-device'

type DeviceInformation = {
	deviceType: 'UNKNOWN' | 'PHONE' | 'TABLET' | 'DESKTOP' | 'TV'
}

export const useIsDevice = async (): Promise<boolean> => Device.isDevice

export const useDeviceType = async (): Promise<DeviceInformation> => {
	const device = await Device.getDeviceTypeAsync()
	switch (device) {
		case 1 || 'PHONE':
			return { deviceType: 'PHONE' }
		case 2 || 'TABLET':
			return { deviceType: 'TABLET' }
		case 3 || 'DESKTOP':
			return { deviceType: 'DESKTOP' }
		case 4 || 'TV':
			return { deviceType: 'TV' }
		default:
			return { deviceType: 'UNKNOWN' }
	}
}


import { ConfigContext, ExpoConfig } from '@expo/config'
import 'dotenv/config'

module.exports = (context: ConfigContext): ExpoConfig | null => {
	switch (process.env.NODE_ENV) {
		case 'production':
			return {
				name: 'Barfriends',
				slug: 'barfriends',
				owner: 'barfriends',
				scheme: 'barfriends',
				orientation: 'portrait',
				userInterfaceStyle: 'automatic',
				primaryColor: '#FF7000',
				plugins: [
					'expo-router',
					'sentry-expo',
					'expo-build-properties',
					['expo-apple-authentication'],
					[
						'expo-screen-orientation',
						{
							initialOrientation: 'PORTRAIT_UP',
						},
					],
					[
						'expo-contacts',
						{
							contactsPermission: 'Allow $(PRODUCT_NAME) to access your contacts.',
						},
					],
					[
						'expo-camera',
						{
							cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.',
							microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone.',
						},
					],
					'expo-localization',
					[
						'expo-media-library',
						{
							photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
							savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos.',
							isAccessMediaLocationEnabled: true,
						},
					],
				],
				updates: {
					url: 'https://u.expo.dev/7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					fallbackToCacheTimeout: 2000,
				},
				runtimeVersion: {
					policy: 'sdkVersion',
				},
				assetBundlePatterns: ['**/*'],
				platforms: ['ios', 'android'],
				icon: './assets/images/icon/icon.png',
				splash: {
					image: `./assets/images/splash/splash.${process.env.ENVIRONMENT}.dark.png`,
					resizeMode: 'cover',
					dark: {
						image: `./assets/images/splash/splash.${process.env.ENVIRONMENT}.dark.png`,
						resizeMode: 'cover',
					},
				},
				ios: {
					bundleIdentifier: 'com.barfriends.production',
					supportsTablet: false,
					icon: `./assets/images/icon/icon.png`,
					config: {
						googleMapsApiKey: process.env.GOOGLE_IOS_API_KEY,
					},
					infoPlist: {
						NSLocationAlwaysUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationAlwaysAndWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSCameraUsageDescription: 'Barfriends app uses the camera to provide a photo for their profile.',
						NSPhotoLibraryUsageDescription:
							"Barfriends app uses photo library to upload user's profile picture.",
						UIBackgroundModes: ['remote-notification', 'location', 'fetch'],
						NSPhotoLibraryAddUsageDescription:
							'Barfriends would like access to your photos so you can add a cover image to your profile.',
					},
				},
				android: {
					versionCode: 2,
					package: 'com.barfriends.production',
					backgroundColor: '#0D0D0D',
					adaptiveIcon: {
						foregroundImage: './assets/images/adaptive-icon.png',
					},
					googleServicesFile: './google-services.json',
					config: {
						googleMaps: {
							apiKey: process.env.GOOGLE_ANDROID_API_KEY,
						},
					},
					permissions: [
						'ACCESS_COARSE_LOCATION',
						'ACCESS_FINE_LOCATION',
						'ACCESS_BACKGROUND_LOCATION',
						'CAMERA',
						'NOTIFICATIONS',
						'MANAGE_DOCUMENTS',
						'READ_CONTACTS',
						'READ_CALENDAR',
						'WRITE_CALENDAR',
						'READ_EXTERNAL_STORAGE',
						'READ_PHONE_STATE',
						'RECORD_AUDIO',
						'USE_FINGERPRINT',
						'VIBRATE',
						'WAKE_LOCK',
						'WRITE_EXTERNAL_STORAGE',
						'com.anddoes.launcher.permission.UPDATE_COUNT',
						'com.android.launcher.permission.INSTALL_SHORTCUT',
						'com.google.android.c2dm.permission.RECEIVE',
						'com.google.android.gms.permission.ACTIVITY_RECOGNITION',
						'com.google.android.providers.gsf.permission.READ_GSERVICES',
						'com.htc.launcher.permission.READ_SETTINGS',
						'com.htc.launcher.permission.UPDATE_SHORTCUT',
						'com.majeur.launcher.permission.UPDATE_BADGE',
						'com.sec.android.provider.badge.permission.READ',
						'com.sec.android.provider.badge.permission.WRITE',
						'com.sonyericsson.home.permission.BROADCAST_BADGE',
					],
				},
				web: {
					favicon: './assets/images/favicon.png',
				},
				packagerOpts: {
					sourceExts: ['cjs'],
				},
			}
		case 'test':
			return {
				name: 'Barfriends (stg)',
				slug: 'barfriends',
				owner: 'barfriends',
				scheme: 'barfriends-staging',
				orientation: 'portrait',
				userInterfaceStyle: 'automatic',
				plugins: [
					'expo-router',
					[
						"@sentry/react-native/expo",
						{
						  "organization": "barfriends-inc-6w",
						  "project": "revel-dev"
						}
					],
					[
						"expo-updates",
						{
							"username": "ritzz"
						}
					],
					['expo-apple-authentication'],
					[
						'expo-build-properties',
						{
							ios: {
								flipper: true,
							},
						},
					],
					[
						'expo-screen-orientation',
						{
							initialOrientation: 'PORTRAIT_UP',
						},
					],
					'expo-localization',
					[
						'expo-contacts',
						{
							contactsPermission: 'Allow $(PRODUCT_NAME) to access your contacts.',
						},
					],
					[
						'expo-media-library',
						{
							photosPermission: 'Allow Barfriends to access your photos.',
							savePhotosPermission: 'Allow Barfriends to save photos.',
							isAccessMediaLocationEnabled: true,
						},
					],
				],
				updates: {
					url: 'https://u.expo.dev/7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					fallbackToCacheTimeout: 2000,
				},
				primaryColor: '#FF7000',
				runtimeVersion: {
					policy: 'sdkVersion',
				},
				assetBundlePatterns: ['**/*'],
				platforms: ['ios', 'android'],
				icon: './assets/images/icon/icon.png',
				splash: {
					image: `./assets/images/splash/splash.staging.light.png`,
					resizeMode: 'cover',
					dark: {
						image: `./assets/images/splash/splash.staging.dark.png`,
						resizeMode: 'cover',
					},
				},
				web: {
					bundler: 'metro',
					favicon: './assets/images/favicon.png',
				},
				ios: {
					associatedDomains: ['applinks:barfriends.com'],
					bundleIdentifier: 'com.barfriends.stg',
					supportsTablet: false,
					icon: `./assets/images/icon/icon.png`,
					config: {
						googleMapsApiKey: process.env.GOOGLE_IOS_API_KEY,
					},
					infoPlist: {
						LSApplicationQueriesSchemes: ['uber'],
						NSLocationAlwaysUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationAlwaysAndWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSCameraUsageDescription: 'Barfriends app uses the camera to provide a photo for their profile.',
						NSPhotoLibraryUsageDescription: 'Barfriends app uses photo library to upload photos and videos.',
						UIBackgroundModes: ['remote-notification', 'location', 'fetch'],
						NSPhotoLibraryAddUsageDescription:
							'Barfriends would access your meida library, so you can add photos for your profile and other social purposes.',
					},
				},
				android: {
					versionCode: 2,
					package: 'com.barfriends.christian',
					backgroundColor: '#0D0D0D',
					adaptiveIcon: {
						foregroundImage: './assets/images/adaptive-icon.png',
					},
					googleServicesFile: './google-services.json',
					config: {
						googleMaps: {
							apiKey: process.env.GOOGLE_ANDROID_API_KEY,
						},
					},
					permissions: [
						'FOREGROUND_SERVICE',
						'ACCESS_COARSE_LOCATION',
						'ACCESS_FINE_LOCATION',
						'CAMERA',
						'NOTIFICATIONS',
						'MANAGE_DOCUMENTS',
						'READ_CONTACTS',
						'READ_CALENDAR',
						'WRITE_CALENDAR',
						'READ_EXTERNAL_STORAGE',
						'READ_PHONE_STATE',
						'RECORD_AUDIO',
						'USE_FINGERPRINT',
						'VIBRATE',
						'WAKE_LOCK',
						'WRITE_EXTERNAL_STORAGE',
						'com.anddoes.launcher.permission.UPDATE_COUNT',
						'com.android.launcher.permission.INSTALL_SHORTCUT',
						'com.google.android.c2dm.permission.RECEIVE',
						'com.google.android.gms.permission.ACTIVITY_RECOGNITION',
						'com.google.android.providers.gsf.permission.READ_GSERVICES',
						'com.htc.launcher.permission.READ_SETTINGS',
						'com.htc.launcher.permission.UPDATE_SHORTCUT',
						'com.majeur.launcher.permission.UPDATE_BADGE',
						'com.sec.android.provider.badge.permission.READ',
						'com.sec.android.provider.badge.permission.WRITE',
						'com.sonyericsson.home.permission.BROADCAST_BADGE',
					],
				},
				packagerOpts: {
					sourceExts: ['cjs'],
				},
				extra: {
					
					eas: {
						projectId: '7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					},
				},
			}
		case 'development':
			return {
				name: 'Barfriends (dev)',
				slug: 'barfriends',
				owner: 'barfriends',
				scheme: 'barfriends-development',
				orientation: 'portrait',
				userInterfaceStyle: 'automatic',
				experiments: {
					typedRoutes: true,
				},
				plugins: [
					'expo-router',
					[
						"@sentry/react-native/expo",
						{
						  "organization": "barfriends-inc-6w",
						  "project": "revel-dev"
						}
					],
					['expo-apple-authentication'],
					[
						'expo-build-properties',
						{
							ios: {
								flipper: true,
							},
						},
					],
					[
						'expo-screen-orientation',
						{
							initialOrientation: 'PORTRAIT_UP',
						},
					],
					'expo-localization',
					[
						'expo-contacts',
						{
							contactsPermission: 'Allow $(PRODUCT_NAME) to access your contacts.',
						},
					],
					[
						'expo-media-library',
						{
							photosPermission: 'Allow Barfriends to access your photos.',
							savePhotosPermission: 'Allow Barfriends to save photos.',
							isAccessMediaLocationEnabled: true,
						},
					],
				],
				updates: {
					url: 'https://u.expo.dev/7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					fallbackToCacheTimeout: 2000,
				},
				primaryColor: '#FF7000',
				runtimeVersion: {
					policy: 'sdkVersion',
				},
				assetBundlePatterns: ['**/*'],
				platforms: ['ios', 'android'],
				icon: './assets/images/icon/icon.png',
				splash: {
					image: `./assets/images/splash/splash.development.dark.png`,
					resizeMode: 'cover',
					dark: {
						image: `./assets/images/splash/splash.development.dark.png`,
						resizeMode: 'cover',
					},
				},
				web: {
					bundler: 'metro',
					favicon: './assets/images/favicon.png',
				},
				ios: {
					associatedDomains: ['applinks:barfriends.com'],
					bundleIdentifier: 'com.barfriends.dev',
					supportsTablet: false,
					icon: `./assets/images/icon/icon.png`,
					config: {
						googleMapsApiKey: process.env.GOOGLE_IOS_API_KEY,
					},
					infoPlist: {
						LSApplicationQueriesSchemes: ['uber'],
						NSLocationAlwaysUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationAlwaysAndWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSCameraUsageDescription: 'Barfriends app uses the camera to provide a photo for their profile.',
						NSPhotoLibraryUsageDescription: 'Barfriends app uses photo library to upload photos and videos.',
						UIBackgroundModes: ['remote-notification', 'location', 'fetch'],
						NSPhotoLibraryAddUsageDescription:
							'Barfriends would access your meida library, so you can add photos for your profile and other social purposes.',
					},
				},
				android: {
					versionCode: 2,
					package: 'com.barfriends.christian',
					backgroundColor: '#0D0D0D',
					adaptiveIcon: {
						foregroundImage: './assets/images/adaptive-icon.png',
					},
					googleServicesFile: './google-services.json',
					config: {
						googleMaps: {
							apiKey: process.env.GOOGLE_ANDROID_API_KEY,
						},
					},
					permissions: [
						'FOREGROUND_SERVICE',
						'ACCESS_COARSE_LOCATION',
						'ACCESS_FINE_LOCATION',
						'CAMERA',
						'NOTIFICATIONS',
						'MANAGE_DOCUMENTS',
						'READ_CONTACTS',
						'READ_CALENDAR',
						'WRITE_CALENDAR',
						'READ_EXTERNAL_STORAGE',
						'READ_PHONE_STATE',
						'RECORD_AUDIO',
						'USE_FINGERPRINT',
						'VIBRATE',
						'WAKE_LOCK',
						'WRITE_EXTERNAL_STORAGE',
						'com.anddoes.launcher.permission.UPDATE_COUNT',
						'com.android.launcher.permission.INSTALL_SHORTCUT',
						'com.google.android.c2dm.permission.RECEIVE',
						'com.google.android.gms.permission.ACTIVITY_RECOGNITION',
						'com.google.android.providers.gsf.permission.READ_GSERVICES',
						'com.htc.launcher.permission.READ_SETTINGS',
						'com.htc.launcher.permission.UPDATE_SHORTCUT',
						'com.majeur.launcher.permission.UPDATE_BADGE',
						'com.sec.android.provider.badge.permission.READ',
						'com.sec.android.provider.badge.permission.WRITE',
						'com.sonyericsson.home.permission.BROADCAST_BADGE',
					],
				},
				packagerOpts: {
					sourceExts: ['cjs'],
				},
				extra: {
					eas: {
						projectId: '7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					},
				},
			}
		default: {
			return null
		}
	}
}

import { ConfigContext, ExpoConfig,  } from '@expo/config'
import { Splash, IOS } from '@expo/config-types';
import 'dotenv/config'



module.exports = (context: ConfigContext): ExpoConfig | null => {

	function toCamelCase(str) {
		return str
			.split(' ') // Split the string into an array of words
			.map((word, index) => {
					return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			})
			.join(''); // Join the words back into a string
	}
	

	function configExpoPlugins({APP_NAME}: {APP_NAME: string}): (string | [] | [string] | [string, any])[] | undefined {
		return [
			'expo-router',
			'sentry-expo',
			'expo-build-properties',
			[
        "expo-updates",
        {
          "username": "ritzz"
        }
      ],
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
					contactsPermission: `Allow ${APP_NAME} to access your contacts.`,
				},
			],
			[
				'expo-camera',
				{
					cameraPermission: `Allow ${APP_NAME} to access your camera.`,
					microphonePermission: `Allow ${APP_NAME} to access your microphone.`,
				},
			],
			'expo-localization',
			[
				'expo-media-library',
				{
					photosPermission: `Allow ${APP_NAME} to access your photos.`,
					savePhotosPermission: `Allow ${APP_NAME} to save photos.`,
					isAccessMediaLocationEnabled: true,
				},
			],
		]
	}

	function configSplash({APP_ENV}: {APP_ENV: string}): Splash | undefined  {
		return {
			image: `./assets/images/splash/splash.${APP_ENV}.dark.png`,
			resizeMode: 'cover',
			dark: {
				image: `./assets/images/splash/splash.${APP_ENV}.dark.png`,
				resizeMode: 'cover',
			},
		}
	}

	function configInfoPlist({APP_NAME}: {APP_NAME: string}): Record<string, any> {
		return {
			LSApplicationQueriesSchemes: ['uber'],
			NSLocationAlwaysUsageDescription:
				`${toCamelCase(context.config.name)} app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.`,
			NSLocationAlwaysAndWhenInUseUsageDescription:
			`${toCamelCase(context.config.name)} app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.`,
			NSLocationWhenInUseUsageDescription:
			`${toCamelCase(context.config.name)} app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.`,
			NSCameraUsageDescription: `${toCamelCase(context.config.name)} app uses the camera to provide a photo for their profile.`,
			NSPhotoLibraryUsageDescription: `${toCamelCase(context.config.name)} app uses photo library to upload photos and videos.`,
			UIBackgroundModes: ['remote-notification', 'location', 'fetch'],
			NSPhotoLibraryAddUsageDescription:
			`${toCamelCase(context.config.name)} would access your meida library, so you can add photos for your profile and other social purposes.`,
		}
	}


function configIOS({APP_ENV, APP_NAME}: {APP_ENV: string, APP_NAME: string}): IOS | undefined {
	return {
		splash: configSplash({APP_ENV}),
		infoPlist: configInfoPlist({APP_NAME}),
		associatedDomains: [`applinks:${context.config.name}.com`],
		bundleIdentifier: `com.${context.config.name}.${APP_ENV}`,
		supportsTablet: false,
		icon: `./assets/images/icon/icon.png`,
		config: {
			googleMapsApiKey: process.env.GOOGLE_IOS_API_KEY,
		},
	}
}

	switch (process.env.APP_ENV) {
		case 'development':
			return {
				name: `${toCamelCase(context.config.name)} (${process.env.APP_ENV})`,
				slug: 'barfriends',
				owner: 'barfriends',
				scheme: 'barfriends-development',
				orientation: 'portrait',
				userInterfaceStyle: 'automatic',
				experiments: {
					typedRoutes: true,
				},
				plugins: configExpoPlugins({ APP_NAME: toCamelCase(context.config.name)}),
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
				ios: configIOS({APP_ENV: process.env.APP_ENV, APP_NAME: toCamelCase(context.config.name)}),
				android: {
					versionCode: 2,
					package: 'com.barfriends.dev',
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
		default: 
				return {
					name: toCamelCase(context.config.name),
					slug: 'barfriends',
					owner: 'barfriends',
					scheme: 'barfriends',
					orientation: 'portrait',
					userInterfaceStyle: 'automatic',
					experiments: {
						typedRoutes: true,
					},
					primaryColor: '#FF7000',
					plugins: configExpoPlugins({ APP_NAME: toCamelCase(context.config.name)}),
					splash: configSplash({APP_ENV: String(process.env.APP_ENV)}),
					ios: configIOS({APP_ENV: String(process.env.APP_ENV), APP_NAME: toCamelCase(context.config.name)}),
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
					extra: {
						eas: {
							projectId: '7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
						},
					},
			}
		}
}

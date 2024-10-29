import {ConfigContext, ExpoConfig} from '@expo/config'
import {Android, IOS, Splash, Web} from '@expo/config-types'

module.exports = (context: ConfigContext): ExpoConfig | null => {
  function toCamelCase(str: string) {
    return str
      .split(' ') // Split the string into an array of words
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join('') // Join the words back into a string
  }

  function configExpoPlugins(): (string | [] | [string] | [string, any])[] {
    if (!context.config.name) {
      throw new Error('Please provide a name for your app in the .env file')
    }
    return [
      'expo-router',
      'expo-font',
      'expo-privacy-manifest-polyfill-plugin',
      [
        '@stripe/stripe-react-native',
        {
          merchantIdentifier: 'merchant.com.barfriends',
          enableGooglePay: true,
        },
      ],
      'expo-asset',
      [
        'expo-barcode-scanner',
        {
          cameraPermission: `Allow ${toCamelCase(context.config.name)} to access camera.`,
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            buildToolsVersion: '34.0.0',
            // newArchEnabled: true
          },
          ios: {
            // newArchEnabled: true
          },
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission: `Allow ${toCamelCase(context.config.name)} to access your camera`,
          microphonePermission: `Allow ${toCamelCase(context.config.name)} to access your microphone`,
          recordAudioAndroid: true,
        },
      ],
      [
        'expo-contacts',
        {
          contactsPermission: `Allow ${toCamelCase(context.config.name)} to access your contacts.`,
        },
      ],
      [
        'expo-dev-launcher',
        {
          launchMode: 'most-recent',
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission: `Allow ${toCamelCase(context.config.name)} to access your photos to let you share them with your friends.`,
        },
      ],
      [
        'expo-local-authentication',
        {
          faceIDPermission: `"Allow ${toCamelCase(context.config.name)} to use Face ID.`,
        },
      ],
      'expo-localization',
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission: `Allow ${toCamelCase(context.config.name)} to use your location.`,
        },
      ],
      [
        'expo-screen-orientation',
        {
          initialOrientation: 'DEFAULT',
        },
      ],
      [
        'expo-secure-store',
        {
          faceIDPermission: `Allow ${toCamelCase(context.config.name)} to access your Face ID biometric data.`,
        },
      ],
      [
        'expo-media-library',
        {
          photosPermission: `Allow ${toCamelCase(context.config.name)} to access your photos.`,
          savePhotosPermission: `Allow ${toCamelCase(context.config.name)} to save photos.`,
          isAccessMediaLocationEnabled: true,
        },
      ],
    ]
  }

  function configSplash(): Splash {
    return {
      image: `./assets/images/splash/splash.${process.env.NODE_ENV}.dark.png`,
      resizeMode: 'cover',
      backgroundColor: '#000000',
      dark: {
        image: `./assets/images/splash/splash.${process.env.NODE_ENV}.dark.png`,
        resizeMode: 'cover',
      },
    }
  }

  function configInfoPlist(): Record<string, any> {
    if (!context.config.name) {
      throw new Error('Please provide a name for your app in the .env file')
    }
    return {
      LSApplicationQueriesSchemes: ['uber'],
      NSLocationAlwaysUsageDescription: `${toCamelCase(context.config.name)} app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.`,
      NSLocationAlwaysAndWhenInUseUsageDescription: `${toCamelCase(context.config.name)} app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.`,
      NSLocationWhenInUseUsageDescription: `${toCamelCase(context.config.name)} app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.`,
      NSCameraUsageDescription: `${toCamelCase(context.config.name)} app uses the camera to provide a photo for their profile.`,
      NSPhotoLibraryUsageDescription: `${toCamelCase(context.config.name)} app uses photo library to upload photos and videos.`,
      UIBackgroundModes: ['location', 'fetch', 'remote-notification'],
      NSPhotoLibraryAddUsageDescription: `${toCamelCase(context.config.name)} would access your meida library, so you can add photos for your profile and other social purposes.`,
    }
  }

  function configIOS(): IOS {
    return {
      usesAppleSignIn: true,
      requireFullScreen: true,
      config: {
        googleMapsApiKey: process.env.GOOGLE_IOS_API_KEY,
        usesNonExemptEncryption: false,
      },
      associatedDomains: [`applinks:${context.config.name}.com`],
      bundleIdentifier: `com.${context.config.name}.${process.env.NODE_ENV}`,
      supportsTablet: false,
      infoPlist: configInfoPlist(),
      icon: `./assets/images/icon/icon.png`,
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType:
              'NSPrivacyAccessedAPICategoryFileTimestamp',
            NSPrivacyAccessedAPITypeReasons: ['C617.1', '3B52.1', '0A2A.1'],
          },
          {
            NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryDiskSpace',
            NSPrivacyAccessedAPITypeReasons: ['E174.1', '85F4.1'],
          },
          {
            NSPrivacyAccessedAPIType:
              'NSPrivacyAccessedAPICategorySystemBootTime',
            NSPrivacyAccessedAPITypeReasons: ['35F9.1'],
          },
          {
            NSPrivacyAccessedAPIType:
              'NSPrivacyAccessedAPICategoryUserDefaults',
            NSPrivacyAccessedAPITypeReasons: ['CA92.1', '1C8F.1'],
          },
        ],
      },
    }
  }

  function configAndroid(): Android {
    return {
      package: `com.${context.config.name}.${process.env.NODE_ENV}`,
      backgroundColor: '#0D0D0D',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
      },
      // googleServicesFile: "./google-services.json",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_ANDROID_API_KEY,
        },
      },
      permissions: [
        'android.permission.CAMERA',
        'android.permission.RECORD_AUDIO',
        'android.permission.READ_CONTACTS',
        'android.permission.WRITE_CONTACTS',
        'android.permission.USE_BIOMETRIC',
        'android.permission.USE_FINGERPRINT',
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.ACCESS_MEDIA_LOCATION',
        'ACCESS_FINE_LOCATION',
        'ACCESS_BACKGROUND_LOCATION',
        'NOTIFICATIONS',
        'MANAGE_DOCUMENTS',
        'READ_CALENDAR',
        'WRITE_CALENDAR',
        'READ_PHONE_STATE',
        'VIBRATE',
        'WAKE_LOCK',
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
    }
  }

  function configWeb(): Web {
    return {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    }
  }

  function expoExtra(): ExpoConfig['extra'] {
    return {
      router: {
        origin: false,
      },
      eas: {
        projectId: '7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
      },
    }
  }

  function expoUpdates(): ExpoConfig['updates'] {
    return {
      url: 'https://u.expo.dev/7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
      fallbackToCacheTimeout: 2000,
    }
  }

  if (!context.config.name) {
    throw new Error('Please provide a name for your app in the .env file')
  }

  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        name: `${toCamelCase(context.config.name)} (${process.env.NODE_ENV})`,
        slug: 'barfriends',
        owner: 'barfriends',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'barfriends',
        userInterfaceStyle: 'automatic',
        primaryColor: '#FF7000',
        splash: configSplash(),
        ios: configIOS(),
        android: configAndroid(),
        web: configWeb(),
        plugins: configExpoPlugins(),
        experiments: {
          typedRoutes: true,
        },
        extra: expoExtra(),
        updates: expoUpdates(),
      }

    default:
      return {
        name: `${toCamelCase(String(context.config.name))}`,
        slug: 'barfriends',
        owner: 'barfriends',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'barfriends',
        userInterfaceStyle: 'automatic',
        primaryColor: '#FF7000',
        splash: configSplash(),
        ios: configIOS(),
        android: configAndroid(),
        web: configWeb(),
        plugins: configExpoPlugins(),
        experiments: {
          typedRoutes: true,
        },
        extra: expoExtra(),
        updates: expoUpdates(),
      }
  }
}

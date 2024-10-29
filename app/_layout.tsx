//TODO: Add notfication listener
import 'react-native-gesture-handler'
import 'expo-dev-client'
import 'react-native-reanimated'

import {useEffect} from 'react'
import {Appearance} from 'react-native'
import {apolloDevToolsInit} from 'react-native-apollo-devtools-client'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {isRunningInExpoGo} from 'expo'
import {Camera} from 'expo-camera/legacy'
import * as Contacts from 'expo-contacts'
import {
  getBackgroundPermissionsAsync,
  getForegroundPermissionsAsync,
} from 'expo-location'
import {getPermissionsAsync as getMediaPermissionAsync} from 'expo-media-library'
import {getPermissionsAsync as getNotificiationPermissionAsync} from 'expo-notifications'
import {Stack, useNavigationContainerRef} from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as SplashScreen from 'expo-splash-screen'
import {ApolloProvider} from '@apollo/client'
import {loadDevMessages, loadErrorMessages} from '@apollo/client/dev'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import * as Sentry from '@sentry/react-native'

import profilingclient from '#/graphql/apollo/profiling/profiling-apollo-server'
import {
  InformationJoinVenueReactiveVar,
  PermissionsPreferencesReactiveVar,
  PermissionsReactiveVar,
  PreferenceSystemsOfUnitsReactiveVar,
  SearchAreaReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import Auth from '#/src/components/layouts/Auth'
import Theme from '#/src/components/layouts/Theme'
import {
  InitialStatePreferenceSystemsOfUnits,
  InitialStateSearchArea,
  NowPreferencePermissionInitialState,
} from '#/src/constants/Preferences'
import {
  LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
  LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
  LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
  LOCAL_STORAGE_SEARCH_AREA,
} from '#/src/constants/StorageConstants'
import {storage} from '#/src/storage/mmkv'
import {
  LocalStoragePreferenceAskBackgroundLocationPermissionType,
  LocalStoragePreferenceAskNotificationPermissionType,
  LocalStoragePreferenceSearchAreaType,
  LocalStoragePreferenceSystemsOfUnitsType,
  LocalStoragePreferenceThemeType,
} from '#/types/preferences'
export {ErrorBoundary} from 'expo-router'

import '#/global.css'

// export const unstable_settings = {
// 	// Ensure that reloading on `/modal` keeps a back button present.
// 	initialRouteName: '(app)',
// }
if (__DEV__) {
  require('../ReactotronConfig')
}
if (__DEV__) {
  apolloDevToolsInit(profilingclient)
}

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}
SplashScreen.preventAutoHideAsync()
// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  dsn: 'https://1c7981806da9fa394d3a549719cd777d@o4506712454660096.ingest.sentry.io/4506712456757248',
  // debug: NODE_ENV === 'development' ? true : false,
  debug: false,
  // debug: true,
  // enableNative: true,
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo(),
      // ...
    }),
  ],
})

// const db = SQLite.openDatabase('../SQLite/database.db')

function RootLayout() {
  // verifyInstallation();
  const ref = useNavigationContainerRef()
  async function setScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
    )
  }

  const setAsyncPreferencesLocalStorageData = async () => {
    try {
      // SEARCHAREA_PREFERENCE ~ START
      const getLocalStorageSearchArea = storage.getString(
        LOCAL_STORAGE_SEARCH_AREA,
      )

      const foregroundLocationPermission = await getForegroundPermissionsAsync()

      if (getLocalStorageSearchArea && foregroundLocationPermission.granted) {
        const values: LocalStoragePreferenceSearchAreaType = JSON.parse(
          getLocalStorageSearchArea,
        )
        if (values && values.useCurrentLocation) {
          // await useSetSearchAreaWithLocation();
        } else {
          SearchAreaReactiveVar({
            ...values,
          })
        }
      } else {
        const newSearchAreaValue = JSON.stringify({
          ...InitialStateSearchArea,
        } as LocalStoragePreferenceSearchAreaType)

        storage.set(LOCAL_STORAGE_SEARCH_AREA, newSearchAreaValue)
      }
      // SEARCHAREA_PREFERENCE ~ END

      // THEME_PREFERENCE ~ START
      const getLocalStorageTheme = storage.getString(
        LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
      )

      if (!getLocalStorageTheme) {
        const initialThemeColorSchemeState = JSON.stringify({
          colorScheme: 'system',
        } as LocalStoragePreferenceThemeType)

        storage.set(
          LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
          initialThemeColorSchemeState,
        )

        ThemeReactiveVar({
          theme: ThemeReactiveVar().theme,
          localStorageColorScheme: 'system',
          deviceColorScheme: Appearance.getColorScheme(),
          colorScheme: Appearance.getColorScheme(),
        })
      } else {
        const localStorageTheme: LocalStoragePreferenceThemeType =
          JSON.parse(getLocalStorageTheme)

        ThemeReactiveVar({
          theme: ThemeReactiveVar().theme,
          localStorageColorScheme: localStorageTheme.colorScheme,
          deviceColorScheme:
            localStorageTheme.colorScheme === 'system'
              ? Appearance.getColorScheme()
              : localStorageTheme.colorScheme,
          colorScheme:
            localStorageTheme.colorScheme === 'system'
              ? Appearance.getColorScheme()
              : localStorageTheme.colorScheme,
        })
      }
      // THEME_PREFERENCE ~ END

      // NOTIFICATION_PREFERENCE ~ START
      const getLocalStorageNotificationPermissionsPreference =
        storage.getString(LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS)

      if (!getLocalStorageNotificationPermissionsPreference) {
        storage.set(
          LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
          JSON.stringify(NowPreferencePermissionInitialState),
        )
      } else {
        const values: LocalStoragePreferenceAskNotificationPermissionType =
          JSON.parse(getLocalStorageNotificationPermissionsPreference)
        PermissionsPreferencesReactiveVar({
          ...PermissionsPreferencesReactiveVar(),
          notifications: {
            ...values,
          },
        })
      }
      // NOTIFICATION_PREFERENCE ~ END

      // BACKGROUNDLOCATION_PREFERENCE ~ START
      const getLocalStoragePreferenceBackgroundLocationPreference =
        storage.getString(LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION)

      if (!getLocalStoragePreferenceBackgroundLocationPreference) {
        storage.set(
          LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
          JSON.stringify(NowPreferencePermissionInitialState),
        )
      } else {
        // using local_storage values set the correct information
        const values: LocalStoragePreferenceAskBackgroundLocationPermissionType =
          JSON.parse(getLocalStoragePreferenceBackgroundLocationPreference)

        InformationJoinVenueReactiveVar({
          ...values,
        })
      }
      // BACKGROUNDLOCATION_PREFERENCE ~ END

      // FOREGROUNDLOCATION_PREFERENCE ~ START
      const getLocalStoragePreferenceForegroundLocationPreference =
        storage.getString(LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION)

      if (!getLocalStoragePreferenceForegroundLocationPreference) {
        storage.set(
          LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
          JSON.stringify(NowPreferencePermissionInitialState),
        )
      } else {
        const values: LocalStoragePreferenceAskBackgroundLocationPermissionType =
          JSON.parse(getLocalStoragePreferenceForegroundLocationPreference)
        PermissionsPreferencesReactiveVar({
          ...PermissionsPreferencesReactiveVar(),
          locationForeground: {
            ...values,
          },
        })
      }
      // FOREGROUNDLOCATION_PREFERENCE ~ END

      // SYSTEM_OF_UNITS_PREFERENCE ~ START
      const getLocalStorageSystemOfUnitsPreference = storage.getString(
        LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
      )

      if (!getLocalStorageSystemOfUnitsPreference) {
        storage.set(
          LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
          JSON.stringify(InitialStatePreferenceSystemsOfUnits),
        )
      } else {
        const values: LocalStoragePreferenceSystemsOfUnitsType = JSON.parse(
          getLocalStorageSystemOfUnitsPreference,
        )

        PreferenceSystemsOfUnitsReactiveVar({
          ...values,
        })
      }
      // BACKGROUNDLOCATION_PREFERENCE ~ START ~ END
    } catch () {}
  }

  const setAsyncPermissions = async () => {
    const contactsPermission = await Contacts.getPermissionsAsync()
    const cameraPermission = await Camera.getCameraPermissionsAsync()
    const foregroundLocationPermission = await getForegroundPermissionsAsync()

    const backgroundLocationPermission = await getBackgroundPermissionsAsync()
    const mediaLibraryPermission = await getMediaPermissionAsync()
    const notificationPermission = await getNotificiationPermissionAsync()

    PermissionsReactiveVar({
      contacts: contactsPermission,
      camera: cameraPermission,
      locationForeground: foregroundLocationPermission,
      locationBackground: backgroundLocationPermission,
      medialibrary: mediaLibraryPermission,
      notifications: notificationPermission,
    })
  }

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref)
    }
  }, [ref])

  useEffect(() => {
    // initializeDatabase()
    setScreenOrientation()
    setAsyncPermissions()
    setAsyncPreferencesLocalStorageData()
  }, [])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ApolloProvider client={profilingclient}>
          <Auth>
            <Theme>
              <KeyboardProvider statusBarTranslucent>
                <BottomSheetModalProvider>
                  <Stack
                    initialRouteName="index"
                    screenOptions={{
                      headerShown: false,
                    }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen
                      name="(app)"
                      options={{
                        animation: 'fade',
                      }}
                    />
                    <Stack.Screen
                      name="(information)"
                      options={{
                        presentation: 'modal',
                        fullScreenGestureEnabled: false,
                        gestureEnabled: false,
                      }}
                    />
                    <Stack.Screen
                      name="(credential)"
                      options={{
                        animation: 'fade',
                      }}
                    />
                  </Stack>
                </BottomSheetModalProvider>
              </KeyboardProvider>
            </Theme>
          </Auth>
        </ApolloProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default Sentry.wrap(RootLayout)

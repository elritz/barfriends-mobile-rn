//TODO: Add notfication listener
import 'react-native-gesture-handler'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import {ApolloProvider} from '@apollo/client'
import Auth from '#/src/components/layouts/Auth'
import Theme from '#/src/components/layouts/Theme'
import {
  NowPreferencePermissionInitialState,
  InitialStateJoiningInformationPreferencePermission,
  InitialStateSearchArea,
  InitialStatePreferenceSystemsOfUnits,
} from '#/src/constants/Preferences'
import {
  LOCAL_STORAGE_SEARCH_AREA,
  LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
  LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
  LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
  LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
  LOCAL_STORAGE_INFORMATION_JOIN_VENUE,
} from '#/src/constants/StorageConstants'
import {
  LocalStoragePreferenceSearchAreaType,
  LocalStoragePreferenceThemeType,
  LocalStoragePreferenceAskNotificationPermissionType,
  LocalStoragePreferenceAskBackgroundLocationPermissionType,
  LocalStoragePreferenceSystemsOfUnitsType,
  LocalStorageInformationJoinVenueType,
} from '#/types/preferences'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import profilingclient from '#/graphql/apollo/profiling/profiling-apollo-server'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  SearchAreaReactiveVar,
  ThemeReactiveVar,
  PreferencePermissionNotificationReactiveVar,
  PreferenceForegroundLocationPermissionReactiveVar,
  PreferenceSystemsOfUnitsReactiveVar,
  PermissionContactsReactiveVar,
  PermissionCameraReactiveVar,
  PermissionMicrophoneReactiveVar,
  PermissionForegroundLocationReactiveVar,
  PermissionBackgroundLocationReactiveVar,
  PermissionMediaReactiveVar,
  PermissionNotificationReactiveVar,
  InformationJoinVenueReactiveVar,
} from '#/reactive'
// import useSetSearchAreaWithLocation from "#/src/util/hooks/searcharea/useSetSearchAreaWithLocation";
import {Camera} from 'expo-camera/legacy'
import * as Contacts from 'expo-contacts'
import 'expo-dev-client'
import 'react-native-reanimated'
import {
  getForegroundPermissionsAsync,
  getBackgroundPermissionsAsync,
} from 'expo-location'
import {getPermissionsAsync as getMediaPermissionAsync} from 'expo-media-library'
import {getPermissionsAsync as getNotificiationPermissionAsync} from 'expo-notifications'
import {Stack, useNavigationContainerRef} from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import * as ScreenOrientation from 'expo-screen-orientation'
import {useEffect} from 'react'
import {Appearance} from 'react-native'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import * as Sentry from '@sentry/react-native'
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev'
import {apolloDevToolsInit} from 'react-native-apollo-devtools-client'
import {isRunningInExpoGo} from 'expo'
import '#/global.css'
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

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
      // await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
      // await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS)
      // await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS)
      // await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION)
      // await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION)

      // INFORMATION JOIN VENUE PROMPT ~ START
      const getInformationJoinVenue = await AsyncStorage.getItem(
        LOCAL_STORAGE_INFORMATION_JOIN_VENUE,
      )

      if (getInformationJoinVenue !== null) {
        const values: LocalStorageInformationJoinVenueType = JSON.parse(
          getInformationJoinVenue,
        )
        console.log(
          '🚀 ~ setAsyncPreferencesLocalStorageData ~ values:',
          values,
        )
        InformationJoinVenueReactiveVar({
          ...values,
        })
      } else {
        const newJoinVenueInformation = JSON.stringify({
          ...InitialStateJoiningInformationPreferencePermission,
        } as LocalStorageInformationJoinVenueType)
        console.log(
          '🚀 ~ setAsyncPreferencesLocalStorageData ~ newJoinVenueInformation:',
          newJoinVenueInformation,
        )

        await AsyncStorage.setItem(
          LOCAL_STORAGE_INFORMATION_JOIN_VENUE,
          newJoinVenueInformation,
        )
      }
      // INFORMATION JOIN VENUE PROMPT ~ END

      // SEARCHAREA_PREFERENCE ~ START
      const getLocalStorageSearchArea = await AsyncStorage.getItem(
        LOCAL_STORAGE_SEARCH_AREA,
      )

      const foregroundLocationPermission = await getForegroundPermissionsAsync()

      if (
        getLocalStorageSearchArea !== null &&
        foregroundLocationPermission.granted
      ) {
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

        await AsyncStorage.setItem(
          LOCAL_STORAGE_SEARCH_AREA,
          newSearchAreaValue,
        )
      }
      // SEARCHAREA_PREFERENCE ~ END

      // THEME_PREFERENCE ~ START
      const getLocalStorageTheme = await AsyncStorage.getItem(
        LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
      )

      if (!getLocalStorageTheme) {
        const initialThemeColorSchemeState = JSON.stringify({
          colorScheme: 'system',
        } as LocalStoragePreferenceThemeType)

        await AsyncStorage.setItem(
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
        await AsyncStorage.getItem(LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS)

      if (!getLocalStorageNotificationPermissionsPreference) {
        await AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
          JSON.stringify(NowPreferencePermissionInitialState),
        )
      } else {
        // using local_storage values set the correct information
        const values: LocalStoragePreferenceAskNotificationPermissionType =
          JSON.parse(getLocalStorageNotificationPermissionsPreference)
        PreferencePermissionNotificationReactiveVar({
          ...values,
        })
      }
      // NOTIFICATION_PREFERENCE ~ END

      // BACKGROUNDLOCATION_PREFERENCE ~ START
      const getLocalStoragePreferenceBackgroundLocationPreference =
        await AsyncStorage.getItem(LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION)

      if (!getLocalStoragePreferenceBackgroundLocationPreference) {
        await AsyncStorage.setItem(
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
        await AsyncStorage.getItem(LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION)

      if (!getLocalStoragePreferenceForegroundLocationPreference) {
        await AsyncStorage.setItem(
          LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
          JSON.stringify(NowPreferencePermissionInitialState),
        )
      } else {
        const values: LocalStoragePreferenceAskBackgroundLocationPermissionType =
          JSON.parse(getLocalStoragePreferenceForegroundLocationPreference)

        PreferenceForegroundLocationPermissionReactiveVar({
          ...values,
        })
      }
      // FOREGROUNDLOCATION_PREFERENCE ~ END

      // SYSTEM_OF_UNITS_PREFERENCE ~ START
      const getLocalStorageSystemOfUnitsPreference = await AsyncStorage.getItem(
        LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
      )

      if (!getLocalStorageSystemOfUnitsPreference) {
        await AsyncStorage.setItem(
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
    } catch (e) {}
  }

  const setAsyncPermissions = async () => {
    const contactsPermission = await Contacts.getPermissionsAsync()
    const cameraPermission = await Camera.getCameraPermissionsAsync()
    const microphonePermission = await Camera.getMicrophonePermissionsAsync()
    const foregroundLocationPermission = await getForegroundPermissionsAsync()

    const backgroundLocationPermission = await getBackgroundPermissionsAsync()
    const mediaLibraryPermission = await getMediaPermissionAsync()
    const notificationPermission = await getNotificiationPermissionAsync()

    PermissionContactsReactiveVar(contactsPermission)
    PermissionCameraReactiveVar(cameraPermission)
    PermissionMicrophoneReactiveVar(microphonePermission)
    PermissionForegroundLocationReactiveVar(foregroundLocationPermission)
    PermissionBackgroundLocationReactiveVar(backgroundLocationPermission)
    PermissionMediaReactiveVar(mediaLibraryPermission)
    PermissionNotificationReactiveVar(notificationPermission)
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

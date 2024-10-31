//TODO: Add notfication listener
import 'expo-dev-client'
import 'react-native-gesture-handler'
import 'react-native-reanimated'

import {ApolloProvider} from '@apollo/client'
import {loadDevMessages, loadErrorMessages} from '@apollo/client/dev'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import * as Sentry from '@sentry/react-native'
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
import {useEffect} from 'react'
import {apolloDevToolsInit} from 'react-native-apollo-devtools-client'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import profilingclient from '#/graphql/apollo/profiling/profiling-apollo-server'
import {PermissionsReactiveVar} from '#/reactive'
import Auth from '#/src/components/layouts/Auth'
import Theme from '#/src/components/layouts/Theme'
import {THEME_COLOR_SCHEME} from '#/src/constants/StorageConstants'
export {ErrorBoundary} from 'expo-router'

import '#/global.css'
import {init as InitPersistedState} from '#/src/state/persisted'
import {useMMKVString} from 'react-native-mmkv'

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

function RootLayout() {
  const [theme, setTheme] = useMMKVString(THEME_COLOR_SCHEME)
  const ref = useNavigationContainerRef()

  async function setScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
    )
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
    InitPersistedState()
  }, [theme])

  useEffect(() => {
    setScreenOrientation()
    setAsyncPermissions()
  }, [])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <KeyboardProvider statusBarTranslucent>
          <BottomSheetModalProvider>
            <ApolloProvider client={profilingclient}>
              <Auth>
                <Theme>
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
                </Theme>
              </Auth>
            </ApolloProvider>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default Sentry.wrap(RootLayout)

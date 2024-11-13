//TODO: Add notfication listener
import '#/src/lib/apollo'
import '#/src/lib/reactotron'
import '#/src/lib/sentry'
import {ApolloProvider} from '@apollo/client'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {Camera} from 'expo-camera/legacy'
import * as Contacts from 'expo-contacts'
import 'expo-dev-client'
import {
  getBackgroundPermissionsAsync,
  getForegroundPermissionsAsync,
} from 'expo-location'
import {getPermissionsAsync as getMediaPermissionAsync} from 'expo-media-library'
import {getPermissionsAsync as getNotificiationPermissionAsync} from 'expo-notifications'
import {Stack} from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as SplashScreen from 'expo-splash-screen'
import React, {useState} from 'react'
import 'react-native-gesture-handler'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import 'react-native-reanimated'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import '#/global.css'
import profilingclient from '#/graphql/apollo/profiling/profiling-apollo-server'
import {PermissionsReactiveVar} from '#/reactive'
import Auth from '#/src/components/layouts/Auth'
import {init as initPersistedState} from '#/src/state/persisted'
import {Provider as ShellStateProvider} from '#/src/state/shell'
import * as Sentry from '@sentry/react-native'
export {ErrorBoundary} from 'expo-router'
// export const unstable_settings = {
// 	// Ensure that reloading on `/modal` keeps a back button present.
// 	initialRouteName: '(app)',
// }

SplashScreen.preventAutoHideAsync()

const setScreenOrientation = async () => {
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

function RootLayout() {
  const [isReady, setReady] = useState(false)

  React.useEffect(() => {
    Promise.all([
      initPersistedState(),
      setScreenOrientation(),
      setAsyncPermissions(),
    ]).then(() => setReady(true))
  }, [])

  if (!isReady) {
    return null
  }

  /*
   * NOTE: only nothing here can depend on other data or session state, since
   * that is set up in the InnerApp component above.
   */

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <KeyboardProvider statusBarTranslucent>
          <BottomSheetModalProvider>
            <ApolloProvider client={profilingclient}>
              <ShellStateProvider>
                <Auth>
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
                </Auth>
              </ShellStateProvider>
            </ApolloProvider>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default Sentry.wrap(RootLayout)

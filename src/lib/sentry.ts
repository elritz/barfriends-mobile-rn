/**
 * Importing these separately from `platform/detection` and `lib/app-info` to
 * avoid future conflicts and/or circular deps
 */

import { BUILD_ENV, IS_DEV, IS_TESTFLIGHT } from '#/src/lib/app-info'
import * as Sentry from '@sentry/react-native'
import { isRunningInExpoGo } from 'expo'
import { nativeApplicationVersion, nativeBuildVersion } from 'expo-application'
import { Platform } from 'react-native'
/**
 * Examples:
 * - `dev`
 * - `1.57.0`
 */
const release = nativeApplicationVersion ?? 'dev'

/**
 * Examples:
 * - `web.dev`
 * - `ios.dev`
 * - `android.dev`
 * - `web.1.57.0`
 * - `ios.1.57.0.3`
 * - `android.1.57.0.46`
 */
const dist = `${Platform.OS}.${nativeBuildVersion}.${
  IS_TESTFLIGHT ? 'tf' : ''
}${IS_DEV ? 'dev' : ''}`

// const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  enabled: !__DEV__,
  autoSessionTracking: false,
  dsn: 'https://1c7981806da9fa394d3a549719cd777d@o4506712454660096.ingest.sentry.io/4506712456757248',
  environment: BUILD_ENV ?? 'development',
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  // enableNative: true,
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      // routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo(),
      // ...
    }),
  ],
  dist,
  release,
})
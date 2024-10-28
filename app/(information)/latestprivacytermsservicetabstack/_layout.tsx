import {StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BlurView} from 'expo-blur'
import {Tabs} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {MaterialIcons} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'
import {
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '#/src/constants/ReactNavigationConstants'
import {ITabColor} from '#/types/app'

export default function _layout() {
  const insets = useSafeAreaInsets()
  const rTheme = useReactiveVar(ThemeReactiveVar)

  return (
    <Tabs
      screenOptions={{
        tabBarBackground: () => (
          <BlurView
            tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
            intensity={70}
            style={[StyleSheet.absoluteFill]}
          />
        ),
        tabBarStyle: {
          height:
            insets.bottom !== 0
              ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
              : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
          position: 'absolute',
          alignItems: 'center',
          elevation: 0, // for Android
          borderTopWidth: 0,
        },
        headerShown: false,
        // tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name={'privacy'}
        options={{
          tabBarIcon: ({color}: ITabColor) => (
            <MaterialIcons size={30} name="privacy-tip" color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '600',
          },
        }}
      />
      <Tabs.Screen
        name={'services'}
        options={{
          tabBarIcon: ({color}: ITabColor) => (
            <MaterialIcons size={30} name="room-service" color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '600',
          },
        }}
      />
    </Tabs>
  )
}

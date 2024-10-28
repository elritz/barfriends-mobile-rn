import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '#/src/constants/ReactNavigationConstants'

export default function useContentInsets() {
  const insets = useSafeAreaInsets()

  const CONTENT_INSETS = {
    top: insets.top + 60,
    bottom:
      insets.bottom !== 0
        ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
        : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
  }

  return CONTENT_INSETS
}

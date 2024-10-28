import React from 'react'
import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics'

import {isIOS, isWeb} from '#/src/platform/detection'
import {useHapticsDisabled} from '#/src/state/preferences/disable-haptics'

const hapticImpact: ImpactFeedbackStyle = isIOS
  ? ImpactFeedbackStyle.Medium
  : ImpactFeedbackStyle.Light // Users said the medium impact was too strong on Android; see APP-537s

export function useHaptics() {
  const isHapticsDisabled = useHapticsDisabled()

  return React.useCallback(() => {
    if (isHapticsDisabled || isWeb) {
      return
    }
    impactAsync(hapticImpact)
  }, [isHapticsDisabled])
}

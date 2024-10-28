import {useMemo} from 'react'
import {useReactiveVar} from '@apollo/client'

import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Color} from '#/src/util/helpers/color'

const useEmojimoodTextColor = (props: {isEmojimoodDynamic: boolean}) => {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const {data: rdmData} = useRefreshDeviceManagerQuery()

  return useMemo(() => {
    if (
      rdmData?.refreshDeviceManager?.__typename !== 'AuthorizationDeviceProfile'
    ) {
      return rTheme.colorScheme === 'light'
        ? rTheme.theme?.gluestack.tokens.colors.light900
        : rTheme.theme?.gluestack.tokens.colors.light100
    }

    const emojimoodColor =
      rdmData?.refreshDeviceManager?.Profile?.tonightStory?.emojimood?.colors?.[0]?.toString()

    const defaultColor =
      rTheme.colorScheme === 'light'
        ? rTheme.theme?.gluestack.tokens.colors.light100
        : rTheme.theme?.gluestack.tokens.colors.light900

    const calculatedColor = props.isEmojimoodDynamic
      ? emojimoodColor || defaultColor
      : defaultColor

    return !Color.isDark(calculatedColor)
      ? rTheme.theme?.gluestack.tokens.colors.light900
      : rTheme.theme?.gluestack.tokens.colors.light100
  }, [rdmData, rTheme, props.isEmojimoodDynamic])
}
export default useEmojimoodTextColor

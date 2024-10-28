import {useReactiveVar} from '@apollo/client'
import {FontAwesome5} from '@expo/vector-icons'

import {ThemeReactiveVar} from '#/reactive'

export default function NavigationDragIcon() {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  return (
    <FontAwesome5
      name="minus"
      size={50}
      color={
        rTheme.colorScheme === 'light'
          ? rTheme.theme?.gluestack.tokens.colors.light900
          : rTheme.theme?.gluestack.tokens.colors.light100
      }
    />
  )
}

import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {useRouter} from 'expo-router'

import {ThemeReactiveVar} from '#/reactive'
import {Pressable} from '#/src/components/ui/pressable'

const ChevronBackArrow = () => {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const router = useRouter()

  const handleOnPress = () => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.push({
        pathname: '/(app)/hometab/venuefeed',
      })
    }
  }

  return (
    <Pressable
      accessibilityRole="button"
      style={{
        flex: 1,
        maxWidth: '6%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => handleOnPress()}>
      <Ionicons
        name="chevron-back-outline"
        size={35}
        color={
          rTheme.colorScheme === 'light'
            ? rTheme.theme?.gluestack.tokens.colors.light900
            : rTheme.theme?.gluestack.tokens.colors.light100
        }
      />
    </Pressable>
  )
}

export default ChevronBackArrow

import {useReactiveVar} from '@apollo/client'
import {Stack} from 'expo-router'

import LogoTransparent from '#/assets/images/company/LogoTransparent'
import {ThemeReactiveVar} from '#/reactive'
import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'

export default () => {
  const rThemeVar = useReactiveVar(ThemeReactiveVar)
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor:
            rThemeVar.colorScheme === 'light'
              ? rThemeVar.theme?.gluestack.tokens.colors.light50
              : rThemeVar.theme?.gluestack.tokens.colors.light900,
        },
        headerTitle: () => <LogoTransparent height={30} width={192} />,
        headerLeft: () => <ChevronBackArrow />,
      }}>
      <Stack.Screen name="authenticator" />
      <Stack.Screen name="loginpassword" />
      <Stack.Screen name="confirmationcode" />
    </Stack>
  )
}

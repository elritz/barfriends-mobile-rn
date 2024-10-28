import {Stack} from 'expo-router'
import {useReactiveVar} from '@apollo/client'

import LogoTransparent from '#/assets/images/company/LogoTransparent'
import {ThemeReactiveVar} from '#/reactive'
import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'

export default function _layout() {
  const rTheme = useReactiveVar(ThemeReactiveVar)

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor:
            rTheme.colorScheme === 'light'
              ? rTheme.theme?.gluestack.tokens.colors.light50
              : rTheme.theme?.gluestack.tokens.colors.light900,
        },
        headerShown: false,
      }}>
      <Stack.Screen
        name={'updatelatestprivacytermsservice'}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerShown: true,
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          // headerLeft: () => <ChevronBackArrow />,
        }}
      />
      <Stack.Screen
        name={'latestprivacyservicetoptab'}
        options={{
          presentation: 'fullScreenModal',
          headerShown: true,
          headerTitle: () => <LogoTransparent height={30} width={192} />,
          headerLeft: () => <ChevronBackArrow />,
        }}
      />
    </Stack>
  )
}

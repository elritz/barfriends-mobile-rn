import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {router} from 'expo-router'

import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Divider} from '#/src/components/ui/divider'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'
import {VStack} from '#/src/components/ui/vstack'
import {useTheme} from '#/src/util/hooks/theme/useTheme'

export default () => {
  const rThemeVar = useReactiveVar(ThemeReactiveVar)
  const [toggleColorScheme] = useTheme()

  const setTheme = async ({
    colorScheme,
  }: {
    colorScheme: 'light' | 'dark' | 'system'
  }) => {
    await toggleColorScheme({colorScheme})
    router.back()
  }

  return (
    <Box className="flex-1">
      <VStack space={'md'} className="w-full justify-around py-4">
        <Pressable
          accessibilityRole="button"
          onPress={async () => {
            await setTheme({colorScheme: 'light'})
          }}
          className="flex-row items-center justify-between px-4">
          <Heading size={'md'} className="font-[normal]">
            Light
          </Heading>
        </Pressable>
        <Divider />
        <Pressable
          accessibilityRole="button"
          onPress={async () => {
            await setTheme({colorScheme: 'dark'})
          }}
          className="flex-row items-center justify-between px-4">
          <Heading className="text-md font-[normal]">Dark</Heading>
          {rThemeVar.mode === 'dark' && (
            <Ionicons
              size={30}
              color={rThemeVar.theme?.gluestack.tokens.colors.primary500}
              name={'checkmark-circle'}
            />
          )}
        </Pressable>
        <Divider />
        <Pressable
          accessibilityRole="button"
          onPress={async () => {
            await setTheme({colorScheme: 'system'})
          }}
          className="flex-row items-center justify-between px-4">
          <Heading size={'md'} className="font-[normal]">
            System
          </Heading>
          {rThemeVar.mode === 'system' && (
            <Ionicons
              size={30}
              color={rThemeVar.theme?.gluestack.tokens.colors.primary500}
              name={'checkmark-circle'}
            />
          )}
        </Pressable>
        <Divider />
      </VStack>
    </Box>
  )
}

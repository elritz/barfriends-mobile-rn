import { VStack } from "#/components/ui/vstack";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { Divider } from "#/components/ui/divider";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '#/reactive'
import { useToggleTheme } from '#/util/hooks/theme/useToggleTheme'
import { router } from 'expo-router'

export default () => {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleColorScheme] = useToggleTheme()

	const setTheme = async ({ colorScheme }: { colorScheme: 'light' | 'dark' | 'system' }) => {
		await toggleColorScheme({ colorScheme })
		router.back()
	}

	return (
        <Box className="flex-1">
            <VStack space={'md'} className="py-4 w-full justify-around">
				<Pressable
                    onPress={async () => {
						await setTheme({ colorScheme: 'light' })
					}}
                    className="px-4 flex-row items-center justify-between">
					<Heading size={'md'} className="font-[normal]">
						Light
					</Heading>
					{rThemeVar.localStorageColorScheme === 'light' && (
						<Ionicons
							size={30}
							color={rThemeVar.theme?.gluestack.tokens.colors.primary500}
							name={'checkmark-circle'}
						/>
					)}
				</Pressable>
				<Divider />
				<Pressable
                    onPress={async () => {
						await setTheme({ colorScheme: 'dark' })
					}}
                    className="px-4 flex-row items-center justify-between">
					<Heading className="font-[normal] text-md">
						Dark
					</Heading>
					{rThemeVar.localStorageColorScheme === 'dark' && (
						<Ionicons
							size={30}
							color={rThemeVar.theme?.gluestack.tokens.colors.primary500}
							name={'checkmark-circle'}
						/>
					)}
				</Pressable>
				<Divider />
				<Pressable
                    onPress={async () => {
						await setTheme({ colorScheme: 'system' })
					}}
                    className="px-4 flex-row items-center justify-between">
					<Heading size={'md'} className="font-[normal]">
						System
					</Heading>
					{rThemeVar.localStorageColorScheme === 'system' && (
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
    );
}

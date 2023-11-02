import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { Box, Divider, Heading, Pressable, VStack } from '@gluestack-ui/themed'
import { ThemeReactiveVar } from '@reactive'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { router } from 'expo-router'

export default () => {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleColorScheme] = useToggleTheme()

	const setTheme = async ({ colorScheme }: { colorScheme: 'light' | 'dark' | 'system' }) => {
		await toggleColorScheme({ colorScheme })
		router.back()
	}

	return (
		<Box flex={1}>
			<VStack py={'$4'} w={'$full'} space={'md'} justifyContent={'space-around'}>
				<Pressable
					onPress={async () => {
						await setTheme({ colorScheme: 'light' })
					}}
					px={'$4'}
					flexDirection={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Heading fontWeight={'normal'} size={'md'}>
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
					px={'$4'}
					flexDirection={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Heading fontWeight={'normal'} fontSize={'$md'}>
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
					px={'$4'}
					flexDirection={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Heading fontWeight={'normal'} size={'md'}>
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
	)
}

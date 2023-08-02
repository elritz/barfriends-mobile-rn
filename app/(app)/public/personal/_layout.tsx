// TODO: FX() Settings still needs to be done
import { useReactiveVar } from '@apollo/client'
import { Button, HStack } from '@components/core'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { Stack, useRouter } from 'expo-router'

export default () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerTransparent: true,
				headerStyle: {
					backgroundColor: 'transparent',
				},
				headerLeft: () => (
					<HStack
						justifyContent={'flex-start'}
						sx={{
							maxWidth: '90%',
						}}
						space={'md'}
						alignItems={'center'}
						ml={'$2'}
					>
						<Button
							bg={rTheme.colorScheme === 'light' ? '$light50' : '$dark50'}
							rounded={'$full'}
							onPress={() => router.back()}
						>
							<Ionicons
								name='md-chevron-back-outline'
								size={35}
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light900
										: rTheme.theme?.gluestack.tokens.colors.dark900
								}
							/>
						</Button>
					</HStack>
				),
				headerRight: () => (
					<Button
						bg={rTheme.colorScheme === 'light' ? '$light50' : '$dark50'}
						rounded={'$full'}
						onPress={() => router.back()}
						my={'$2'}
						mr={'$2'}
					>
						<Ionicons
							name='md-chevron-back-outline'
							size={35}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.dark900
							}
						/>
						<Entypo name={'dots-three-vertical'} size={23} />
					</Button>
				),
				headerTitle: '',
			}}
		>
			<Stack.Screen name={'[profileid]'} />
		</Stack>
	)
}

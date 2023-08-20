import { useReactiveVar } from '@apollo/client'
import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import Theme from '@components/layouts/Theme'
import { ThemeReactiveVar } from '@reactive'
import { Stack } from 'expo-router'

export default function _layout() {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<Theme>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor:
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light50
								: rTheme.theme?.gluestack.tokens.colors.dark50,
					},
					headerTitle: () => <LogoTransparent height={30} width={192} />,
					headerLeft: () => <ChevronBackArrow />,
					presentation: 'modal',
				}}
			>
				<Stack.Screen name={'latestprivacytermsservicetabstack'} />
				<Stack.Screen
					name={'latestprivacyservicetoptab'}
					options={{
						presentation: 'modal',
					}}
				/>
			</Stack>
		</Theme>
	)
}

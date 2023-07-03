import { useReactiveVar } from '@apollo/client'
import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { config } from '@gluestack'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Stack } from 'expo-router'

export default function _layout() {
	// const colorScheme = useThemeColorScheme()
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor:
						rThemeVar.colorScheme === 'light'
							? rThemeVar.theme?.gluestack.tokens.colors.light50
							: rThemeVar.theme?.gluestack.tokens.colors.dark50,
				},
				headerTitle: () => <LogoTransparent height={30} width={192} />,
				headerLeft: () => <ChevronBackArrow />,
			}}
		/>
	)
}

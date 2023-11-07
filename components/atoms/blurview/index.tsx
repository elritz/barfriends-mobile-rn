import { useReactiveVar } from '@apollo/client'
import { ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'

export default ({ children }) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<BlurView intensity={70} tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}>
			{children}
		</BlurView>
	)
}

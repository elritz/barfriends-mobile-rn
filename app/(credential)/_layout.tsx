//TODO: Add notfication listener
import Theme from '@components/layouts/Theme'
import { Slot } from 'expo-router'

export default () => {
	return (
		<Theme>
			<Slot />
		</Theme>
	)
}

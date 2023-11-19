import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Stack } from 'expo-router'

export default () => {
	return (
		<Stack
			screenOptions={{
				headerTitle: () => <LogoTransparent height={30} width={192} />,
				headerLeft: () => <ChevronBackArrow />,
				presentation: 'modal',
				
			}}
		>
			<Stack.Screen name={'backgroundlocationnextask'} />
			<Stack.Screen name={'foregroundlocationnextask'} />
			<Stack.Screen name={'notificationnextask'} />
		</Stack>
	)
}

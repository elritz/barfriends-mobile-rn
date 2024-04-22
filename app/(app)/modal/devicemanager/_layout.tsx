import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Emojimood } from '@graphql/generated'
import { Stack } from 'expo-router'

export type FormType = {
	emojimood: Emojimood
}

export default () => {
	return (
		<Stack
			screenOptions={{
				animation: 'slide_from_right',
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={'devicemanager'}
				options={{
					headerShown: true,
					headerTitle: () => <LogoTransparent height={30} width={192} />,
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<Stack.Screen
				name={'[profileid]'}
				options={{
					headerShown: true,
					headerTitle: () => <LogoTransparent height={30} width={192} />,
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
		</Stack>
	)
}

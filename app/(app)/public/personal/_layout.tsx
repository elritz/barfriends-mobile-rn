// TODO: FX() Settings still needs to be done
import { Stack } from 'expo-router'

export default () => {
	return (
        <Stack
			screenOptions={{
				headerShown: false,
			}}
		>
            <Stack.Screen name={'[username]'} />
        </Stack>
    );
}

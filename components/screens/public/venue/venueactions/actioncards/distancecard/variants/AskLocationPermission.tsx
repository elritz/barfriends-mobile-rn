import { Button, Heading, VStack, ButtonText } from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'

export default function AskForegroundLocationPermission() {
	const router = useRouter()

	return (
		<VStack
			flexDirection={'column'}
			justifyContent={'space-around'}
			sx={{
				h: '100%',
			}}
		>
			<Heading
				mt={'$5'}
				fontSize={'$lg'}
				textTransform={'uppercase'}
				fontWeight={'$black'}
				lineHeight={'$xs'}
				flex={1}
			>
				See how close you are?
			</Heading>
			<Button
				size={'lg'}
				onPress={() =>
					router.navigate({
						pathname: '/(app)/permission/foregroundlocation',
					})
				}
			>
				<ButtonText>Continue</ButtonText>
			</Button>
		</VStack>
	)
}

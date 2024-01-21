// TODO: FN(What functionality was suppose to be here)
import { Box, Pressable, VStack, Heading, Text } from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
	useRemoveDeviceProfileFromDeviceManagerMutation,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView, ScrollView } from 'react-native'

export default () => {
	const router = useRouter()
	const params = useGlobalSearchParams()

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceProfile
					AuthorizationReactiveVar(deviceManager)
					setTimeout(
						() =>
							router.navigate({
								pathname: '/(app)/hometab/venuefeed',
							}),
						1000,
					)
				}
			},
		})

	const [removeDeviceProfileMutation, { data: RDPMData, loading: RDPMLoading, error: RDPMError }] =
		useRemoveDeviceProfileFromDeviceManagerMutation({
			variables: {
				profileId: String(params.profileid),
			},
			onCompleted: data => {
				switchDeviceProfileMutation()
			},
			onError: error => {
				console.log('error', error)
			},
		})

	const actions = [
		{
			title: 'Remove from device',
			onPress: () => {
				removeDeviceProfileMutation()
			},
		},
		{
			title: 'Settings',
			onPress: () => {
				console.log('Navigate to the settings page')
			},
		},
		{
			title: 'Logout',
			onPress: () => {
				switchDeviceProfileMutation()
			},
		},
	]

	const RoundedListItem = ({ children, ...props }) => (
		<Pressable onPress={props.onPress}>
			<Box
				sx={{
					h: 50,
				}}
				px={'$2'}
				py={'$3'}
				alignItems={'flex-start'}
				flexDirection={'column'}
			>
				{children}
			</Box>
		</Pressable>
	)

	return (
		<SafeAreaView style={{ flex: 1, margin: 10 }}>
			<Heading
				px={'$2'}
				sx={{
					h: 30,
				}}
			>
				Account Actions
			</Heading>
			<ScrollView
				style={{
					marginVertical: 4,
				}}
			>
				<VStack space='md' mt={'$4'}>
					{actions.map((item, index) => {
						return (
							<RoundedListItem key={index} onPress={item.onPress}>
								<Text fontWeight={'$bold'} fontSize={'$lg'} color={'$primary500'}>
									{item.title}
								</Text>
							</RoundedListItem>
						)
					})}
				</VStack>
			</ScrollView>
		</SafeAreaView>
	)
}

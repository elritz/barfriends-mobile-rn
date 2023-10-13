import { useReactiveVar } from '@apollo/client'
import NotificationNextAskModal from '@components/molecules/modals/asks/notificationnextaskmodal'
import { Box, Button, Divider, Heading, Text, VStack } from '@gluestack-ui/themed'
import { useGetCurrentPushNotificationTokenQuery } from '@graphql/generated'
import {
	PermissionNotificationReactiveVar,
	PreferencePermissionNotificationReactiveVar,
} from '@reactive'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { MotiView } from 'moti'
import { View } from 'react-native'

export default function PreferenceNotificationPermission() {
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclose()

	const rPermissionNotificationVar = useReactiveVar(PermissionNotificationReactiveVar)

	const rPreferenceNotificationPermission = useReactiveVar(
		PreferencePermissionNotificationReactiveVar,
	)

	const _pressUpdateNotificationPreferencePermission = async () => {
		// await AsyncStorage.setItem(
		// 	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
		// 	JSON.stringify({
		// 		...TomorrowPreferencePermissionInitialState,
		// 		numberOfTimesDismissed: rPreferenceNotificationPermission?.numberOfTimesDismissed
		// 			? rPreferenceNotificationPermission.numberOfTimesDismissed + 1
		// 			: 1,
		// 	} as DefaultPreferenceToPermissionType),
		// )
		// PreferencePermissionNotificationReactiveVar({
		// 	...TomorrowPreferencePermissionInitialState,
		// })
	}

	const {
		data: GCPNTData,
		loading: GCPNTLoading,
		error: GCPNTError,
	} = useGetCurrentPushNotificationTokenQuery()

	if (GCPNTLoading) {
		return null
	}

	return (
		<View>
			<NotificationNextAskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

			{rPreferenceNotificationPermission?.canShowAgain &&
				DateTime.fromISO(rPreferenceNotificationPermission?.dateToShowAgain.toString()) <=
					DateTime.now() && (
					<Box bg={'transparent'} key={uniqueId()}>
						<MotiView
							from={{
								opacity: 0,
								scale: 1,
							}}
							animate={{
								opacity: 1,
								scale: 1,
							}}
							exit={{
								opacity: 0,
								scale: 0.9,
							}}
						>
							<VStack space={'md'} alignItems={'center'}>
								<Heading textAlign={'center'} fontWeight={'$black'} fontSize={'$xl'}>
									Stay Up to Date
								</Heading>
								<Text textAlign={'center'} fontSize={'$md'} style={{ width: '90%' }}>
									Turn on notification to hear about deals, events, messages, friend requests.
								</Text>
								<Button
									onPress={() =>
										router.push({
											pathname: '/(app)/permission/notifications',
										})
									}
									sx={{
										w: '85%',
									}}
									rounded={'$md'}
								>
									<Button.Text fontWeight='$bold' fontSize={'$lg'}>
										Continue
									</Button.Text>
								</Button>
								<Button
									sx={{
										w: '90%',
									}}
									variant={'link'}
									// onPress={async () => _pressUpdateNotificationPreferencePermission()}
									onPress={onOpen}
								>
									<Text fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
										Not now
									</Text>
								</Button>
							</VStack>
						</MotiView>
						<Divider mt={'$1'} />
					</Box>
				)}
		</View>
	)
}

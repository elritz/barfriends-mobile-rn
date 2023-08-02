import { useReactiveVar } from '@apollo/client'
import { Box, Button, Divider, HStack, Heading, Text, VStack } from '@components/core'
import NotificationNextAskModal from '@components/molecules/modals/asks/notificationnextaskmodal'
import { TomorrowPreferencePermissionInitialState } from '@constants/Preferences'
import { LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS } from '@constants/StorageConstants'
import { DefaultPreferenceToPermission } from '@ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PermissionNotificationReactiveVar,
	PreferencePermissionNotificationReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { MotiView } from 'moti'

export default function PreferenceNotificationPermission() {
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclose()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rPermissionNotificationVar = useReactiveVar(PermissionNotificationReactiveVar)
	const rPreferenceNotificationPermission = useReactiveVar(
		PreferencePermissionNotificationReactiveVar,
	)

	return (
		<>
			<NotificationNextAskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			{rPreferenceNotificationPermission?.canShowAgain &&
				DateTime.fromISO(rPreferenceNotificationPermission?.dateToShowAgain.toString()) <=
					DateTime.now() && (
					<Box key={uniqueId()}>
						{!rPermissionNotificationVar?.granted && (
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
								<VStack my={'$3'} space={'md'} alignItems={'center'}>
									<HStack
										sx={{
											w: '95%',
										}}
										justifyContent={'flex-end'}
									>
										{/* <Pressable>
											<EvilIcons
												onPress={onOpen}
												size={25}
												name={'close'}
												color={
													rTheme.colorScheme === 'light'
														? rTheme.theme?.gluestack.tokens.colors.light900
														: rTheme.theme?.gluestack.tokens.colors.dark900
												}
											/>
										</Pressable> */}
									</HStack>
									<Heading
										fontSize={'$md'}
										textAlign={'center'}
										style={{
											width: '100%',
										}}
									>
										Stay Up to Date
									</Heading>
									<Text textAlign={'center'} fontSize={'$md'} style={{ width: '90%' }}>
										Turn on notification to know right away when people friend you, invit you out or send you
										a message.
									</Text>
									<Button
										onPress={() =>
											router.push({
												pathname: '(app)/permission/notifications',
											})
										}
										size={'sm'}
										mt={'$4'}
										sx={{
											w: '85%',
										}}
									>
										<Button.Text fontSize={'$sm'} fontWeight='$bold'>
											Turn on Notifications
										</Button.Text>
									</Button>
									<Button
										sx={{
											w: '90%',
										}}
										variant={'link'}
										onPress={async () => {
											await AsyncStorage.setItem(
												LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
												JSON.stringify({
													...TomorrowPreferencePermissionInitialState,
													numberOfTimesDismissed: rPreferenceNotificationPermission?.numberOfTimesDismissed
														? rPreferenceNotificationPermission.numberOfTimesDismissed + 1
														: 1,
												} as DefaultPreferenceToPermission),
											)
											PreferencePermissionNotificationReactiveVar({
												...TomorrowPreferencePermissionInitialState,
											})
										}}
									>
										<Text>Not now</Text>
									</Button>
								</VStack>
							</MotiView>
						)}
						<Divider />
					</Box>
				)}
		</>
	)
}

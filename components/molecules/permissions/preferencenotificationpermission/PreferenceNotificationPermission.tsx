import { useReactiveVar } from '@apollo/client'
import { Box, Button, ButtonText, Divider, Heading, Text, VStack } from '@gluestack-ui/themed'
import {
	PermissionNotificationReactiveVar,
	PreferencePermissionNotificationReactiveVar,
} from '@reactive'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { AnimatePresence, MotiView } from 'moti'

export default function PreferenceNotificationPermission() {
	const router = useRouter()
	const rPreferencePermissionNotificationVar = useReactiveVar(
		PreferencePermissionNotificationReactiveVar,
	)
	const rPermissionNotificationVar = useReactiveVar(PermissionNotificationReactiveVar)

	return (
		<AnimatePresence key={uniqueId()}>
			{!rPermissionNotificationVar?.granted &&
				rPreferencePermissionNotificationVar?.canShowAgain &&
				DateTime.fromISO(rPreferencePermissionNotificationVar?.dateToShowAgain.toString()) <=
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
							exitTransition={{
								type: 'timing',
								duration: 3500,
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
									<ButtonText fontWeight='$bold' fontSize={'$lg'}>
										Continue
									</ButtonText>
								</Button>
								<Button
									sx={{
										w: '90%',
									}}
									variant={'link'}
									onPress={() => {
										router.push({
											pathname: '/(app)/modal/asks/notificationnextask',
										})
									}}
								>
									<Text fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
										Not now
									</Text>
								</Button>
							</VStack>
						</MotiView>
						<Divider my={'$2'} />
					</Box>
				)}
		</AnimatePresence>
	)
}

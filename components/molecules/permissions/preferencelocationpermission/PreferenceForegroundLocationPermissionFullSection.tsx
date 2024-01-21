import { useReactiveVar } from '@apollo/client'
import ForegroundLocationNextAskModal from '@components/molecules/asks/permissions/foregroundlocationnextask'
import { LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from '@ctypes/preferences'
import { EvilIcons } from '@expo/vector-icons'
import { Box, Button, Divider, HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PermissionForegroundLocationReactiveVar,
	PreferenceForegroundLocationPermissionReactiveVar,
} from '@reactive'
import { TomorrowPreferencePermissionInitialState } from '@constants/Preferences'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { MotiView } from 'moti'
import { Pressable } from 'react-native'

export default function ForegroundLocationPermissionFullSection() {
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclose()
	const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rPreferenceForegroundLocationPermission = useReactiveVar(
		PreferenceForegroundLocationPermissionReactiveVar,
	)
	return (
		<>
			<ForegroundLocationNextAskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			{rPreferenceForegroundLocationPermission?.canShowAgain &&
				DateTime.fromISO(String(rPreferenceForegroundLocationPermission?.dateToShowAgain)) <=
					DateTime.now() && (
					<Box key={uniqueId()}>
						{!rPermissionLocationVar?.granted && (
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
								<HStack sx={{ w: '95%' }} justifyContent={'flex-end'}>
									<Pressable onPress={onOpen}>
										<EvilIcons size={25} name='close' />
									</Pressable>
									<Pressable onPress={onOpen}>
										<EvilIcons size={25} name={'close'} />
									</Pressable>
								</HStack>
								<VStack my={'$3'} space={'md'} alignItems={'center'}>
									<Heading
										fontSize={'$md'}
										textAlign={'center'}
										style={{
											width: '100%',
										}}
									>
										Enable Location
									</Heading>
									<Text fontSize={'$lg'} style={{ width: '100%' }}>
										Using your current location will automatically show you what's near you based on where you
										are.
									</Text>
									<Button
										onPress={() =>
											router.navigate({
												pathname: '/(app)/permission/foregroundlocation',
											})
										}
										size={'sm'}
										mt={'$4'}
										sx={{
											w: '85%',
										}}
									>
										<Text fontWeight='$bold' fontSize={'$lg'}>
											Use Current Location
										</Text>
									</Button>
									<Button
										sx={{
											w: '90%',
										}}
										variant={'link'}
										onPress={async () => {
											const values = {
												...TomorrowPreferencePermissionInitialState,
												numberOfTimesDismissed: rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
													? rPreferenceForegroundLocationPermission.numberOfTimesDismissed + 1
													: 1,
											}
											await AsyncStorage.setItem(
												LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
												JSON.stringify(values as LocalStoragePreferenceAskForegroundLocationPermissionType),
											)
											PreferenceForegroundLocationPermissionReactiveVar({
												...values,
											})
										}}
									>
										<Text fontSize={'$lg'} fontWeight={'$bold'} alignSelf='center'>
											Not now
										</Text>
									</Button>
								</VStack>
							</MotiView>
						)}
						<Divider mt={'$1'} />
					</Box>
				)}
		</>
	)
}

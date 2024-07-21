import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Divider } from "#/components/ui/divider";
import { Button } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import ForegroundLocationNextAskModal from '#/components/molecules/asks/permissions/foregroundlocationnextask'
import { LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION } from '#/constants/StorageConstants'
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from '#/ctypes/preferences'
import { EvilIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PermissionForegroundLocationReactiveVar,
	PreferenceForegroundLocationPermissionReactiveVar,
} from '#/reactive'
import { TomorrowPreferencePermissionInitialState } from '#/constants/Preferences'
import { useDisclose } from '#/util/hooks/useDisclose'
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
	return (<>
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
                            <HStack className="w-[95%] justify-end">
                                <Pressable onPress={onOpen}>
                                    <EvilIcons size={25} name='close' />
                                </Pressable>
                                <Pressable onPress={onOpen}>
                                    <EvilIcons size={25} name={'close'} />
                                </Pressable>
                            </HStack>
                            <VStack space={'md'} className="my-3 items-center">
                                <Heading
                                    style={{
                                        width: '100%',
                                    }}
                                    className="text-md text-center">
                                    Enable Location
                                </Heading>
                                <Text style={{ width: '100%' }} className="text-lg">
                                    Using your current location will automatically show you what's near you based on where you
                                    are.
                                </Text>
                                <Button
                                    onPress={() =>
                                        router.push({
                                            pathname: '/(app)/permission/foregroundlocation',
                                        })
                                    }
                                    size={'sm'}
                                    className="mt-4 w-[85%]">
                                    <Text className="font-bold text-lg">
                                        Use Current Location
                                    </Text>
                                </Button>
                                <Button
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
                                    className="w-[90%]"
                                >
                                    <Text className="text-lg font-bold self-center">
                                        Not now
                                    </Text>
                                </Button>
                            </VStack>
                        </MotiView>
                    )}
                    <Divider className="mt-1" />
                </Box>
            )}
    </>);
}

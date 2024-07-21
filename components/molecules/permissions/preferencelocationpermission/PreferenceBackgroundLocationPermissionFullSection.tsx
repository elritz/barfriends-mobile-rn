import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Divider } from "#/components/ui/divider";
import { Button } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import BackgroundLocationNextAsk from '#/components/molecules/asks/permissions/backgroundlocationnextask'
import { TomorrowPreferencePermissionInitialState } from '#/constants/Preferences'
import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from '#/constants/StorageConstants'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '#/ctypes/preferences'
import { EvilIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PermissionBackgroundLocationReactiveVar,
	PreferenceBackgroundLocationPermissionReactiveVar,
} from '#/reactive'
import { useDisclose } from '#/util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { MotiView } from 'moti'

export default function PreferenceBackgroundLocationPermissionFullSection() {
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclose()
	const rPermissionBackgroundLocationVar = useReactiveVar(PermissionBackgroundLocationReactiveVar)
	const rPreferenceBackgroundLocationPermission = useReactiveVar(
		PreferenceBackgroundLocationPermissionReactiveVar,
	)

	return (<>
        <BackgroundLocationNextAsk />
        {rPreferenceBackgroundLocationPermission?.canShowAgain &&
            DateTime.fromISO(rPreferenceBackgroundLocationPermission?.dateToShowAgain.toString()) <=
                DateTime.now() && (
                <Box key={uniqueId()}>
                    <Divider />
                    {!rPermissionBackgroundLocationVar?.granted && (
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
                            <VStack space={'sm'} className="my-3 items-center">
                                <HStack className="w-[95%] justify-end">
                                    <Pressable onPress={onOpen}>
                                        <EvilIcons size={25} name='close' />
                                    </Pressable>
                                </HStack>
                                <Heading
                                    style={{
                                        width: '100%',
                                    }}
                                    className="text-md text-center">
                                    Enable More Features
                                </Heading>
                                <Text className="text-center text-md w-[90%]">
                                    Turn on "always allow" and find better deals at venues, be notified when you can join, and
                                    when friends near you are going out.
                                </Text>
                                <Button
                                    onPress={() =>
                                        router.push({
                                            pathname: '/(app)/permission/backgroundlocation',
                                        })
                                    }
                                    size={'sm'}
                                    className="mt-4 w-[85%]">
                                    <Text className="font-bold text-lg">
                                        Use "always allow"
                                    </Text>
                                </Button>
                                <Button
                                    variant={'link'}
                                    onPress={async () => {
                                        await AsyncStorage.setItem(
                                            LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
                                            JSON.stringify({
                                                ...TomorrowPreferencePermissionInitialState,
                                                numberOfTimesDismissed: rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
                                                    ? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed + 1
                                                    : 1,
                                            } as LocalStoragePreferenceAskBackgroundLocationPermissionType),
                                        )
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

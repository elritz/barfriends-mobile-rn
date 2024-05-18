import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from '#/constants/StorageConstants'
import { TomorrowPreferencePermissionInitialState } from '#/constants/Preferences'
import {
	Button,
	Center,
	Divider,
	Heading,
	Modal,
	Text,
	VStack,
	Box,
	ButtonText,
	HStack,
	Pressable,
} from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PreferenceBackgroundLocationPermissionReactiveVar, ThemeReactiveVar } from '#/reactive'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DefaultPreferenceToPermissionType } from '#/preferences'

const BackgroundLocationNextAsk = () => {
	const router = useRouter()
	const insets = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rPreferenceBackgroundLocationPermissionVar = useReactiveVar(
		PreferenceBackgroundLocationPermissionReactiveVar,
	)

	return (
		<Box bg={'$transparent'} style={{ flex: 1 }} mb={'$5'}>
			<VStack justifyContent={'flex-start'} my={'$5'} space={'md'}>
				{/* <IllustrationDynamicLocation width={60} height={60} />
				<Divider width={'$2'} style={{ width: 50, marginVertical: 10 }} /> */}
				<Heading
					px={'$2'}
					fontWeight={'$black'}
					fontSize={'$xl'}
					allowFontScaling
					adjustsFontSizeToFit
					numberOfLines={3}
				>
					Background Location
				</Heading>
				<Text px={'$2'} fontSize={'$xl'} allowFontScaling adjustsFontSizeToFit numberOfLines={3}>
					By enabling background location, it helps you to go out, join bars and find events.
				</Text>
			</VStack>
			<HStack m={'$2'} justifyContent='space-between' alignItems='center'>
				<Pressable
					onPress={async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
							JSON.stringify({
								...TomorrowPreferencePermissionInitialState,
								numberOfTimesDismissed: rPreferenceBackgroundLocationPermissionVar?.numberOfTimesDismissed
									? rPreferenceBackgroundLocationPermissionVar.numberOfTimesDismissed + 1
									: 1,
								canShowAgain: false,
							} as DefaultPreferenceToPermissionType),
						)
						PreferenceBackgroundLocationPermissionReactiveVar({
							...TomorrowPreferencePermissionInitialState,
						})
					}}
				>
					<Text textDecorationLine='underline'>Don't show this again</Text>
				</Pressable>
				<Button
					size='sm'
					rounded={'$full'}
					// sx={{
					// 	_light: {
					// 		backgroundColor: '$light300',
					// 	},
					// 	_dark: {
					// 		backgroundColor: '$light700',
					// 	},
					// }}
					onPress={async () => {
						router.push({
							pathname: '/(app)/permission/backgroundlocation',
						})
					}}
				>
					<ButtonText
						sx={{
							color: '$white',
						}}
					>
						Continue
					</ButtonText>
				</Button>
			</HStack>
			<Divider alignSelf={'center'} w={'95%'} />
		</Box>
	)
}

export default BackgroundLocationNextAsk

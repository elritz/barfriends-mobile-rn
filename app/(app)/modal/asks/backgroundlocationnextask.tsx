import { useReactiveVar } from '@apollo/client'
import IllustrationDynamicLocation from '@assets/images/location/IllustrationDynamicLocation'
import PermissionDetailItem from '@components/screens/permissions/PermissionDetailItem'
import { DaysPreferencePermissionInitialState } from '@constants/Preferences'
import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@ctypes/preferences'
import {
	Box,
	Button,
	ButtonText,
	Center,
	Divider,
	Heading,
	Modal,
	ScrollView,
	Text,
	VStack,
	View,
} from '@gluestack-ui/themed'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PermissionBackgroundLocationReactiveVar,
	PreferenceBackgroundLocationPermissionReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

export default () => {
	const router = useRouter()
	const insets = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const details = [
		{
			title: 'How you’ll use this',
			detail: 'To find venues and event deals around you.',
			icon: (
				<Ionicons
					name='ios-location-sharp'
					size={25}
					style={{
						marginHorizontal: 7,
					}}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
				/>
			),
		},
		{
			title: 'How we’ll use this',
			detail: 'To create your own content and share. ',
			icon: (
				<MaterialCommunityIcons
					name='android-messages'
					size={25}
					style={{
						marginHorizontal: 7,
					}}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
				/>
			),
		},
		{
			title: 'How these settings work',
			detail:
				'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
			icon: (
				<Ionicons
					name='ios-settings-sharp'
					size={25}
					style={{
						marginHorizontal: 7,
					}}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
				/>
			),
		},
	]

	return (
		<Box bg={'$transparent'} style={{ flex: 1 }} mb={'$5'}>
			<Box bg={'$transparent'} alignItems={'center'} justifyContent={'flex-start'} my={'$5'}>
				<IllustrationDynamicLocation width={60} height={60} />
				<Divider width={'$2'} style={{ width: 50, marginVertical: 10 }} />
				<Heading
					px={'$2'}
					fontWeight={'$black'}
					fontSize={'$3xl'}
					style={{
						textAlign: 'center',
					}}
					allowFontScaling
					adjustsFontSizeToFit
					numberOfLines={3}
				>
					By enabling background location, it helps you to go out, join bars and find events.
				</Heading>
			</Box>
			<ScrollView>
				<Box
					bg={'$transparent'}
					sx={{
						w: wp(95),
					}}
					flex={1}
					alignSelf='center'
				>
					{details.map((item, index) => {
						return (
							<View key={index}>
								<PermissionDetailItem {...item} />
							</View>
						)
					})}
				</Box>
			</ScrollView>
			<VStack
				space={'md'}
				w={'$full'}
				alignItems={'center'}
				sx={{
					mb: insets.bottom,
				}}
			>
				<Divider w={'95%'} />
				<Button
					size={'lg'}
					sx={{
						w: '95%',
					}}
					onPress={async () => {
						router.push({
							pathname: '/(app)/permission/backgroundlocation',
						})
					}}
				>
					<ButtonText>Continue</ButtonText>
				</Button>
				<Button size={'lg'} sx={{ width: '95%' }} onPress={() => router.back()} variant={'link'}>
					<ButtonText fontWeight={'$medium'}>Not Now</ButtonText>
				</Button>
			</VStack>
		</Box>
	)
}

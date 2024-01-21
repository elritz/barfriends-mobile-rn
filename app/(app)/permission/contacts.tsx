// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it
import { useReactiveVar } from '@apollo/client'
import { Box, Button, ButtonText, Divider, Heading, Text, VStack } from '@gluestack-ui/themed'
import PermissionDetailItem from '@components/screens/permissions/PermissionDetailItem'
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { ContactsReactiveVar, PermissionContactsReactiveVar, ThemeReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/helpers/capitalizeFirstLetter'
import useTimer2 from '@util/hooks/useTimer2'
import * as Contacts from 'expo-contacts'
import * as Device from 'expo-device'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Alert, AppState, Platform, ScrollView, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const appStateRef = useRef(AppState.currentState)
	const router = useRouter()
	const isFocused = useIsFocused()
	const insets = useSafeAreaInsets()
	const rContactPermission = useReactiveVar(PermissionContactsReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const { finished, start, seconds, started } = useTimer2('0:2')

	const details = [
		{
			title: 'How you’ll use this',
			detail: 'To share, friend and invite to events and venues.',
			icon: (
				<MaterialIcons
					name={'contact-page'}
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
			detail: 'To show you your contacts.',
			icon: (
				<MaterialCommunityIcons
					name={'android-messages'}
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
					name={'settings-sharp'}
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

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Revel Contacts Permission',
			`Contacts are currently ${capitalizeFirstLetter(
				capitalizeFirstLetter(rContactPermission?.status),
			)}. If you wish to adjust go to your device settings.`,
			[
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{ text: 'Settings', onPress: () => handleOpenPhoneSettings() },
			],
		)

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			Linking.openURL('app-settings://')
		}
	}

	const handleRequestPermission = async () => {
		const status = await Contacts.requestPermissionsAsync()
		if (Device.isDevice) {
			PermissionContactsReactiveVar(status)
			if (status.granted && status.status === 'granted') {
				const { data } = await Contacts.getContactsAsync()
				if (data.length) {
					ContactsReactiveVar(data)
				}
				start()
			}
		} else {
			createTwoButtonAlert()
		}
	}

	useEffect(() => {
		async function loadPermissionsAsync() {
			const status = await Contacts.getPermissionsAsync()
			try {
				PermissionContactsReactiveVar(status)

				if (status.granted && status.status === 'granted') {
					const { data } = await Contacts.getContactsAsync()
					if (data.length) {
						ContactsReactiveVar(data)
					}
				}
			} catch (e) {
				console.warn(e)
			}
		}
		loadPermissionsAsync()
	}, [isFocused])

	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange)
		return () => {
			subscription.remove()
		}
	}, [])

	const handleAppStateChange = async (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
			const status = await Contacts.getPermissionsAsync()
			PermissionContactsReactiveVar(status)
			if (status.granted && status.status === 'granted') {
				const { data } = await Contacts.getContactsAsync()
				if (data.length) {
					ContactsReactiveVar(data)
				}
				start()
			}
		}
		appStateRef.current = nextAppState
	}

	finished(() => {
		router.back()
	})

	return (
		<Box bg={'$transparent'} style={{ flex: 1 }} mb={'$5'}>
			<Box bg={'$transparent'} alignItems={'center'} justifyContent={'flex-start'} my={'$5'}>
				<Box
					rounded={'$md'}
					h={65}
					w={65}
					alignItems={'center'}
					justifyContent={'center'}
					bg={'#ff7000'}
				>
					<FontAwesome
						name='user'
						size={30}
						color={rTheme.theme?.gluestack.tokens.colors.secondary900 || 'black'}
					/>
				</Box>
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
					Allow Revel access to your contacts
				</Heading>
			</Box>
			<ScrollView>
				<Box bg={'$transparent'} style={{ width: wp(95), flex: 1, alignSelf: 'center' }}>
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
					onPress={() =>
						!rContactPermission?.granted
							? rContactPermission?.canAskAgain && !rContactPermission.granted
								? handleRequestPermission()
								: handleOpenPhoneSettings()
							: createTwoButtonAlert()
					}
				>
					<ButtonText>
						{!rContactPermission?.granted
							? rContactPermission?.canAskAgain && !rContactPermission.granted
								? 'Continue'
								: 'Go to Phone Settings'
							: 'Granted'}
					</ButtonText>
				</Button>
				{!started ? (
					<Button size={'lg'} sx={{ width: '95%' }} onPress={() => router.back()} variant={'link'}>
						<ButtonText fontWeight={'$medium'}>Close</ButtonText>
					</Button>
				) : (
					<Button size={'lg'} sx={{ width: '95%' }} onPress={() => router.back()} variant={'link'}>
						{started && (
							<Box
								bg={'$transparent'}
								sx={{
									h: 24,
								}}
							>
								{<ButtonText fontWeight={'$medium'}>Auto close in {seconds}</ButtonText>}
							</Box>
						)}
					</Button>
				)}
			</VStack>
		</Box>
	)
}

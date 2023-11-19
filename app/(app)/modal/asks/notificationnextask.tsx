import {
	DaysPreferencePermissionInitialState,
	HalfMonthPreferencePermissionInitialState,
	MonthsPreferencePermissionInitialState,
} from '@constants/Preferences'
import { LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS } from '@constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useReactiveVar } from '@apollo/client'
import { LocalStoragePreferenceAskNotificationPermissionType } from '@ctypes/preferences'
import {
	Badge,
	Box,
	Button,
	ButtonText,
	Divider,
	HStack,
	Heading,
	Pressable,
	ScrollView,
	VStack,
	View,
} from '@gluestack-ui/themed'
import {
	PreferenceBackgroundLocationPermissionReactiveVar,
	PreferencePermissionNotificationReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import PermissionDetailItem from '@components/screens/permissions/PermissionDetailItem'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Controller, useForm } from 'react-hook-form'
import useTimer2 from '@util/hooks/useTimer2'
import { DateTime } from 'luxon'

export default () => {
	const router = useRouter()
	const insets = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rPreferenceBackgroundLocationPermission = useReactiveVar(
		PreferenceBackgroundLocationPermissionReactiveVar,
	)
	const { start, seconds, started, finished } = useTimer2('0:4')

	const details = [
		{
			title: 'How you’ll use this',
			detail: `You'll find venues and event deals around you.`,
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
			detail: `To notifiy you about event, friend and deal activities you'll be interested in.`,
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
			title: 'Update these settings work',
			detail:
				'You can change your choices at any time in your app settings. If you allow access now, you wont have to again.',
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

	const laterOptions = [
		{
			title: 'Never again',
			value: 0,
		},
		{
			title: '1 Day',
			value: 1,
		},
		// {
		// 	title: '5 Days',
		// 	value: 5,
		// },
		{
			title: '10 Days',
			value: 10,
		},
		// {
		// 	title: '15 Days',
		// 	value: 15,
		// },
		{
			title: '1 Month',
			value: 30,
		},
		// {
		// 	title: '3 Months',
		// 	value: 90,
		// },
	]

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitted },
	} = useForm({
		defaultValues: {
			value: 10,
		},
	})

	const onSubmit = data => {
		switch (data.value) {
			case 0:
				AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
					JSON.stringify({
						...DaysPreferencePermissionInitialState,
						numberOfTimesDismissed: rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
							? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed + 1
							: 1,
						canShowAgain: false,
					} as LocalStoragePreferenceAskNotificationPermissionType),
				)
				PreferencePermissionNotificationReactiveVar({
					...DaysPreferencePermissionInitialState,
					canShowAgain: false,
				})
			case 1:
				AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
					JSON.stringify({
						...DaysPreferencePermissionInitialState,
						dateToShowAgain: DateTime.now().plus({ days: 2 }),
						numberOfTimesDismissed: rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
							? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed + 1
							: 1,
						canShowAgain: false,
					} as LocalStoragePreferenceAskNotificationPermissionType),
				)
				PreferencePermissionNotificationReactiveVar({
					...DaysPreferencePermissionInitialState,
					canShowAgain: false,
				})
			case 5:
				AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
					JSON.stringify({
						...DaysPreferencePermissionInitialState,
						numberOfTimesDismissed: rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
							? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed + 1
							: 1,
						canShowAgain: true,
					} as LocalStoragePreferenceAskNotificationPermissionType),
				)
				PreferencePermissionNotificationReactiveVar({
					...DaysPreferencePermissionInitialState,
				})
			case 15:
				AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
					JSON.stringify({
						...HalfMonthPreferencePermissionInitialState,
						numberOfTimesDismissed: rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
							? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed + 1
							: 1,
						canShowAgain: true,
					} as LocalStoragePreferenceAskNotificationPermissionType),
				)
				PreferencePermissionNotificationReactiveVar({
					...DaysPreferencePermissionInitialState,
				})
			case 30:
				AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
					JSON.stringify({
						...MonthsPreferencePermissionInitialState,
						numberOfTimesDismissed: rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
							? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed + 1
							: 1,
						canShowAgain: true,
					} as LocalStoragePreferenceAskNotificationPermissionType),
				)
				PreferencePermissionNotificationReactiveVar({
					...DaysPreferencePermissionInitialState,
				})
			case 90:
				AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
					JSON.stringify({
						...MonthsPreferencePermissionInitialState,
						dateToShowAgain: DateTime.now().plus({ months: 3 }),
						numberOfTimesDismissed: rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
							? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed + 1
							: 1,
						canShowAgain: true,
					} as LocalStoragePreferenceAskNotificationPermissionType),
				)
				PreferencePermissionNotificationReactiveVar({
					...DaysPreferencePermissionInitialState,
				})
		}

		start()

		// router.push({
		// 	pathname: '/(app)/permission/notifications',
		// })
	}

	finished(() => {
		router.canGoBack()
			? router.back()
			: router.push({
					pathname: '/(app)/hometab/venuefeed',
			  })
	})

	return (
		<View flex={1}>
			<View alignItems={'center'} justifyContent={'flex-start'} my={'$5'}>
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
					Revel Notifications Reminder
				</Heading>
				<Divider width={'$2'} style={{ width: 50, marginVertical: 10 }} />
			</View>
			<ScrollView>
				<View
					bg={'$transparent'}
					sx={{
						w: wp(95),
					}}
					flex={1}
					alignSelf='center'
				>
					{details.map((item, index) => {
						return (
							<View key={item.title}>
								<PermissionDetailItem {...item} />
							</View>
						)
					})}
				</View>
			</ScrollView>
			<VStack
				space={'md'}
				sx={{
					mb: insets.bottom + 10,
				}}
				mx={'$2'}
			>
				{/* <Text fontSize={'$md'} textAlign={'center'} fontWeight={'$medium'}>
					Remind in
				</Text> */}
				<Button
					// variant={'link'}
					size={'md'}
					onPress={() =>
						router.push({
							pathname: '/(app)/permission/notifications',
						})
					}
				>
					<ButtonText>Enable Notifications</ButtonText>
				</Button>
				<Divider w={'95%'} alignSelf={'center'} />
				<Controller
					control={control}
					name='value'
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => {
						return (
							<HStack justifyContent={'space-around'} space={'md'}>
								{laterOptions.map(item => {
									return (
										<Pressable key={item.value} onPress={() => onChange(item.value)}>
											<Badge
												size='lg'
												p={'$2'}
												px={'$3'}
												variant='solid'
												rounded='$lg'
												sx={{
													_dark: {
														bg: value === item.value ? '$primary500' : '$black',
													},
													_light: {
														bg: value === item.value ? '$primary500' : '$light200',
													},
												}}
											>
												<Badge.Text
													fontWeight={'$medium'}
													textTransform='capitalize'
													fontSize={'$md'}
													sx={{
														_dark: {
															color: value === item.value ? '$white' : '$white',
														},
														_light: {
															color: value === item.value ? '$white' : '$black',
														},
													}}
												>
													{item.title}
												</Badge.Text>
											</Badge>
										</Pressable>
									)
								})}
							</HStack>
						)
					}}
				/>
				<HStack justifyContent={'space-between'} mx={'$2'} alignItems={'center'}>
					<>
						{!started ? (
							<Button
								size={'lg'}
								onPress={() =>
									router.canGoBack()
										? router.back()
										: router.push({
												pathname: '/(app)/hometab/venuefeed',
										  })
								}
								variant={'link'}
							>
								<ButtonText fontWeight={'$medium'}>Close</ButtonText>
							</Button>
						) : (
							<Button size={'lg'} onPress={() => router.back()} variant={'link'}>
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
					</>
					<HStack space={'md'}>
						{/* <Button
							variant={'link'}
							size={'md'}
							onPress={() =>
								router.push({
									pathname: '/(app)/permission/notifications',
								})
							}
						>
							<Text>Enable</Text>
						</Button> */}
						<Button
							isDisabled={isSubmitted}
							bg={'$blue600'}
							size={'md'}
							rounded={'$full'}
							onPress={handleSubmit(onSubmit)}
						>
							<ButtonText>{isSubmitted ? 'Updated' : isSubmitting ? 'Updating' : 'Continue'}</ButtonText>
						</Button>
					</HStack>
				</HStack>
			</VStack>
		</View>
	)
}

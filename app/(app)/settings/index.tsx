import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { Box, HStack, Heading, Text } from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, ScrollView } from 'react-native'

export default () => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])

	const iconcolor =
		rTheme.colorScheme === 'light'
			? rTheme.theme?.gluestack.tokens.colors.light900
			: rTheme.theme?.gluestack.tokens.colors.light100

	useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onError: error => {},
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager
					?.DeviceProfiles as Array<AuthorizationDeviceProfile>
				setProfiles(deviceProfiles)
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceProfile
					AuthorizationReactiveVar(deviceManager)
					setTimeout(() => router.replace('/(app)/hometab/venuefeed'), 1000)
				}
			},
		})

	const switchProfile = () => {
		const guestProfile = profiles.filter(item => item?.Profile?.ProfileType === ProfileType.Guest)
		switchDeviceProfileMutation({
			variables: {
				profileId: String(guestProfile[0]?.Profile?.id),
			},
		})
	}

	const RoundedListItem = ({ children, ...props }) => (
		<Pressable onPress={props.onPress}>
			<Box
				bg={'transparent'}
				sx={{
					h: 60,
				}}
				px={'$2'}
				py={'$3'}
				alignItems={'flex-start'}
				flexDirection={'column'}
			>
				{children}
			</Box>
		</Pressable>
	)

	const account = [
		{
			title: rAuthorizationVar?.Profile?.ProfileType === 'PERSONAL' ? 'Edit Profile' : 'Edit Venue',
			onPress: () => {
				rAuthorizationVar?.Profile?.ProfileType === 'PERSONAL'
					? router.push({
							pathname: '/(app)/settings/profilesettings/personal',
					  })
					: router.push({
							pathname: '/(app)/settings/profilesettings/venue',
					  })
			},
			icon: <Ionicons name='ios-person-circle-outline' size={25} color={iconcolor} />,
		},
		{
			title: 'Notifications',
			onPress: () => {
				router.push({
					pathname: '/(app)/settings/notificationssettingsscreen',
				})
			},
			icon: <Ionicons size={25} color={iconcolor} name='notifications-circle-outline' />,
		},
		rAuthorizationVar?.Profile?.ProfileType === 'GUEST' && {
			title: 'QR code',
			onPress: () => {
				console.log('//TODO: QR Code ')
			},
			icon: (
				<Ionicons
					name='qr-code'
					size={20}
					style={{
						marginLeft: 2,
					}}
					color={iconcolor}
				/>
			),
		},
		rAuthorizationVar?.Profile?.ProfileType === 'GUEST' && {
			title: 'Security',
			onPress: () => {
				router.push({
					pathname: '/(app)/settings/notificationssettingsscreen',
				})
			},
			icon: <Ionicons name='shield-checkmark-outline' size={23} color={iconcolor} />,
		},
		{
			title: 'Appearance',
			onPress: () => {
				router.push({
					pathname: '/(app)/settings/appearancesettingsscreen',
				})
			},
			icon: <Ionicons name={'color-palette'} color={iconcolor} size={24} />,
		},
	]

	const actions = [
		{
			title: `Add account`,
			onPress: () => {
				router.replace({
					pathname: '/(credential)/logincredentialstack/authenticator',
				})
			},
		},
		rAuthorizationVar?.Profile?.ProfileType !== 'GUEST' && {
			title: `Log Out ${rAuthorizationVar?.Profile?.IdentifiableInformation?.username}`,
			onPress: () => {
				switchProfile()
			},
		},
	]

	return (
		<ScrollView
			style={{
				marginVertical: 4,
			}}
		>
			<Heading
				px={'$2'}
				sx={{
					h: 30,
				}}
			>
				Account
			</Heading>
			{/* Edit Profile */}
			{account.map((item, index) => {
				return (
					<RoundedListItem key={index} onPress={item.onPress}>
						<HStack alignItems={'center'} space={'md'}>
							{item.icon}
							<Text fontWeight={'$bold'} fontSize={'$lg'}>
								{item.title}
							</Text>
						</HStack>
					</RoundedListItem>
				)
			})}

			{/* Logins */}
			<Heading
				px={'$2'}
				sx={{
					h: 30,
				}}
			>
				Logins
			</Heading>
			{actions.map((item, index) => {
				return (
					<RoundedListItem key={index} onPress={item.onPress}>
						<HStack
							alignItems={'center'}
							px={'$2'}
							w={'$full'}
							sx={{
								h: 55,
							}}
						>
							<Text fontWeight={'$bold'} fontSize={'$lg'} color={'$primary500'}>
								{item.title}
							</Text>
						</HStack>
					</RoundedListItem>
				)
			})}
		</ScrollView>
	)
}

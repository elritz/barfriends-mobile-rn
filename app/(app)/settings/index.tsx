import { useReactiveVar } from '@apollo/client'
import { Box, HStack, Heading, Text } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
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
	const [selectedProfileId, setSelectedProfileId] = useState('')

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
				if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
					setTimeout(() => router.replace('(app)/hometab'), 1000)
				}
			},
		})

	const switchProfile = () => {
		const guestProfile = profiles.filter(item => item?.Profile?.ProfileType === ProfileType.Guest)
		setSelectedProfileId(String(guestProfile[0]?.Profile?.id))
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
			<RoundedListItem
				onPress={() => {
					rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'PERSONAL'
						? router.push({
								pathname: '(app)/settings/profilesettings/personal',
						  })
						: router.push({
								pathname: '(app)/settings/profilesettings/venue',
						  })
				}}
			>
				<HStack alignItems={'center'} space={'md'}>
					<Ionicons
						name='ios-person-circle-outline'
						size={30}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
					/>
					<Text fontWeight={'$bold'} fontSize={'$lg'}>
						{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'PERSONAL'
							? 'Edit Profile'
							: 'Edit Venue'}
					</Text>
				</HStack>
			</RoundedListItem>
			{/* Notifications */}
			<RoundedListItem
				onPress={() => {
					router.push({
						pathname: '(app)/settings/notificationssettingsscreen',
					})
				}}
			>
				<HStack alignItems={'center'} space={'md'}>
					<Ionicons
						size={30}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
						name='notifications-circle-outline'
					/>
					<Text fontWeight={'$bold'} fontSize={'$lg'}>
						Notifications
					</Text>
				</HStack>
			</RoundedListItem>
			{/* QRCode */}
			{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType !== 'GUEST' && (
				<RoundedListItem>
					<HStack alignItems={'center'} space={'md'}>
						<Ionicons
							name='qr-code'
							size={25}
							style={{
								marginLeft: 2,
							}}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.dark900
							}
						/>
						{/* <MaterialCommunityIcons name="" size={24} color="black" /> */}
						<Text fontWeight={'$bold'} fontSize={'$lg'}>
							QR code
						</Text>
					</HStack>
				</RoundedListItem>
			)}
			{/* Security */}
			{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType !== 'GUEST' && (
				<RoundedListItem
					onPress={() => {
						router.push({
							pathname: '(app)/settings/securitysettingsscreen',
						})
					}}
				>
					<HStack alignItems={'center'} space={'md'}>
						<Ionicons
							name='shield-checkmark-outline'
							size={30}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.dark900
							}
						/>

						<Text fontWeight={'$bold'} fontSize={'$lg'}>
							Security
						</Text>
					</HStack>
				</RoundedListItem>
			)}
			{/* Appearance */}
			<RoundedListItem
				onPress={() => {
					router.push({
						pathname: '(app)/settings/appearancesettingsscreen',
					})
				}}
			>
				<HStack alignItems={'center'} space={'md'}>
					<Ionicons
						name={'color-palette'}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
						size={30}
					/>
					<Text fontWeight={'$bold'} fontSize={'$lg'}>
						Appearance
					</Text>
				</HStack>
			</RoundedListItem>
			{/* Logins */}
			<Heading
				px={'$2'}
				sx={{
					h: 30,
				}}
			>
				Logins
			</Heading>
			<RoundedListItem>
				<Pressable
					style={{
						width: '100%',
					}}
					onPress={() =>
						router.replace({
							pathname: '(app)/credential/logincredentialstack/authenticator',
						})
					}
				>
					{({ isHovered, isFocused, isPressed }) => {
						return (
							<HStack
								alignItems={'center'}
								px={'$2'}
								sx={{
									h: 55,
								}}
							>
								<Text fontWeight={'$bold'} fontSize={'$lg'} color={isPressed ? '$gray400' : '$primary500'}>
									Add Account
								</Text>
							</HStack>
						)
					}}
				</Pressable>
			</RoundedListItem>
			{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType !== 'GUEST' && (
				<RoundedListItem>
					<Pressable
						onPress={() => switchProfile()}
						style={{
							width: '100%',
						}}
					>
						<HStack
							alignItems={'center'}
							px={'$2'}
							sx={{
								h: 55,
							}}
						>
							<Text fontWeight={'$bold'} fontSize={'$lg'} color={'$primary500'}>
								Log Out {rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.username}
							</Text>
						</HStack>
					</Pressable>
				</RoundedListItem>
			)}
		</ScrollView>
	)
}

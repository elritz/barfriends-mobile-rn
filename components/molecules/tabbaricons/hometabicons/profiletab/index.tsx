import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import CompanyCoasterLogoDynamicInverse from '@assets/images/company/CompanyCoasterLogoDynamicInverse'
import CompanyCoasterLogoDynamicOutline from '@assets/images/company/CompanyCoasterLogoDynamicOutline'
import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Box, Pressable } from '@components/core'
import { useGetNotificationsLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { MotiPressable } from 'moti/interactions'
import { useEffect, useMemo, useState } from 'react'
import { Image } from 'react-native'

const HEIGHT = 22

const ProfileTab = (props: TabProps) => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [numNotification, setNumNotifications] = useState(0)

	const [getNotificationQuery, { data: GNData, loading: GNLoading, error }] =
		useGetNotificationsLazyQuery({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				if (data.getNotifications?.friendRequestNotifications?.length) {
					const filterSentNotifications = data.getNotifications?.friendRequestNotifications.filter(
						item => {
							if (item?.receiverProfileId === rAuthorizationVar?.DeviceProfile?.Profile?.id) {
								return item
							}
						},
					)
					setNumNotifications(numNotification + filterSentNotifications.length)
				}
			},
		})

	useEffect(() => {
		getNotificationQuery()
	}, [])

	const onLongPressProfileIcon = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
		router.push({
			pathname: '(app)/modal/DeviceManager',
		})
	}

	if (!rAuthorizationVar || rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST') {
		return (
			<Pressable
				delayLongPress={200}
				style={{ zIndex: 100 }}
				onPress={() => {
					router.push({
						pathname: '(app)/hometab/profilestack',
					})
				}}
				onLongPress={() => onLongPressProfileIcon()}
			>
				<>
					{props.focused ? (
						<CompanyCoasterLogoDynamic
							width={HEIGHT}
							height={HEIGHT}
							backgroundColor={
								!props.focused ? (rTheme.deviceColorScheme === 'dark' ? 'white' : 'black') : props.color
							}
						/>
					) : (
						<CompanyCoasterLogoDynamicOutline
							width={HEIGHT}
							height={HEIGHT}
							backgroundColor={
								!props.focused ? (rTheme.deviceColorScheme === 'dark' ? 'white' : 'black') : props.color
							}
						/>
					)}
				</>
			</Pressable>
		)
	}
	return (
		<>
			<TabBarIcon
				icon={
					<MotiPressable
						animate={useMemo(
							() =>
								({ hovered, pressed }) => {
									'worklet'

									return {
										scale: hovered || pressed ? 0.75 : 1,
									}
								},
							[],
						)}
						style={{ zIndex: 100 }}
						onPress={() => {
							router.push('hometab/profilestack')
						}}
					>
						<Pressable
							delayLongPress={200}
							style={{ zIndex: 100 }}
							onPress={() => {
								router.push({
									pathname: '(app)/hometab/profilestack',
								})
							}}
							onLongPress={() => onLongPressProfileIcon()}
						>
							<>
								{rAuthorizationVar?.DeviceProfile?.Profile?.photos?.length ? (
									<Image
										source={{ uri: rAuthorizationVar.DeviceProfile.Profile.photos[0].url }}
										style={{
											width: HEIGHT,
											height: HEIGHT,
											borderRadius: 4,
											borderColor: props.color,
											borderWidth: 1.5,
										}}
									/>
								) : (
									<MotiPressable
										animate={useMemo(
											() =>
												({ hovered, pressed }) => {
													'worklet'

													return {
														scale: hovered || pressed ? 0.75 : 1,
													}
												},
											[],
										)}
									>
										{!props.focused ? (
											<CompanyCoasterLogoDynamicOutline
												width={HEIGHT}
												height={HEIGHT}
												backgroundColor={rTheme.deviceColorScheme === 'dark' ? 'white' : 'black'}
											/>
										) : (
											<CompanyCoasterLogoDynamicInverse
												width={HEIGHT}
												height={HEIGHT}
												backgroundColor={props.color}
											/>
										)}
									</MotiPressable>
								)}
							</>
						</Pressable>
					</MotiPressable>
				}
			/>
			{
				<Box
					// position={'absolute'}
					// bottom={3}
					bg={numNotification > 0 ? '$red500' : 'transparent'}
					sx={{
						h: 4.25,
						w: 4.25,
					}}
					rounded={'$full'}
				/>
			}
		</>
	)
}

export default ProfileTab

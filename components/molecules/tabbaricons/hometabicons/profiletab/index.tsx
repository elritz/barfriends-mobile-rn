import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import CompanyCoasterLogoDynamicInverse from '@assets/images/company/CompanyCoasterLogoDynamicInverse'
import CompanyCoasterLogoDynamicOutline from '@assets/images/company/CompanyCoasterLogoDynamicOutline'
import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { Box } from '@gluestack-ui/themed'
// import { useGetNotificationsQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Image } from 'react-native'

const HEIGHT = 22

const ProfileTab = (props: TabProps) => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [numNotification, setNumNotifications] = useState(0)

	// const {
	// 	data: GNData,
	// 	loading: GNLoading,
	// 	error,
	// } = useGetNotificationsQuery({
	// 	fetchPolicy: 'network-only',
	// 	onCompleted: data => {
	// 		if (data.getNotifications?.friendRequestNotifications?.length) {
	// 			const filterSentNotifications = data.getNotifications?.friendRequestNotifications.filter(
	// 				item => {
	// 					if (item?.receiverProfileId === rAuthorizationVar?.Profile?.id) {
	// 						return item
	// 					}
	// 				},
	// 			)
	// 			setNumNotifications(numNotification + filterSentNotifications.length)
	// 		}
	// 	},
	// })

	const onLongPressProfileIcon = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
		router.push({
			pathname: '/(app)/modal/DeviceManager',
		})
	}

	if (!rAuthorizationVar || rAuthorizationVar?.Profile?.ProfileType === 'GUEST') {
		return (
			<TabBarIcon
				onPress={() => {
					router.push({
						pathname: '/(app)/hometab/profilestack/UserProfileScreen',
					})
				}}
				onLongPress={() => onLongPressProfileIcon()}
				icon={
					props.focused ? (
						<CompanyCoasterLogoDynamic
							width={HEIGHT}
							height={HEIGHT}
							iconColor={rTheme.colorScheme === 'dark' ? 'black' : 'white'}
							backgroundColor={props.color}
						/>
					) : (
						<CompanyCoasterLogoDynamicOutline
							width={HEIGHT}
							height={HEIGHT}
							backgroundColor={
								!props.focused ? (rTheme.colorScheme === 'dark' ? 'white' : 'black') : props.color
							}
						/>
					)
				}
			/>
		)
	}

	return (
		<>
			<TabBarIcon
				onPress={() => {
					router.push({
						pathname: '/(app)/hometab/profilestack/UserProfileScreen',
					})
				}}
				onLongPress={() => onLongPressProfileIcon()}
				icon={
					<>
						{rAuthorizationVar?.Profile?.photos?.length ? (
							<Image
								source={{ uri: rAuthorizationVar.Profile.photos[0].url }}
								style={{
									width: HEIGHT,
									height: HEIGHT,
									borderRadius: 4,
									borderColor: props.color,
									borderWidth: 1.5,
								}}
							/>
						) : (
							<>
								{!props.focused ? (
									<CompanyCoasterLogoDynamicOutline
										width={HEIGHT}
										height={HEIGHT}
										backgroundColor={rTheme.colorScheme === 'dark' ? 'white' : 'black'}
									/>
								) : (
									<CompanyCoasterLogoDynamicInverse
										width={HEIGHT}
										height={HEIGHT}
										backgroundColor={rTheme.colorScheme === 'dark' ? 'white' : 'black'}
									/>
								)}
							</>
						)}
					</>
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

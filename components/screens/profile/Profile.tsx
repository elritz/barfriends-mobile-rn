import { useReactiveVar } from '@apollo/client'
import { Box, Divider } from '@components/core'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import PreferenceNotificationPermission from '@components/molecules/permissions/preferencenotificationpermission/PreferenceNotificationPermission'
import PersonalScreen from '@components/screens/profile/personalprofile/PersonalProfile'
import VenueScreen from '@components/screens/profile/venueprofile/VenueProfile'
import { ProfileType, useGetNotificationsLazyQuery } from '@graphql/generated'
'
import {
	AuthorizationReactiveVar,
	PermissionNotificationReactiveVar,
	PreferencePermissionNotificationReactiveVar,
} from '@reactive'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { AnimatePresence } from 'moti'
import { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'

const Profile = () => {
	const [refreshing, setRefreshing] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rPreferenceNotificationPermission = useReactiveVar(
		PreferencePermissionNotificationReactiveVar,
	)
	const rNotificationPermission = useReactiveVar(PermissionNotificationReactiveVar)

	const [getNotificationQuery, { data: GNData, loading: GNLoading, error }] =
		useGetNotificationsLazyQuery({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				if (data.getNotifications) {
					setRefreshing(false)
				}
			},
		})

	useEffect(() => {
		getNotificationQuery()
	}, [])

	const onRefresh = useCallback(() => {
		setRefreshing(true)
	}, [])

	if (GNLoading) return null

	const renderProfile = (param: ProfileType) => {
		switch (param) {
			case ProfileType.Guest:
				return (
					<Box bg={'$transparent'} my={'$5'} mx={'$3'} flex={1}>
						<View>
							<CardPleaseSignup signupTextId={4} />
							<Divider style={{ marginVertical: 20 }} />
						</View>
					</Box>
				)
			case ProfileType.Personal:
				return <PersonalScreen notifications={GNData} />
			case ProfileType.Venue:
				return <VenueScreen />
			default:
				return null
		}
	}
	console.log(
		'rPreferenceNotificationPermission?.dateToShowAgain :>> ',
		rPreferenceNotificationPermission?.dateToShowAgain,
	)
	return (
		<ScrollView
			contentInset={{ top: 0, left: 0, bottom: 150, right: 0 }}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			refreshControl={<RefreshControl refreshing={GNLoading} onRefresh={onRefresh} />}
		>
			{!rNotificationPermission?.granted && (
				<>
					{rPreferenceNotificationPermission?.canShowAgain &&
					DateTime.fromISO(rPreferenceNotificationPermission?.dateToShowAgain) <= DateTime.now() ? (
						<AnimatePresence key={uniqueId()}>
							<PreferenceNotificationPermission />
						</AnimatePresence>
					) : null}
				</>
			)}
			{renderProfile(rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType as ProfileType)}
		</ScrollView>
	)
}

export default Profile

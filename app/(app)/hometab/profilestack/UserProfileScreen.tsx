import { useReactiveVar } from '@apollo/client'
import { Box } from '@components/core'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import PreferenceNotificationPermission from '@components/molecules/permissions/preferencenotificationpermission/PreferenceNotificationPermission'
import PersonalScreen from '@components/screens/profile/personalprofile/PersonalProfile'
import VenueScreen from '@components/screens/profile/venueprofile/VenueProfile'
import { ProfileType, useGetNotificationsLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { uniqueId } from 'lodash'
import { AnimatePresence } from 'moti'
import { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'

export default () => {
	const [refreshing, setRefreshing] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

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
					<Box m={'$2'} p={'$5'} pt={'$10'}>
						<CardPleaseSignup signupTextId={4} />
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

	return (
		<ScrollView
			contentInset={{ top: 0, left: 0, bottom: 150, right: 0 }}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			refreshControl={<RefreshControl refreshing={GNLoading} onRefresh={onRefresh} />}
		>
			<AnimatePresence key={uniqueId()}>
				<PreferenceNotificationPermission />
			</AnimatePresence>
			{renderProfile(rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType as ProfileType)}
		</ScrollView>
	)
}

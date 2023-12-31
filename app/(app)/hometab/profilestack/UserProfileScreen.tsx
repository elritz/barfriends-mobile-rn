import { useReactiveVar } from '@apollo/client'
import { Box } from '@gluestack-ui/themed'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import PreferenceNotificationPermission from '@components/molecules/permissions/preferencenotificationpermission/PreferenceNotificationPermission'
import PersonalScreen from '@components/screens/profile/personalprofile/PersonalProfile'
import VenueScreen from '@components/screens/profile/venueprofile/VenueProfile'
import {
	ProfileType, // useGetNotificationsLazyQuery
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { uniqueId } from 'lodash'
import { AnimatePresence } from 'moti'
import { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'

export default () => {
	const [refreshing, setRefreshing] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const insets = useContentInsets()

	// const [getNotificationQuery, { data: GNData, loading: GNLoading, error }] =
	// 	useGetNotificationsLazyQuery({
	// 		fetchPolicy: 'network-only',
	// 		onCompleted: data => {
	// 			if (data.getNotifications) {
	// 				setRefreshing(false)
	// 			}
	// 		},
	// 	})

	// useEffect(() => {
	// 	getNotificationQuery()
	// }, [])

	const onRefresh = useCallback(() => {
		setRefreshing(true)
	}, [])

	// if (GNLoading) return null

	const renderProfile = (param: ProfileType) => {
		switch (param) {
			case ProfileType.Guest:
				return (
					<Box m={'$2'} p={'$5'}>
						<CardPleaseSignup signupTextId={4} />
					</Box>
				)
			case ProfileType.Personal:
				return <PersonalScreen notifications={null} />
			case ProfileType.Venue:
				return <VenueScreen />
			default:
				return null
		}
	}

	return (
		<FlashList
			showsVerticalScrollIndicator={false}
			refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
			contentInset={{ ...insets, top: 0, bottom: 150 }}
			data={[1]}
			estimatedItemSize={100}
			renderItem={() => {
				return null
			}}
			ListHeaderComponent={() => {
				return (
					<>
						<AnimatePresence key={uniqueId()}>
							<PreferenceNotificationPermission />
						</AnimatePresence>
						{renderProfile(rAuthorizationVar?.Profile?.ProfileType as ProfileType)}
					</>
				)
			}}
		/>
		// <ScrollView
		// 	showsVerticalScrollIndicator={false}
		// 	scrollEventThrottle={16}
		// 	refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
		// >

		// </ScrollView>
	)
}

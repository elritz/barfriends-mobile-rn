import { Box, Heading, Pressable, Text } from '@components/core'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	AuthorizationDeviceManager,
	useAuthorizedProfilesQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { SafeAreaView, View, ScrollView } from 'react-native'

export default () => {
	const router = useRouter()
	const params = useLocalSearchParams()

	const { data, loading, error } = useAuthorizedProfilesQuery({
		skip: !params.authenticator && !params.authenticator,
		fetchPolicy: 'network-only',
		variables: {
			where: {
				profiles: {
					email: String(params.authenticator),
					Phone: {
						number: String(params.authenticator).replace(/\D/g, ''),
					},
				},
			},
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation()

	const switchProfile = item => {
		switchDeviceProfileMutation({
			variables: {
				profileId: item.id,
			},
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
					setTimeout(() => router.replace('(app)/hometab'), 1000)
				} else if (data.switchDeviceProfile.__typename === 'Error') {
					router.push({
						pathname: '(app)/credential/logincredentialstack/loginpassword',
						params: {
							username: item.IdentifiableInformation?.username,
							photo: item.profilePhoto?.url,
							profileid: item.id,
						},
					})
				}
			},
		})
	}

	if (loading) {
		return <></>
	}

	if (data?.authorizedProfiles?.__typename === 'Error') {
		return (
			<Box>
				<Heading fontSize={'$xl'}>Error finding profiles</Heading>
			</Box>
		)
	}

	if (data?.authorizedProfiles?.__typename === 'ProfilesResponse') {
		const emailProfiles = data?.authorizedProfiles?.phone?.filter(item => {
			if (item.ProfileType === 'GUEST') {
				return null
			}
			return item
		})
		const phoneProfiles = data?.authorizedProfiles?.email?.filter(item => {
			if (item.ProfileType === 'GUEST') {
				return null
			}
			return item
		})

		const finalProfileArray = [...new Set([...emailProfiles, ...phoneProfiles])]

		return (
			<SafeAreaView style={{ flex: 1, margin: 10 }}>
				<View style={{ top: 0 }}>
					<Text mt={'$4'} lineHeight={'$2xl'} fontWeight={'$black'} fontSize={'$3xl'}>
						Your profiles
					</Text>
				</View>
				<ScrollView
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					keyboardDismissMode='none'
					contentInset={{
						top: 20,
					}}
				>
					{finalProfileArray.map(item => {
						return (
							<Pressable
								disabled={loading || SWDPLoading}
								key={item.id}
								onPress={() => switchProfile(item)}
							>
								<DeviceManagerProfileItemLarge isActive={false} item={item} loading={SWDPLoading} />
							</Pressable>
						)
					})}
				</ScrollView>
			</SafeAreaView>
		)
	}
}

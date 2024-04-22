import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Pressable, Text } from '@gluestack-ui/themed'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	AuthorizationDeviceProfile,
	useAuthorizedProfilesQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { SafeAreaView, View, ScrollView } from 'react-native'

export default () => {
	const router = useRouter()
	const params = useLocalSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

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

	const _press = item => {
		if (rAuthorizationVar?.Profile?.id === item.id) {
		} else {
			switchDeviceProfileMutation({
				variables: {
					profileId: item.id,
				},
				onCompleted: data => {
					if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile') {
						const deviceManager = data.switchDeviceProfile as AuthorizationDeviceProfile
						AuthorizationReactiveVar(deviceManager)
						setTimeout(() => router.replace('/(app)/hometab/venuefeed'), 1000)
					} else if (data.switchDeviceProfile.__typename === 'Error') {
						router.push({
							pathname: '/(credential)/logincredentialstack/loginpassword',
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
					<Text mt={'$4'} lineHeight={'$2xl'} fontWeight={'$black'} fontSize={'$2xl'}>
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
							<Pressable disabled={loading || SWDPLoading} key={item.id} onPress={() => _press(item)}>
								<DeviceManagerProfileItemLarge
									isActive={rAuthorizationVar?.Profile?.id === item.id}
									item={item}
									loading={SWDPLoading}
								/>
							</Pressable>
						)
					})}
				</ScrollView>
			</SafeAreaView>
		)
	}
}

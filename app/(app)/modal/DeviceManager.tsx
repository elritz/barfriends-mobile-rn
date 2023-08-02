// TODO: FN(What functionality was suppose to be here)
import { useReactiveVar } from '@apollo/client'
import { Box, Pressable, VStack } from '@components/core'
import WithDeviceProfiles from '@components/molecules/asks/signinup'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { useState } from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'

export default function DeviceManager() {
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])
	const [selectedProfileId, setSelectedProfileId] = useState('')
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const { loading } = useGetADeviceManagerQuery({
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
					setTimeout(
						() =>
							router.push({
								pathname: '(app)/hometab',
							}),
						1000,
					)
				}
			},
		})

	const switchProfile = item => {
		if (item.isActive) {
			const guestProfile = profiles.filter(item => item?.Profile?.ProfileType === ProfileType.Guest)

			setSelectedProfileId(String(guestProfile[0]?.Profile?.id))
			switchDeviceProfileMutation({
				variables: {
					profileId: String(guestProfile[0]?.Profile?.id),
				},
			})
		} else {
			setSelectedProfileId(item.Profile.id)
			switchDeviceProfileMutation({
				variables: {
					profileId: item.Profile.id,
				},
			})
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, margin: 10 }}>
			<Box bg='$transparent'>
				<WithDeviceProfiles />
			</Box>
			<View style={{ flex: 1 }}>
				{loading ? (
					<VStack my={'$5'} px={'$2'} space={'md'} rounded='$md'>
						{[...Array(3)].map((item, index) => {
							return (
								<Skeleton
									key={index}
									height={80}
									width={'100%'}
									radius={15}
									colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
									colors={
										rTheme.colorScheme === 'light'
											? [
													String(rTheme.theme?.gluestack.tokens.colors.light100),
													String(rTheme.theme?.gluestack.tokens.colors.light300),
											  ]
											: [
													String(rTheme.theme?.gluestack.tokens.colors.dark100),
													String(rTheme.theme?.gluestack.tokens.colors.dark300),
											  ]
									}
								/>
							)
						})}
					</VStack>
				) : (
					<>
						{profiles.length ? (
							<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
								{profiles?.map((item, index) => {
									if (item.Profile?.ProfileType === ProfileType.Guest) {
										return null
									} else {
										return (
											<Pressable key={item.id} onPress={() => switchProfile(item)} sx={{ w: '100%', h: 80 }}>
												<DeviceManagerProfileItemLarge
													item={item.Profile}
													isActive={item.isActive}
													loading={SWDPLoading}
												/>
											</Pressable>
										)
									}
								})}
							</ScrollView>
						) : null}
					</>
				)}
			</View>
		</SafeAreaView>
	)
}

// TODO: FN(What functionality was suppose to be here)
import { useReactiveVar } from '@apollo/client'
import WithDeviceProfiles from '@components/molecules/asks/signinup'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import { Entypo } from '@expo/vector-icons'
import { Box, Button, HStack, Pressable, VStack, Center } from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { useRef, useState } from 'react'
import { SafeAreaView, View } from 'react-native'

export default function DeviceManager() {
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])
	const ref = useRef(null)
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
				if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceProfile
					AuthorizationReactiveVar(deviceManager)
					setTimeout(
						() =>
							router.navigate({
								pathname: '/(app)/hometab/venuefeed',
							}),
						1000,
					)
				}
			},
		})

	const switchProfile = item => {
		if (item.isActive) {
			const guestProfile = profiles.filter(item => item?.Profile?.ProfileType === ProfileType.Guest)
			switchDeviceProfileMutation({
				variables: {
					profileId: String(guestProfile[0]?.Profile?.id),
				},
			})
		} else {
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
													String(rTheme.theme?.gluestack.tokens.colors.light900),
													String(rTheme.theme?.gluestack.tokens.colors.light700),
											  ]
									}
								/>
							)
						})}
					</VStack>
				) : (
					<Center>
						{profiles.length ? (
							<>
								{profiles?.map((item, index) => {
									if (item.Profile?.ProfileType === ProfileType.Guest) return null

									return (
										<HStack key={item.id} h={80} alignItems='center' pr={'$3'}>
											<Pressable onPress={() => switchProfile(item)}>
												<DeviceManagerProfileItemLarge item={item.Profile} loading={SWDPLoading} />
											</Pressable>
											<Button
												variant='link'
												// onPress={() => console.log('pressed')}
												onPress={() => {
													router.navigate({
														pathname: `/(app)/modal/devicemanager/${item.Profile?.id}`,
													})
												}}
												ref={ref}
												size='xs'
												hitSlop={10}
											>
												<Entypo
													name={'dots-three-vertical'}
													size={23}
													color={
														rTheme.colorScheme === 'light'
															? rTheme.theme?.gluestack.tokens.colors.light900
															: rTheme.theme?.gluestack.tokens.colors.light100
													}
												/>
											</Button>
										</HStack>
									)
								})}
							</>
						) : null}
					</Center>
				)}
			</View>
		</SafeAreaView>
	)
}

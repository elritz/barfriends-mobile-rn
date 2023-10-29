import { useReactiveVar } from '@apollo/client'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import { Entypo } from '@expo/vector-icons'
import { Button, HStack, Pressable, Center } from '@gluestack-ui/themed'
import {
	AuthorizationDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useRemoveDeviceProfileFromDeviceManagerMutation,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'

const DeviceManagerProfiles = () => {
	const ref = useRef(null)
	const router = useRouter()
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager?.DeviceProfiles
				setProfiles(deviceProfiles)
			}
		},
	})

	const [
		removeDeviceProfileFromDeviceManagerMutation,
		{ data: RDPFDMData, loading: RDPFDMLoading, error: RDPFDMError },
	] = useRemoveDeviceProfileFromDeviceManagerMutation()

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: async data => {
				if (data.switchDeviceProfile?.__typename == 'AuthorizationDeviceProfile') {
					const deviceProfile = data.switchDeviceProfile as AuthorizationDeviceProfile

					AuthorizationReactiveVar(deviceProfile)
				}
			},
		})
	const switchProfile = item => {
		switchDeviceProfileMutation({
			variables: {
				profileId: item.Profile.id,
			},
		})
	}
	if (loading) return null

	return (
		<Center>
			{profiles.length ? (
				<>
					{profiles?.map((item, index) => {
						if (item.Profile?.ProfileType === ProfileType.Guest) return null
						return (
							<HStack h={80} alignItems='center'>
								<Pressable key={item.id} onPress={() => switchProfile(item)}>
									<DeviceManagerProfileItemLarge
										item={item.Profile}
										isActive={item.isActive}
										loading={SWDPLoading}
									/>
								</Pressable>
								<Center h={300}>
									<Button
										variant='link'
										onPress={() => router.push(`/modal/devicemanager/${item.Profile?.id}`)}
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
								</Center>
							</HStack>
						)
					})}
				</>
			) : null}
		</Center>
	)
}

export default DeviceManagerProfiles

import { Center, Pressable } from '@components/core'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import GetSignInUpText from '@helpers/data/SignupinText'
import { AuthorizationReactiveVar } from '@reactive'
import { useState } from 'react'

const text = GetSignInUpText()

const DeviceManagerProfiles = () => {
	const [selectedProfileId, setSelectedProfileId] = useState('')
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager?.DeviceProfiles
				setProfiles(deviceProfiles)
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: async data => {
				if (data.switchDeviceProfile?.__typename == 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
				}
			},
		})

	const logoutProfile = () => {
		const guestProfile = profiles.map(item => {
			if (item?.Profile?.ProfileType === ProfileType.Guest) return item
		})

		setSelectedProfileId('')
		switchDeviceProfileMutation({
			variables: {
				profileId: String(guestProfile[0]?.Profile?.id),
			},
		})
	}

	const switchProfile = item => {
		setSelectedProfileId(item.Profile.id)
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
							<Pressable
								key={item.id}
								onPress={() => (item?.isActive ? logoutProfile() : switchProfile(item))}
								sx={{
									h: 80,
									w: '100%',
								}}
							>
								<DeviceManagerProfileItemLarge
									item={item.Profile}
									isActive={item.isActive}
									loading={SWDPLoading}
									selectedProfileId={selectedProfileId}
								/>
							</Pressable>
						)
					})}
				</>
			) : null}
		</Center>
	)
}
export default DeviceManagerProfiles

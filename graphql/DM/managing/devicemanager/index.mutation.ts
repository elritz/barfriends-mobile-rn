import { gql } from '@apollo/client'
import { INDETIFIABLE_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/identifiable_information.fragments'
import { PROFILE_FRAGMENT } from '@graphql/DM/fragments/profile.fragments'

export const SWITCH_DEVICE_PROFILE_MUTATION = gql`
	${PROFILE_FRAGMENT}
	${INDETIFIABLE_INFORMATION_FRAGMENT}
	mutation switchDeviceProfile($profileId: String!) {
		switchDeviceProfile(profileId: $profileId) {
			... on AuthorizationDeviceManager {
				__typename
				id
				DeviceProfile {
					id
					isActive
					refreshtoken
					accesstoken
					AppType
					DeviceManager {
						id
					}
					deviceManagerId
					Profile {
						...PROFILE_FRAGMENT
					}
				}
			}
			... on Error {
				errorCode
				message
			}
		}
	}
`

export const REFRESH_DEVICE_MANAGER_MUTATION = gql`
	${PROFILE_FRAGMENT}
	mutation refreshDeviceManager {
		refreshDeviceManager {
			... on AuthorizationDeviceManager {
				id
				DeviceProfile {
					id
					isActive
					refreshtoken
					accesstoken
					AppType
					DeviceManager {
						id
					}
					deviceManagerId
					Profile {
						...PROFILE_FRAGMENT
					}
				}
			}
			... on Error {
				errorCode
				message
			}
		}
	}
`

import { gql } from '@apollo/client'
import { PROFILE_FRAGMENT } from '@graphql/DM/fragments/profile.fragments'

export const GET_A_DEVICE_MANAGER_QUERY = gql`
	${PROFILE_FRAGMENT}
	query getADeviceManager {
		getADeviceManager {
			... on DeviceManagerDeviceProfiles {
				DeviceProfiles {
					id
					AppType
					isActive
					accesstoken
					refreshtoken
					Profile {
						...PROFILE_FRAGMENT
					}
				}
			}
		}
	}
`

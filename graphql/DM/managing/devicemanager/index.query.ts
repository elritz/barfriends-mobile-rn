import { gql } from '@apollo/client';
import { PROFILE_FRAGMENT } from '@graphql/DM/fragments/profile.fragments';


export const GET_A_DEVICE_MANAGER_QUERY = gql`
	${PROFILE_FRAGMENT}
	query getADeviceManager {
		getADeviceManager {
			... on DeviceManagerDeviceProfiles {
				DeviceProfiles {
					id
					AppType
					ProfileType
					isActive
					accesstoken
					refreshtoken
					deviceManagerId
					DeviceManager {
						id
					}
					profileId
					Profile {
						...PROFILE_FRAGMENT
					}
					createdAt
					updatedAt
				}
			}
		}
	}
`

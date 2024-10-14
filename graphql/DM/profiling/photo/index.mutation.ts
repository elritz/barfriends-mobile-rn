import { PROFILE_FRAGMENT } from '#/graphql/DM/fragments/index.fragments'
import gql from 'graphql-tag'

export const UPLOAD_PROFILE_PHOTO_MUTATION = gql`
	mutation uploadProfilePhoto($photos: PhotoCreateManyProfileInputEnvelope) {
		uploadProfilePhoto(photos: $photos) {
			Group {
				id
			}
			Profile {
				id
			}
			Story {
				id
			}
			active
			blurhash
			createdAt
			groupId
			height
			id
			position
			profileId
			ratio
			storyId
			type
			updatedAt
			url
			width
		}
	}
`

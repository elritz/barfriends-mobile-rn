import { gql } from '@apollo/client'
import { STORY_FRAGMENT } from '#/graphql/DM/fragments/story.fragments'

export const ADD_STORY_PHOTOS_MUTATION = gql`
	${STORY_FRAGMENT}
	mutation addStoryPhotos($photos: PhotoCreateManyProfileInputEnvelope) {
		addStoryPhotos(photos: $photos) {
			...STORY_FRAGMENT
		}
	}
`
export const REMOVE_STORY_PHOTOS_MUTATION = gql`
	${STORY_FRAGMENT}
	mutation removeStoryPhotos($photoId: String!) {
		removeStoryPhotos(photoId: $photoId) {
			...STORY_FRAGMENT
		}
	}
`

export const UPDATE_STORY_EMOJIMOOD_MUTATION = gql`
	${STORY_FRAGMENT}
	mutation updateStoryEmojimood($emojimoodId: Int) {
		updateStoryEmojimood(emojimoodId: $emojimoodId) {
			...STORY_FRAGMENT
		}
	}
`

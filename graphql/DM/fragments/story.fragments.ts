import { gql } from '@apollo/client'

export const STORY_FRAGMENT = gql`
	fragment STORY_FRAGMENT on Story {
		id
		date
		emojimood {
			colors
			emoji
			emojiname
			id
		}
		startDate
		createdAt
		updatedAt
		photos {
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

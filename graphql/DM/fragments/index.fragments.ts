import { gql } from '@apollo/client'

export * from '#/graphql/DM/fragments/credentials.fragments'
export * from '#/graphql/DM/fragments/generic.fragments'
export * from '#/graphql/DM/fragments/identifiable_information.fragments'
export * from '#/graphql/DM/fragments/relationship.fragments'
export * from '#/graphql/DM/fragments/venue.fragments'
export * from '#/graphql/DM/fragments/personal.fragments'
export * from '#/graphql/DM/fragments/profile.fragments'
export * from '#/graphql/DM/fragments/profilevenue.fragments'
export * from '#/graphql/DM/fragments/area.fragments'
export * from '#/graphql/DM/fragments/clientdevicemanager.fragments'
export * from '#/graphql/DM/fragments/story.fragments'

export const CODE_FRAGMENT = gql`
	fragment CODE_FRAGMENT on Code {
		id
		code
	}
`

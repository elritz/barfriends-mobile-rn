import { gql } from '@apollo/client'
import { PROFILE_THEME_FRAGMENT } from '#/graphql/DM/fragments/theme.fragments'

export const UPDATE_THEME_MANAGER_ = gql`
	${PROFILE_THEME_FRAGMENT}
	mutation updateThemeManagerSwitchTheme($id: String!, $themeId: String!) {
		updateThemeManagerSwitchTheme(id: $id, themeId: $themeId) {
			...PROFILE_THEME_FRAGMENT
		}
	}
`

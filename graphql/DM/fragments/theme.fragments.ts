import { gql } from '@apollo/client'

export const THEME_FRAGMENT = gql`
	fragment THEME_FRAGMENT on Theme {
		id
		name
		theme
		mobileVersions
		webVersions
		startDate
		updatedAt
		createdAt
		endDate
	}
`

export const PROFILE_THEME_FRAGMENT = gql`
	${THEME_FRAGMENT}
	fragment PROFILE_THEME_FRAGMENT on ProfileTheme {
		id
		isActive
		themeId
		themeManagerId
		ThemeManager {
			id
		}
		Theme {
			...THEME_FRAGMENT
		}
		updatedAt
		createdAt
	}
`

export const THEME_MANAGER_FRAGMENT = gql`
	${PROFILE_THEME_FRAGMENT}
	fragment THEME_MANAGER_FRAGMENT on ThemeManager {
		id
		ProfileTheme {
			...PROFILE_THEME_FRAGMENT
		}
	}
`

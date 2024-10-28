import {gql} from '@apollo/client'

import {
  THEME_FRAGMENT,
  THEME_MANAGER_FRAGMENT,
} from '#/graphql/DM/fragments/theme.fragments'

export const GET_THEME = gql`
  ${THEME_FRAGMENT}
  query getAllThemes {
    getAllThemes {
      ...THEME_FRAGMENT
    }
  }
`
export const GET_PROFILE_THEME_MANAGER = gql`
  ${THEME_MANAGER_FRAGMENT}
  query getProfileThemeManager {
    getProfileThemeManager {
      ...THEME_MANAGER_FRAGMENT
    }
  }
`

// export const GET_THEMES = gql`
//   query GetThemes(
//     $first: Int
//     $last: Int
//     $before: ThemeWhereUniqueInput
//     $after: ThemeWhereUniqueInput
//   ) {
//     themes(first: $first, last: $last, before: $before, after: $after) {
//       id
//       name
//       text
//       tint
//       background
//       tabBar
//       tabIconSelected
//       tabIconDefault
//     }
//   }
// `;

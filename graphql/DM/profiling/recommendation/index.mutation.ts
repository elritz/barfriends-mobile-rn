import {gql} from '@apollo/client'

export const UPDATE_H6_COMING_AREA_MUTATION = gql`
  mutation updateH6ComingAreaVote($comingAreaId: String!) {
    updateH6ComingAreaVote(comingAreaId: $comingAreaId) {
      id
      areaId
      h3Index5
      h3Index6
      keywordSuggestions
      timesRequested
      toBeNotifiedProfileIds
      Area {
        id
      }
      Vote {
        id
        upvote
        profileId
        Profile {
          id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_COMING_AREA_TO_BE_NOTIFIED_MUTATION = gql`
  mutation updateComingAreaToBeNotified($comingAreaId: String!) {
    updateH6ComingAreaToBeNotified(comingAreaId: $comingAreaId) {
      id
      areaId
      h3Index5
      h3Index6
      keywordSuggestions
      timesRequested
      toBeNotifiedProfileIds
      Area {
        id
      }
      Vote {
        id
        upvote
        profileId
        Profile {
          id
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_H6_VENUE_RECOMMENDATION_MUTATION = gql`
  mutation updateH6VenueRemmendation($venueRecommendationId: String!) {
    updateH6VenueRemmendation(venueRecommendationId: $venueRecommendationId) {
      id
    }
  }
`

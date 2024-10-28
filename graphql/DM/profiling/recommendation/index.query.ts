import {gql} from '@apollo/client'

import {
  AREA_FRAGMENT,
  PROFILE_VENUE_FRAGMENT,
} from '#/graphql/DM/fragments/index.fragments'

export const VENUES_NEARBY_QUERY = gql`
  ${PROFILE_VENUE_FRAGMENT}
  ${AREA_FRAGMENT}
  query venuesNearby(
    $countryIsoCode: String!
    $stateIsoCode: String!
    $cityName: String
    $kRing: Int
    $searchAreaCoords: CoordsInput!
  ) {
    venuesNearby(
      searchAreaCoords: $searchAreaCoords
      countryIsoCode: $countryIsoCode
      cityName: $cityName
      stateIsoCode: $stateIsoCode
      kRing: $kRing
    ) {
      ... on ComingAreaResponse {
        comingAreas {
          id
          h3Index5
          h3Index6
          keywordSuggestions
          timesRequested
          toBeNotifiedProfileIds
          Area {
            ...AREA_FRAGMENT
          }
          Vote {
            id
            profileId
            upvote
          }
          createdAt
          updatedAt
        }
        recommendedAreas {
          id
          timesRequested
          venuesProfileIds
          Area {
            id
            State {
              id
              isoCode
              name
            }
            City {
              id
              name
            }
            Country {
              id
              flag
              isoCode
              name
            }
          }
          createdAt
          updatedAt
        }
        searchArea {
          ...AREA_FRAGMENT
        }
      }
      ... on Error {
        errorCode
        message
      }
      ... on VenuesNearbyResponse {
        searchArea {
          ...AREA_FRAGMENT
        }
        venuesNearby {
          ...PROFILE_VENUE_FRAGMENT
        }
        recommendedAreas {
          id
          timesRequested
          venuesProfileIds
          distanceInM
          Area {
            id
            State {
              id
              isoCode
              name
            }
            City {
              id
              name
            }
            Country {
              id
              flag
              isoCode
              name
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`

export const GET_COUNTRIES_QUERY = gql`
  query getAllCountries {
    getAllCountries {
      name
      phonecode
      isoCode
      flag
      currency
      latitude
      longitude
    }
  }
`

export const GET_ALL_STATES_BY_COUNTRY_QUERY = gql`
  query getAllStatesByCountry($countryIsoCode: String!) {
    getAllStatesByCountry(countryIsoCode: $countryIsoCode) {
      name
      isoCode
      countryCode
      latitude
      longitude
    }
  }
`

export const GET_ALL_CITIES_BY_STATE_QUERY = gql`
  query getAllCitiesByState($countryIsoCode: String!, $stateIsoCode: String!) {
    getAllCitiesByState(
      countryIsoCode: $countryIsoCode
      stateIsoCode: $stateIsoCode
    ) {
      popularCities {
        name
        stateCode
        venuesInArea
        countryCode
        latitude
        longitude
      }
      allCities {
        name
        stateCode
        venuesInArea
        countryCode
        latitude
        longitude
      }
    }
  }
`

export const GET_H3INDEX6_RECOMMENDATION_QUERY = gql`
  ${PROFILE_VENUE_FRAGMENT}
  query getH3Index6VenueRecommendationById(
    $id: String!
    $venuesProfileIds: [String!]
  ) {
    getH3Index6VenueRecommendationById(
      id: $id
      venuesProfileIds: $venuesProfileIds
    ) {
      id
      distanceInM
      h3Index6
      keywordSuggestions
      timesRequested
      venuesProfileIds
      Area {
        id
        State {
          id
          isoCode
          name
        }
        City {
          id
          name
        }
        Country {
          id
          flag
          isoCode
          name
        }
        ComingArea {
          id
          timesRequested
          toBeNotifiedProfileIds
          updatedAt
          createdAt
        }
      }
      areaId
      Vote {
        id
        upvote
        profileId
        createdAt
        updatedAt
      }
      venues {
        ...PROFILE_VENUE_FRAGMENT
      }
      updatedAt
      createdAt
    }
  }
`

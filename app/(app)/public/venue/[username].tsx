import {useWindowDimensions} from 'react-native'
import {useLocalSearchParams} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {FlashList} from '@shopify/flash-list'
import {uniqueId} from 'lodash'
import {Skeleton} from 'moti/skeleton'

import {usePublicVenueQuery} from '#/graphql/generated'
import {
  CurrentLocationReactiveVar,
  SearchAreaReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import LeaveSection from '#/src/components/molecules/activity/leavesection/LeaveSection'
import InformationJoinVenue from '#/src/components/molecules/information/informationjoinvenue'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import {PUBLIC_VENUE_HEADER_IMAGE_HEIGHT} from '#/src/constants/Layout'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import Details from '#/src/view/screens/public/venue/details/Details'
import PersonalAtVenue from '#/src/view/screens/public/venue/peopleatvenue/PersonalAtVenue'
import VenueActions from '#/src/view/screens/public/venue/venueactions/VenueActions'
import VenueHeader from '#/src/view/screens/public/venue/venueheader/VenueHeader'
import VenueTotals from '#/src/view/screens/public/venue/venuetotals/VenueTotals'

const numColumns = 2

export default () => {
  const {width} = useWindowDimensions()
  const contentInsets = useContentInsets()
  const itemPadding = (width / 33.33) * numColumns
  const params = useLocalSearchParams()
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
  const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const link = `https://barfriends.com/app/public/venue?username=${params.username}`

  const {data, loading, error} = usePublicVenueQuery({
    skip: !params.username,
    fetchPolicy: 'network-only',
    variables: {
      where: {
        IdentifiableInformation: {
          username: {
            equals: String(params.username),
          },
        },
      },
      currentLocationCoords: {
        latitude: rSearchAreaVar.useCurrentLocation
          ? Number(rCurrentLocationVar?.current?.coords.latitude)
          : Number(rSearchAreaVar?.searchArea.coords.latitude),
        longitude: rSearchAreaVar.useCurrentLocation
          ? Number(rCurrentLocationVar?.current?.coords.longitude)
          : Number(rSearchAreaVar?.searchArea.coords.longitude),
      },
    },
  })

  if (loading || !data?.publicVenue) {
    return (
      <VStack space={'md'} className="flex-1">
        <Skeleton
          key={uniqueId()}
          height={PUBLIC_VENUE_HEADER_IMAGE_HEIGHT}
          width={'100%'}
          radius={15}
          colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
          colors={
            rTheme.colorScheme === 'light'
              ? [
                  String(rTheme.theme?.gluestack.tokens.colors.light100),
                  String(rTheme.theme?.gluestack.tokens.colors.light300),
                ]
              : [
                  String(rTheme.theme?.gluestack.tokens.colors.light900),
                  String(rTheme.theme?.gluestack.tokens.colors.light700),
                ]
          }
        />
        <VStack space={'md'} className="rounded-md px-2">
          <Skeleton
            key={uniqueId()}
            height={30}
            width={'75%'}
            radius={15}
            colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
            colors={
              rTheme.colorScheme === 'light'
                ? [
                    String(rTheme.theme?.gluestack.tokens.colors.light100),
                    String(rTheme.theme?.gluestack.tokens.colors.light300),
                  ]
                : [
                    String(rTheme.theme?.gluestack.tokens.colors.light900),
                    String(rTheme.theme?.gluestack.tokens.colors.light700),
                  ]
            }
          />
          <Skeleton
            key={uniqueId()}
            height={30}
            width={'25%'}
            radius={15}
            colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
            colors={
              rTheme.colorScheme === 'light'
                ? [
                    String(rTheme.theme?.gluestack.tokens.colors.light100),
                    String(rTheme.theme?.gluestack.tokens.colors.light300),
                  ]
                : [
                    String(rTheme.theme?.gluestack.tokens.colors.light900),
                    String(rTheme.theme?.gluestack.tokens.colors.light700),
                  ]
            }
          />
        </VStack>
        <HStack space={'md'} className="items-center justify-center rounded-md">
          {[...Array(2)].map((item, index) => {
            return (
              <Skeleton
                key={uniqueId()}
                height={30}
                width={(width - itemPadding) / numColumns}
                radius={15}
                colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
                colors={
                  rTheme.colorScheme === 'light'
                    ? [
                        String(rTheme.theme?.gluestack.tokens.colors.light100),
                        String(rTheme.theme?.gluestack.tokens.colors.light300),
                      ]
                    : [
                        String(rTheme.theme?.gluestack.tokens.colors.light900),
                        String(rTheme.theme?.gluestack.tokens.colors.light700),
                      ]
                }
              />
            )
          })}
        </HStack>
        <HStack space={'md'} className="items-center justify-center rounded-md">
          {[...Array(2)].map((item, index) => {
            return (
              <Skeleton
                key={uniqueId()}
                height={220}
                width={(width - itemPadding) / numColumns}
                radius={15}
                colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
                colors={
                  rTheme.colorScheme === 'light'
                    ? [
                        String(rTheme.theme?.gluestack.tokens.colors.light100),
                        String(rTheme.theme?.gluestack.tokens.colors.light300),
                      ]
                    : [
                        String(rTheme.theme?.gluestack.tokens.colors.light900),
                        String(rTheme.theme?.gluestack.tokens.colors.light700),
                      ]
                }
              />
            )
          })}
        </HStack>
        <Skeleton
          key={uniqueId()}
          height={PUBLIC_VENUE_HEADER_IMAGE_HEIGHT}
          width={'100%'}
          radius={15}
          colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
          colors={
            rTheme.colorScheme === 'light'
              ? [
                  String(rTheme.theme?.gluestack.tokens.colors.light100),
                  String(rTheme.theme?.gluestack.tokens.colors.light300),
                ]
              : [
                  String(rTheme.theme?.gluestack.tokens.colors.light900),
                  String(rTheme.theme?.gluestack.tokens.colors.light700),
                ]
          }
        />
      </VStack>
    )
  }

  const HandleEmptyUsers = () => {
    return (
      <VStack className="items-center">
        <Heading>Be the first to join</Heading>
        <Text className="text-center text-2xl">No users present!</Text>
      </VStack>
    )
  }

  const venueData = data.publicVenue

  return (
    <FlashList
      data={[]}
      estimatedItemSize={200}
      numColumns={2}
      contentInset={contentInsets}
      showsVerticalScrollIndicator={false}
      // ListEmptyComponent={!loading && <HandleEmptyUsers />}
      ListHeaderComponent={
        <VStack className="mb-5">
          <VenueHeader
            key={uniqueId()}
            loading={loading}
            photos={data.publicVenue?.photos || []}
          />
          <Box
            key={uniqueId()}
            className="mb-2 rounded-none rounded-ee-md py-3">
            <VenueTotals />
            <LeaveSection />
          </Box>
          <InformationJoinVenue />
          <VenueActions key={uniqueId()} />
        </VStack>
      }
      ListFooterComponent={
        <Box className="flex-1">
          <Details />
        </Box>
      }
      keyExtractor={(item, index) => index.toString()}
      renderItem={item => <PersonalAtVenue item={item} />}
    />
  )
}

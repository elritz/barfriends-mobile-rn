import {ArrowRightIcon} from '#/src/components/ui/icon'
import {Button, ButtonText, ButtonIcon} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import {Box} from '#/src/components/ui/box'
import {useReactiveVar} from '@apollo/client'
import CardPleaseSignup from '#/src/components/molecules/asks/signuplogin'
import SearchAreaHeader from '#/src/view/screens/venuesfeed/SearchAreaHeader'
import MemoizedVerticalVenueFeedVenueItem from '#/src/view/screens/venuesfeed/VerticalVenueFeedVenueItem'
import {Ionicons} from '@expo/vector-icons'
import {
  ProfileType,
  ProfileVenue,
  useRefreshDeviceManagerQuery,
  useUpdateComingAreaToBeNotifiedMutation,
  useUpdateH6ComingAreaVoteMutation,
  useVenuesNearbyLazyQuery,
} from '#/graphql/generated'
import {
  CurrentLocationReactiveVar,
  PermissionForegroundLocationReactiveVar,
  SearchAreaReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {FlashList, MasonryFlashList} from '@shopify/flash-list'
import useSetSearchAreaWithLocation from '#/src/util/hooks/searcharea/useSetSearchAreaWithLocation'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import {useRouter} from 'expo-router'
import {Skeleton} from 'moti/skeleton'
import {memo, useCallback, useEffect, useState} from 'react'
import {ScrollView, View} from 'react-native'
import CountryFlag from 'react-native-country-flag'
import {uniqueId} from 'lodash'

export default () => {
  const router = useRouter()
  const contentInsets = useContentInsets()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
  const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)

  const rForegroundLocationPermissionVar = useReactiveVar(
    PermissionForegroundLocationReactiveVar,
  )

  const [
    updateH6VenueRecommendationVoteMutation,
    {data: UVRData, loading: UVRLoading, error: UVRError},
  ] = useUpdateH6ComingAreaVoteMutation()

  const [
    updateToBeNotifiedMutation,
    {data: UTBNData, loading: UTBNLoading, error: UTBNError},
  ] = useUpdateComingAreaToBeNotifiedMutation()

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery()

  const [venuesNearbyQuery, {data, loading, error}] = useVenuesNearbyLazyQuery({
    variables: {
      cityName: rSearchAreaVar.useCurrentLocation
        ? String(rCurrentLocationVar.reverseGeocoded?.city)
        : String(rSearchAreaVar.searchArea.city.name),
      searchAreaCoords: {
        latitude: rSearchAreaVar.useCurrentLocation
          ? Number(rCurrentLocationVar?.current?.coords.latitude)
          : Number(rSearchAreaVar?.searchArea.coords.latitude),
        longitude: rSearchAreaVar.useCurrentLocation
          ? Number(rCurrentLocationVar?.current?.coords.longitude)
          : Number(rSearchAreaVar?.searchArea.coords.longitude),
      },
      countryIsoCode: String(rSearchAreaVar?.searchArea.country.isoCode),
      stateIsoCode: String(rSearchAreaVar?.searchArea.state.isoCode),
    },
  })

  const getNearbyVenues = useCallback(async () => {
    if (rForegroundLocationPermissionVar?.granted) {
      if (rSearchAreaVar.useCurrentLocation) {
        await useSetSearchAreaWithLocation()
      }
    }

    if (
      rSearchAreaVar?.searchArea.coords.latitude !== 0 &&
      rSearchAreaVar?.searchArea.coords.longitude !== 0
    ) {
      venuesNearbyQuery()
    }
  }, [])

  useEffect(() => {
    if (!data?.venuesNearby) {
      getNearbyVenues()
    }
  }, [])

  const ListheaderComponent = () => {
    const SignUpWidget = () => {
      if (rdmLoading || !rdmData) {
        return null
      }

      switch (rdmData?.refreshDeviceManager?.__typename) {
        case 'AuthorizationDeviceProfile':
          if (
            rdmData?.refreshDeviceManager.Profile?.ProfileType ===
            ProfileType.Guest
          ) {
            return (
              <Box className="mx-2 my-2 p-5 pt-10">
                <CardPleaseSignup signupTextId={1} />
              </Box>
            )
          }
          return null
      }
    }
    return (
      <Box className="py-2">
        <VStack space={'md'}>
          <SignUpWidget />
          <SearchAreaHeader />
          {/* <AdvertismentHorizontal /> */}
        </VStack>
        <>
          {process.env.NODE_ENV === 'development' && (
            <Heading className="text-center">
              {data?.venuesNearby?.__typename}
            </Heading>
          )}
        </>
      </Box>
    )
  }
  const MemoizedListHeaderComponent = memo(ListheaderComponent)

  if (!data?.venuesNearby || loading) {
    return (
      <MasonryFlashList
        numColumns={2}
        onRefresh={getNearbyVenues}
        refreshing={loading}
        estimatedItemSize={260}
        contentInset={{
          ...contentInsets,
        }}
        data={[...Array(6)]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<MemoizedListHeaderComponent />}
        renderItem={({item}) => {
          return (
            <View style={{alignSelf: 'center', padding: 5}}>
              <Skeleton
                height={260}
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
                        String(rTheme.theme?.gluestack.tokens.colors.light800),
                        String(rTheme.theme?.gluestack.tokens.colors.light600),
                      ]
                }
              />
            </View>
          )
        }}
        ItemSeparatorComponent={() => <Box className="h-5 bg-transparent" />}
      />
    )
  }

  const ListFooterComponent = () => {
    const rPermissionLocationVar = useReactiveVar(
      PermissionForegroundLocationReactiveVar,
    )

    const RecommendedAreaList = () => {
      switch (data.venuesNearby?.__typename) {
        case 'VenuesNearbyResponse':
          return (
            <VStack>
              {data.venuesNearby.recommendedAreas?.map((item, index) => {
                const [distance, setDistance] = useState(0)
                const [metric, setMetric] = useState('m')
                const setDist = useCallback(
                  ({distanceInM}) => {
                    if (distanceInM) {
                      if (distanceInM > 1000) {
                        const val = parseInt((distanceInM / 1000).toFixed(1))
                        setDistance(val)
                        setMetric('km')
                      } else {
                        setDistance(distanceInM)
                        setMetric('m')
                      }
                    }
                  },
                  [item.distanceInM],
                )

                useEffect(() => {
                  if (item.distanceInM) {
                    setDist({distanceInM: item.distanceInM})
                  }
                }, [item.distanceInM])
                return (
                  <Pressable
                    key={item.id + index}
                    onPress={() => {
                      router.push({
                        params: {
                          venueprofileids: JSON.stringify(
                            item.venuesProfileIds,
                          ),
                          id: item.id,
                        },
                        pathname: '/(app)/searcharea/searchh3recommendation',
                      })
                    }}>
                    <Box
                      key={item.id}
                      className="m-2 flex-row items-center justify-between p-3">
                      <VStack>
                        <HStack className="items-center">
                          <Heading
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            className="text-xl font-medium">
                            {item.Area?.Country.flag}
                            {item.Area?.City.name}
                          </Heading>
                          <Text className="text-md">
                            &nbsp; · &nbsp;
                            {distance}&nbsp;
                            {metric}
                          </Text>
                        </HStack>
                        <Text>{item.venuesProfileIds.length}&nbsp;venues</Text>
                      </VStack>
                      <ArrowRightIcon />
                    </Box>
                  </Pressable>
                )
              })}
            </VStack>
          )
        case 'ComingAreaResponse':
          return (
            <VStack>
              {data.venuesNearby.recommendedAreas?.map((item, index) => {
                return (
                  <Pressable
                    key={item.id + index}
                    onPress={() => {
                      router.push({
                        params: {
                          venueprofileids: JSON.stringify(
                            item.venuesProfileIds,
                          ),
                          id: item.id,
                        },
                        pathname: '/(app)/searcharea/searchh3recommendation',
                      })
                    }}>
                    <Box
                      key={item.id}
                      className="m-2 flex-row items-center justify-between p-3">
                      <VStack>
                        <HStack className="items-center">
                          <Heading
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            className="text-xl font-medium">
                            {item.Area?.Country.flag}
                            {item.Area?.City.name}
                          </Heading>
                        </HStack>
                        <Text>{item.venuesProfileIds.length}&nbsp;venues</Text>
                      </VStack>
                      <ArrowRightIcon />
                    </Box>
                  </Pressable>
                )
              })}
            </VStack>
          )
      }
    }

    const _press = async () => {
      rPermissionLocationVar?.granted
        ? await useSetSearchAreaWithLocation()
        : router.push({
            pathname: '/(app)/permission/foregroundlocation',
          })
    }

    const RecommendedAreaComponent = () => {
      return (
        <Box className="m-2">
          <VStack>
            <VStack space="xs" className="flex-1 p-3">
              <Heading>Recommended Areas</Heading>
              <Button
                variant="link"
                size="md"
                onPress={_press}
                className="w-[50%] justify-start">
                <ButtonText>Filter by distance</ButtonText>
                <ButtonIcon as={ArrowRightIcon} className="ml-1" />
              </Button>
            </VStack>
            <RecommendedAreaList />
          </VStack>
        </Box>
      )
    }

    switch (data.venuesNearby?.__typename) {
      case 'VenuesNearbyResponse':
        return <RecommendedAreaComponent />
      case 'ComingAreaResponse':
        return <RecommendedAreaComponent />
    }
  }

  const MemoizeFooterComponent = memo(ListFooterComponent)

  if (data.venuesNearby.__typename === 'Error') {
    return (
      <ScrollView>
        <Text>{data.venuesNearby.message}</Text>
      </ScrollView>
    )
  }

  if (data.venuesNearby.__typename === 'ComingAreaResponse') {
    return (
      <>
        <FlashList
          data={data.venuesNearby.comingAreas}
          overScrollMode="always"
          keyExtractor={(item, index) => index.toString()}
          onRefresh={getNearbyVenues}
          contentInset={{
            ...contentInsets,
          }}
          refreshing={loading}
          estimatedItemSize={30}
          ListHeaderComponent={MemoizedListHeaderComponent}
          renderItem={({item}) => {
            const lengthOfUpvote = item.Vote.filter(item => {
              return item.upvote
            }).length

            const UpvoteIcon = () => {
              if (
                rdmData?.refreshDeviceManager?.__typename ===
                'AuthorizationDeviceProfile'
              ) {
                return (
                  <Ionicons
                    name="caret-up"
                    size={25}
                    color={
                      rTheme.colorScheme === 'light'
                        ? item.Vote.some(
                            item =>
                              item.upvote &&
                              item.profileId ===
                                rdmData.refreshDeviceManager?.Profile?.id,
                          )
                          ? rTheme.theme?.gluestack.tokens.colors.blue500
                          : rTheme.theme?.gluestack.tokens.colors.light700
                        : item.Vote.some(
                              item =>
                                item.upvote &&
                                item.profileId ===
                                  rdmData.refreshDeviceManager?.Profile?.id,
                            )
                          ? rTheme.theme?.gluestack.tokens.colors.blue500
                          : rTheme.theme?.gluestack.tokens.colors.light300
                    }
                  />
                )
              }
            }

            return (
              <Box key={item.id} className="m-2 rounded-xl py-1">
                <HStack className="flex-1 justify-between">
                  <HStack space={'md'} className="items-center px-3">
                    <CountryFlag
                      size={12}
                      isoCode={String(item.Area?.Country.isoCode)}
                    />
                    <Text className="text-xl">{item.Area?.City.name}</Text>
                  </HStack>
                  <HStack space={'md'} className="h-[50px] justify-end">
                    <Pressable
                      onPress={() => {
                        updateH6VenueRecommendationVoteMutation({
                          variables: {
                            comingAreaId: item.id,
                          },
                        })
                      }}
                      className="flex-row items-center">
                      <Text className="mx-2 text-right text-xl font-medium">
                        {lengthOfUpvote}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        updateToBeNotifiedMutation({
                          variables: {
                            comingAreaId: item.id,
                          },
                        })
                      }}
                      className="w-[50px] items-center justify-center px-2">
                      <UpvoteIcon />
                    </Pressable>
                  </HStack>
                </HStack>
              </Box>
            )
          }}
        />
      </>
    )
  }

  if (data.venuesNearby.__typename === 'VenuesNearbyResponse') {
    return (
      <MasonryFlashList
        overScrollMode="always"
        onRefresh={getNearbyVenues}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        estimatedItemSize={100}
        scrollEnabled
        contentInset={{
          ...contentInsets,
        }}
        data={data?.venuesNearby.venuesNearby}
        ListHeaderComponent={MemoizedListHeaderComponent}
        ListFooterComponent={<MemoizeFooterComponent />}
        renderItem={({item, index, columnIndex}) => (
          <MemoizedVerticalVenueFeedVenueItem
            key={columnIndex + uniqueId()}
            item={item as ProfileVenue}
            columnIndex={columnIndex}
          />
        )}
        ItemSeparatorComponent={() => <Box className="h-5" />}
        keyExtractor={item => item.id ?? uniqueId()}
        automaticallyAdjustContentInsets
      />
    )
  }
}

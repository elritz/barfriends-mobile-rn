import { ArrowRightIcon } from "#/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "#/components/ui/button";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Pressable } from "#/components/ui/pressable";
import { Text } from "#/components/ui/text";
import { VStack } from "#/components/ui/vstack";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import CardPleaseSignup from "#/components/molecules/asks/signuplogin";
import SearchAreaHeader from "#/components/screens/venuesfeed/SearchAreaHeader";
import VenueFeedSearchAreaEmptyState from "#/components/screens/venuesfeed/VenueFeedSearchAreaEmptyState";
import MemoizedVerticalVenueFeedVenueItem from "#/components/screens/venuesfeed/VerticalVenueFeedVenueItem";
import { Ionicons } from "@expo/vector-icons";
import {
  ProfileType,
  ProfileVenue,
  useUpdateComingAreaToBeNotifiedMutation,
  useUpdateH6ComingAreaVoteMutation,
  useVenuesNearbyLazyQuery,
} from "#/graphql/generated";
import {
  AuthorizationReactiveVar,
  CurrentLocationReactiveVar,
  PermissionForegroundLocationReactiveVar,
  SearchAreaReactiveVar,
  ThemeReactiveVar,
} from "#/reactive";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import useSetSearchAreaWithLocation from "#/util/hooks/searcharea/useSetSearchAreaWithLocation";
import useContentInsets from "#/util/hooks/useContentInsets";
import { useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { memo, useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import AdvertismentHorizontal from "#/components/screens/venuesfeed/advertisments/advertismenthorizontal";

export default () => {
  const router = useRouter();
  const contentInsets = useContentInsets();
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar);
  const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar);

  const rForegroundLocationPermissionVar = useReactiveVar(
    PermissionForegroundLocationReactiveVar,
  );

  const [
    updateH6VenueRecommendationVoteMutation,
    { data: UVRData, loading: UVRLoading, error: UVRError },
  ] = useUpdateH6ComingAreaVoteMutation();

  const [
    updateToBeNotifiedMutation,
    { data: UTBNData, loading: UTBNLoading, error: UTBNError },
  ] = useUpdateComingAreaToBeNotifiedMutation();

  // console.log(
  // 	'rForegroundLocationPermissionVar :>> ',
  // 	JSON.stringify(rForegroundLocationPermissionVar, null, 2),
  // )
  // console.log('rSearchAreaVar :>> ', JSON.stringify(rSearchAreaVar, null, 2))
  // console.log('rCurrentLocationVar :>> ', JSON.stringify(rSearchAreaVar, null, 2))
  // console.log(
  // 	'rCurrentLocationVar :>> ',
  // 	JSON.stringify(
  // 		Number(rCurrentLocationVar?.current?.coords.latitude),
  // 		Number(rSearchAreaVar?.searchArea.coords.latitude),
  // 		null,
  // 		2,
  // 	),
  // )

  const [venuesNearbyQuery, { data, loading, error }] =
    useVenuesNearbyLazyQuery({
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
    });

  const getNearbyVenues = useCallback(async () => {
    if (rForegroundLocationPermissionVar?.granted) {
      if (rSearchAreaVar.useCurrentLocation) {
        await useSetSearchAreaWithLocation();
      }
    }

    if (
      rSearchAreaVar?.searchArea.coords.latitude !== 0 &&
      rSearchAreaVar?.searchArea.coords.longitude !== 0
    ) {
      venuesNearbyQuery();
    }
  }, []);

  useEffect(() => {
    if (!data?.venuesNearby) {
      getNearbyVenues();
    }
  }, []);

  const ListheaderComponent = () => {
    return (
      <Box className="py-2">
        <VStack space={"md"}>
          {rAuthorizationVar?.Profile?.ProfileType === ProfileType.Guest && (
            <Box className="mx-2 my-2 p-5 pt-10">
              <CardPleaseSignup signupTextId={1} />
            </Box>
          )}
          {rSearchAreaVar.searchArea.city.name ? (
            <SearchAreaHeader />
          ) : (
            <VenueFeedSearchAreaEmptyState />
          )}
          {/* <AdvertismentHorizontal /> */}
        </VStack>
      </Box>
    );
  };
  const MemoizedListHeaderComponent = memo(ListheaderComponent);

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
        ListHeaderComponent={
          <MemoizedListHeaderComponent
            typename={data?.venuesNearby.__typename}
          />
        }
        renderItem={({ item }) => {
          return (
            <View style={{ alignSelf: "center", padding: 5 }}>
              <Skeleton
                height={260}
                width={"100%"}
                radius={15}
                colorMode={rTheme.colorScheme === "light" ? "light" : "dark"}
                colors={
                  rTheme.colorScheme === "light"
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
          );
        }}
        ItemSeparatorComponent={() => <Box className="h-5 bg-transparent" />}
      />
    );
  }

  const ListFooterComponent = () => {
    const rPermissionLocationVar = useReactiveVar(
      PermissionForegroundLocationReactiveVar,
    );

    const RecommendedAreaList = () => {
      switch (data.venuesNearby.__typename) {
        case "VenuesNearbyResponse":
          return (
            <VStack>
              {data.venuesNearby.recommendedAreas?.map((item, index) => {
                const [distance, setDistance] = useState(0);
                const [metric, setMetric] = useState("m");
                const setDist = useCallback(
                  ({ distanceInM }) => {
                    if (distanceInM) {
                      if (distanceInM > 1000) {
                        const val = parseInt((distanceInM / 1000).toFixed(1));
                        setDistance(val);
                        setMetric("km");
                      } else {
                        setDistance(distanceInM);
                        setMetric("m");
                      }
                    }
                  },
                  [item.distanceInM],
                );

                useEffect(() => {
                  if (item.distanceInM) {
                    setDist({ distanceInM: item.distanceInM });
                  }
                }, [item.distanceInM]);
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
                        pathname: "/(app)/searcharea/searchh3recommendation",
                      });
                    }}
                  >
                    <Box
                      key={item.id}
                      className="m-2 flex-row items-center justify-between p-3"
                    >
                      <VStack>
                        <HStack className="items-center">
                          <Heading
                            numberOfLines={1}
                            ellipsizeMode={"tail"}
                            className="text-xl font-medium"
                          >
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
                );
              })}
            </VStack>
          );
        case "ComingAreaResponse":
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
                        pathname: "/(app)/searcharea/searchh3recommendation",
                      });
                    }}
                  >
                    <Box
                      key={item.id}
                      className="m-2 flex-row items-center justify-between p-3"
                    >
                      <VStack>
                        <HStack className="items-center">
                          <Heading
                            numberOfLines={1}
                            ellipsizeMode={"tail"}
                            className="text-xl font-medium"
                          >
                            {item.Area?.Country.flag}
                            {item.Area?.City.name}
                          </Heading>
                        </HStack>
                        <Text>{item.venuesProfileIds.length}&nbsp;venues</Text>
                      </VStack>
                      <ArrowRightIcon />
                    </Box>
                  </Pressable>
                );
              })}
            </VStack>
          );
      }
    };

    const _press = async () => {
      rPermissionLocationVar?.granted
        ? await useSetSearchAreaWithLocation()
        : router.push({
            pathname: "/(app)/permission/foregroundlocation",
          });
    };

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
                className="w-[50%] justify-start"
              >
                <ButtonText>Filter by distance</ButtonText>
                <ButtonIcon as={ArrowRightIcon} className="ml-1" />
              </Button>
            </VStack>
            <RecommendedAreaList />
          </VStack>
        </Box>
      );
    };

    switch (data.venuesNearby.__typename) {
      case "VenuesNearbyResponse":
        return <RecommendedAreaComponent />;
      case "ComingAreaResponse":
        return <RecommendedAreaComponent />;
    }
  };

  const MemoizeFooterComponent = memo(ListFooterComponent);

  if (data.venuesNearby.__typename === "Error") {
    return (
      <ScrollView>
        <Text>{data.venuesNearby.message}</Text>
      </ScrollView>
    );
  }

  if (data.venuesNearby.__typename === "ComingAreaResponse") {
    return (
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
        ListHeaderComponent={
          <MemoizedListHeaderComponent
            typename={data.venuesNearby.__typename}
          />
        }
        renderItem={({ item }) => {
          const lengthOfUpvote = item.Vote.filter((item) => {
            return item.upvote;
          }).length;

          return (
            <Box key={item.id} className="m-2 rounded-xl py-1">
              <HStack className="flex-1 justify-between">
                <HStack space={"md"} className="items-center px-3">
                  <CountryFlag
                    size={12}
                    isoCode={String(item.Area?.Country.isoCode)}
                  />
                  <Text className="text-xl">{item.Area?.City.name}</Text>
                </HStack>
                <HStack space={"md"} className="h-[50px] justify-end">
                  <Pressable
                    onPress={() => {
                      updateH6VenueRecommendationVoteMutation({
                        variables: {
                          comingAreaId: item.id,
                        },
                      });
                    }}
                    className="flex-row items-center"
                  >
                    <Text className="mx-2 text-xl font-medium text-[right]">
                      {lengthOfUpvote}
                    </Text>
                    <Ionicons
                      name="caret-up"
                      size={25}
                      color={
                        rTheme.colorScheme === "light"
                          ? item.Vote.some(
                              (item) =>
                                item.upvote &&
                                item.profileId ===
                                  rAuthorizationVar?.Profile?.id,
                            )
                            ? rTheme.theme?.gluestack.tokens.colors.blue500
                            : rTheme.theme?.gluestack.tokens.colors.light700
                          : item.Vote.some(
                                (item) =>
                                  item.upvote &&
                                  item.profileId ===
                                    rAuthorizationVar?.Profile?.id,
                              )
                            ? rTheme.theme?.gluestack.tokens.colors.blue500
                            : rTheme.theme?.gluestack.tokens.colors.light300
                      }
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      updateToBeNotifiedMutation({
                        variables: {
                          comingAreaId: item.id,
                        },
                      });
                    }}
                    className="w-[50px] items-center justify-center px-2"
                  >
                    <Ionicons
                      name="notifications-sharp"
                      size={23}
                      color={
                        rTheme.colorScheme === "light"
                          ? item.toBeNotifiedProfileIds.some(
                              (item) => item === rAuthorizationVar?.Profile?.id,
                            )
                            ? rTheme.theme?.gluestack.tokens.colors.primary500
                            : rTheme.theme?.gluestack.tokens.colors.light700
                          : item.toBeNotifiedProfileIds.some(
                                (item) =>
                                  item === rAuthorizationVar?.Profile?.id,
                              )
                            ? rTheme.theme?.gluestack.tokens.colors.primary500
                            : rTheme.theme?.gluestack.tokens.colors.light300
                      }
                    />
                  </Pressable>
                </HStack>
              </HStack>
            </Box>
          );
        }}
      />
    );
  }

  if (data.venuesNearby.__typename === "VenuesNearbyResponse") {
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
        renderItem={({ item, index, columnIndex }) => (
          <MemoizedVerticalVenueFeedVenueItem
            key={columnIndex + item.id}
            item={item as ProfileVenue}
            columnIndex={columnIndex}
          />
        )}
        ItemSeparatorComponent={() => <Box className="h-5 bg-transparent" />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <MemoizedListHeaderComponent
            typename={data.venuesNearby.__typename}
          />
        }
        ListFooterComponent={<MemoizeFooterComponent />}
        automaticallyAdjustContentInsets
      />
    );
  }
};

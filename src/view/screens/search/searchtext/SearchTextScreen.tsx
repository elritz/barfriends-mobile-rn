import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Pressable } from "#/src/components/ui/pressable";
import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Center } from "#/src/components/ui/center";
import { Button } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import SearchCard from "#/src/view/screens/search/components/SearchCard";
import {
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from "#/src/constants/ReactNavigationConstants";
import { Ionicons } from "@expo/vector-icons";
import { useExploreSearchLazyQuery } from "#/graphql/generated";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HItem = {
  search: string;
};

const SearchTextScreen = () => {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);

  const [exploreSearchQuery, { data, loading, error }] =
    useExploreSearchLazyQuery({
      onCompleted: (data) => {},
    });

  useEffect(() => {
    if (params.searchtext?.length) {
      exploreSearchQuery({
        variables: {
          search: String(params.searchtext),
        },
      });
    }
  }, [params.searchtext]);

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const filteredRecentSearches = getUniqueListBy(
    rAuthorizationVar?.Profile?.resentSearches?.searches,
    "search",
  );

  if (loading) {
    return (
      <Box className="bg-transparent px-3">
        <FlashList
          scrollEnabled={false}
          automaticallyAdjustContentInsets
          automaticallyAdjustKeyboardInsets
          automaticallyAdjustsScrollIndicatorInsets
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode="on-drag"
          data={[...Array(20)]}
          ListHeaderComponent={() => {
            return (
              <>
                {!data?.exploreSearch.venues?.length &&
                  !data?.exploreSearch.people?.length && (
                    // <Box mt={insets.top}>
                    <Center>
                      <Heading className="text-md font-medium">
                        No search results for
                      </Heading>
                      <Heading className="text-3xl">
                        "{params.searchtext}"
                      </Heading>
                    </Center>
                    // </Box>
                  )}
              </>
            );
          }}
          estimatedItemSize={80}
          keyExtractor={(item, index) => {
            return (`key` + item).toString();
          }}
          contentInset={{
            top: insets.top + 10,
            bottom:
              insets.bottom !== 0
                ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
                : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
          }}
          renderItem={({ index, item }) => {
            return (
              <HStack className="h-[60px] w-[90%] px-2">
                <Skeleton
                  height={40}
                  width={40}
                  radius={15}
                  colorMode={rTheme.colorScheme === "light" ? "light" : "dark"}
                  colors={
                    rTheme.colorScheme === "light"
                      ? [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light100,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light300,
                          ),
                        ]
                      : [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light900,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light700,
                          ),
                        ]
                  }
                />
                <VStack className="px-2">
                  <Skeleton
                    height={40}
                    width={"100%"}
                    radius={15}
                    colorMode={
                      rTheme.colorScheme === "light" ? "light" : "dark"
                    }
                    colors={
                      rTheme.colorScheme === "light"
                        ? [
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light100,
                            ),
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light300,
                            ),
                          ]
                        : [
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light900,
                            ),
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light700,
                            ),
                          ]
                    }
                  />
                  <Skeleton
                    height={40}
                    width={"100%"}
                    radius={15}
                    colorMode={
                      rTheme.colorScheme === "light" ? "light" : "dark"
                    }
                    colors={
                      rTheme.colorScheme === "light"
                        ? [
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light100,
                            ),
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light300,
                            ),
                          ]
                        : [
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light900,
                            ),
                            String(
                              rTheme.theme?.gluestack.tokens.colors.light700,
                            ),
                          ]
                    }
                  />
                </VStack>
              </HStack>
            );
          }}
        />
      </Box>
    );
  }

  if (!params?.searchtext?.length) {
    return (
      <FlashList
        scrollEnabled={true}
        automaticallyAdjustContentInsets
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        data={filteredRecentSearches as HItem[]}
        ListHeaderComponent={() => {
          return (
            <>
              {!data?.exploreSearch.venues?.length &&
                !data?.exploreSearch.people?.length && (
                  // <Box mt={insets.top}>
                  <Center>
                    <Heading className="text-md font-medium">
                      No search results for
                    </Heading>
                    <Heading className="text-3xl">
                      "{params.searchtext}"
                    </Heading>
                  </Center>
                  // </Box>
                )}
            </>
          );
        }}
        estimatedItemSize={80}
        keyExtractor={(item, index) => {
          return (`key` + item).toString();
        }}
        contentInset={{
          top: insets.top + 10,
          bottom:
            insets.bottom !== 0
              ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
              : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
        }}
        automaticallyAdjustKeyboardInsets
        renderItem={({ index, item }) => {
          return (
            <Pressable
              onPress={() => {
                router.setParams({
                  searchtext: item.search,
                });
              }}
            >
              <HStack
                space={"md"}
                className="h-[55px] w-[100%] items-center justify-start px-2"
              >
                <Button size="sm" variant="outline" className="rounded-md">
                  <Ionicons name={"search"} size={30} />
                </Button>
                <VStack>
                  <Text className="text-md font-medium">{item.search}</Text>
                </VStack>
              </HStack>
            </Pressable>
          );
        }}
      />
    );
  }

  return (
    <Box className={` mt-${insets.top} flex-1`}>
      <FlashList
        data={[
          { title: "Accounts", data: data?.exploreSearch.people },
          { title: "Venues", data: data?.exploreSearch.venues },
        ]}
        ListHeaderComponent={() => {
          return (
            <>
              {!data?.exploreSearch.venues?.length &&
                !data?.exploreSearch.people?.length && (
                  // <Box mt={insets.top}>
                  <Center>
                    <Heading className="text-md font-medium">
                      No search results for
                    </Heading>
                    <Heading className="text-3xl">
                      "{params.searchtext}"
                    </Heading>
                  </Center>
                  // </Box>
                )}
            </>
          );
        }}
        estimatedItemSize={80}
        keyExtractor={(item, index) => {
          return (`key` + item.title).toString();
        }}
        contentInset={{
          top: insets.top,
          bottom:
            insets.bottom !== 0
              ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
              : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
        }}
        automaticallyAdjustKeyboardInsets
        automaticallyAdjustContentInsets
        keyboardDismissMode="on-drag"
        renderItem={({ index, item }) => {
          return (
            <Box className="bg-transparent">
              {item.data && item.data.length ? (
                <Box className="my-1">
                  <Heading className="mx-3">{item.title}</Heading>
                  {item.data.map((item, index) => {
                    return <SearchCard key={index} item={item} />;
                  })}
                </Box>
              ) : null}
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default SearchTextScreen;

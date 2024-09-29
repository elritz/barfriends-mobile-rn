import { VStack } from "#/src/components/ui/vstack";
import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Center } from "#/src/components/ui/center";
import { Box } from "#/src/components/ui/box";
import SearchCard from "../components/SearchCard";
import { useReactiveVar } from "@apollo/client";
import { useExploreSearchQuery } from "#/graphql/generated";
import { ThemeReactiveVar } from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import useContentInsets from "#/src/util/hooks/useContentInsets";
import { useGlobalSearchParams } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchVenues() {
  const params = useGlobalSearchParams();
  const contentInsets = useContentInsets();
  const insets = useSafeAreaInsets();
  const rTheme = useReactiveVar(ThemeReactiveVar);

  const {
    data,
    loading: ESLoading,
    error,
  } = useExploreSearchQuery({
    fetchPolicy: "cache-first",
    variables: {
      search: String(params.searchtext),
    },
  });

  if (ESLoading) {
    return (
      <FlashList
        numColumns={1}
        estimatedItemSize={65}
        data={[...Array(15)]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <HStack space="md" className="h-[60px] flex-1 items-center px-5">
              <Skeleton
                height={50}
                width={50}
                radius={10}
                colorMode={rTheme.colorScheme === "light" ? "light" : "dark"}
                colors={
                  rTheme.colorScheme === "light"
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
              <VStack space="md">
                <Skeleton
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
                  width={250}
                  height={20}
                />
                <Skeleton
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
                  width={100}
                  height={20}
                />
              </VStack>
            </HStack>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    );
  }
  if (!data?.exploreSearch.venues.length) {
    return (
      <Box className="mt-28">
        <Center>
          <Heading className="text-md font-medium">
            No search results for
          </Heading>
          <Heading className="text-3xl">"{params.searchtext}"</Heading>
        </Center>
      </Box>
    );
  }

  return (
    <Box style={{ flex: 1 }}>
      <FlashList
        data={data?.exploreSearch.venues}
        estimatedItemSize={55}
        keyExtractor={({ id }: { id: string }) => id.toString()}
        renderItem={(item) => {
          return <SearchCard item={item} />;
        }}
      />
    </Box>
  );
}

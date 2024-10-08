import { Text } from "#/src/components/ui/text";
import { Heading } from "#/src/components/ui/heading";
import { Box } from "#/src/components/ui/box";
import MemoizedVerticalVenueFeedVenueItem from "#/src/view/screens/venuesfeed/VerticalVenueFeedVenueItem";
import { useGetH3Index6VenueRecommendationByIdQuery } from "#/graphql/generated";
import { MasonryFlashList } from "@shopify/flash-list";
import useContentInsets from "#/src/util/hooks/useContentInsets";
import { useLocalSearchParams } from "expo-router";

export default function SearchH3Recommendation() {
  const params = useLocalSearchParams();
  const contentInsets = useContentInsets();

  const { data, loading, error } = useGetH3Index6VenueRecommendationByIdQuery({
    skip: !params.id || !params.venueprofileids,
    variables: {
      id: String(params.id),
      venuesProfileIds: JSON.parse(String(params.venueprofileids)),
    },
  });

  if (loading) return null;

  const ListheaderComponent = () => {
    {
      data?.getH3Index6VenueRecommendationById?.Area?.State;
    }
    return (
      <Box className="bg-transparent">
        <Heading className="leading-3xl text-3xl">
          {data?.getH3Index6VenueRecommendationById?.Area?.Country.flag}
          {data?.getH3Index6VenueRecommendationById?.Area?.City.name}
        </Heading>
      </Box>
    );
  };

  return (
    <Box className="flex-1 px-2">
      <MasonryFlashList
        overScrollMode="always"
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        estimatedItemSize={100}
        scrollEnabled
        contentInset={{
          ...contentInsets,
        }}
        data={data?.getH3Index6VenueRecommendationById?.venues}
        renderItem={({ item, index, columnIndex }) => (
          <MemoizedVerticalVenueFeedVenueItem
            showDistance={false}
            showJoin={false}
            index={index}
            item={item}
            columnIndex={columnIndex}
          />
        )}
        ItemSeparatorComponent={() => <Box className="h-5 bg-transparent" />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ListheaderComponent />}
        // ListFooterComponent={ListFooterComponent}
        automaticallyAdjustContentInsets
      />
    </Box>
  );
}

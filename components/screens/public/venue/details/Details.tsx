import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { Button } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { Badge, BadgeText } from "#/components/ui/badge";
import { useReactiveVar } from "@apollo/client";
import { usePublicVenueQuery } from "#/graphql/generated";
import { SearchAreaReactiveVar } from "#/reactive";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

type DetailTitleProps = {
  title: string;
};

const DetailTitle = (props: DetailTitleProps) => {
  return <Text className="text-md py-2 font-extrabold">{props.title}</Text>;
};

export default function Details() {
  const [showMore, setShowMore] = useState(false);
  const params = useLocalSearchParams();
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar);

  const currentLocationCoords = rSearchAreaVar.useCurrentLocation
    ? {
        currentLocationCoords: {
          latitude: Number(rSearchAreaVar.searchArea.coords.latitude),
          longitude: Number(rSearchAreaVar.searchArea.coords.longitude),
        },
      }
    : null;

  const { data, loading, error } = usePublicVenueQuery({
    skip: !params.username,
    fetchPolicy: "cache-first",
    variables: {
      where: {
        IdentifiableInformation: {
          username: {
            equals: String(params.username),
          },
        },
      },
      ...currentLocationCoords,
    },
  });

  if (loading || !data) {
    return null;
  }

  return (
    <Box className="mx-2 mt-5 flex-1 rounded-md bg-light-50 px-2 py-4 dark:bg-light-800">
      <VStack space={"lg"} className="flex-1">
        <Box className="bg-transparent">
          <DetailTitle title={"Address"} />
          <Text className="text-xl font-medium">
            {data?.publicVenue?.Venue?.Location?.Address?.formattedAddress}
          </Text>
        </Box>
        <Box className="bg-transparent">
          <DetailTitle title={"Type"} />
          <HStack space="xs" className="flex-wrap py-2">
            {data.publicVenue?.DetailInformation?.Tags.map((item, index) => {
              return (
                <Badge
                  key={item.id}
                  size="lg"
                  variant="solid"
                  className="my-1 rounded-md bg-light-200 p-2 px-2 dark:bg-black"
                >
                  <BadgeText className="text-md capitalize text-black dark:text-white">
                    {`${item.emoji}`}&nbsp;{`${item.name}`}
                  </BadgeText>
                </Badge>
              );
            })}
          </HStack>
        </Box>
        <Box className="bg-transparent">
          <DetailTitle title={"Capacity"} />
          <Text className="leading-lg text-2xl font-medium">
            {data?.publicVenue?.DetailInformation?.capacity}
          </Text>
        </Box>
        <Box className="flex-1 bg-transparent">
          <DetailTitle title={"Description"} />
          {data?.publicVenue?.DetailInformation?.description ? (
            <Box className="bg-transparent">
              <Text className="text-lg">
                {data.publicVenue.DetailInformation?.description}
              </Text>
            </Box>
          ) : (
            <Box className="bg-transparent">
              <Text className="text-lg">No description available</Text>
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

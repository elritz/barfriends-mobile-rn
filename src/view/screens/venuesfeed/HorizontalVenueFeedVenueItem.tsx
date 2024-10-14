import { VStack } from "#/src/components/ui/vstack";
import { Heading } from "#/src/components/ui/heading";
import { Box } from "#/src/components/ui/box";
import { Profile } from "#/graphql/generated";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import { Blurhash } from "react-native-blurhash";

const width = Dimensions.get("window").width / 2.15;

const height = 280;

type Props = {
  item: Profile;
  loading: boolean;
};

const HorizontalVenueFeedVenueItem = (props: Props) => {
  const router = useRouter();
  const [hideBlur, setHideBlur] = useState(false);

  if (!props.item || props.loading) return null;

  const getTitleCase = (str) => {
    const titleCase = str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    return titleCase;
  };

  return (
    <Pressable
      key={props.item.id}
      onPress={() => {
        router.push({
          pathname: `/(app)/public/venue/${props.item.id}`,
          params: {
            latitude: Number(props.item.Venue?.Location?.Geometry?.latitude),
            longitude: Number(props.item.Venue?.Location?.Geometry?.longitude),
          },
        });
      }}
    >
      <VStack
        space={"md"}
        style={{
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
        className="mx-2 rounded-md"
      >
        <Box className="max-h-[190px] min-h-[190px] bg-transparent">
          <Box
            style={{
              height: "100%",
              width: "100%",
            }}
            className="z-10 bg-transparent"
          >
            <BlurView
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: 80,
              }}
              tint={"dark"}
              intensity={50}
            />
            <Heading
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-md tracking-xs text-left font-black"
            >
              {getTitleCase(props?.item?.IdentifiableInformation?.fullname)}
            </Heading>
          </Box>
          {!props.loading ? (
            <Image
              style={{
                ...StyleSheet.absoluteFillObject,
                position: "absolute",
                width: undefined,
                height: undefined,
                borderRadius: 10,
              }}
              source={{ uri: props.item.photos?.[0]?.url ?? "" }}
              resizeMode="cover"
              onLoadEnd={() => setHideBlur(true)}
            />
          ) : null}
          {!hideBlur && (
            <>
              {props.item.photos?.[0].blurhash && (
                <Blurhash
                  blurhash={String(props.item.photos?.[0].blurhash)}
                  style={{
                    flex: 1,
                  }}
                />
              )}
            </>
          )}
        </Box>
      </VStack>
    </Pressable>
  );
};

export default HorizontalVenueFeedVenueItem;
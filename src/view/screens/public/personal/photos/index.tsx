import { Pressable } from "#/src/components/ui/pressable";
import { Heading } from "#/src/components/ui/heading";
import { Center } from "#/src/components/ui/center";
import { Button } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
import { AddIcon, RemoveIcon } from "#/src/components/ui/icon";
import { useReactiveVar } from "@apollo/client";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Emojimood,
  Photo,
  PhotoCreateManyProfileInput,
  useAddStoryPhotosMutation,
} from "#/graphql/generated";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";
import useCloudinaryImageUploading from "#/src/util/uploading/useCloudinaryImageUploading";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Image } from "react-native";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const size = 70;

type Props = {
  photos: Photo[] | undefined;
  profilePhoto: Photo | null | undefined;
  emojimoodsColors: string[] | null | undefined;
};

export default function Photos(props: Props) {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const [isLoading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const scrollRef = useAnimatedRef<ScrollView>();
  const translateX = useSharedValue(0);
  const containerHeight = 350;
  const margin = 12;
  const DOT_SIZE = 8;
  const ITEM_WIDTH = width - margin * 2;

  //! don't move this from here
  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / ITEM_WIDTH);
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const onPressScroll = useCallback((side) => {
    if (side === "left") {
      if (activeIndex.value === 0) return;
      scrollRef.current?.scrollTo({
        x: ITEM_WIDTH * (activeIndex.value - 1),
        animated: false,
      });
    }
    if (side == "right") {
      if (rAuthorizationVar?.Profile?.tonightStory?.photos) {
        if (
          activeIndex.value ===
          rAuthorizationVar?.Profile?.tonightStory?.photos?.length - 1
        ) {
          scrollRef.current?.scrollTo({ x: ITEM_WIDTH * 0, animated: false });
          return;
        }
        scrollRef.current?.scrollTo({
          x: ITEM_WIDTH * (activeIndex.value + 1),
          animated: false,
        });
      }
    }
  }, []);

  const styles = StyleSheet.create({
    dotLg: {
      position: "absolute",
      left: -39,
      top: -10,
      height: size + 10,
      width: size + 10,
      borderRadius: size + 10 / 2,
      backgroundColor: rTheme.theme?.gluestack.tokens.colors.primary400,
    },
    dotMd: {
      top: 10,
      left: -55,
      position: "absolute",
      height: size - 15,
      width: size - 15,
      borderRadius: size / 2,
      backgroundColor: rTheme.theme?.gluestack?.tokens.colors.tertiary400,
    },
    dotSm: {
      top: 20,
      left: 20,
      position: "absolute",
      height: size - 25,
      width: size - 25,
      borderRadius: size / 2,
      backgroundColor: rTheme.theme?.gluestack?.tokens.colors.secondary700,
      zIndex: 3,
    },
  });

  if (!props.photos?.length && !props.profilePhoto) {
    return (
      <BlurView
        style={{
          borderRadius: 13,
          overflow: "hidden",
          height: containerHeight,
          backgroundColor: props.emojimoodsColors?.length
            ? "transparent"
            : rTheme.colorScheme === "light"
              ? rTheme.theme.gluestack.tokens.colors.light100
              : rTheme.theme.gluestack.tokens.colors.light800,
        }}
        intensity={80}
        tint={rTheme.colorScheme === "light" ? "light" : "dark"}
      >
        {/* <Box
						bg='$red900'
						sx={{
							w: '100%',
							_dark: {
								bg: '$light900',
							},
							_light: {
								bg: '$light100',
							},
						}}
						rounded={'$md'}
					> */}
        <Center className="mx-5 flex-1">
          <Box className="mb-25 w-[100%] items-center bg-transparent">
            <Ionicons
              size={32}
              color={
                rTheme.colorScheme === "light"
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              name={"person"}
            />
          </Box>
        </Center>
        {/* </Box> */}
      </BlurView>
    );
  }

  if (!props.photos?.length && props.profilePhoto) {
    console.log(
      "props.pro -----------------filePhoto :>> ",
      props.emojimoodsColors,
    );
    return (
      <BlurView
        style={{
          borderRadius: 13,
          overflow: "hidden",
          height: containerHeight,
          backgroundColor: props.emojimoodsColors?.length
            ? "transparent"
            : rTheme.colorScheme === "light"
              ? rTheme.theme.gluestack.tokens.colors.light100
              : rTheme.theme.gluestack.tokens.colors.light800,
        }}
        intensity={80}
        tint={rTheme.colorScheme === "light" ? "light" : "dark"}
      >
        {/* <Box
						bg='$red900'
						sx={{
							w: '100%',
							_dark: {
								bg: '$light900',
							},
							_light: {
								bg: '$light100',
							},
						}}
						rounded={'$md'}
					> */}
        <Center className="mx-5 flex-1">
          <Box className="mb-25 w-[100%] items-center bg-transparent">
            <Ionicons
              size={32}
              color={
                rTheme.colorScheme === "light"
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
              name={"person"}
            />
          </Box>
        </Center>
        {/* </Box> */}
      </BlurView>
    );
  }

  return (
    <Box className="bg-transparent">
      <Box className={` h-${containerHeight} rounded-md bg-transparent`}>
        <Animated.ScrollView
          ref={scrollRef as any}
          pagingEnabled
          horizontal
          scrollToOverflowEnabled
          snapToInterval={ITEM_WIDTH}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          decelerationRate={"fast"}
          bounces={false}
          style={{ overflow: "hidden" }}
        >
          {props.photos?.map((item, index) => {
            return (
              <View key={index}>
                <Box
                  className={` w-${ITEM_WIDTH} h-[100%] overflow-hidden rounded-md bg-green-200`}
                >
                  <Pressable
                    onPress={() => {
                      onPressScroll("left");
                    }}
                    className={` w-${ITEM_WIDTH / 2} absolute bottom-0 left-0 top-0 z-10 h-[100%] opacity-20`}
                  />
                  <Pressable
                    onPress={() => {
                      onPressScroll("right");
                    }}
                    className={` w-${ITEM_WIDTH / 2} absolute bottom-0 right-[0px] top-0 z-10 h-[100%]`}
                  />
                  <Image
                    source={{
                      uri: item.url,
                    }}
                    resizeMode="cover"
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 0,
                      overflow: "hidden",
                    }}
                  />
                </Box>
              </View>
            );
          })}
        </Animated.ScrollView>

        <View
          style={{
            position: "absolute",
            bottom: 10,
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          {props.photos?.map((item, i) => {
            const rDotStyle = useAnimatedStyle(() => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
              const dotWidth = interpolate(
                translateX.value,
                inputRange,
                [11, 20, 11],
                "clamp",
              );
              const dotColor = interpolateColor(translateX.value, inputRange, [
                "#1d1d1d",
                "#ff7000",
                "#1d1d1d",
              ]);

              return {
                width: dotWidth,
                backgroundColor: dotColor,
              };
            });

            return (
              <Animated.View
                key={i.toString()}
                style={[
                  rDotStyle,
                  {
                    marginHorizontal: 3,
                    height: DOT_SIZE,
                    borderRadius: DOT_SIZE / 2,
                  },
                ]}
              />
            );
          })}
        </View>
      </Box>
    </Box>
  );
}

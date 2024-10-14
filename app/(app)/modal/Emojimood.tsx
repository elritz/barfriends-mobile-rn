import { Text } from "#/src/components/ui/text";
import { Pressable } from "#/src/components/ui/pressable";
import { Heading } from "#/src/components/ui/heading";
import { Box } from "#/src/components/ui/box";
import { FormType } from "./_layout";
import { useReactiveVar } from "@apollo/client";
import Photos from "#/src/view/screens/tonight/photos";
import {
  useEmojimoodsQuery,
  useRefreshDeviceManagerQuery,
  useUpdateStoryEmojimoodMutation,
} from "#/graphql/generated";
import { ThemeReactiveVar } from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const ITEM_WIDTH = 70;
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const insets = useSafeAreaInsets();
  const { watch, setValue, control, reset } = useFormContext<FormType>();

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery({
    fetchPolicy: "cache-first",
  });

  const { data, loading, error } = useEmojimoodsQuery({});

  if (loading || rdmLoading) {
    return null;
  }

  if (rdmData?.refreshDeviceManager?.__typename === "Error") {
    <LinearGradient colors={watch("emojimood.colors") || ["#0000000"]}>
      <Box
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          alignSelf: "center",
        }}
        className="bg-transparent"
      >
        <Box
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          className="bg-transparent"
        >
          <Controller
            name="emojimood"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <FlashList
                data={data?.emojimoods}
                estimatedItemSize={50}
                numColumns={3}
                extraData={watch("emojimood")}
                contentInset={{
                  top: insets.top + 400 + 60,
                  bottom: insets.bottom,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                renderItem={({ index, item }) => {
                  return (
                    <Pressable className="flex-1 items-center self-center bg-transparent">
                      <BlurView
                        tint={rTheme.colorScheme === "light" ? "light" : "dark"}
                        intensity={60}
                        style={{
                          width: "100%",
                          maxWidth: "90%",
                          overflow: "hidden",
                          borderRadius: 10,
                          marginTop: 5,
                          marginHorizontal: 10,
                          paddingVertical: 14,
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                      >
                        <LinearGradient
                          style={{
                            borderRadius: ITEM_WIDTH / 2,
                            height: ITEM_WIDTH,
                            width: ITEM_WIDTH,
                            alignItems: "center",
                            justifyContent: "center",
                            // alignSelf: "center",
                            borderWidth: 2,
                            borderColor: "transparent",
                          }}
                          colors={
                            item.colors.length
                              ? [...item.colors]
                              : ["#ff7000", "#567000"]
                          }
                        >
                          <Text>{item.emoji}</Text>
                        </LinearGradient>
                        <Text className="mt-3 font-medium">
                          {item.emojiname}
                        </Text>
                      </BlurView>
                    </Pressable>
                  );
                }}
              />
            )}
          />
        </Box>
        <View style={{ marginTop: insets.top + 10, marginBottom: 10 }}>
          <Photos />
        </View>
      </Box>
    </LinearGradient>;
  }

  if (
    rdmData?.refreshDeviceManager?.__typename === "AuthorizationDeviceProfile"
  ) {
    return (
      <LinearGradient colors={watch("emojimood.colors") || ["#0000000"]}>
        <Box
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "center",
          }}
          className="bg-transparent"
        >
          <Box
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            className="bg-transparent"
          >
            <Controller
              name="emojimood"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <FlashList
                  data={[
                    {
                      _typename: "EmojimoodRemove",
                      id: "1",
                      colors:
                        rTheme.colorScheme === "light"
                          ? ["#ffffff20", "#ffffff20"]
                          : ["#00000020", "#00000020"],
                      emoji: "❌",
                      emojiname: "Remove",
                    },
                    ...data?.emojimoods,
                  ]}
                  estimatedItemSize={50}
                  numColumns={3}
                  extraData={watch("emojimood")}
                  contentInset={{
                    top: insets.top + 400 + 60,
                    bottom: insets.bottom,
                  }}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  renderItem={({ index, item }) => {
                    return (
                      <Pressable
                        onPress={() => {
                          if (item.typeName === "EmojimoodRemove") {
                            useUpdateStoryEmojimoodMutation({
                              variables: {},
                              onError(error, clientOptions) {
                                console.log("error", error);
                              },
                            });
                            reset();
                          } else {
                            if (
                              rdmData?.refreshDeviceManager?.__typename ===
                                "AuthorizationDeviceProfile" &&
                              rdmData?.refreshDeviceManager.Profile
                                ?.tonightStory?.emojimood?.id === item.id
                            ) {
                              reset();
                            } else {
                              setValue("emojimood", item);
                            }
                          }
                        }}
                        className="flex-1 items-center self-center bg-transparent"
                      >
                        <BlurView
                          tint={
                            rTheme.colorScheme === "light" ? "light" : "dark"
                          }
                          intensity={60}
                          style={{
                            width: "100%",
                            flex: 1,
                            maxWidth: "90%",
                            overflow: "hidden",
                            borderRadius: 10,
                            marginTop: 5,
                            marginHorizontal: 10,
                            paddingVertical: 14,
                            alignItems: "center",
                            alignSelf: "center",
                          }}
                        >
                          <LinearGradient
                            style={{
                              borderRadius: ITEM_WIDTH / 2,
                              height: ITEM_WIDTH,
                              width: ITEM_WIDTH,
                              alignItems: "center",
                              justifyContent: "center",
                              borderWidth: 2,
                              borderColor:
                                rdmData?.refreshDeviceManager?.__typename ===
                                  "AuthorizationDeviceProfile" &&
                                rdmData?.refreshDeviceManager.Profile
                                  ?.tonightStory?.emojimood?.id === item.id
                                  ? rTheme.colorScheme === "light"
                                    ? "black"
                                    : "white"
                                  : watch("emojimood").id === item.id ||
                                      (rdmData?.refreshDeviceManager
                                        ?.__typename ===
                                        "AuthorizationDeviceProfile" &&
                                        rdmData?.refreshDeviceManager.Profile
                                          ?.tonightStory?.emojimood?.id ===
                                          item.id)
                                    ? rTheme.colorScheme === "light"
                                      ? "white"
                                      : "white"
                                    : "transparent",
                            }}
                            colors={
                              item.colors.length
                                ? [...item.colors]
                                : ["#ff7000", "#567000"]
                            }
                          >
                            <Text>{item.emoji}</Text>
                          </LinearGradient>
                          <Text className="mt-3 font-medium">
                            {item.emojiname}
                          </Text>
                        </BlurView>
                      </Pressable>
                    );
                  }}
                />
              )}
            />
          </Box>
          <View style={{ marginTop: insets.top + 10, marginBottom: 10 }}>
            <Photos />
          </View>
        </Box>
      </LinearGradient>
    );
  }
};

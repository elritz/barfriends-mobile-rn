import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { Button, ButtonText } from "#/components/ui/button";
import { useReactiveVar } from "@apollo/client";
import ChevronBackArrow from "#/components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow";
import {
  Emojimood,
  useRefreshDeviceManagerQuery,
  useUpdateStoryEmojimoodMutation,
} from "#/graphql/generated";
import { ThemeReactiveVar } from "#/reactive";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable } from "#/components/ui/pressable";

export type FormType = {
  emojimood: Emojimood;
};

export default () => {
  const [updatedEmojimoodSuccess, setUpdateEmojimoodSuccess] = useState(false);
  const rTheme = useReactiveVar(ThemeReactiveVar);

  const methods = useForm<FormType>({
    defaultValues: {
      emojimood: {
        id: "",
        emojiname: "",
        colors: ["#00000000"],
        emoji: "",
      },
    },
  });

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery({
    fetchPolicy: "cache-first",
    onCompleted(data) {
      if (
        data.refreshDeviceManager?.__typename ===
          "AuthorizationDeviceProfile" &&
        data.refreshDeviceManager.Profile?.tonightStory?.emojimood
      ) {
        methods.setValue("emojimood", {
          id: data.refreshDeviceManager.Profile?.tonightStory?.emojimood?.id,
          emojiname:
            data.refreshDeviceManager.Profile?.tonightStory?.emojimood
              ?.emojiname,
          colors:
            data.refreshDeviceManager.Profile?.tonightStory?.emojimood?.colors,
          emoji:
            data.refreshDeviceManager.Profile?.tonightStory?.emojimood.emoji,
        });
      }
    },
  });

  const [updateStoryEmojimoodMutation, { data, loading, error }] =
    useUpdateStoryEmojimoodMutation({
      onCompleted: (data) => {
        if (data.updateStoryEmojimood) {
          setUpdateEmojimoodSuccess(true);
          setTimeout(() => {
            setUpdateEmojimoodSuccess(false);
          }, 1500);
        } else {
          setUpdateEmojimoodSuccess(false);
        }
      },
      update: (cache, { data }) => {
        if (
          data?.updateStoryEmojimood?.__typename === "Story" &&
          rdmData?.refreshDeviceManager?.__typename ===
            "AuthorizationDeviceProfile" &&
          rdmData.refreshDeviceManager.Profile?.tonightStory
        ) {
          cache.modify({
            id: cache.identify(
              rdmData.refreshDeviceManager.Profile?.tonightStory,
            ),
            fields: {
              emojimood(existingEmojimood, { toReference }) {
                return {
                  ...data?.updateStoryEmojimood?.emojimood,
                };
              },
            },
          });
          setUpdateEmojimoodSuccess(true);
          setTimeout(() => {
            setUpdateEmojimoodSuccess(false);
          }, 1500);
        }
      },
    });

  return (
    <FormProvider {...methods}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          contentStyle: {
            backgroundColor: "transparent",
          },
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name={"devicemanager"}
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name={"asks"}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={"emojimood"}
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
            header: () => {
              return (
                <BlurView
                  tint={rTheme.colorScheme === "light" ? "light" : "dark"}
                  intensity={70}
                >
                  <HStack className="items-center justify-between py-3 pr-2">
                    <ChevronBackArrow />
                    <HStack space="md">
                      <Pressable
                        onPress={() => {
                          updateStoryEmojimoodMutation({
                            variables: {},
                          });
                          methods.reset();
                        }}
                      >
                        <Text className="text-lg font-bold">No mood</Text>
                      </Pressable>
                      {methods.watch("emojimood.id") ||
                      (rdmData?.refreshDeviceManager.__typename ===
                        "AuthorizationDeviceProfile" &&
                        rdmData.refreshDeviceManager.Profile?.tonightStory
                          ?.emojimood?.id) ? (
                        <Button
                          size="xs"
                          disabled={loading || updatedEmojimoodSuccess}
                          onPress={() => {
                            updateStoryEmojimoodMutation({
                              variables: {
                                emojimoodId: parseInt(
                                  methods.getValues("emojimood.id"),
                                ),
                              },
                            });
                          }}
                          className={` ${updatedEmojimoodSuccess ? "dark:bg-green-500" : loading ? "dark:bg-gray-500" : "dark:bg-blue-600"} ${updatedEmojimoodSuccess ? "bg-green-500" : loading ? "bg-gray-500" : "bg-blue-600"} rounded-full`}
                        >
                          <ButtonText className="text-sm font-bold">
                            {loading
                              ? "Updating"
                              : updatedEmojimoodSuccess
                                ? "Updated"
                                : "Update"}
                          </ButtonText>
                        </Button>
                      ) : null}
                    </HStack>
                  </HStack>
                </BlurView>
              );
            },
          }}
        />
      </Stack>
    </FormProvider>
  );
};

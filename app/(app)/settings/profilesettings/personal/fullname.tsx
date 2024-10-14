import { Text } from "#/src/components/ui/text";
import { Input, InputField } from "#/src/components/ui/input";
import { Heading } from "#/src/components/ui/heading";
import { Button } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import {
  AuthorizationDeviceProfile,
  Profile,
  useUpdateOneProfileMutation,
} from "#/graphql/generated";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";
import { useForm, Controller } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default () => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);

  const {
    control,
    setError,
    handleSubmit,
    reset,
    getValues,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: {
      fullname:
        rAuthorizationVar?.Profile?.IdentifiableInformation?.fullname || "",
      nickname:
        rAuthorizationVar?.Profile?.IdentifiableInformation?.nickname || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const [updateOneProfilMutation, { data, loading: UOPLoading, error }] =
    useUpdateOneProfileMutation({
      onError: (error) => {
        setError("fullname", error);
      },
      onCompleted: (data) => {
        if (data.updateOneProfile) {
          const profile = data.updateOneProfile as Profile;
          const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile;

          AuthorizationReactiveVar({
            ...deviceprofile,
            Profile: profile,
          });

          reset({
            fullname: String(
              data?.updateOneProfile?.IdentifiableInformation?.fullname,
            ),
            nickname: String(
              data?.updateOneProfile?.IdentifiableInformation?.nickname,
            ),
          });
        }
      },
    });

  const resetInput = (value: string) => {
    switch (value) {
      case "fullname":
        reset({
          fullname: String(
            rAuthorizationVar?.Profile?.IdentifiableInformation?.fullname,
          ),
        });
      case "nickname":
        reset({
          nickname: String(
            rAuthorizationVar?.Profile?.IdentifiableInformation?.nickname,
          ),
        });
      default:
        reset({
          fullname: String(
            rAuthorizationVar?.Profile?.IdentifiableInformation?.fullname,
          ),
        });
        reset({
          nickname: String(
            rAuthorizationVar?.Profile?.IdentifiableInformation?.nickname,
          ),
        });
    }
  };

  const onSubmit = () => {
    const data = getValues();
    if (dirtyFields.fullname && dirtyFields.nickname) {
      updateOneProfilMutation({
        variables: {
          where: {
            id: rAuthorizationVar?.Profile?.id,
          },
          data: {
            IdentifiableInformation: {
              update: {
                fullname: {
                  set: data.fullname,
                },
                nickname: {
                  set: data.nickname,
                },
              },
            },
          },
        },
      });
    }
    if (dirtyFields.fullname && !dirtyFields.nickname) {
      updateOneProfilMutation({
        variables: {
          where: {
            id: rAuthorizationVar?.Profile?.id,
          },
          data: {
            IdentifiableInformation: {
              update: {
                fullname: {
                  set: data.fullname,
                },
              },
            },
          },
        },
      });
    }
    if (dirtyFields.nickname && !dirtyFields.fullname) {
      updateOneProfilMutation({
        variables: {
          where: {
            id: rAuthorizationVar?.Profile?.id,
          },
          data: {
            IdentifiableInformation: {
              update: {
                nickname: {
                  set: data.nickname,
                },
              },
            },
          },
        },
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardDismissMode="none"
      keyboardShouldPersistTaps={"always"}
      extraScrollHeight={100}
    >
      <KeyboardAvoidingView
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          marginVertical: 2,
          marginHorizontal: 2,
        }}
      >
        <Controller
          name="fullname"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Box className="flex-column my-3 w-[100%] items-start bg-transparent">
              <Heading style={{ marginBottom: 10 }} className="text-lg">
                Full name
              </Heading>
              <Input
                variant={"rounded"}
                style={{
                  alignSelf: "center",
                  height: 55,
                  padding: 10,
                }}
                className="rounded-md"
              >
                <InputField
                  onBlur={onBlur}
                  keyboardAppearance={
                    rTheme.colorScheme === "light" ? "light" : "dark"
                  }
                  onChangeText={onChange}
                  value={value}
                  blurOnSubmit={false}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  textContentType="name"
                  autoFocus
                  placeholder="Full name "
                  returnKeyType="done"
                  autoCapitalize="none"
                  numberOfLines={1}
                  autoComplete="name"
                  keyboardType="default"
                />
                <Box className="mr-3">
                  {UOPLoading && dirtyFields.fullname ? (
                    <ActivityIndicator
                      size="small"
                      color={
                        rTheme.colorScheme === "light"
                          ? rTheme.theme?.gluestack.tokens.colors.light900
                          : rTheme.theme?.gluestack.tokens.colors.light100
                      }
                    />
                  ) : (
                    dirtyFields.fullname && (
                      <Pressable onPress={() => resetInput("fullname")}>
                        <Text className="font-bold">Reset</Text>
                      </Pressable>
                    )
                  )}
                </Box>
              </Input>
              <Text>{errors?.fullname?.message}</Text>
            </Box>
          )}
        />
        <Controller
          name="nickname"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Box className="flex-column my-3 w-[100%] items-start">
              <Heading style={{ marginBottom: 10 }} className="text-lg">
                Nick name
              </Heading>
              <Input
                variant={"rounded"}
                className="rounded-md"
                fontSize={"$md"}
                p={"$4"}
              >
                <InputField
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  blurOnSubmit={false}
                  keyboardAppearance={
                    rTheme.colorScheme === "light" ? "light" : "dark"
                  }
                  onSubmitEditing={handleSubmit(onSubmit)}
                  textContentType="nickname"
                  placeholder="Nickname"
                  returnKeyType="done"
                  autoCapitalize="none"
                  numberOfLines={1}
                  autoComplete="name"
                  keyboardType="default"
                />
                <Box className="mr-3">
                  {UOPLoading && dirtyFields.nickname ? (
                    <ActivityIndicator
                      size="small"
                      color={
                        rTheme.colorScheme === "light"
                          ? rTheme.theme?.gluestack.tokens.colors.light900
                          : rTheme.theme?.gluestack.tokens.colors.light100
                      }
                    />
                  ) : (
                    dirtyFields.nickname && (
                      <Pressable onPress={() => resetInput("nickname")}>
                        <Text className="font-[bold]">Reset</Text>
                      </Pressable>
                    )
                  )}
                </Box>
              </Input>
              <Text>{errors?.nickname?.message}</Text>
            </Box>
          )}
        />
        {(dirtyFields.fullname || dirtyFields.nickname) && (
          <Button
            disabled={UOPLoading}
            onPress={() => onSubmit()}
            style={{
              alignSelf: "center",
              width: "50%",
            }}
            size={"lg"}
            className="my-5 rounded-md bg-primary-500"
          >
            Update
          </Button>
        )}
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
};

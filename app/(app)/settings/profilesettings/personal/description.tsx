import { Text } from "#/src/components/ui/text";
import { Input, InputField } from "#/src/components/ui/input";
import { Button } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
//TODO FN(Update to change to detail information) mutation is broken here
import { useReactiveVar } from "@apollo/client";
import {
  AuthorizationDeviceProfile,
  Profile,
  useUpdateOneProfileMutation,
} from "#/graphql/generated";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DESCRIPTION_LENGTH = 250;

export default () => {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);

  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: {
      description:
        rAuthorizationVar?.Profile?.DetailInformation?.description || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const [updateOneProfileMutation, { data, loading: UOPLoading }] =
    useUpdateOneProfileMutation({
      onCompleted: (data) => {
        if (data.updateOneProfile) {
          const profile = data.updateOneProfile as Profile;
          const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile;

          AuthorizationReactiveVar({
            ...deviceprofile,
            Profile: profile,
          });
          reset({
            description: String(
              data?.updateOneProfile?.DetailInformation?.description,
            ),
          });
        } else {
          setError("description", { message: "Couldnt update profile" });
        }
      },
    });

  const resetInput = (value: string) => {
    switch (value) {
      case "description":
        reset({
          description: String(
            rAuthorizationVar?.Profile?.DetailInformation?.description,
          ),
        });
      default:
        reset({
          description: String(
            rAuthorizationVar?.Profile?.DetailInformation?.description,
          ),
        });
    }
  };

  const onSubmit = (data) => {
    if (dirtyFields.description) {
      updateOneProfileMutation({
        variables: {
          where: {
            id: rAuthorizationVar?.Profile?.id,
          },
          data: {
            DetailInformation: {
              update: {
                description: {
                  set: data.description,
                },
              },
            },
          },
        },
      });
    }
  };

  return (
    // <KeyboardAvoidingView flexDir={'column'} justifyContent={'space-between'} alignItems={'center'}>
    // </KeyboardAvoidingView>
    <KeyboardAwareScrollView
      keyboardDismissMode="none"
      keyboardShouldPersistTaps={"always"}
      extraScrollHeight={0}
      style={{ width: "95%", alignSelf: "center" }}
    >
      <Controller
        name="description"
        control={control}
        rules={{
          required: true,
          validate: {
            maxLength: (value) =>
              value.length <= DESCRIPTION_LENGTH ||
              "Description must be less than 200 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View
              style={{
                marginVertical: 2,
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Input key={"description"} variant={"underlined"}>
                <InputField
                  multiline={true}
                  maxLength={DESCRIPTION_LENGTH}
                  keyboardAppearance={
                    rTheme.colorScheme === "light" ? "light" : "dark"
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  blurOnSubmit={true}
                  value={value}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  autoFocus
                  placeholder="Description text"
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="default"
                />
              </Input>
              <Text>{errors?.description?.message}</Text>
              <Box className="w-[100%] flex-row items-center justify-between">
                <Text className="mx-3 self-center">
                  {value.length} / {DESCRIPTION_LENGTH}
                </Text>
                {(dirtyFields.description || !!errors.description) && (
                  <Button
                    disabled={UOPLoading}
                    onPress={handleSubmit(onSubmit)}
                    style={{
                      alignSelf: "center",
                      width: "50%",
                    }}
                    size={"lg"}
                    className="my-5 rounded-md"
                  >
                    {UOPLoading ? (
                      <Text>Updating...</Text>
                    ) : (
                      <Text>Update</Text>
                    )}
                  </Button>
                )}
              </Box>
            </View>
          );
        }}
      />
    </KeyboardAwareScrollView>
  );
};

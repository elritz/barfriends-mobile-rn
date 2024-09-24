import { Text } from "#/src/components/ui/text";
import { Input } from "#/src/components/ui/input";
import { Button } from "#/src/components/ui/button";
import { useReactiveVar } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import {
  AuthorizationDeviceProfile,
  Profile,
  useCheckUsernameLazyQuery,
  useUpdateOneProfileMutation,
} from "#/graphql/generated";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";
import { useForm, Controller, ValidateResult } from "react-hook-form";
import { ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default () => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);

  const {
    control,
    setError,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: {
      username:
        rAuthorizationVar?.Profile?.IdentifiableInformation?.username || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const values = watch();

  const [checkUsername, { data: CUData, loading: CULoading, error: CUError }] =
    useCheckUsernameLazyQuery({
      fetchPolicy: "no-cache",
      variables: {
        username: values.username,
      },
      onCompleted(data) {
        if (!data.checkUsername) {
          setError("username", {
            type: "validate",
            message: "Username has been taken",
          });
        } else {
          clearErrors();
        }
      },
    });

  const [
    updateOneProfilMutation,
    { data: UOPData, loading: UOPLoading, error: UOPError },
  ] = useUpdateOneProfileMutation({
    onError: (error) => {
      setError("username", error);
    },
    onCompleted: (data) => {
      const profile = data.updateOneProfile as Profile;
      const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile;

      AuthorizationReactiveVar({
        ...deviceprofile,
        Profile: profile,
      });
      reset();
    },
  });

  const onSubmit = (data) => {
    if (dirtyFields.username) {
      updateOneProfilMutation({
        variables: {
          where: {
            id: rAuthorizationVar?.Profile?.id,
          },
          data: {
            IdentifiableInformation: {
              update: {
                username: {
                  set: data.username,
                },
              },
            },
          },
        },
      });
    }
  };

  const resetInput = (value: string) => {
    reset({
      username: rAuthorizationVar?.Profile?.IdentifiableInformation?.username,
    });
  };

  const validateCheckUsername = async (
    value: string,
  ): Promise<ValidateResult> => {
    setTimeout(() => {
      checkUsername();
    }, 500);
    if (!CULoading && CUData?.checkUsername) {
      return true;
    } else {
      setError("username", {
        type: "validate",
        message: "Username has been taken",
      });
      return false;
    }
  };

  const InputRightIcon = () => {
    return CULoading ? (
      <ActivityIndicator
        style={{ marginRight: 4 }}
        size="small"
        color={
          rTheme.colorScheme === "light"
            ? rTheme.theme?.gluestack.tokens.colors.light900
            : rTheme.theme?.gluestack.tokens.colors.light100
        }
      />
    ) : (
      <Ionicons
        name="checkmark-circle"
        size={30}
        color={
          errors.username || !CUData?.checkUsername
            ? "$error600"
            : "$success700"
        }
        mr={"$2"}
      />
    );
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
          justifyContent: "space-between",
          alignItems: "center",
          margin: 2,
        }}
      >
        <Controller
          name="username"
          control={control}
          rules={{
            required: true,
            validate: {
              greaterThanZero: (value) =>
                value.length > 0 || "Must have password",
              greaterQualThanFour: (value) => value.length >= 1 || "",
              noSpaces: (value) =>
                /^[\S]+$/.test(value) || "No spaces are allowed",
              validateCheckUsername: async (value) =>
                (await validateCheckUsername(value)) || "",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant={"rounded"}>
              <Input
                key="username"
                value={value}
                keyboardAppearance={
                  rTheme.colorScheme === "light" ? "light" : "dark"
                }
                onChangeText={(value) => onChange(value)}
                onSubmitEditing={handleSubmit(onSubmit)}
                onBlur={onBlur}
                autoCapitalize="none"
                numberOfLines={1}
                textContentType="username"
                blurOnSubmit={false}
                autoFocus
                placeholder="Username"
                returnKeyType="done"
                autoCorrect={false}
                InputRightElement={<InputRightIcon />}
                className="text-md p-4"
              />
            </Input>
          )}
        />
      </KeyboardAvoidingView>
      {dirtyFields.username && (
        <Button
          disabled={UOPLoading}
          onPress={handleSubmit(onSubmit)}
          style={{
            alignSelf: "center",
            width: "50%",
          }}
          size={"lg"}
          className="rounded-md"
        >
          <Text>Update</Text>
        </Button>
      )}
    </KeyboardAwareScrollView>
  );
};

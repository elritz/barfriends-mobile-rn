import { Input, InputField } from "#/src/components/ui/input";
import { Box } from "#/src/components/ui/box";
import { VStack } from "#/src/components/ui/vstack";
import { Pressable } from "#/src/components/ui/pressable";
import { Text } from "#/src/components/ui/text";
import { Heading } from "#/src/components/ui/heading";
import { useReactiveVar } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import { useSendAuthenticatorDeviceOwnerCodeMutation } from "#/graphql/generated";
import { useIsFocused } from "@react-navigation/native";
import {
  CredentialPersonalProfileReactiveVar,
  ThemeReactiveVar,
} from "#/reactive";
import { useRouter } from "expo-router";
import { CountryCode } from "libphonenumber-js";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  TextInput,
  InteractionManager,
  InputAccessoryView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type FormType = {
  countrySelector: CountrySelector;
  mobileNumber: {
    number: string;
    completeNumber: string;
  };
};

export type CountrySelector = {
  countryCode: CountryCode;
  countryCallingCode: string;
};

export default () => {
  const INPUT_ACCESSORY_VIEW_ID = "p-1298187263";
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const _phonenumberRef = useRef<TextInput>();
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  );
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const { height: platform } = useReanimatedKeyboardAnimation();
  const INPUT_CONTAINER_HEIGHT = 90;

  const height = useDerivedValue(() => platform.value, [isFocused]);

  const textInputContainerStyle = useAnimatedStyle(
    () => ({
      width: "100%",
      position: "absolute",
      bottom: 0,
      paddingBottom: bottom,
      height: INPUT_CONTAINER_HEIGHT,
      transform: [{ translateY: height.value }],
    }),
    [],
  );

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      mobileNumber: {
        number: "",
        completeNumber: "",
      },
      countrySelector: {
        countryCallingCode: "+1",
        countryCode: "CA",
      },
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const [sendCode, { data, loading, error }] =
    useSendAuthenticatorDeviceOwnerCodeMutation({
      onCompleted: async (data) => {
        switch (data.sendAuthenticatorDeviceOwnerCode?.__typename) {
          case "Error":
            setError("mobileNumber.number", {
              type: "validate",
              message: "Unable to send phone number",
            });
            break;
          case "Code":
            router.push({
              pathname:
                "/(credential)/personalcredentialstack/confirmationcode",
              params: {
                code: String(data.sendAuthenticatorDeviceOwnerCode.code),
              },
            });
            break;
        }
      },
    });

  const onSubmit = (data) => {
    CredentialPersonalProfileReactiveVar({
      ...credentialPersonalProfileVar,
      email: "",
      phone: {
        ...credentialPersonalProfileVar.phone,
        number: data.mobileNumber.number,
        completeNumber: data.mobileNumber.number,
      },
    });
    sendCode({
      variables: {
        where: {
          Authenticators: {
            PhoneInput: {
              number: data.mobileNumber.number,
              completeNumber: data.mobileNumber.number,
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    setValue("countrySelector", {
      countryCode: "CA",
      countryCallingCode: "+1",
    });
  }, []);

  useEffect(() => {
    if (isFocused && _phonenumberRef.current) {
      InteractionManager.runAfterInteractions(() => {
        _phonenumberRef.current?.focus();
      });
    }
    if (!isFocused) {
      InteractionManager.runAfterInteractions(() => {
        _phonenumberRef.current?.blur();
      });
    }
  }, [isFocused]);

  const InnerContent = () => {
    return (
      <VStack
        className={` ${isFocused ? "flex" : "hidden"} h-[90px] flex-row content-around items-center justify-end bg-white px-2 dark:bg-black`}
      >
        <VStack className="flex-column flex flex-1 justify-around px-2">
          <Text>
            By continuing you may receive an SMS for verification. Message and
            data rates may apply.
          </Text>
        </VStack>
        <Pressable
          disabled={!!errors.mobileNumber?.completeNumber || loading}
          onPress={handleSubmit(onSubmit)}
        >
          <Box className="h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-500">
            <Feather
              name="arrow-right"
              size={32}
              color={errors?.mobileNumber?.completeNumber ? "#292524" : "white"}
            />
          </Box>
        </Pressable>
      </VStack>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        height: "auto",
        flexDirection: "column",
        marginHorizontal: "5%",
      }}
    >
      <Reanimated.View style={{ flex: 1 }}>
        <VStack className="h-[110px]">
          <Heading className="mt-4 text-3xl font-black">
            Enter your mobile number
          </Heading>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/(credential)/personalcredentialstack/email",
              });
            }}
            className="h-auto w-[100px] pb-3"
          >
            <Text className="text-md font-bold text-primary-500">
              Use email
            </Text>
          </Pressable>
        </VStack>
        <View style={{ width: "100%" }}>
          <Controller
            name="mobileNumber.completeNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                variant={"underlined"}
                size="lg"
                py={"$2"}
                sx={{
                  h: 50,
                }}
              >
                <InputField
                  keyboardAppearance={
                    rTheme.colorScheme === "light" ? "light" : "dark"
                  }
                  value={value}
                  type="text"
                  autoFocus
                  key={"mobileNumber.completeNumber"}
                  inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                  textContentType="telephoneNumber"
                  autoComplete="tel"
                  keyboardType="phone-pad"
                  placeholder="Mobile Number"
                  returnKeyType={Platform.OS === "ios" ? "done" : "none"}
                  numberOfLines={1}
                  blurOnSubmit={false}
                  enablesReturnKeyAutomatically={false}
                  // onSubmitEditing={handleSubmit(onSubmit)}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    const replaced = value.replace(/\D/g, "");
                    setValue("mobileNumber.number", replaced);
                  }}
                />
              </Input>
            )}
            rules={{
              required: {
                value: true,
                message: "️A mobile number is required to continue.",
              },
            }}
          />
          <Text className="text-sm text-error-700">
            {errors?.mobileNumber?.completeNumber?.message}
          </Text>
        </View>
      </Reanimated.View>
      {Platform.OS === "ios" ? (
        <InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
          <InnerContent />
        </InputAccessoryView>
      ) : (
        <Reanimated.View
          style={[
            {
              height: INPUT_CONTAINER_HEIGHT,
            },
            textInputContainerStyle,
          ]}
        >
          <InnerContent />
        </Reanimated.View>
      )}
    </KeyboardAvoidingView>
  );
};

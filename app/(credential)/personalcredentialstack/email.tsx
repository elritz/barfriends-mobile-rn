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
import useContentInsets from "#/src/util/hooks/useContentInsets";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  InputAccessoryView,
  Platform,
  View,
  TextInput,
  InteractionManager,
  KeyboardAvoidingView,
} from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const INPUT_ACCESSORY_VIEW_ID = "e-129818723433";
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const contentInsets = useContentInsets();
  const _emailRef = useRef<TextInput>();
  const isFocused = useIsFocused();
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  );
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
    formState: { errors },
    setError,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const [sendCode, { data, loading, error }] =
    useSendAuthenticatorDeviceOwnerCodeMutation({
      onCompleted: (data) => {
        switch (data.sendAuthenticatorDeviceOwnerCode?.__typename) {
          case "Error":
            setError("email", {
              type: "validate",
              message: "Unable to send phone number",
            });
            break;
          case "Code":
            router.push({
              pathname:
                "/(credential)/personalcredentialstack/confirmationcode",
              params: {
                code: data.sendAuthenticatorDeviceOwnerCode.code,
              },
            });
            break;
        }
      },
    });

  const onSubmit = (data: any) => {
    CredentialPersonalProfileReactiveVar({
      ...credentialPersonalProfileVar,
      phone: {
        completeNumber: "",
        countryCallingCode: "",
        countryCode: "",
        number: "",
      },
      email: data.email,
    });
    sendCode({
      variables: {
        where: {
          Authenticators: {
            EmailInput: {
              email: data.email,
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    if (isFocused && _emailRef.current) {
      InteractionManager.runAfterInteractions(() => {
        _emailRef.current?.focus();
      });
    }
    if (!isFocused) {
      InteractionManager.runAfterInteractions(() => {
        _emailRef.current?.blur();
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
            By continuing you may receive an Email for verification. Confirm in
            the next step.
          </Text>
        </VStack>
        <Pressable
          disabled={!!errors.email || loading}
          onPress={handleSubmit(onSubmit)}
        >
          <Box className="h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-500">
            <Feather
              name="arrow-right"
              size={32}
              color={errors.email ? "#292524" : "white"}
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
            Enter your email
          </Heading>
          <Pressable
            onPress={() => {
              router.back();
            }}
            className="h-auto w-[100px] pb-3"
          >
            <Text className="text-md font-bold text-primary-500">
              Use phone
            </Text>
          </Pressable>
        </VStack>
        <View style={{ width: "100%" }}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input variant={"underlined"} size="lg">
                <InputField
                  keyboardAppearance={
                    rTheme.colorScheme === "light" ? "light" : "dark"
                  }
                  placeholderTextColor={
                    rTheme.colorScheme === "light"
                      ? rTheme.theme?.gluestack.tokens.colors.light700
                      : rTheme.theme?.gluestack.tokens.colors.light100
                  }
                  inputMode="email"
                  type="text"
                  textContentType="emailAddress"
                  autoFocus
                  key={"email"}
                  inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                  placeholder="Email"
                  returnKeyType={Platform.OS === "ios" ? "done" : "none"}
                  numberOfLines={1}
                  blurOnSubmit={false}
                  enablesReturnKeyAutomatically={false}
                  // onSubmitEditing={handleSubmit(onSubmit)}
                  onBlur={onBlur}
                  autoComplete="email"
                  importantForAutofill="auto"
                  autoCorrect={true}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onSubmitEditing={handleSubmit(onSubmit)}
                  value={value.toLowerCase()}
                  onChangeText={onChange}
                  className="h-[50px] text-2xl"
                />
              </Input>
            )}
            rules={{
              required: {
                value: true,
                message: "Your email is required to continue.",
              },
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            }}
          />
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

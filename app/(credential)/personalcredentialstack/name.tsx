import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Pressable } from "#/src/components/ui/pressable";
import { Input, InputField } from "#/src/components/ui/input";
import { Heading } from "#/src/components/ui/heading";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import {
  CredentialPersonalProfileReactiveVar,
  ThemeReactiveVar,
} from "#/reactive";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const INPUT_ACCESSORY_VIEW_ID = "n-1298187263";
  const router = useRouter();
  const isFocused = useIsFocused();
  const { bottom } = useSafeAreaInsets();
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  );
  const _firstnameRef = useRef<TextInput | null>(null);
  const _lastnameRef = useRef<TextInput | null>(null);

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
    getValues,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstname: "",
      lastname: "",
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const onSubmit = (data: { firstname: string; lastname: string }) => {
    if (!data.firstname) {
      setError("firstname", {
        message: "You need to enter a first name",
      });
    }
    if (!data.lastname) {
      setError("firstname", {
        message: "You need to enter a last name",
      });
    }
    CredentialPersonalProfileReactiveVar({
      ...credentialPersonalProfileVar,
      firstname: data.firstname,
      lastname: data.lastname,
    });
    router.push({
      pathname: "/(credential)/personalcredentialstack/username",
    });
  };

  const InnerContent = () => {
    return (
      <Box className="h-[90px] flex-row items-center justify-end bg-white px-2 dark:bg-black">
        <Pressable onPress={handleSubmit(onSubmit)}>
          <Box className="h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-500">
            <Feather
              name="arrow-right"
              size={32}
              color={errors?.firstname || errors.lastname ? "#292524" : "white"}
            />
          </Box>
        </Pressable>
      </Box>
    );
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="none"
      style={{
        flex: 1,
        height: "auto",
        flexDirection: "column",
        marginHorizontal: "5%",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Box className="flex-1 bg-transparent">
          <Reanimated.View style={{ flex: 1 }}>
            <Heading className="mt-4 text-3xl font-black">
              Enter your name
            </Heading>
            <VStack space={"md"} style={{ marginVertical: "10%" }}>
              <Controller
                name="firstname"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <VStack space="xs">
                    <Input key={"name"} variant={"underlined"} size={"lg"}>
                      <InputField
                        ref={_firstnameRef}
                        keyboardAppearance={
                          rTheme.colorScheme === "light" ? "light" : "dark"
                        }
                        key={"name"}
                        returnKeyType="next"
                        textContentType="givenName"
                        autoComplete={"name-given"}
                        inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                        autoCapitalize={"none"}
                        keyboardType="default"
                        numberOfLines={1}
                        autoFocus
                        placeholder="First name"
                        onSubmitEditing={() => _lastnameRef?.current?.focus()}
                        placeholderTextColor={
                          rTheme.colorScheme === "light"
                            ? rTheme.theme?.gluestack.tokens.colors.light700
                            : rTheme.theme?.gluestack.tokens.colors.light100
                        }
                        onBlur={onBlur}
                        blurOnSubmit={false}
                        onChangeText={onChange}
                        value={value.toLowerCase()}
                        className="text-2xl"
                      />
                    </Input>
                    <Text className="leading-xs text-sm font-bold">
                      First name
                    </Text>
                  </VStack>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Your lastname is required to continue.",
                  },
                }}
              />
              <Text className="text-sm text-error-700">
                {errors?.firstname?.message}
              </Text>

              <Controller
                name="lastname"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <VStack space="xs">
                    <Input key={"lname"} variant={"underlined"} size={"lg"}>
                      <InputField
                        ref={_lastnameRef}
                        keyboardAppearance={
                          rTheme.colorScheme === "light" ? "light" : "dark"
                        }
                        key={"lastname"}
                        returnKeyType="done"
                        textContentType="familyName"
                        autoComplete={"name-family"}
                        autoCapitalize={"none"}
                        keyboardType="default"
                        placeholderTextColor={
                          rTheme.colorScheme === "light"
                            ? rTheme.theme?.gluestack.tokens.colors.light700
                            : rTheme.theme?.gluestack.tokens.colors.light100
                        }
                        numberOfLines={1}
                        placeholder="Last name"
                        inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
                        onBlur={onBlur}
                        onSubmitEditing={handleSubmit(onSubmit)}
                        blurOnSubmit={false}
                        onChangeText={onChange}
                        value={value.toLowerCase()}
                        className="text-2xl"
                      />
                    </Input>
                    <Text className="leading-xs text-sm font-bold">
                      Last name
                    </Text>
                  </VStack>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Your first name is required to continue.",
                  },
                }}
              />
              <Text>{errors?.firstname?.message}</Text>
            </VStack>
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
        </Box>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Spinner } from "#/src/components/ui/spinner";
import { Pressable } from "#/src/components/ui/pressable";
import { Heading } from "#/src/components/ui/heading";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import CompanyCoasterLogoDynamic from "#/assets/images/company/CompanyCoasterLogoDynamic";
import { Feather } from "@expo/vector-icons";
import {
  AuthorizationDeviceProfile,
  useCreatePersonalProfileMutation,
  useSwitchDeviceProfileMutation,
} from "#/graphql/generated";
import {
  AuthorizationReactiveVar,
  CredentialPersonalProfileReactiveVar,
} from "#/reactive";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  const router = useRouter();
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  );

  const [createProfilePersonalMutation, { loading: CPPLoading }] =
    useCreatePersonalProfileMutation({
      variables: {
        data: {
          PrivacyPolicyId: String(credentialPersonalProfileVar.PrivacyId),
          ServicesId: String(credentialPersonalProfileVar.ServiceId),
          birthday: credentialPersonalProfileVar.birthday,
          password: String(credentialPersonalProfileVar.password),
          username: String(credentialPersonalProfileVar.username),
          fullname: `${credentialPersonalProfileVar.firstname} ${credentialPersonalProfileVar.lastname}`,
          address: "",
          EmailInput: {
            email: credentialPersonalProfileVar.email,
          },
          PhoneInput: {
            ...credentialPersonalProfileVar.phone,
          },
        },
      },
      onError: (error) => {},
      onCompleted: async (data) => {
        if (
          data.createPersonalProfile?.__typename ===
          "AuthorizationDeviceProfile"
        ) {
          const deviceManager =
            data.createPersonalProfile as AuthorizationDeviceProfile;
          AuthorizationReactiveVar(deviceManager);
          router.push({
            pathname: "/(app)/hometab/venuefeed",
          });
        }
      },
    });

  const [
    switchDeviceProfileMutation,
    { data: SDPData, loading: SDPLoading, error: SDPError },
  ] = useSwitchDeviceProfileMutation({
    onError: (error) => {},
    onCompleted: (data) => {
      if (
        data.switchDeviceProfile.__typename === "AuthorizationDeviceProfile"
      ) {
        const deviceManager =
          data.switchDeviceProfile as AuthorizationDeviceProfile;
        AuthorizationReactiveVar(deviceManager);
        router.push({
          pathname: "/(app)/hometab/venuefeed",
        });
      }
    },
  });

  const onSubmit = async () => {
    createProfilePersonalMutation();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack className="mx-4 flex-1 items-center justify-between">
        <Box className="bg-transparent" />
        <VStack space={"md"} className="items-center justify-center">
          <CompanyCoasterLogoDynamic backgroundColor="black" />
          <Heading className="leading-3xl text-4xl font-black">
            Time to Barfriends
          </Heading>
          <Box className="bg-transparent">
            <Text className="text-center text-lg">
              We are those we hang around.
            </Text>
            <Text className="mt-3 text-center text-lg">
              If you're not feeling it find and make new experiences. We help do
              that.
            </Text>
          </Box>
        </VStack>

        <Pressable
          disabled={CPPLoading || SDPLoading}
          onPress={() => onSubmit()}
        >
          <Box className="h-[60px] w-[60px] items-center justify-center rounded-full bg-primary-500">
            {CPPLoading || SDPLoading ? (
              <Spinner size="small" className="text-black" />
            ) : (
              <Feather name="arrow-right" size={32} color={"white"} />
            )}
          </Box>
        </Pressable>
      </VStack>
    </SafeAreaView>
  );
};

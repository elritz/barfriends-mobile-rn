import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Pressable } from "#/src/components/ui/pressable";
import { Heading } from "#/src/components/ui/heading";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import CompanyCoasterLogoDynamic from "#/assets/images/company/CompanyCoasterLogoDynamic";
import { Feather } from "@expo/vector-icons";
import { usePrivacyTermsDocumentsQuery } from "#/graphql/generated";
import { CredentialPersonalProfileReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  );
  const router = useRouter();

  const {
    data: PTSData,
    loading: PTSLoading,
    error: PTSError,
  } = usePrivacyTermsDocumentsQuery();

  const _press = () => {
    CredentialPersonalProfileReactiveVar({
      ...credentialPersonalProfileVar,
      ServiceId: PTSData?.privacyTermsDocuments.termsofservice.id,
      PrivacyId: PTSData?.privacyTermsDocuments.privacy.id,
    });
    router.push({
      pathname: "/(credential)/personalcredentialstack/phone",
    });
  };
  const _pressTermsServices = (tab) => {
    switch (tab) {
      case "terms":
        router.push({
          pathname: "/(information)/latestprivacyservicetoptab",
        });
    }
  };

  return (
    <SafeAreaView>
      <VStack className="mx-4 h-full items-center justify-between">
        <Box />
        <Box className="justify-center bg-transparent">
          <CompanyCoasterLogoDynamic backgroundColor="black" />
          <Heading
            testID={"title-text"}
            className="leading-3xl mt-4 text-4xl font-black"
          >
            Let's get people going out tonight!
          </Heading>
          <Pressable
            disabled={PTSLoading}
            onPress={() => _pressTermsServices("terms")}
          >
            <Text className="text-lg">
              By continuing, you agree to the
              <Text className="text-lg font-bold text-primary-500">
                {" "}
                Term of the Services
              </Text>
              <Text className="text-lg"> and</Text>
              <Text className="text-lg font-bold text-primary-500">
                {" "}
                Privacy Policies.
              </Text>
            </Text>
          </Pressable>
        </Box>
        <>
          <Pressable disabled={PTSLoading} onPress={_press}>
            <Box className="h-[60px] w-[60px] items-center justify-center rounded-full bg-primary-500">
              <Feather name="arrow-right" size={32} color={"white"} />
            </Box>
          </Pressable>
        </>
      </VStack>
    </SafeAreaView>
  );
};
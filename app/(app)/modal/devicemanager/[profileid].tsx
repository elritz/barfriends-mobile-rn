import { Text } from "#/src/components/ui/text";
import { Heading } from "#/src/components/ui/heading";
import { VStack } from "#/src/components/ui/vstack";
import { Pressable } from "#/src/components/ui/pressable";
import { Box } from "#/src/components/ui/box";
import {
  AuthorizationDeviceProfile,
  useRemoveDeviceProfileFromDeviceManagerMutation,
  useSwitchDeviceProfileMutation,
} from "#/graphql/generated";
import { AuthorizationReactiveVar } from "#/reactive";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";

export default () => {
  const router = useRouter();
  const params = useGlobalSearchParams();

  const [
    switchDeviceProfileMutation,
    { data: SWDPData, loading: SWDPLoading, error: SWDPError },
  ] = useSwitchDeviceProfileMutation({
    onCompleted: (data) => {
      if (
        data?.switchDeviceProfile?.__typename === "AuthorizationDeviceProfile"
      ) {
        const deviceManager =
          data.switchDeviceProfile as AuthorizationDeviceProfile;
        AuthorizationReactiveVar(deviceManager);
        setTimeout(
          () =>
            router.push({
              pathname: "/(app)/hometab/venuefeed",
            }),
          1000,
        );
      }
    },
  });

  const [
    removeDeviceProfileMutation,
    { data: RDPMData, loading: RDPMLoading, error: RDPMError },
  ] = useRemoveDeviceProfileFromDeviceManagerMutation({
    variables: {
      profileId: String(params.profileid),
    },
    onCompleted: (data) => {
      switchDeviceProfileMutation();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const actions = [
    {
      title: "Remove from device",
      onPress: () => {
        removeDeviceProfileMutation();
      },
    },
    {
      title: "Settings",
      onPress: () => {
        console.log("Navigate to the settings page");
      },
    },
    {
      title: "Logout",
      onPress: () => {
        switchDeviceProfileMutation();
      },
    },
  ];

  const RoundedListItem = ({ children, ...props }) => (
    <Pressable onPress={props.onPress}>
      <Box className="flex-column h-[50px] items-start px-2 py-3">
        {children}
      </Box>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <Heading className="h-[30px] px-2">Account Actions</Heading>
      <ScrollView
        style={{
          marginVertical: 4,
        }}
      >
        <VStack space="md" className="mt-4">
          {actions.map((item, index) => {
            return (
              <RoundedListItem key={index} onPress={item.onPress}>
                <Text className="text-lg font-bold text-primary-500">
                  {item.title}
                </Text>
              </RoundedListItem>
            );
          })}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

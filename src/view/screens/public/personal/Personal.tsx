import { VStack } from "#/src/components/ui/vstack";
import { HStack } from "#/src/components/ui/hstack";
import Actions from "./actions/Actions";
import CurrentVenue from "#/src/view/screens/public/personal/currentvenue/CurrentVenue";
import Relationships from "#/src/view/screens/public/personal/relationship/Relationships";
import { Profile, useProfileQuery } from "#/graphql/generated";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";

const PersonalScreen = (props: any) => {
  const route = useRoute();

  const {
    data: PQData,
    loading: PQLoading,
    error: PQError,
  } = useProfileQuery({
    skip: !(route.params as { username?: string })?.username,
    variables: {
      where: {
        IdentifiableInformation: {
          username: {
            equals: String((route.params as { username?: string })?.username),
          },
        },
      },
    },
    onCompleted: (data) => {},
  });

  if (PQLoading && !PQData?.profile) return null;

  return (
    <ScrollView
      style={{
        paddingTop: 4,
        marginHorizontal: 3,
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      {/* <Photos story={PQData?.profile?.tonightStory} photo={PQData?.profile?.photos[0]} /> */}
      {/* <ProfilePhoto /> */}
      <VStack space={"md"}>
        <Actions profile={PQData?.profile as Profile} />
        <HStack space={"md"} className="h-[200px]">
          {PQData?.profile?.Personal?.LiveOutPersonal?.Out.length ? (
            <CurrentVenue />
          ) : null}
          <Relationships />
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default PersonalScreen;

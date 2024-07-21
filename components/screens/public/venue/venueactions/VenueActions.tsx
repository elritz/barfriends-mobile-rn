import { VStack } from "#/components/ui/vstack";
import { HStack } from "#/components/ui/hstack";
import { Box } from "#/components/ui/box";
// TODO: UX() Item need to be updated for messageboard route
// TODO: UX() Item need to be updated for Personal data, loading, error
import ActionCard from "./ActionCard";
import DistanceCard from "./actioncards/distancecard/DistanceCard";
import InviteCard from "./actioncards/invitecard/InviteCard";
import QuickBarfriend from "./actioncards/quickbarfriendcard/QuickBarfriendCard";
import UberCard from "./actioncards/ubercard/UberCard";
import DevActions from "./devactions/DevActions";
import { useReactiveVar } from "@apollo/client";
import { AuthorizationReactiveVar } from "#/reactive";
import { useLocalSearchParams } from "expo-router";
import { uniqueId } from "lodash";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

const VenueActions = () => {
  const numColumns = 2;
  const { width } = useWindowDimensions();
  const itemPadding = width / numColumns - 65;

  const params = useLocalSearchParams();
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const out = rAuthorizationVar?.Profile?.Personal?.LiveOutPersonal?.Out.find(
      (item) => item.venueProfileId === String(params.venueProfileId),
    );
    if (out) {
      setIsJoined(true);
    }
  }, [rAuthorizationVar]);

  return (
    <VStack className="mt-1 flex-1">
      <HStack
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {process.env.EXPO_PUBLIC_NODE_ENV === "development" && (
          <Box className="mx-2 mt-4 w-[100%] bg-transparent">
            <ActionCard key={uniqueId()} numColumns={1}>
              <DevActions />
            </ActionCard>
          </Box>
        )}

        {!isJoined && (
          <HStack space={"md"} className="mt-5 w-[100%] px-2">
            <ActionCard h={250} key={uniqueId()} numColumns={numColumns}>
              <UberCard />
            </ActionCard>
            <ActionCard h={250} key={uniqueId()} numColumns={numColumns}>
              <DistanceCard />
            </ActionCard>
          </HStack>
        )}

        {rAuthorizationVar?.Profile?.ProfileType !== "GUEST" && (
          <HStack space={"md"} className="mt-5 w-[100%] px-2">
            <ActionCard h={200} key={uniqueId()} numColumns={numColumns}>
              <QuickBarfriend qrcodesize={itemPadding || 100} />
            </ActionCard>
            <ActionCard h={200} key={uniqueId()} numColumns={numColumns}>
              <InviteCard />
            </ActionCard>
          </HStack>
        )}
      </HStack>
    </VStack>
  );
};

export default VenueActions;

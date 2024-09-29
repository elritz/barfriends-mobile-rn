import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { HStack } from "#/src/components/ui/hstack";
import { Button } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
import Details from "../details/Details";
import { useReactiveVar } from "@apollo/client";
import SignupModal from "#/src/components/molecules/modals/signupaskmodal";
import { Ionicons } from "@expo/vector-icons";
import { Profile } from "#/graphql/generated";
import { AuthorizationReactiveVar, ThemeReactiveVar } from "#/reactive";
import { useDisclose } from "#/src/util/hooks/useDisclose";
import { useRouter } from "expo-router";
import { useState } from "react";

type Props = {
  profile: Partial<Profile> | undefined | null;
};

export default function Actions({ profile }: Props) {
  const router = useRouter();
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);
  const [showMore, setShowMore] = useState(false);
  const {
    isOpen: isOpenSignupModal,
    onOpen: onOpenSignupModal,
    onClose: onCloseSignupModal,
  } = useDisclose();

  const isGuest = rAuthorizationVar?.Profile?.ProfileType === "GUEST";

  // const {
  // 	data: GRFRSData,
  // 	loading: GRFRSLoading,
  // 	error: GRFRSError,
  // } = useGetRelationshipFriendRequestStatusQuery({
  // 	skip: !profile.id,
  // 	fetchPolicy: 'network-only',
  // 	variables: {
  // 		profileId: String(profile.id),
  // 	},
  // })

  // if (GRFRSLoading || !GRFRSData) return null

  return (
    <VStack space={"md"} className="flex-1 rounded-xl px-2 py-3">
      <HStack className="items-start">
        {/* <RelationshipModal isOpen={isOpenRelationshipModal} onClose={onCloseRelaationshipModal} /> */}
        <SignupModal isOpen={isOpenSignupModal} onClose={onCloseSignupModal} />

        <Details profile={profile} />
        <Button
          onPress={() => {
            isGuest
              ? onOpenSignupModal()
              : router.push({
                  pathname: "/(app)/conversation",
                  params: {
                    roomid: "",
                  },
                });
          }}
          className="rounded-md"
        >
          <Ionicons
            name="chatbubble-ellipses"
            size={28}
            color={
              rTheme.colorScheme === "light"
                ? rTheme.theme?.gluestack.tokens.colors.light900
                : rTheme.theme?.gluestack.tokens.colors.light100
            }
            style={{
              zIndex: 100,
              justifyContent: "center",
              alignSelf: "center",
            }}
          />
        </Button>
      </HStack>
      <Box className="flex-1 bg-transparent">
        {profile?.DetailInformation?.description?.length ? (
          <Box className="bg-transparent">
            {!showMore ? (
              <Text numberOfLines={2} className="text-lg">
                {profile.DetailInformation?.description}
              </Text>
            ) : (
              <Text className="text-lg">
                {profile.DetailInformation?.description}
              </Text>
            )}
            <Button
              onPress={() => setShowMore(!showMore)}
              variant={"link"}
              className="my-2"
            >
              <Text>{showMore ? "Show Less" : "Show More"}</Text>
            </Button>
          </Box>
        ) : (
          <Box className="my-2">
            <Text className="h-auto text-lg">No description available</Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
}

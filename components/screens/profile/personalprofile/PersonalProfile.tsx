import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Box } from "#/components/ui/box";
import { View } from "#/components/ui/view";
import ProfilePhoto from "../profilephoto";
import { useReactiveVar } from "@apollo/client";
import CardPleaseSignup from "#/components/molecules/asks/signuplogin";
import { FriendsList } from "#/components/organisms/list/friendslist";
import CondensedVerticalFriendsNotficationsList from "#/components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList";
import QuickBarfriendCard from "#/components/screens/public/venue/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard";
import AddRelationship from "#/components/screens/tonight/activity/ask/AddRelationship/AddRelationship";
import { ProfileType } from "#/graphql/generated";
import { AuthorizationReactiveVar } from "#/reactive";
import { DateTime } from "luxon";

const PersonalScreen = () => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar);

  if (rAuthorizationVar?.Profile?.ProfileType === ProfileType.Guest) {
    return (
      <Box className="mx-3 flex-1 bg-red-900">
        <CardPleaseSignup signupTextId={4} />
      </Box>
    );
  }

  return (
    <Box className="bg-transparent">
      <HStack space={"md"} className="mx-3 my-[20px] items-start">
        <ProfilePhoto photo={rAuthorizationVar?.Profile?.profilePhoto} />
        <VStack space="sm" className="flex-1 pr-2">
          <VStack space="sm" className="mt-3">
            <View>
              <VStack space="sm" className="">
                <HStack className="justify-between">
                  <VStack>
                    <Text
                      numberOfLines={1}
                      className="absolute -top-5 text-sm font-medium"
                    >
                      @
                      {
                        rAuthorizationVar?.Profile?.IdentifiableInformation
                          ?.username
                      }
                    </Text>
                    <Text
                      numberOfLines={2}
                      className="leading-2xl tracking-sm text-3xl font-bold"
                    >
                      {
                        rAuthorizationVar?.Profile?.IdentifiableInformation
                          ?.fullname
                      }
                    </Text>
                  </VStack>
                </HStack>
                <Heading
                  numberOfLines={1}
                  className="text-md leading-xs font-light"
                >
                  {DateTime.fromISO(
                    rAuthorizationVar?.Profile?.IdentifiableInformation
                      ?.birthday,
                  ).toFormat("yyyy LLLL dd")}
                </Heading>
              </VStack>
            </View>
          </VStack>
        </VStack>
      </HStack>

      <VStack space={"md"} className="m-3 justify-around">
        <HStack space={"md"} className="justify-around">
          <Box className="h-[200px] flex-1 items-center justify-center rounded-lg px-5">
            <QuickBarfriendCard
              color={"#ff7000"}
              showIcon={false}
              logosize={40}
              qrcodesize={140}
            />
          </Box>
          <AddRelationship />
        </HStack>
      </VStack>
      <Box className="mx-2">
        <FriendsList />
      </Box>
    </Box>
  );
};

export default PersonalScreen;

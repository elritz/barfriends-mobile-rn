import { VStack } from "#/src/components/ui/vstack";
import { HStack } from "#/src/components/ui/hstack";
import { Box } from "#/src/components/ui/box";
import QuickBarfriendCard from "#/src/components/molecules/activity/quickbarfriendcard/QuickBarfriendCard";
import AddEmoji from "#/src/view/screens/tonight/activity/ask/AddEmoji/AddEmoji";
import AddRelationship from "#/src/view/screens/tonight/activity/ask/AddRelationship/AddRelationship";
import JoinVenue from "#/src/view/screens/tonight/activity/ask/JoinVenue/JoinVenue";

interface ProfileActivityAndStatusCardsProps {}

const ProfileActivityAndStatusCards = ({}) => {
  return (
    <VStack space={"md"} className="mx-3 flex-wrap justify-around">
      <QuickBarfriendCard
        color={"#ff7000"}
        showIcon={false}
        logosize={40}
        qrcodesize={140}
      />
      <JoinVenue />
      <AddRelationship />
      <AddEmoji />
    </VStack>
  );
};
export default ProfileActivityAndStatusCards;

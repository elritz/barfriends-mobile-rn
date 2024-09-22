import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import JoinVenue from "#/components/atoms/buttons/joinvenue/JoinVenue";
import { View } from "react-native";

export default function JoinCard() {
  return (
    <VStack className="flex-column flex-1 justify-between">
      <View>
        <Heading className="leading-xs mt-5 text-lg font-black uppercase">
          You've{"\n"}arrived!
        </Heading>
        <Text>Join the venue now</Text>
      </View>
      <HStack>
        <JoinVenue />
      </HStack>
    </VStack>
  );
}

import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Heading } from "#/src/components/ui/heading";
import { Button } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";

export default function CurrentVenue() {
  return (
    <VStack
      space={"md"}
      className="flex-1 rounded-xl bg-[light.100] p-3 dark:bg-[light.800]"
    >
      <VStack space={"md"} className="mb-4">
        <Box className="h-[16px] w-[16px] rounded-md bg-red-200" />
        <Heading
          numberOfLines={2}
          allowFontScaling
          ellipsizeMode={"clip"}
          className="text-lg font-black"
        >
          Current Venue relazziuf long namewlke;jbqwe qwem
        </Heading>
      </VStack>
      <Button variant={"link"} size={"lg"}>
        <Text>View</Text>
      </Button>
    </VStack>
  );
}

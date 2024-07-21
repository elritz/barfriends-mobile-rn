import { Button, ButtonText } from "#/components/ui/button";
import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Box } from "#/components/ui/box";
import { useRemoveAllFromVenueDeveloperMutation } from "#/graphql/generated";
import { useState } from "react";

export default function DevActions() {
  const [showDevMode, setShowDevMode] = useState(false);

  const [removeAllFromVeneues, { data, loading, error }] =
    useRemoveAllFromVenueDeveloperMutation();

  return (
    <VStack space={"lg"} className="justify-between">
      {showDevMode ? (
        <Box className="my-5 py-10">
          <Pressable
            onPress={() => {
              setShowDevMode(!showDevMode);
            }}
          >
            <Box>
              <Heading className="text-center text-lg font-black uppercase">
                You are in {"\n"}
                <Heading className="font-black text-green-400">
                  Dev Mode!
                </Heading>
              </Heading>
              <Text className="text-md mx-2 text-center">
                This section is for quick actions that we may need for testing!
                As developers!
              </Text>
            </Box>
          </Pressable>
          <VStack>
            <HStack space={"md"} className="mx-3 justify-around py-2">
              <Button
                isDisabled={loading}
                onPress={() => removeAllFromVeneues()}
              >
                <ButtonText className="text-sm font-medium">
                  {loading ? "Removing patrons" : "Remove everyone"}
                </ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      ) : (
        <Box className="my-5 py-10">
          <Pressable
            onPress={() => {
              setShowDevMode(!showDevMode);
            }}
          >
            <ButtonText className="text-md mx-2 text-center">
              Dev Mode Actions
            </ButtonText>
          </Pressable>
        </Box>
      )}
    </VStack>
  );
}

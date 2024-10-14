import { VStack } from "#/src/components/ui/vstack";
import { HStack } from "#/src/components/ui/hstack";
import { Center } from "#/src/components/ui/center";
import { Skeleton } from "moti/skeleton";
import { Dimensions } from "react-native";

export default function SkeletonVenuesHomeScreen() {
  const { width } = Dimensions.get("window");

  const loadingSkelWidth = width / 2.15;

  return (
    <Center>
      <VStack space={"md"}>
        {[...Array(6)].map((item, index) => {
          return (
            <HStack key={index} space={"md"} className="overflow-hidden">
              {[...Array(2)].map((item, index) => {
                return (
                  <Skeleton
                    key={index}
                    radius={"round"}
                    boxHeight={280}
                    width={loadingSkelWidth}
                  />
                );
              })}
            </HStack>
          );
        })}
      </VStack>
    </Center>
  );
}

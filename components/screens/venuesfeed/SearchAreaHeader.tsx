import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { VStack } from "#/components/ui/vstack";
import { Heading } from "#/components/ui/heading";
import { useReactiveVar } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import { SearchAreaReactiveVar, ThemeReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";
import VenueFeedSearchAreaEmptyState from "#/components/screens/venuesfeed/VenueFeedSearchAreaEmptyState";
import { Pressable } from "react-native";

export default function SearchAreaHeader() {
  const router = useRouter();
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const _press = () => {
    router.push({
      pathname: "/(app)/searcharea",
    });
  };

  if (!rSearchAreaVar.searchArea) {
    return <VenueFeedSearchAreaEmptyState />;
  }

  return (
    <Pressable onPress={() => _press()} style={{ flex: 1 }}>
      <HStack space={"md"} className="items-center justify-between px-3">
        <VStack className="flex-1">
          <HStack space={"md"} className="items-center justify-between">
            <Heading className="text-3xl color-black dark:color-white">
              {rSearchAreaVar.searchArea.city.name}
            </Heading>
            {rSearchAreaVar?.useCurrentLocation && (
              <FontAwesome5
                name="location-arrow"
                color={rTheme.theme?.gluestack.tokens.colors.blue500}
                size={20}
              />
            )}
          </HStack>
          <Text className="text-primary-500">Change area</Text>
        </VStack>
      </HStack>
    </Pressable>
  );
}

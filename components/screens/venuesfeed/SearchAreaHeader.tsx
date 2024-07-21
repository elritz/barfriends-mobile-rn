import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { Pressable } from "#/components/ui/pressable";
import { VStack } from "#/components/ui/vstack";
import { Heading } from "#/components/ui/heading";
import { useReactiveVar } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import { SearchAreaReactiveVar, ThemeReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";

export default function SearchAreaHeader({ typename }) {
  const router = useRouter();
  const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);

  const _press = () => {
    router.push({
      pathname: "/(app)/searcharea",
    });
  };

  return (
    <Pressable onPress={() => _press()}>
      <HStack className="pressed:dark:bg-[#00000040] pressed:bg-[#A1A1A140] my-4 flex-1 items-end justify-center rounded-lg px-2 py-4">
        <VStack className="flex-1">
          <HStack space={"md"} className="items-center justify-between">
            <HStack space={"md"} className="items-center">
              <Heading className="text-3xl font-black">
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
          </HStack>
          <Text className="text-primary-500">Change area</Text>
        </VStack>
      </HStack>
    </Pressable>
  );
}

import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Pressable } from "#/src/components/ui/pressable";
import { HStack } from "#/src/components/ui/hstack";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";
import { Image } from "react-native";

export default function SearchCard({ item }) {
  const router = useRouter();
  const rTheme = useReactiveVar(ThemeReactiveVar);

  if (!item?.Profile) {
    return null;
  }

  return (
    <Pressable
      key={item.id}
      onPress={() => {
        switch (item.__typename) {
          case "Personal":
            return router.push({
              pathname: `/(app)/public/personal/${item.Profile.IdentifiableInformation?.username}`,
            });
          case "Venue":
            return router.push({
              pathname: `/(app)/public/venue/${item.Profile.IdentifiableInformation?.username}`,
            });
        }
      }}
    >
      <Box className="my-1 h-[65px] bg-transparent px-3">
        <HStack className="h-[100%] items-center">
          {item.Profile?.photos[0]?.url ? (
            <Image
              style={{
                height: 45,
                width: 45,
                borderRadius: 8,
              }}
              alt={"Profile Image"}
              // placeholder={item.Profile?.photos[0]?.blurhash}
              source={{ uri: item.Profile?.photos[0]?.url }}
            />
          ) : (
            <Box className="h-[45px] w-[45px] items-center justify-center rounded-md">
              <Ionicons
                size={25}
                color={
                  rTheme.colorScheme === "light"
                    ? rTheme.theme?.gluestack.tokens.colors.light900
                    : rTheme.theme?.gluestack.tokens.colors.light100
                }
                name={"person"}
              />
            </Box>
          )}
          <VStack className="ml-2">
            <Text className="leading-xs text-lg font-medium capitalize">
              {item.Profile?.IdentifiableInformation.fullname}
            </Text>
            <Text className="leading-xs text-sm">
              {item.Profile?.IdentifiableInformation.username}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
}

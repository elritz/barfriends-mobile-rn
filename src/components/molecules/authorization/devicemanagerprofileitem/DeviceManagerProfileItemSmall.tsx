import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemeReactiveVar } from "#/reactive";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native";

type ProfileItemType = {
  item: any;
  loading?: boolean;
  selectedProfileId?: string;
  isActive: boolean;
};

const ProfileItemSmall = ({
  item,
  loading,
  isActive,
  selectedProfileId,
}: ProfileItemType) => {
  const rTheme = useReactiveVar(ThemeReactiveVar);
  return (
    <Box key={item.id} className="my-2 rounded-md p-2 px-3">
      <Image
        source={{ uri: item.Profile.photos[0].url }}
        style={{ width: 40, height: 40, borderRadius: 4 }}
      />
      <HStack
        style={{ flexDirection: "column", justifyContent: "space-around" }}
      >
        <VStack className="mx-2">
          <Text numberOfLines={1} className="text-lg">
            {item?.IdentifiableInformation?.fullname}
          </Text>
          <Heading className="text-sm">
            {item?.IdentifiableInformation?.username}
          </Heading>
        </VStack>
      </HStack>
      {!loading ? (
        <>
          {isActive ? (
            <Ionicons
              name="checkmark-circle"
              color={rTheme.theme?.gluestack.tokens.colors.primary500}
              size={30}
            />
          ) : (
            <MaterialIcons
              name="radio-button-unchecked"
              color={rTheme.theme?.gluestack.tokens.colors.error500}
              size={30}
            />
          )}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </Box>
  );
};

export default ProfileItemSmall;

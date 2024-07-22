import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Box } from "#/components/ui/box";
import { useRefreshDeviceManagerQuery } from "#/graphql/generated";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const HorizontalMessageNotification = ({ item }) => {
  const router = useRouter();
  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery({
    fetchPolicy: "cache-first",
  });

  const ChatContainer = ({ isGroup, item }) => {
    const member = item.Members.filter(
      (item) => item.id !== rdmData?.refreshDeviceManager?.Profile?.id,
    );

    return (
      <Pressable
        onPress={() => {
          router.push({
            // pathname: `/(app)/conversation/${item.id}`,
            pathname: `/(app)/animatedconversation/${item.id}`,
          });
        }}
        className="h-[85px]"
      >
        <Box className="flex-1 flex-row bg-transparent pt-2">
          <VStack className="h-full w-[50px] items-center justify-start">
            <Box className="h-[45px] w-[45px] items-center justify-center rounded-md bg-light-200 dark:bg-light-400">
              {isGroup ? (
                <MaterialIcons name="group" size={24} color="black" />
              ) : (
                <MaterialIcons name="person" size={24} color="black" />
              )}
            </Box>
          </VStack>
          <VStack className="mb-2 ml-1 flex-1">
            <HStack>
              <Box className="mr-1 flex-1 bg-transparent">
                <Heading
                  numberOfLines={1}
                  lineBreakMode="tail"
                  allowFontScaling={true}
                  minimumFontScale={0.8}
                  maxFontSizeMultiplier={0.25}
                  className="leading-sm text-md text-left font-bold dark:color-white"
                >
                  {isGroup
                    ? item.name
                    : member[0].IdentifiableInformation.fullname}
                </Heading>
              </Box>
              <Box className="bg-transparent">
                <Text
                  numberOfLines={1}
                  lineBreakMode="tail"
                  allowFontScaling={true}
                  className="flex-reverse rtl:rtl text-right text-sm"
                >
                  2024-05-01
                </Text>
              </Box>
            </HStack>
            <HStack className="border-b-0.25 dark:border-b-light-9000 flex-1 justify-between border-b-light-800">
              <Text
                numberOfLines={2}
                textBreakStrategy={"balanced"}
                lineBreakMode={"tail"}
                className="leading-xs flex-1 text-sm"
              >
                {item.Messages[0].content.message}
              </Text>
              <Box className="bg-transparent pt-2">
                <Box className="z-1 mx-1 max-h-[8px] min-h-[8px] min-w-[8px] max-w-[8px] self-center rounded-full bg-primary-500" />
              </Box>
            </HStack>
          </VStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <ChatContainer
      item={item}
      isGroup={item.Members.length === 2 ? false : true}
    />
  );
};

export default HorizontalMessageNotification;

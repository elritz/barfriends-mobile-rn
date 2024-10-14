import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Divider } from "#/src/components/ui/divider";
import { Button, ButtonText } from "#/src/components/ui/button";
import { Box } from "#/src/components/ui/box";
import { useReactiveVar } from "@apollo/client";
import { APP_STORE_URL_LINK } from "#/src/constants/App";
import {
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
  HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
  SEARCH_BAR_HEIGHT,
} from "#/src/constants/ReactNavigationConstants";
import {
  ContactsReactiveVar,
  PermissionContactsReactiveVar,
  ThemeReactiveVar,
} from "#/reactive";
import { FlashList } from "@shopify/flash-list";
import * as Contacts from "expo-contacts";
import { useRouter, useLocalSearchParams } from "expo-router";
import { filter } from "lodash";
import { Skeleton } from "moti/skeleton";
import { useEffect, useState } from "react";
import { Alert, Platform, Share } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const rContactsVar = useReactiveVar(ContactsReactiveVar);
  const rTheme = useReactiveVar(ThemeReactiveVar);
  const rPermissionContactsVar = useReactiveVar(PermissionContactsReactiveVar);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState<Contacts.Contact | null>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[] | null>(null);

  useEffect(() => {
    async function getContacts() {
      if (rPermissionContactsVar?.granted) {
        const { data } = await Contacts.getContactsAsync();
        if (data.length) {
          ContactsReactiveVar(data);
          setContacts(data);
        }
        setIsLoading(false);
      }
    }
    getContacts();
  }, []);

  useEffect(() => {
    if (params.searchtext) {
      filterList(params.searchtext);
    } else {
      setContacts(rContactsVar);
    }
  }, [params.searchtext]);

  const filterList = (text) => {
    if (!params?.searchtext?.length) {
      if (rContactsVar && rContactsVar.length) {
        setContacts(rContactsVar);
      }
    } else {
      const filteredContactsData = filter(rContactsVar, (item) => {
        return contains(item, text.toLowerCase());
      });

      setContacts(filteredContactsData);
    }
  };

  const contains = (item, query) => {
    if (item.name.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  if (!rPermissionContactsVar?.granted) {
    return (
      <Box className="mx-2 flex-1">
        <VStack space={"md"} className="mb-6 items-center">
          <Heading>All Contacts</Heading>
          <Text className="text-lg">
            Please allow Barfriends to access your contacts.
          </Text>
        </VStack>
        <Button
          onPress={() =>
            router.push({
              pathname: "/(app)/permission/contacts",
            })
          }
        >
          <ButtonText>Continue</ButtonText>
        </Button>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box className="m-3 flex-1">
        <FlashList
          data={[...Array(20)]}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          estimatedItemSize={60}
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
          renderItem={(item) => {
            return (
              <HStack
                space={"md"}
                className="h-[65px] flex-1 items-center justify-between"
              >
                <Skeleton
                  height={40}
                  width={"100%"}
                  radius={15}
                  colorMode={rTheme.colorScheme === "light" ? "light" : "dark"}
                  colors={
                    rTheme.colorScheme === "light"
                      ? [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light100,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light300,
                          ),
                        ]
                      : [
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light900,
                          ),
                          String(
                            rTheme.theme?.gluestack.tokens.colors.light700,
                          ),
                        ]
                  }
                />
                <Skeleton height="40px" width={"70px"} radius={15} />
              </HStack>
            );
          }}
        />
      </Box>
    );
  }

  if (contacts && !contacts.length) {
    return (
      <Box className="bg-[red.400]">
        <Heading>!Contacts</Heading>
      </Box>
    );
  }

  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: "Barfriends | The nightlife app",
          url: Platform.OS === "ios" ? APP_STORE_URL_LINK : "",
        },
        {
          dialogTitle: "Join me on Barfriends",
          subject: "Invite to Barfriends",
        },
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Box className="mx-2 flex-1">
      {/* <Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content>
					<Modal.CloseButton />
					<Modal.Header fontSize='4xl' fontWeight='bold'>
						{contact?.firstName}&nbsp;{contact?.lastName}
					</Modal.Header>
					<Modal.Body>
						This will remove all data relating to Alex. This action cannot be reversed. Deleted data can
						not be recovered.
					</Modal.Body>
					<Modal.Footer>
						<Button variant='unstyled' mr='1' onPress={onClose}>
							Cancel
						</Button>
						<Button colorScheme='error' onPress={onClose}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal> */}
      <Box>
        <Heading>Contacts</Heading>
      </Box>
      <FlashList
        data={contacts}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={60}
        keyboardDismissMode="on-drag"
        contentInset={{
          top: insets.top + SEARCH_BAR_HEIGHT,
          bottom:
            insets.bottom !== 0
              ? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
              : HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
        }}
        renderItem={({ item }) => {
          if (!item.firstName || !item.lastName) {
            return null;
          }
          return (
            <>
              <HStack className="my-2 h-[50px]">
                <HStack className="flex-1 items-center justify-start">
                  <Text className="text-lg capitalize">
                    {item.firstName}&nbsp;{item.lastName}
                  </Text>
                </HStack>
                <HStack
                  space={"md"}
                  className="flex-1 items-center justify-end"
                >
                  {/* <IconButton
                                    bg={'transparent'}
                                    icon={
                                        <Icon
                                            as={Ionicons}
                                            name={'share'}
                                            _light={{
                                                color: 'light.700',
                                            }}
                                            _dark={{
                                                color: 'dark.700',
                                            }}
                                        />
                                    }
                                    onPress={onShare}
                                    alignSelf={'center'}
                                    variant={'solid'}
                                    size={'lg'}
                                    h={'40px'}
                                    w={'40px'}
                                    fontSize={'lg'}
                                /> */}
                </HStack>
              </HStack>
              <Divider />
            </>
          );
        }}
      />
    </Box>
  );
};

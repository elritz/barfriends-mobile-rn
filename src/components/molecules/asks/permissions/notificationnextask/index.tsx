import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";

import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "#/src/components/ui/modal";

import { Heading } from "#/src/components/ui/heading";
import { Divider } from "#/src/components/ui/divider";
import { CloseIcon, Icon } from "#/src/components/ui/icon";
import { Center } from "#/src/components/ui/center";
import { Button } from "#/src/components/ui/button";
import { useReactiveVar } from "@apollo/client";
import { DaysPreferencePermissionInitialState } from "#/src/constants/Preferences";
import { LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS } from "#/src/constants/StorageConstants";
import { LocalStoragePreferenceAskNotificationPermissionType } from "#/types/preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PreferencePermissionNotificationReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";

const NotificationNextAskModal = ({ isOpen, onOpen, onClose }) => {
  const router = useRouter();
  const rPreferenceNotificationPermission = useReactiveVar(
    PreferencePermissionNotificationReactiveVar,
  );

  const _pressAskLater = async () => {
    await AsyncStorage.setItem(
      LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
      JSON.stringify({
        ...DaysPreferencePermissionInitialState,
        numberOfTimesDismissed:
          rPreferenceNotificationPermission?.numberOfTimesDismissed
            ? rPreferenceNotificationPermission.numberOfTimesDismissed + 1
            : 1,
      } as LocalStoragePreferenceAskNotificationPermissionType),
    );
    onClose();
  };

  const _pressDontShowAgain = async () => {
    await AsyncStorage.setItem(
      LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
      JSON.stringify({
        ...DaysPreferencePermissionInitialState,
        numberOfTimesDismissed:
          rPreferenceNotificationPermission?.numberOfTimesDismissed
            ? rPreferenceNotificationPermission.numberOfTimesDismissed + 1
            : 1,
        canShowAgain: false,
      } as LocalStoragePreferenceAskNotificationPermissionType),
    );
    onClose();
  };

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalBackdrop />
        <ModalContent className="w-[92%]">
          <ModalHeader>
            <Heading>Notifications</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody scrollEnabled={false}>
            <Text className="pb-3 text-lg">
              We recommend allowing notifications because you get notified when
              friends invite you out, join bars and events in your area.
            </Text>
            <VStack space={"md"}>
              {rPreferenceNotificationPermission.numberOfTimesDismissed > 5 ? (
                <Button
                  onPress={async () => _pressAskLater()}
                  variant={"link"}
                  size={"lg"}
                >
                  <Text>Don't show again</Text>
                </Button>
              ) : (
                <Button
                  onPress={async () => _pressAskLater()}
                  variant={"link"}
                  size={"lg"}
                >
                  <Text>Ask later</Text>
                </Button>
              )}
              <Divider />
              <Button
                onPress={() =>
                  router.push({
                    pathname: "/(app)/permission/notifications",
                  })
                }
                variant={"link"}
                size={"lg"}
              >
                <Text>Allow</Text>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default NotificationNextAskModal;

import { VStack } from "#/src/components/ui/vstack";
import { Text } from "#/src/components/ui/text";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "#/src/components/ui/modal";
import { Divider } from "#/src/components/ui/divider";
import { Center } from "#/src/components/ui/center";
import { Button } from "#/src/components/ui/button";
import { useReactiveVar } from "@apollo/client";
import { DaysPreferencePermissionInitialState } from "#/src/constants/Preferences";
import { LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION } from "#/src/constants/StorageConstants";
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from "#/types/preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PreferenceForegroundLocationPermissionReactiveVar } from "#/reactive";
import { useRouter } from "expo-router";

const ForegroundLocationNextAskModal = ({ isOpen, onOpen, onClose }) => {
  const router = useRouter();
  const rPreferenceForegroundLocationPermission = useReactiveVar(
    PreferenceForegroundLocationPermissionReactiveVar,
  );

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent w={"95%"}>
          <ModalHeader>Foreground location</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            mt={"$2"}
            _scrollview={{
              scrollEnabled: false,
            }}
          >
            <Text className="pb-3 text-lg">
              By enabling foreground location, it helps you to go out, find
              events and it allows you to join bars.
            </Text>
            <VStack space={"md"}>
              <Button
                onPress={async () => {
                  const values = {
                    ...DaysPreferencePermissionInitialState,
                    numberOfTimesDismissed:
                      rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
                        ? rPreferenceForegroundLocationPermission.numberOfTimesDismissed +
                          1
                        : 1,
                  };
                  await AsyncStorage.setItem(
                    LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
                    JSON.stringify(
                      values as LocalStoragePreferenceAskForegroundLocationPermissionType,
                    ),
                  );
                  PreferenceForegroundLocationPermissionReactiveVar({
                    ...values,
                  });
                  onClose();
                }}
                variant={"link"}
                size={"lg"}
              >
                <Text className="self-center text-lg font-bold">Not now</Text>
              </Button>
              <Divider className="mt-1" />
              <Button
                onPress={() =>
                  router.push({
                    pathname: "/(app)/permission/foregroundlocation",
                  })
                }
                variant={"link"}
                size={"lg"}
              >
                <Text>Continue</Text>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default ForegroundLocationNextAskModal;

import { Text } from "#/components/ui/text";
import {
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "#/components/ui/modal";
import { Button } from "#/components/ui/button";
import { useRouter } from "expo-router";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SignupAskModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className={"w-[95%]"}>
        <ModalCloseButton />
        <ModalHeader>Account Sign up</ModalHeader>
        <ModalBody>
          To do cool things. You'll need to be cool and create an account for
          yourself.
        </ModalBody>
        <ModalFooter>
          <Button variant="link" onPress={onClose} className="mr-1">
            <Text>Later</Text>
          </Button>
          <Button
            onPress={() => {
              onClose();
              router.push({
                pathname: "/(credential)/personalcredentialstack/getstarted",
              });
            }}
            className="bg-primary-500"
          >
            <Text>Continue</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

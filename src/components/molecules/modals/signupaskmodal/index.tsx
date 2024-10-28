import {useRouter} from 'expo-router'

import {Button} from '#/src/components/ui/button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '#/src/components/ui/modal'
import {Text} from '#/src/components/ui/text'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function SignupAskModal({isOpen, onClose}: Props) {
  const router = useRouter()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className={'w-[95%]'}>
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
              onClose()
              router.push({
                pathname: '/(credential)/personalcredentialstack/getstarted',
              })
            }}
            className="bg-primary-500">
            <Text>Continue</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

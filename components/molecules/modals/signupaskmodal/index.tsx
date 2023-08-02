import { Button, Modal, Text } from '@components/core'
import { useRouter } from 'expo-router'

type Props = {
	isOpen: boolean
	onClose: () => void
}

export default function SignupAskModal({ isOpen, onClose }: Props) {
	const router = useRouter()
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Content sx={{ w: '95%' }}>
				<Modal.CloseButton />
				<Modal.Header>Account Sign up</Modal.Header>
				<Modal.Body>
					To do cool things. You'll need to be cool and create an account for yourself.
				</Modal.Body>
				<Modal.Footer>
					<Button variant='link' mr='$1' onPress={onClose}>
						<Text>Later</Text>
					</Button>
					<Button
						bg='$primary500'
						onPress={() => {
							onClose()
							router.push({
								pathname: '(app)/credential/personalcredentialstack/getstarted',
							})
						}}
					>
						<Text>Continue</Text>
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	)
}

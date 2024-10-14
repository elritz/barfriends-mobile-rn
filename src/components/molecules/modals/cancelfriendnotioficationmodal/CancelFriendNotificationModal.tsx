import { Text } from "#/src/components/ui/text";
import { Center } from "#/src/components/ui/center";
import { Button, ButtonText } from "#/src/components/ui/button";
import { CloseIcon, Icon } from "#/src/components/ui/icon";

import {
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal,
} from "#/src/components/ui/modal";

import { Heading } from "#/src/components/ui/heading";
// import { GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY } from '#/graphql/DM/profiling/friending/index.query'
// import { NOTIFICATIONS_QUERY } from '#/graphql/DM/profiling/notifications/index.query'
import { useDeleteFriendRequestMutation } from "#/graphql/generated";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  profileId: string;
  onClose: () => void;
  friendRequestId: string;
};

export default function CancelFriendNotificationModal({
  isOpen,
  onClose,
  friendRequestId,
  profileId,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  const ref = React.useRef(null);
  const [deleteFriendRequestMutation, { data, loading, error }] =
    useDeleteFriendRequestMutation({
      variables: {
        friendRequestId,
      },
      update(cache, { data }) {
        if (data?.deleteFriendRequest) {
          // const { getNotifications }: any = cache.readQuery({
          // 	query: NOTIFICATIONS_QUERY,
          // })
          // if (data?.deleteFriendRequest) {
          // 	const filteredNotification = getNotifications.friendRequestNotifications.filter(
          // 		notification => {
          // 			if (notification.id === friendRequestId) {
          // 				return false
          // 			}
          // 			return true
          // 		},
          // 	)
          // 	cache.writeQuery({
          // 		query: NOTIFICATIONS_QUERY,
          // 		data: {
          // 			getNotifications: filteredNotification,
          // 		},
          // 	})
          // }
          // cache.writeQuery({
          // 	query: GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY,
          // 	variables: {
          // 		profileId: profileId,
          // 	},
          // 	data: {
          // 		getRelationshipFriendRequestStatus: {
          // 			__typename: 'RejectedFriendsResponse',
          // 			friends: false,
          // 		},
          // 	},
          // })
          setShowModal(false);
        }
      },
      onCompleted: (data) => {
        onClose();
      },
      onError: (error) => {},
    });

  return (
    <Center className="h-[300px]">
      <Button onPress={() => setShowModal(true)} ref={ref}>
        <ButtonText>Show Modal</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Cancel Friend Notification</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>
              You can always request to be friends again. Continuing will cancel
              this friend request
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              onPress={() => {
                setShowModal(false);
              }}
              className="mr-3"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              onPress={() => {
                deleteFriendRequestMutation();
              }}
              className="border-0"
            >
              <ButtonText>Explore</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

// return (
// 	<Modal isOpen={isOpen} onClose={onClose}>
// 		<Modal.Content w={'95%'}>
// 			<Modal.CloseButton />
// 			<Modal.Header>Cancel Friend Notification</Modal.Header>
// 			<Modal.Body>
// 				You can always request to be friends again. Continuing will cancel this friend request
// 			</Modal.Body>
// 			<Modal.Footer>
// 				<Button variant='link' mr='$1' onPress={onClose}>
// 					<Text>Back</Text>
// 				</Button>
// 				<Button
// 					onPress={() => {
// 						deleteFriendRequestMutation()
// 					}}
// 					disabled={loading}
// 				>
// 					<Text>Cancel</Text>
// 				</Button>
// 			</Modal.Footer>
// 		</Modal.Content>
// 	</Modal>

// import { GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY } from '#/graphql/DM/profiling/friending/index.query'
import {ReactElement, useEffect} from 'react'
import {useLocalSearchParams} from 'expo-router'
import {DateTime} from 'luxon'

import {
  useGetRelationshipFriendRequestStatusLazyQuery,
  useRemoveFriendMutation,
} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {Button} from '#/src/components/ui/button'
import {HStack} from '#/src/components/ui/hstack'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '#/src/components/ui/modal'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function RelationshipModal({isOpen, onClose}: Props) {
  const params = useLocalSearchParams()

  const [
    getRelationshipFriendStatusQuery,
    {data: GRFRSData, loading: GRFRSLoading, error: GRFRSError},
  ] = useGetRelationshipFriendRequestStatusLazyQuery({})

  const [removeFriendMutation, {data, loading, error}] =
    useRemoveFriendMutation({
      onCompleted: data => {},
    })

  useEffect(() => {
    // getRelationshipFriendStatusQuery({
    // 	fetchPolicy: 'network-only',
    // 	variables: {
    // 		profileId: String(params.profileid),
    // 	},
    // })
  }, [])

  // if (GRFRSLoading || !GRFRSData) return null

  // const FriendStatus = (): ReactElement | null => {
  // 	switch (GRFRSData.getRelationshipFriendRequestStatus?.__typename) {
  // 		case 'FriendRequest':
  // 			return null

  // 		case 'RejectedFriendsResponse':
  // 			return null
  // 		case 'Relationship': {
  // 			const created = DateTime.fromISO(
  // 				GRFRSData.getRelationshipFriendRequestStatus.createdAt,
  // 			).toFormat('yyyy LLL dd')
  // 			return (
  // 				<Box bg='$transparent' alignItems={'center'}>
  // 					<Text fontSize={'$sm'} fontWeight={'$bold'} textAlign={'center'}>
  // 						Friends since
  // 					</Text>
  // 					<Text fontSize={'$2xl'}>
  // 						{created}
  // 					</Text>
  // 				</Box>
  // 			)
  // 		}
  // 		default:
  // 			return null
  // 	}
  // }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className={`h-[auto] w-[94%]`}>
        <ModalCloseButton />
        <ModalHeader>
          <Text>Remove friend</Text>
        </ModalHeader>
        <ModalBody className="w-[100%]">
          <VStack>
            <HStack className="mb-3">
              <VStack>
                <Text className="mx-2 flex-wrap">
                  Are you sure you want to remove the friend ship you have?
                </Text>
              </VStack>
            </HStack>
            {/* <FriendStatus /> */}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="link" onPress={onClose} className="mr-1">
            <Text>Cancel</Text>
          </Button>
          <Button
            size={'sm'}
            style={{
              width: 100,
            }}
            className="mx-2 rounded-sm">
            <Text>Unfriend</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

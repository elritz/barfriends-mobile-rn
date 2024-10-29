import {Pressable} from 'react-native'
import {Image} from 'expo-image'
import {useReactiveVar} from '@apollo/client'
import {FontAwesome5} from '@expo/vector-icons'

import {
  Request,
  useDeclineFriendRequestMutation,
  useDeleteFriendRequestMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button} from '#/src/components/ui/button'
import {HStack} from '#/src/components/ui/hstack'
import {CloseIcon, Icon} from '#/src/components/ui/icon'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

interface CondensedHorizontalFriendNotifciationProps {
  item: Request
}

export const CondensedHorizontalFriendNotifciation = ({
  item,
}: CondensedHorizontalFriendNotifciationProps) => {
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

  const [deleteFriendRequestMutation, {loading: dFRLoading}] =
    useDeleteFriendRequestMutation({
      update(cache) {
        if (item) {
          cache.evict({id: cache.identify(item)})
        }
      },
    })

  const [declineFriendRequestMutation] = useDeclineFriendRequestMutation({})

  const currentUserIsSender =
    item?.senderProfile?.id === rAuthorizationVar?.Profile?.id

  const receiver = item?.recievers[0]

  return (
    <>
      {currentUserIsSender ? (
        <HStack
          space="md"
          className=" p-2 bg-light-100 dark:bg-light-800 flex-1 items-center">
          <HStack space="sm" className="items-center flex-1">
            <Box className="w-[50] h-[50] bg-light-200 dark:bg-light-900 rounded-md">
              {item.friendProfile?.profilePhoto?.url ? (
                <Image
                  alt={'Profile image'}
                  source={{uri: item.friendProfile?.profilePhoto?.url}}
                  contentFit="cover"
                  style={{
                    height: 50,
                    flexDirection: 'column-reverse',
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Box className="flex-1 justify-center items-center">
                  <FontAwesome5
                    name="user-alt"
                    size={18}
                    color={
                      rTheme.colorScheme === 'light'
                        ? rTheme.theme?.gluestack.tokens.colors.light600
                        : rTheme.theme?.gluestack.tokens.colors.light300
                    }
                  />
                </Box>
              )}
            </Box>
            <VStack space="xs" className="flex-1">
              <Text className="flex-wrap text-lg font-medium capitalize">
                {receiver?.Profile?.IdentifiableInformation?.fullname}
              </Text>
            </VStack>
          </HStack>
          <Button
            variant={dFRLoading ? 'solid' : 'outline'}
            size="xs"
            disabled={dFRLoading}
            onPress={() => {
              item?.NotificationType === 'FRIEND_REQUEST' &&
                deleteFriendRequestMutation({
                  variables: {
                    friendRequestId: item.id,
                  },
                })
            }}
            className="rounded-lg">
            <HStack space={'sm'}>
              <Text className="text-sm font-bold">
                {dFRLoading ? 'Unsent' : 'Unsend'}
              </Text>
            </HStack>
          </Button>
        </HStack>
      ) : (
        <HStack
          space="md"
          className="p-2 bg-light-100 dark:bg-light-800 flex-1">
          <HStack space="sm" className="items-center flex-1">
            <Box className="w-[50] h-[50] bg-light-200 dark:bg-light-900 rounded-md">
              {item.friendProfile?.profilePhoto?.url ? (
                <Image
                  alt={'Profile image'}
                  source={{uri: item.friendProfile?.profilePhoto?.url}}
                  contentFit="cover"
                  style={{
                    height: 50,
                    flexDirection: 'column-reverse',
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Box className="flex-1 justify-center items-center">
                  <FontAwesome5
                    name="user-alt"
                    size={18}
                    color={
                      rTheme.colorScheme === 'light'
                        ? rTheme.theme?.gluestack.tokens.colors.light600
                        : rTheme.theme?.gluestack.tokens.colors.light300
                    }
                  />
                </Box>
              )}
            </Box>
            <VStack space="sm">
              <Text className="flex-wrap text-lg font-medium capitalize">
                {receiver?.Profile?.IdentifiableInformation?.fullname}
              </Text>
            </VStack>
          </HStack>
          <HStack space="sm" className="items-center">
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                declineFriendRequestMutation({
                  variables: {
                    friendRequestId: String(item?.id),
                    notificationStatusId: String(
                      receiver?.NotificationStatus?.id,
                    ),
                  },
                })
              }}>
              <Icon
                as={CloseIcon}
                className="mr-2 h-6 w-6 text-typography-500"
              />
            </Pressable>
            <Button
              size="xs"
              variant="solid"
              onPress={() => {
                console.log('ACCEPT FRIEND REQUEST')
              }}
              className="h-[28px] rounded-full">
              <Text className="text-sm font-bold">Accept</Text>
            </Button>
          </HStack>
        </HStack>
      )}
    </>
  )
}

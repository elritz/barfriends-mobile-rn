import {useCallback, useMemo, useRef} from 'react'
import {ScrollView} from 'react-native'
import {BlurView} from 'expo-blur'
import {Image} from 'expo-image'
import {LinearGradient} from 'expo-linear-gradient'
import {useGlobalSearchParams} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Feather, FontAwesome, Ionicons} from '@expo/vector-icons'
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {FlashList} from '@shopify/flash-list'

import {
  ProfileType,
  useAcceptFriendRequestMutation,
  useCreateFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useGetNotificationsQuery,
  usePublicProfileQuery,
  useRefreshDeviceManagerQuery,
} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Badge, BadgeText} from '#/src/components/ui/badge'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {View} from '#/src/components/ui/view'
import {VStack} from '#/src/components/ui/vstack'
import {generateRandomBlurhash} from '#/src/util/helpers/generateBlurhash'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import Photos from '#/src/view/screens/public/personal/photos'

export default () => {
  const params = useGlobalSearchParams()
  const contentInsets = useContentInsets()
  const rThemeVar = useReactiveVar(ThemeReactiveVar)
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // variables
  const snapPoints = useMemo(() => ['25%', '70%'], [])

  const listItems = [
    {
      title: 'Report',
      type: 'destructive',
    },
    {
      title: 'Block',
      type: 'destructive',
    },
    {
      title: 'Remove Friend',
      type: null,
    },
  ]

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const SectionHeader = ({title}: {title: string}) => {
    return <Heading className="text-md py-2 font-bold">{title}</Heading>
  }
  const SectionContainer = ({children}) => {
    return (
      <BlurView
        style={{
          padding: 15,
          borderRadius: 13,
          overflow: 'hidden',
          backgroundColor: profile?.tonightStory?.emojimood?.colors
            ? 'transparent'
            : rThemeVar.colorScheme === 'light'
              ? rThemeVar.theme.gluestack.tokens.colors.light100
              : rThemeVar.theme.gluestack.tokens.colors.light800,
        }}
        intensity={80}
        tint={rThemeVar.colorScheme === 'light' ? 'light' : 'dark'}>
        {children}
      </BlurView>
    )
  }

  const {
    data,
    loading,
    updateQuery: pPUpdateQuery,
  } = usePublicProfileQuery({
    skip: !params.username,
    variables: {
      where: {
        IdentifiableInformation: {
          username: {
            equals: String(params.username),
          },
        },
      },
    },
  })

  const {updateQuery: GNUpdateQuery} = useGetNotificationsQuery()

  const [createFriendRequestMutation, {loading: cFRLoading}] =
    useCreateFriendRequestMutation({
      variables: {
        receiversProfileId: String(data?.publicProfile?.id),
      },
      onCompleted: data => {
        if (data.createFriendRequest) {
          pPUpdateQuery(prevData => {
            return {
              ...prevData,
              publicProfile: {
                ...prevData?.publicProfile,
                relationship: data.createFriendRequest,
              },
            }
          })
          GNUpdateQuery(prevData => {
            return {
              ...prevData,
              getNotifications: {
                ...prevData?.getNotifications,
                friendRequestNotifications: [
                  ...prevData?.getNotifications?.friendRequestNotifications,
                  data.createFriendRequest,
                ],
              },
            }
          })
        }
      },
    })

  const [deleteFriendRequestMutation, {loading: dFRLoading}] =
    useDeleteFriendRequestMutation({
      onCompleted: data => {
        if (data.deleteFriendRequest) {
          console.log('Friend request sent ==>')
          pPUpdateQuery(prevData => {
            return {
              ...prevData,
              publicProfile: {
                ...prevData?.publicProfile,
                relationship: null,
              },
            }
          })
        } else {
        }
      },
    })

  const [acceptFriendRequestMutation] = useAcceptFriendRequestMutation({
    onCompleted: data => {
      data.acceptFriendRequest?.__typename === 'Relationship' &&
        pPUpdateQuery(prevData => {
          return {
            ...prevData,
            publicProfile: {
              ...prevData?.publicProfile,
              relationship: data.acceptFriendRequest,
            },
          }
        })
    },
  })

  const [declineFriendRequestMutation] = useDeclineFriendRequestMutation({
    onCompleted: () => {
      pPUpdateQuery(prevData => {
        return {
          ...prevData,
          publicProfile: {
            ...prevData?.publicProfile,
            relationship: null,
          },
        }
      })
    },
  })

  const {data: rdmData, loading: rdmLoading} = useRefreshDeviceManagerQuery()

  if (loading || rdmLoading)
    return <Text className="mt-12 text-2xl">Loading...</Text>

  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    if (
      rdmData?.refreshDeviceManager.Profile?.ProfileType === ProfileType.Guest
    ) {
      return null
    }
    if (
      rdmData?.refreshDeviceManager.Profile?.ProfileType ===
      ProfileType.Personal
    ) {
      const profile = data?.publicProfile

      if (!profile) {
        return <Text className="mt-12 text-2xl">No profile found</Text>
      }

      const Username = () => {
        return (
          <VStack space="sm" className="relative mt-3 flex-1">
            <HStack className="justify-between">
              <Text
                numberOfLines={1}
                className={` ${rThemeVar.colorScheme === 'light' ? 'text-light-800' : 'text-light-100'} -top-15 absolute text-sm font-medium`}>
                @{profile?.IdentifiableInformation?.username}
              </Text>
              <HStack>
                <Text
                  numberOfLines={2}
                  className={` ${rThemeVar.colorScheme === 'light' ? 'text-light-900' : 'text-light-100'} leading-2xl tracking-sm text-2xl font-bold`}>
                  {profile?.IdentifiableInformation?.fullname}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        )
      }

      const TonightVenue = () => {
        return (
          <>
            <SectionHeader title="Tonight" />
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                console.log('//todo: Navigate to Public Venue ')
              }}>
              <HStack className="items-center justify-between">
                <HStack space="sm" className="items-center">
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1544450030-1fccab69a2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                    }}
                    placeholder={generateRandomBlurhash()}
                  />
                  <Text className="text-lg">Dallas Night Club</Text>
                </HStack>
                <Feather
                  name="arrow-right"
                  size={25}
                  color={
                    rThemeVar.colorScheme === 'light'
                      ? rThemeVar.theme?.gluestack.tokens.colors.light900
                      : rThemeVar.theme?.gluestack.tokens.colors.light100
                  }
                />
              </HStack>
            </Pressable>
          </>
        )
      }

      const Relationship = () => {
        return (
          <HStack className="mb-2 items-center justify-between">
            <HStack space="sm" className="items-center">
              {profile?.DetailInformation?.description}
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1544450030-1fccab69a2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 5,
                }}
                placeholder={generateRandomBlurhash()}
              />
              <HStack className="flex-1 justify-between">
                <Text className="text-lg">Christian Firmi</Text>
                <Text className="italic-[italic] text-sm">dating</Text>
              </HStack>
            </HStack>
          </HStack>
        )
      }

      const FriendRequest = () => {
        switch (profile.relationship?.__typename) {
          case 'Error':
            return (
              <Box>
                <Text>{profile.relationship.message}</Text>
              </Box>
            )
          case 'Request':
            return (
              rdmData.refreshDeviceManager?.__typename ===
                'AuthorizationDeviceProfile' && (
                <>
                  {profile.relationship.senderProfileId ===
                  rdmData.refreshDeviceManager.Profile?.id ? (
                    <SectionContainer>
                      <HStack
                        space="md"
                        className="flex-1 items-center justify-between py-3">
                        <Text className="text-md flex-1 flex-wrap font-medium">
                          You requested to be friends!
                        </Text>
                        <Button
                          variant="outline"
                          size="xs"
                          disabled={dFRLoading}
                          onPress={() => {
                            profile.relationship?.__typename === 'Request' &&
                              deleteFriendRequestMutation({
                                variables: {
                                  friendRequestId: profile.relationship.id!,
                                },
                              })
                          }}
                          className="rounded-lg">
                          <Text className="text-sm font-bold">Requested</Text>
                        </Button>
                      </HStack>
                    </SectionContainer>
                  ) : (
                    <SectionContainer>
                      <HStack className="w-full items-center justify-between py-3">
                        <Text className="text-md font-medium">
                          Wants to be Barfriends
                        </Text>
                        <HStack space="sm">
                          <Button
                            size="xs"
                            variant="link"
                            onPress={() => {
                              profile.relationship?.__typename === 'Request' &&
                                declineFriendRequestMutation({
                                  variables: {
                                    friendRequestId: profile.relationship.id!,
                                    notificationStatusId: String(
                                      profile.relationship.recievers?.[0]
                                        ?.NotificationStatus?.id,
                                    ),
                                  },
                                })
                            }}
                            className="h-[28px]">
                            <Text className="text-sm font-bold">Decline</Text>
                          </Button>
                          <Button
                            size="xs"
                            onPress={() => {
                              profile.relationship?.__typename === 'Request' &&
                                acceptFriendRequestMutation({
                                  variables: {
                                    friendRequestId: profile.relationship.id!,
                                    notificationStatusId: String(
                                      profile.relationship.recievers?.[0]
                                        ?.NotificationStatus?.id,
                                    ),
                                  },
                                })
                            }}
                            className="h-[28px]">
                            <ButtonText className="text-sm">Accept</ButtonText>
                          </Button>
                        </HStack>
                      </HStack>
                    </SectionContainer>
                  )}
                </>
              )
            )
          case 'Relationship':
            return (
              <>
                {!profile.relationship.id && (
                  <SectionContainer>
                    <HStack className="w-full items-center justify-between py-3">
                      <Text className="text-md font-medium">
                        Add to your friends
                      </Text>
                      <Button
                        disabled={cFRLoading}
                        size="xs"
                        onPress={() => createFriendRequestMutation()}
                        className="rounded-lg">
                        <ButtonText className="text-md">Barfriend</ButtonText>
                      </Button>
                    </HStack>
                  </SectionContainer>
                )}
              </>
            )
          default:
            return (
              <SectionContainer>
                <HStack className="w-full items-center justify-between py-3">
                  <Text className="text-md font-medium">
                    Add to your friends
                  </Text>
                  <Button
                    disabled={cFRLoading}
                    size="xs"
                    onPress={() => createFriendRequestMutation()}
                    className="rounded-lg">
                    <ButtonText className="text-md">Barfriend</ButtonText>
                  </Button>
                </HStack>
              </SectionContainer>
            )
        }
      }

      const Tags = () => {
        return (
          <HStack space="xs" className="flex-wrap py-2">
            {profile?.DetailInformation?.Tags.map(interest => {
              return (
                <Badge
                  key={interest.id}
                  size="lg"
                  variant="solid"
                  className="my-1 rounded-lg bg-light-200 p-2 px-3 dark:bg-black">
                  <BadgeText className="text-sm capitalize pr-1">
                    {interest.emoji}
                  </BadgeText>
                  <Text className="text-sm capitalize  font-medium text-black dark:text-white">
                    {interest.name}
                  </Text>
                </Badge>
              )
            })}
          </HStack>
        )
      }

      const Description = () => {
        return (
          <HStack space="sm" className="flex-wrap">
            {!profile?.DetailInformation?.description?.length ? (
              <Text className="leading-xl text-lg font-normal">
                {profile?.DetailInformation?.description}
              </Text>
            ) : (
              <Text className="leading-xl w-full text-center text-lg font-normal">
                No details yet!
              </Text>
            )}
          </HStack>
        )
      }

      const RelationshipSettingsBottomSheet = () => {
        return (
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={{
              backgroundColor:
                rThemeVar.colorScheme === 'light'
                  ? rThemeVar.theme.gluestack.tokens.colors.light100
                  : rThemeVar.theme.gluestack.tokens.colors.light800,
            }}
            handleIndicatorStyle={{
              backgroundColor:
                rThemeVar.colorScheme === 'dark'
                  ? rThemeVar.theme.gluestack.tokens.colors.light100
                  : rThemeVar.theme.gluestack.tokens.colors.light800,
            }}>
            <HStack className="items-center">
              <Pressable
                accessibilityRole="button"
                onPress={handleCloseModalPress}>
                <Ionicons
                  name="chevron-back-outline"
                  size={35}
                  color={
                    rThemeVar.colorScheme === 'light'
                      ? rThemeVar.theme?.gluestack.tokens.colors.light900
                      : rThemeVar.theme?.gluestack.tokens.colors.light100
                  }
                />
              </Pressable>
              <Heading>Relationship</Heading>
            </HStack>
            <FlashList
              contentContainerStyle={{paddingHorizontal: 10}}
              data={listItems}
              estimatedItemSize={100}
              ListHeaderComponent={() => {
                return (
                  <VStack className="mt-3">
                    <Username />
                    <HStack space="md">
                      {[
                        {icon: '🎈', date: 'Jan 11, 1995'},
                        {icon: '👥', date: 'Jan 11'},
                      ].map((item, index) => {
                        return (
                          <Badge
                            key={index}
                            size="lg"
                            variant="solid"
                            className="my-1 rounded-full bg-light-200 p-2 px-3 dark:bg-black">
                            <Text className="text-sm capitalize font-medium text-black dark:text-white">
                              {item.date}
                            </Text>
                          </Badge>
                        )
                      })}
                    </HStack>
                  </VStack>
                )
              }}
              renderItem={({item}) => {
                return (
                  <View style={{height: 50}}>
                    <Text>{item.title}</Text>
                  </View>
                )
              }}
            />
          </BottomSheetModal>
        )
      }

      return (
        <BottomSheetModalProvider>
          <LinearGradient
            style={{
              flex: 1,
            }}
            colors={
              profile?.tonightStory?.emojimood?.colors
                ? profile?.tonightStory?.emojimood?.colors
                : ['#0000000']
            }>
            <RelationshipSettingsBottomSheet />
            <ScrollView contentInset={contentInsets}>
              <VStack space="md" className="mx-3">
                <Photos
                  photos={profile?.tonightStory?.photos}
                  profilePhoto={profile?.profilePhoto}
                  emojimoodsColors={
                    profile?.tonightStory?.emojimood?.colors
                      ? profile?.tonightStory?.emojimood?.colors
                      : ['#0000000']
                  }
                />
                {rdmData.refreshDeviceManager.Profile?.ProfileType ===
                  ProfileType.Personal && <FriendRequest />}
                <SectionContainer>
                  <>
                    <HStack space="md" className="items-center py-3">
                      <Username />
                      {profile?.relationship?.__typename === 'Relationship' && (
                        <Button
                          size="xs"
                          onPress={handlePresentModalPress}
                          className="rounded-lg bg-primary-500 px-2">
                          <FontAwesome name="user" size={20} color={'white'} />
                        </Button>
                      )}
                      {rdmData.refreshDeviceManager.Profile?.ProfileType ===
                        ProfileType.Personal && (
                        <Button
                          onPress={() => {
                            console.log(
                              '//todo: Message icon to conversation with this person',
                            )
                          }}
                          size="xs"
                          className="rounded-full bg-tertiary-400">
                          <ButtonText className="mr-2 text-sm">
                            Message
                          </ButtonText>
                          <Ionicons
                            color={
                              rThemeVar.theme?.gluestack?.tokens.colors.light100
                            }
                            name="chatbubble-ellipses"
                            size={20}
                          />
                        </Button>
                      )}
                    </HStack>
                  </>
                  <TonightVenue />
                  <SectionHeader title="My basics" />
                  <Relationship />
                  <Tags />
                  <SectionHeader title="About me" />
                  <Description />
                </SectionContainer>
              </VStack>
            </ScrollView>
          </LinearGradient>
        </BottomSheetModalProvider>
      )
    }
  }
}

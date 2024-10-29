import {useEffect} from 'react'
import {View} from 'react-native'
import {Image} from 'expo-image'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {FontAwesome5} from '@expo/vector-icons'
import {FlashList} from '@shopify/flash-list'
import {DateTime} from 'luxon'

import {
  ProfileType,
  useGetNotificationsLazyQuery,
  useRefreshDeviceManagerQuery, // useGetNotificationsLazyQuery
} from '#/graphql/generated'
import SignupLoginCard from '#/src/components/molecules/asks/signuplogin'
import {CondensedHorizontalFriendNotifciation} from '#/src/components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import DeviceManagerProfiles from '#/src/components/organisms/list/DeviceManagerProfiles'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import {ThemeReactiveVar} from '#/src/state/reactive'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import ProfilePhoto from '#/src/view/screens/profile/profilephoto'

const PersonalProfilePhoto = () => {
  const {data: rdmData, loading: rdmLoading} = useRefreshDeviceManagerQuery({})

  if (rdmLoading) return null
  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    switch (rdmData?.refreshDeviceManager?.Profile?.ProfileType) {
      case ProfileType.Guest:
        return null
      case ProfileType.Personal:
        return (
          <ProfilePhoto
            photo={rdmData?.refreshDeviceManager?.Profile?.profilePhoto}
          />
        )
      case ProfileType.Venue:
        return null
    }
    return null
  }
}

const DetailInformation = () => {
  const {data: rdmData, loading: rdmLoading} = useRefreshDeviceManagerQuery({})

  if (rdmLoading) return null

  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    switch (rdmData?.refreshDeviceManager?.Profile?.ProfileType) {
      case ProfileType.Guest:
        return null
      case ProfileType.Personal:
        return (
          <HStack space={'md'} className="mx-3 my-[20px] items-start">
            <PersonalProfilePhoto />
            <VStack space="sm" className="flex-1  pr-2">
              <VStack space="sm" className="mt-3">
                <View>
                  <VStack space="sm">
                    <HStack className="justify-between">
                      <VStack className="relative ">
                        <Text
                          numberOfLines={1}
                          className="absolute -top-5 text-md font-medium">
                          @
                          {
                            rdmData.refreshDeviceManager?.Profile
                              ?.IdentifiableInformation?.username
                          }
                        </Text>
                        <Text
                          numberOfLines={2}
                          className="leading-2xl tracking-sm text-3xl font-bold">
                          {
                            rdmData.refreshDeviceManager?.Profile
                              ?.IdentifiableInformation?.fullname
                          }
                        </Text>
                      </VStack>
                    </HStack>
                    <Heading
                      numberOfLines={1}
                      className="text-md leading-xs font-light">
                      {DateTime.fromISO(
                        rdmData.refreshDeviceManager?.Profile
                          ?.IdentifiableInformation?.birthday,
                      ).toFormat('yyyy LLLL dd')}
                    </Heading>
                  </VStack>
                </View>
              </VStack>
            </VStack>
          </HStack>
        )
      case ProfileType.Venue:
        return null
    }
    return null
  }
}

export default () => {
  const router = useRouter()
  const insets = useContentInsets()
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const [getNotificationQuery, {data: GNData, loading: GNLoading}] =
    useGetNotificationsLazyQuery({
      fetchPolicy: 'network-only',
    })

  const {data: rdmData, loading: rdmLoading} = useRefreshDeviceManagerQuery({})

  useEffect(() => {
    getNotificationQuery()
  }, [getNotificationQuery])

  if (rdmLoading || GNLoading) return null

  const ListheaderComponent = () => {
    const SignUpWidget = () => {
      if (rdmLoading || !rdmData) {
        return null
      }

      switch (rdmData?.refreshDeviceManager?.__typename) {
        case 'AuthorizationDeviceProfile':
          if (
            rdmData?.refreshDeviceManager.Profile?.ProfileType ===
            ProfileType.Guest
          ) {
            return (
              <Box className="mx-2 my-2 p-5 pt-10">
                <SignupLoginCard signupTextId={1} />
                <DeviceManagerProfiles />
              </Box>
            )
          }
          return null
      }
    }

    return (
      <Box className="py-2">
        <VStack space={'md'}>
          <SignUpWidget />
        </VStack>
      </Box>
    )
  }

  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    return (
      <View style={{flex: 1}}>
        <FlashList
          showsVerticalScrollIndicator={false}
          contentInset={{...insets, top: 0, bottom: 150}}
          data={[
            ...(GNData?.getNotifications?.friendRequestNotifications ?? []),
            ...(rdmData?.refreshDeviceManager.Profile?.Relationships ?? []),
          ]}
          estimatedItemSize={50}
          numColumns={1}
          keyExtractor={(item, index) => {
            switch (item.__typename) {
              case 'Request':
                return item.id ?? index.toString()
              case 'Relationship':
                return item.id ?? index.toString()
              default:
                return index.toString()
            }
          }}
          ListHeaderComponent={() => {
            return (
              <VStack space={'md'} className="justify-around">
                <DetailInformation />
                <ListheaderComponent />
              </VStack>
            )
          }}
          ItemSeparatorComponent={() => <Box className="h-1" />}
          renderItem={({item}) => {
            if (item.__typename === 'Request') {
              return (
                <CondensedHorizontalFriendNotifciation
                  item={item}
                  key={item.id}
                />
              )
            }
            return (
              <Pressable
                accessibilityRole="button"
                key={item.id}
                className="flex-1 rounded-md"
                onPress={() => {
                  if (item?.friendProfile?.IdentifiableInformation?.username) {
                    router.push({
                      params: {
                        username:
                          item?.friendProfile?.IdentifiableInformation
                            ?.username,
                      },
                      pathname: `/(app)/public/personal/[username]`,
                    })
                  }
                }}>
                <HStack
                  space="md"
                  className=" p-2 bg-light-100 dark:bg-light-800 flex-1">
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
                  <VStack className=" w-[100%] mt-2">
                    <Text className="">
                      {item.friendProfile?.IdentifiableInformation?.username ??
                        'Christian'}
                    </Text>
                    <Text className="">
                      @
                      {item.friendProfile?.IdentifiableInformation?.username ??
                        'Christian'}
                    </Text>
                  </VStack>
                </HStack>
              </Pressable>
            )
          }}
          // renderItem={({item}) => {
          //   return (
          //     <Pressable
          //       className="flex-1 h-[170] m-1 overflow-hidden rounded-md"
          //       onPress={() => {
          //         if (item?.friendProfile?.IdentifiableInformation?.username) {
          //           router.push({
          //             params: {
          //               username:
          //                 item?.friendProfile?.IdentifiableInformation
          //                   ?.username,
          //             },
          //             pathname: `/(app)/public/personal/[username]`,
          //           })
          //         }
          //       }}>
          //       <Box className="bg-light-100 dark:bg-light-800 flex-1">
          //         <Pressable
          //           onPress={() => {
          //             if (
          //               item.friendProfile?.IdentifiableInformation?.username
          //             ) {
          //               router.push({
          //                 params: {
          //                   username:
          //                     item.friendProfile?.IdentifiableInformation
          //                       ?.username,
          //                 },
          //                 pathname: `/(app)/public/personal/[username]`,
          //               })
          //             }
          //           }}>
          //           <Box
          //             style={{
          //               height: 170,
          //             }}>
          //             {item.friendProfile?.profilePhoto?.url ? (
          //               <Image
          //                 alt={'Profile image'}
          //                 source={{uri: item.friendProfile?.profilePhoto?.url}}
          //                 contentFit="cover"
          //                 style={{
          //                   height: 170,
          //                   flexDirection: 'column-reverse',
          //                   borderRadius: 10,
          //                 }}
          //               />
          //             ) : (
          //               <Box className="flex-1 justify-center items-center">
          //                 <FontAwesome5
          //                   name="user-alt"
          //                   size={24}
          //                   color={
          //                     rTheme.colorScheme === 'light'
          //                       ? rTheme.theme?.gluestack.tokens.colors.light600
          //                       : rTheme.theme?.gluestack.tokens.colors.light300
          //                   }
          //                 />
          //               </Box>
          //             )}
          //             <Box className="absolute bottom-0 left-0 right-0 z-10 w-[100%] overflow-hidden">
          //               <LinearGradient
          //                 style={{paddingVertical: 4}}
          //                 colors={['transparent', '#000000d1']}>
          //                 <Text className="text-center font-medium text-lg text-white">
          //                   @
          //                   {
          //                     item.friendProfile?.IdentifiableInformation
          //                       ?.username
          //                   }
          //                 </Text>
          //               </LinearGradient>
          //             </Box>
          //           </Box>
          //         </Pressable>
          //         <Text>
          //           {item.friendProfile?.IdentifiableInformation?.firstname}
          //         </Text>
          //       </Box>
          //     </Pressable>
          //   )
          // }}
        />
      </View>
    )
  }
}

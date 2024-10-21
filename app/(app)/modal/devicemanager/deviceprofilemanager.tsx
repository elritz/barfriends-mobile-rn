import {Center} from '#/src/components/ui/center'
import {VStack} from '#/src/components/ui/vstack'
import {Pressable} from '#/src/components/ui/pressable'
import {HStack} from '#/src/components/ui/hstack'
import {Button, ButtonText, ButtonIcon} from '#/src/components/ui/button'
import {Box} from '#/src/components/ui/box'
// TODO: FN(What functionality was suppose to be here)
import {useReactiveVar} from '@apollo/client'
import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'
import WithDeviceProfiles from '#/src/components/molecules/asks/signinup'
import DeviceManagerProfileItemLarge from '#/src/components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons'
import {
  AuthorizationDeviceProfile,
  ProfileType,
  useGetADeviceManagerQuery,
  useSwitchDeviceProfileMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {useRouter} from 'expo-router'
import {Skeleton} from 'moti/skeleton'
import {useRef, useState} from 'react'
import {SafeAreaView, View} from 'react-native'
import {Image} from 'expo-image'
import {Text} from '#/src/components/ui/text'

export default function DeviceManager() {
  const ref = useRef(null)
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const {data, loading} = useGetADeviceManagerQuery({
    fetchPolicy: 'no-cache',
  })

  const [
    switchDeviceProfileMutation,
    {data: SWDPData, loading: SWDPLoading, error: SWDPError},
  ] = useSwitchDeviceProfileMutation({
    // onCompleted: data => {
    //   if (
    //     data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile'
    //   ) {
    //     const deviceManager =
    //       data.switchDeviceProfile as AuthorizationDeviceProfile
    //     AuthorizationReactiveVar(deviceManager)
    //     setTimeout(() => router.back(), 1000)
    //   }
    // },
  })

  if (loading) {
    return (
      <VStack space={'md'} className="my-5 rounded-md px-2">
        {[...Array(3)].map((item, index) => {
          return (
            <Skeleton
              key={index}
              height={80}
              width={'100%'}
              radius={15}
              colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
              colors={
                rTheme.colorScheme === 'light'
                  ? [
                      String(rTheme.theme?.gluestack.tokens.colors.light100),
                      String(rTheme.theme?.gluestack.tokens.colors.light300),
                    ]
                  : [
                      String(rTheme.theme?.gluestack.tokens.colors.light900),
                      String(rTheme.theme?.gluestack.tokens.colors.light700),
                    ]
              }
            />
          )
        })}
      </VStack>
    )
  }

  if (data?.getADeviceManager?.__typename === 'Error') {
    return null
  }

  if (data?.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
    return (
      <SafeAreaView style={{flex: 1, marginTop: 20}}>
        <View style={{flex: 1}}>
          <Center className="mx-5 rounded-md">
            {data?.getADeviceManager.DeviceProfiles?.length ? (
              <>
                {data?.getADeviceManager.DeviceProfiles?.map((item, index) => {
                  switch (item.Profile?.ProfileType) {
                    case ProfileType.Guest:
                      return null

                    case ProfileType.Personal:
                      return (
                        <HStack
                          key={item.id}
                          className="light:bg-light-200 mb-2 h-[80px] items-center rounded-md pr-3 dark:bg-light-800">
                          <Pressable
                            className="bg-red-600"
                            onPress={() => {
                              if (item.isActive) {
                                if (
                                  data.getADeviceManager?.__typename ===
                                  'DeviceManagerDeviceProfiles'
                                ) {
                                  const guestProfile =
                                    data.getADeviceManager.DeviceProfiles?.find(
                                      item =>
                                        item.ProfileType === ProfileType.Guest,
                                    )
                                  switchDeviceProfileMutation({
                                    variables: {
                                      profileId: String(
                                        guestProfile?.profileId,
                                      ),
                                    },
                                    onCompleted: data => {
                                      if (
                                        data?.switchDeviceProfile
                                          ?.__typename ===
                                        'AuthorizationDeviceProfile'
                                      ) {
                                        const deviceManager =
                                          data.switchDeviceProfile as AuthorizationDeviceProfile
                                        AuthorizationReactiveVar(deviceManager)
                                        setTimeout(
                                          () =>
                                            router.push({
                                              pathname:
                                                '/(app)/hometab/venuefeed',
                                            }),
                                          1000,
                                        )
                                      } else if (
                                        data.switchDeviceProfile?.__typename ===
                                        'Error'
                                      ) {
                                        router.push({
                                          pathname:
                                            '/(credential)/logincredentialstack/loginpassword',
                                          params: {
                                            username:
                                              item.Profile
                                                ?.IdentifiableInformation
                                                ?.username,
                                            photo:
                                              item.Profile?.profilePhoto?.url,
                                            profileid: item.Profile?.id,
                                          },
                                        })
                                      }
                                    },
                                  })
                                }
                              } else {
                                switchDeviceProfileMutation({
                                  variables: {
                                    profileId: String(item.Profile?.id),
                                  },
                                  onCompleted: data => {
                                    if (
                                      data?.switchDeviceProfile?.__typename ===
                                      'AuthorizationDeviceProfile'
                                    ) {
                                      const deviceManager =
                                        data.switchDeviceProfile as AuthorizationDeviceProfile
                                      AuthorizationReactiveVar(deviceManager)
                                      setTimeout(
                                        () =>
                                          router.push({
                                            pathname:
                                              '/(app)/hometab/venuefeed',
                                          }),
                                        1000,
                                      )
                                    } else if (
                                      data.switchDeviceProfile?.__typename ===
                                      'Error'
                                    ) {
                                      router.push({
                                        pathname:
                                          '/(credential)/logincredentialstack/loginpassword',
                                        params: {
                                          username:
                                            item.Profile
                                              ?.IdentifiableInformation
                                              ?.username,
                                          photo:
                                            item.Profile?.profilePhoto?.url,
                                          profileid: item.id,
                                        },
                                      })
                                    }
                                  },
                                })
                              }
                            }}>
                            <Box className="light:bg-light-200 my-2 flex-1 flex-row items-center rounded-md px-3 py-3 dark:bg-light-800">
                              <HStack className="items-center justify-between">
                                <View style={{marginRight: 8}}>
                                  <View style={{width: 30}}>
                                    {item.isActive ? (
                                      <Ionicons
                                        name="checkmark-circle"
                                        size={20}
                                        color={
                                          rTheme.theme?.gluestack.tokens.colors
                                            .success600
                                        }
                                      />
                                    ) : (
                                      <MaterialIcons
                                        name="radio-button-unchecked"
                                        size={20}
                                        color={
                                          rTheme.theme?.gluestack.tokens.colors
                                            .green400
                                        }
                                      />
                                    )}
                                  </View>
                                </View>
                                {item?.Profile.profilePhoto ? (
                                  <Image
                                    placeholder={
                                      item.Profile.profilePhoto.blurhash
                                    }
                                    source={{
                                      uri: item.Profile.profilePhoto.url,
                                    }}
                                    style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: 10,
                                    }}
                                    alt={'Profile photo'}
                                  />
                                ) : (
                                  <Box className="h-[40px] w-[40px] justify-center rounded-md bg-light-200 dark:bg-light-700">
                                    <Center>
                                      <Ionicons
                                        color={
                                          rTheme.colorScheme === 'light'
                                            ? rTheme.theme?.gluestack.tokens
                                                .colors.light900
                                            : rTheme.theme?.gluestack.tokens
                                                .colors.light100
                                        }
                                        size={20}
                                        name={'person'}
                                      />
                                    </Center>
                                  </Box>
                                )}
                                <VStack className="mx-2 flex-1 justify-center">
                                  <Text numberOfLines={1} className="text-lg">
                                    {
                                      item.Profile?.IdentifiableInformation
                                        ?.fullname
                                    }
                                  </Text>
                                  <Text className="text-md font-bold">
                                    @
                                    {
                                      item.Profile?.IdentifiableInformation
                                        ?.username
                                    }
                                  </Text>
                                </VStack>
                              </HStack>
                            </Box>
                          </Pressable>
                          <Button
                            variant="link"
                            onPress={() => {
                              router.push({
                                pathname: `/(app)/modal/devicemanager/${item.Profile?.id}`,
                              })
                              router.dismiss()
                            }}
                            ref={ref}
                            size="xs"
                            hitSlop={10}>
                            <Entypo
                              name={'dots-three-vertical'}
                              size={23}
                              color={
                                rTheme.colorScheme === 'light'
                                  ? rTheme.theme?.gluestack.tokens.colors
                                      .light900
                                  : rTheme.theme?.gluestack.tokens.colors
                                      .light100
                              }
                            />
                          </Button>
                        </HStack>
                      )

                    default:
                      break
                  }
                })}
              </>
            ) : null}
            <Button
              onPress={() => {
                router.dismiss()
                setTimeout(() => {
                  router.replace({
                    pathname:
                      '/(credential)/logincredentialstack/authenticator',
                  })
                }, 0)
              }}
              className="light:bg-light-200 mt-5 h-[50px] w-[100%] items-center rounded-md pr-3 dark:bg-light-800">
              <Ionicons
                name={'add-circle-outline'}
                size={20}
                color={rTheme.theme?.gluestack.tokens.colors.light100}
              />
              <ButtonText className="text-lg font-medium">
                Add Account
              </ButtonText>
            </Button>
          </Center>
        </View>
      </SafeAreaView>
    )
  }
}

import {useRef} from 'react'
import {View} from 'react-native'
import {Image} from 'expo-image'
import {useRouter} from 'expo-router'
// TODO: FN(What functionality was suppose to be here)
import {useReactiveVar} from '@apollo/client'
import {Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons'
import {FlashList} from '@shopify/flash-list'
import {Skeleton} from 'moti/skeleton'

import {REFRESH_DEVICE_MANAGER_QUERY} from '#/graphql/DM/managing/devicemanager/index.query'
import {
  ProfileType,
  useGetADeviceManagerQuery,
  useRefreshDeviceManagerQuery,
  useSwitchDeviceProfileMutation,
} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Center} from '#/src/components/ui/center'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

export default function DeviceManager() {
  const ref = useRef(null)
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const {data, loading} = useGetADeviceManagerQuery({
    fetchPolicy: 'network-only',
  })

  const {data: rdmData} = useRefreshDeviceManagerQuery({
    fetchPolicy: 'cache-and-network',
  })

  const [switchDeviceProfileMutation] = useSwitchDeviceProfileMutation({
    update: (cache, {data}) => {
      if (
        data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile'
      ) {
        if (
          rdmData?.refreshDeviceManager?.__typename ===
          'AuthorizationDeviceProfile'
        ) {
          cache.writeQuery({
            query: REFRESH_DEVICE_MANAGER_QUERY,
            data: {
              refreshDeviceManager: {
                ...data.switchDeviceProfile,
              },
            },
          })
        }
      }
    },
  })

  if (loading) {
    return (
      <VStack space={'md'} className="my-5 rounded-md px-2">
        {[...Array(3)].map((_, index) => {
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
    const onPressRouteToLogin = () => {
      router.dismiss()
      setTimeout(() => {
        router.replace({
          pathname: '/(credential)/logincredentialstack/authenticator',
        })
      }, 0)
    }

    return (
      <View style={{flex: 1, marginTop: 20}}>
        <FlashList
          data={data.getADeviceManager.DeviceProfiles}
          estimatedItemSize={80}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            switch (item.Profile?.ProfileType) {
              case ProfileType.Guest:
                return null
              case ProfileType.Personal:
                const onPress = () => {
                  if (item.isActive) {
                    if (
                      data.getADeviceManager?.__typename ===
                      'DeviceManagerDeviceProfiles'
                    ) {
                      const guestProfile =
                        data.getADeviceManager.DeviceProfiles?.find(
                          item => item.ProfileType === ProfileType.Guest,
                        )
                      switchDeviceProfileMutation({
                        variables: {
                          profileId: String(guestProfile?.profileId),
                        },
                        onCompleted: data => {
                          if (
                            data?.switchDeviceProfile?.__typename ===
                            'AuthorizationDeviceProfile'
                          ) {
                            setTimeout(() => {
                              router.dismiss()
                              router.push({
                                pathname: '/(app)/hometab/venuefeed',
                              })
                            }, 500)
                          } else if (
                            data.switchDeviceProfile?.__typename === 'Error'
                          ) {
                            router.push({
                              pathname:
                                '/(credential)/logincredentialstack/loginpassword',
                              params: {
                                username:
                                  item.Profile?.IdentifiableInformation
                                    ?.username,
                                photo: item.Profile?.profilePhoto?.url,
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
                          setTimeout(() => {
                            router.dismiss()
                            router.push({
                              pathname: '/(app)/hometab/venuefeed',
                            })
                          }, 500)
                        } else if (
                          data.switchDeviceProfile?.__typename === 'Error'
                        ) {
                          router.push({
                            pathname:
                              '/(credential)/logincredentialstack/loginpassword',
                            params: {
                              username:
                                item.Profile?.IdentifiableInformation?.username,
                              photo: item.Profile?.profilePhoto?.url,
                              profileid: item.id,
                            },
                          })
                        }
                      },
                    })
                  }
                }
                return (
                  <HStack className="flex-1 mx-3 light:bg-light-200 h-[80px] items-center rounded-md dark:bg-light-800">
                    <Pressable
                      accessibilityRole="button"
                      onPress={onPress}
                      className="flex-1">
                      <HStack className="my-2 justify-start flex-1 items-center px-3 py-3">
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
                                  rTheme.theme?.gluestack.tokens.colors.green400
                                }
                              />
                            )}
                          </View>
                        </View>
                        {item?.Profile.profilePhoto ? (
                          <Image
                            placeholder={item.Profile.profilePhoto.blurhash}
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
                                    ? rTheme.theme?.gluestack.tokens.colors
                                        .light900
                                    : rTheme.theme?.gluestack.tokens.colors
                                        .light100
                                }
                                size={20}
                                name={'person'}
                              />
                            </Center>
                          </Box>
                        )}
                        <VStack className="mx-2 justify-center">
                          <Text numberOfLines={1} className="text-lg">
                            {item.Profile?.IdentifiableInformation?.fullname}
                          </Text>
                          <Text className="text-md font-bold">
                            @{item.Profile?.IdentifiableInformation?.username}
                          </Text>
                        </VStack>
                      </HStack>
                    </Pressable>
                    <Button
                      variant="link"
                      onPress={() => {
                        router.push({
                          params: {
                            profileid: String(item.Profile?.id),
                          },
                          pathname: `/(app)/modal/devicemanager/[profileid]`,
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
                            ? rTheme.theme?.gluestack.tokens.colors.light900
                            : rTheme.theme?.gluestack.tokens.colors.light100
                        }
                      />
                    </Button>
                  </HStack>
                )
              default:
                return null
            }
          }}
          ListFooterComponent={() => {
            return (
              <View style={{flex: 1, width: '90%'}}>
                <Button
                  onPress={onPressRouteToLogin}
                  className="light:bg-light-200 mt-5 h-[50px] self-center w-[95%] rounded-md dark:bg-light-800">
                  <Ionicons
                    name={'add-circle-outline'}
                    size={20}
                    color={rTheme.theme?.gluestack.tokens.colors.light100}
                  />
                  <ButtonText className="text-lg font-medium color-light-900 dark:color-light-100">
                    Add Account
                  </ButtonText>
                </Button>
              </View>
            )
          }}
        />
      </View>
    )
  }
}

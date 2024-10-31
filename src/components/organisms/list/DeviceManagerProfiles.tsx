import {Entypo} from '@expo/vector-icons'
import {useRouter} from 'expo-router'
import {Skeleton} from 'moti/skeleton'
import {Key, useRef} from 'react'

import {REFRESH_DEVICE_MANAGER_QUERY} from '#/graphql/DM/managing/devicemanager/index.query'
import {
  AppType,
  ProfileType,
  useGetADeviceManagerQuery,
  useRefreshDeviceManagerQuery,
  useSwitchDeviceProfileMutation,
} from '#/graphql/generated'
import {Button} from '#/src/components/ui/button'
import {Center} from '#/src/components/ui/center'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

const DeviceManagerProfiles = () => {
  const ref = useRef(null)
  const router = useRouter()

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

  const switchProfile = (item: {
    __typename?: 'AuthorizationDeviceProfile' | undefined
    id: any
    AppType?: AppType
    ProfileType?: ProfileType
    isActive: any
    deviceManagerId?: string
    profileId?: string
    createdAt?: any
    updatedAt?: any
    DeviceManager?: {__typename?: 'DeviceManager'; id: string}
    Profile: any
  }) => {
    if (item.isActive) {
      if (
        data?.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles'
      ) {
        const guestProfile = data.getADeviceManager.DeviceProfiles?.find(
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
                if (router.canDismiss()) {
                  router.dismiss()
                }
                router.push({
                  pathname: '/(app)/hometab/venuefeed',
                })
              }, 500)
            } else if (data.switchDeviceProfile?.__typename === 'Error') {
              if (router.canDismiss()) {
                router.dismiss()
              }
              router.push({
                pathname: '/(credential)/logincredentialstack/loginpassword',
                params: {
                  username: item.Profile?.IdentifiableInformation?.username,
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
              if (router.canDismiss()) {
                router.dismiss()
              }
              router.push({
                pathname: '/(app)/hometab/venuefeed',
              })
            }, 500)
          } else if (data.switchDeviceProfile?.__typename === 'Error') {
            if (router.canDismiss()) {
              router.dismiss()
            }
            router.push({
              pathname: '/(credential)/logincredentialstack/loginpassword',
              params: {
                username: item.Profile?.IdentifiableInformation?.username,
                photo: item.Profile?.profilePhoto?.url,
                profileid: item.id,
              },
            })
          }
        },
      })
    }
  }

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
              // colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
              // colors={
              //   rTheme.colorScheme === 'light'
              //     ? [
              //         String(rTheme.theme?.gluestack.tokens.colors.light100),
              //         String(rTheme.theme?.gluestack.tokens.colors.light300),
              //       ]
              //     : [
              //         String(rTheme.theme?.gluestack.tokens.colors.light900),
              //         String(rTheme.theme?.gluestack.tokens.colors.light700),
              //       ]
              // }
            />
          )
        })}
      </VStack>
    )
  }

  if (gadmData?.getADeviceManager?.__typename === 'Error') {
    return null
  }

  if (data?.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
    return (
      <Center>
        {data.getADeviceManager.DeviceProfiles?.length ? (
          <>
            {data.getADeviceManager.DeviceProfiles?.map(
              (
                item: {
                  Profile: any
                  id: any
                  __typename?: 'AuthorizationDeviceProfile' | undefined
                  AppType?: AppType | undefined
                  ProfileType?: ProfileType | undefined
                  isActive?: any
                  deviceManagerId?: string | undefined
                  profileId?: string | undefined
                  createdAt?: any
                  updatedAt?: any
                  DeviceManager?:
                    | {__typename?: 'DeviceManager'; id: string}
                    | undefined
                },
                index: Key | null | undefined,
              ) => {
                if (item.Profile?.ProfileType === ProfileType.Guest) return null
                return (
                  <HStack key={index} className="h-[80px] items-center">
                    <Pressable
                      accessibilityRole="button"
                      className="flex-1"
                      key={item.id}
                      onPress={() => switchProfile(item)}>
                      <Text>
                        {item.Profile?.IdentifiableInformation?.firstname}
                      </Text>
                      <Heading>
                        {item.Profile?.IdentifiableInformation?.username}
                      </Heading>
                    </Pressable>
                    <Center className="h-[300px]">
                      <Button
                        variant="link"
                        onPress={() =>
                          router.push(
                            `/modal/devicemanager/${item.Profile?.id}`,
                          )
                        }
                        ref={ref}
                        size="xs"
                        hitSlop={10}>
                        <Entypo
                          name={'dots-three-vertical'}
                          size={23}
                          color={'#000'}
                          // color={
                          //   rTheme.colorScheme === 'light'
                          //     ? rTheme.theme?.gluestack.tokens.colors.light900
                          //     : rTheme.theme?.gluestack.tokens.colors.light100
                          // }
                        />
                      </Button>
                    </Center>
                  </HStack>
                )
              },
            )}
          </>
        ) : null}
      </Center>
    )
  }
}

export default DeviceManagerProfiles

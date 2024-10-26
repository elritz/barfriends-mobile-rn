import {Center} from '#/src/components/ui/center'
import {Pressable} from '#/src/components/ui/pressable'
import {HStack} from '#/src/components/ui/hstack'
import {Button} from '#/src/components/ui/button'
import {Text} from '#/src/components/ui/text'
import {useReactiveVar} from '@apollo/client'
import {Entypo} from '@expo/vector-icons'
import {
  AuthorizationDeviceProfile,
  ProfileType,
  useGetADeviceManagerQuery,
  useRemoveDeviceProfileFromDeviceManagerMutation,
  useSwitchDeviceProfileMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {useRouter} from 'expo-router'
import {useRef, useState} from 'react'

const DeviceManagerProfiles = () => {
  const ref = useRef(null)
  const router = useRouter()
  const [profiles, setProfiles] =
    useState<Partial<AuthorizationDeviceProfile>[]>()
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const {data, loading, error} = useGetADeviceManagerQuery({
    fetchPolicy: 'network-only',
    onCompleted: data => {
      if (
        data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles'
      ) {
        setProfiles(
          (data?.getADeviceManager
            ?.DeviceProfiles as Partial<AuthorizationDeviceProfile>[]) ?? [],
        )
      }
    },
  })

  const [
    removeDeviceProfileFromDeviceManagerMutation,
    {data: RDPFDMData, loading: RDPFDMLoading, error: RDPFDMError},
  ] = useRemoveDeviceProfileFromDeviceManagerMutation()

  const [
    switchDeviceProfileMutation,
    {data: SWDPData, loading: SWDPLoading, error: SWDPError},
  ] = useSwitchDeviceProfileMutation({
    onCompleted: async data => {
      if (
        data.switchDeviceProfile?.__typename == 'AuthorizationDeviceProfile'
      ) {
        const deviceProfile =
          data.switchDeviceProfile as AuthorizationDeviceProfile
        AuthorizationReactiveVar(deviceProfile)
      }
    },
  })
  const switchProfile = item => {
    console.log('🚀 ~ switchPrrofile ~ item.Profile.id:', item.Profile.id)
    switchDeviceProfileMutation({
      variables: {
        profileId: item.Profile.id,
      },
    })
  }
  if (loading) return null

  return (
    <Center>
      {profiles?.length ? (
        <>
          {profiles?.map((item, index) => {
            if (item.Profile?.ProfileType === ProfileType.Guest) return null
            return (
              <HStack key={index} className="h-[80px] items-center">
                <Pressable key={item.id} onPress={() => switchProfile(item)}>
                  <Text>{item.Profile?.name}</Text>
                  {/* <DeviceManagerProfileItemLarge
                    item={item.Profile}
                    loading={SWDPLoading}
                  {/* <DeviceManagerProfileItemLarge
                    item={item.Profile}
                    loading={SWDPLoading}
                  /> */}
                </Pressable>
                <Center className="h-[300px]">
                  <Button
                    variant="link"
                    onPress={() =>
                      router.push(`/modal/devicemanager/${item.Profile?.id}`)
                    }
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
                </Center>
              </HStack>
            )
          })}
        </>
      ) : null}
    </Center>
  )
}

export default DeviceManagerProfiles

import {useState} from 'react'
import {Pressable, ScrollView} from 'react-native'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'

import {
  AuthorizationDeviceProfile,
  ProfileType,
  useGetADeviceManagerQuery,
  useSwitchDeviceProfileMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'

export default () => {
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const [profiles, setProfiles] = useState<AuthorizationDeviceProfile[]>([])

  const iconcolor =
    rTheme.colorScheme === 'light'
      ? rTheme.theme?.gluestack.tokens.colors.light900
      : rTheme.theme?.gluestack.tokens.colors.light100

  useGetADeviceManagerQuery({
    fetchPolicy: 'network-only',
    onError: error => {},
    onCompleted: data => {
      if (
        data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles'
      ) {
        const deviceProfiles = data?.getADeviceManager
          ?.DeviceProfiles as AuthorizationDeviceProfile[]
        setProfiles(deviceProfiles)
      }
    },
  })

  const [
    switchDeviceProfileMutation,
    {data: SWDPData, loading: SWDPLoading, error: SWDPError},
  ] = useSwitchDeviceProfileMutation({
    onCompleted: data => {
      if (
        data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile'
      ) {
        const deviceManager =
          data.switchDeviceProfile as AuthorizationDeviceProfile
        AuthorizationReactiveVar(deviceManager)
        setTimeout(() => router.replace('/(app)/hometab/venuefeed'), 1000)
      }
    },
  })

  const switchProfile = () => {
    const guestProfile = profiles.filter(
      item => item?.Profile?.ProfileType === ProfileType.Guest,
    )
    switchDeviceProfileMutation({
      variables: {
        profileId: String(guestProfile[0]?.Profile?.id),
      },
    })
  }

  const RoundedListItem = ({children, ...props}) => (
    <Pressable accessibilityRole="button" onPress={props.onPress}>
      <Box className="flex-column h-[60px] items-start bg-transparent px-2 py-3">
        {children}
      </Box>
    </Pressable>
  )

  console.log(
    '!!(rAuthorizationVar?.Profile?. ',
    !(rAuthorizationVar?.Profile?.ProfileType === 'GUEST'),
  )

  const account = [
    {
      title:
        rAuthorizationVar?.Profile?.ProfileType === 'PERSONAL'
          ? 'Edit Profile'
          : 'Edit Venue',
      onPress: () => {
        rAuthorizationVar?.Profile?.ProfileType === 'PERSONAL'
          ? router.push({
              pathname: '/(app)/settings/profilesettings/personal',
            })
          : router.push({
              pathname: '/(app)/settings/profilesettings/venue',
            })
      },
      icon: (
        <Ionicons name="person-circle-outline" size={25} color={iconcolor} />
      ),
    },
    {
      title: 'Notifications',
      onPress: () => {
        router.push({
          pathname: '/(app)/settings/notificationssettingsscreen',
        })
      },
      icon: (
        <Ionicons
          size={25}
          color={iconcolor}
          name="notifications-circle-outline"
        />
      ),
    },
    {
      title: 'QR code',
      onPress: () => {
        console.log('//TODO: QR Code ')
      },
      icon: (
        <Ionicons
          name="qr-code"
          size={20}
          style={{
            marginLeft: 2,
          }}
          color={iconcolor}
        />
      ),
    },
    {
      title: 'Security',
      onPress: () => {
        router.push({
          pathname: '/(app)/settings/notificationssettingsscreen',
        })
      },
      icon: (
        <Ionicons name="shield-checkmark-outline" size={23} color={iconcolor} />
      ),
    },
    {
      title: 'Appearance',
      onPress: () => {
        router.push({
          pathname: '/(app)/settings/appearancesettingsscreen',
        })
      },
      icon: <Ionicons name={'color-palette'} color={iconcolor} size={24} />,
    },
  ]

  const actions = [
    {
      title: `Add account`,
      onPress: () => {
        router.replace({
          pathname: '/(credential)/logincredentialstack/authenticator',
        })
      },
    },
    rAuthorizationVar?.Profile?.ProfileType !== 'GUEST' && {
      title: `Log Out ${rAuthorizationVar?.Profile?.IdentifiableInformation?.username}`,
      onPress: () => {
        switchProfile()
      },
    },
  ]

  return (
    <ScrollView
      style={{
        marginVertical: 4,
      }}>
      <Heading className="h-[30px] px-2">Account</Heading>
      {/* Edit Profile */}
      {account.map((item, index) => {
        return (
          <RoundedListItem key={index} onPress={item.onPress}>
            <HStack space={'md'} className="items-center">
              {item.icon}
              <Text className="text-lg font-bold">{item.title}</Text>
            </HStack>
          </RoundedListItem>
        )
      })}
      {/* Logins */}
      <Heading className="h-[30px] px-2">Logins</Heading>
      {actions.map((item, index) => {
        if (!item) return null
        return (
          <RoundedListItem key={index} onPress={item.onPress}>
            <HStack className="h-[55px] w-full items-center px-2">
              <Text className="text-lg font-bold text-primary-500">
                {item.title}
              </Text>
            </HStack>
          </RoundedListItem>
        )
      })}
    </ScrollView>
  )
}

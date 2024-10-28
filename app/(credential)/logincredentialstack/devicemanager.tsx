import {SafeAreaView, ScrollView, View} from 'react-native'
import {useLocalSearchParams, useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'

import {
  AuthorizationDeviceProfile,
  Maybe,
  useAuthorizedProfilesQuery,
  useSwitchDeviceProfileMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'

export default () => {
  const router = useRouter()
  const params = useLocalSearchParams()
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

  const {data, loading} = useAuthorizedProfilesQuery({
    skip: !params.authenticator && !params.authenticator,
    fetchPolicy: 'network-only',
    variables: {
      where: {
        profiles: {
          email: String(params.authenticator),
          Phone: {
            number: String(params.authenticator).replace(/\D/g, ''),
          },
        },
      },
    },
  })

  const [switchDeviceProfileMutation, {loading: SWDPLoading}] =
    useSwitchDeviceProfileMutation({})

  const _press = (item: {
    id: Maybe<string> | undefined
    IdentifiableInformation: {username: any}
    profilePhoto: {url: any}
  }) => {
    if (rAuthorizationVar?.Profile?.id !== item.id) {
      switchDeviceProfileMutation({
        variables: {
          profileId: item.id,
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
                  pathname: '/(app)/hometab/venuefeed',
                }),
              1000,
            )
          } else if (data.switchDeviceProfile?.__typename === 'Error') {
            router.push({
              pathname: '/(credential)/logincredentialstack/loginpassword',
              params: {
                username: item.IdentifiableInformation?.username,
                photo: item.profilePhoto?.url,
                profileid: item.id,
              },
            })
          }
        },
      })
    }
  }

  if (loading) {
    return null
  }

  if (data?.authorizedProfiles?.__typename === 'Error') {
    return (
      <Box>
        <Heading className="text-xl">Error finding profiles</Heading>
      </Box>
    )
  }

  if (data?.authorizedProfiles?.__typename === 'ProfilesResponse') {
    const emailProfiles = data?.authorizedProfiles?.phone?.filter(item => {
      if (item.ProfileType === 'GUEST') {
        return null
      }
      return item
    })
    const phoneProfiles = data?.authorizedProfiles?.email?.filter(item => {
      if (item.ProfileType === 'GUEST') {
        return null
      }
      return item
    })

    const finalProfileArray = [...new Set([...emailProfiles, ...phoneProfiles])]

    return (
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <View style={{top: 0}}>
          <Text className="leading-2xl mt-4 text-2xl font-black">
            Your profiles
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyboardDismissMode="none"
          contentInset={{
            top: 20,
          }}>
          {finalProfileArray.map(item => {
            return (
              <Pressable
                accessibilityRole="button"
                disabled={loading || SWDPLoading}
                key={item.id}
                onPress={() => _press(item)}>
                <Text>Need to figure out the profile {item.id}</Text>
                {/* <DeviceManagerProfileItemLarge
                  item={item}
                  loading={SWDPLoading}
                /> */}
              </Pressable>
            )
          })}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

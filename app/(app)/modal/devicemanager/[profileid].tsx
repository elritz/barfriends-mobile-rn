import {SafeAreaView, ScrollView} from 'react-native'
import {useGlobalSearchParams, useRouter} from 'expo-router'

import {
  AuthorizationDeviceProfile,
  useRemoveDeviceProfileFromDeviceManagerMutation,
  useSwitchDeviceProfileMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

export default () => {
  const router = useRouter()
  const params = useGlobalSearchParams()

  const [switchDeviceProfileMutation] = useSwitchDeviceProfileMutation({
    onCompleted: data => {
      if (
        data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceProfile'
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
      }
    },
  })

  const [removeDeviceProfileMutation] =
    useRemoveDeviceProfileFromDeviceManagerMutation({
      variables: {
        profileId: String(params.profileid),
      },
      onCompleted: data => {
        switchDeviceProfileMutation({
          variables: {
            profileId: String(params.profileid),
          },
        })
      },
    })

  const actions = [
    {
      title: 'Remove from device',
      onPress: () => {
        removeDeviceProfileMutation()
      },
    },
    {
      title: 'Settings',
      onPress: () => {
        console.log('Navigate to the settings page')
      },
    },
    {
      title: 'Logout',
      onPress: () => {
        switchDeviceProfileMutation()
      },
    },
  ]

  const RoundedListItem: React.FC<{
    children: React.ReactNode
    onPress: () => void
  }> = ({children, ...props}) => (
    <Pressable accessibilityRole="button" onPress={props.onPress}>
      <Box className="flex-column h-[50px] items-start px-2 py-3">
        {children}
      </Box>
    </Pressable>
  )

  return (
    <SafeAreaView style={{flex: 1, margin: 10}}>
      <Heading className="h-[30px] px-2">Account Actions</Heading>
      <ScrollView
        style={{
          marginVertical: 4,
        }}>
        <VStack space="md" className="mt-4">
          {actions.map((item, index) => {
            return (
              <RoundedListItem key={index} onPress={item.onPress}>
                <Text className="text-lg font-bold text-primary-500">
                  {item.title}
                </Text>
              </RoundedListItem>
            )
          })}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}

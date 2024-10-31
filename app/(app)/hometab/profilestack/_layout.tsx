import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import {Stack, useRouter} from 'expo-router'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {ProfileType, useRefreshDeviceManagerQuery} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {Button} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

export default function _layout() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const onPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    router.push({
      pathname: `/(app)/modal/devicemanager/deviceprofilemanager`,
    })
  }
  const {data: rdmData, loading: rdmLoading} = useRefreshDeviceManagerQuery()

  if (rdmLoading) {
    return null
  }

  return (
    <Stack
      screenOptions={{
        headerTransparent: false,
        headerShown: true,
        // headerStyle: {
        //   backgroundColor:
        //     rTheme.colorScheme === 'light'
        //       ? rTheme.theme?.gluestack.tokens.colors.light100
        //       : rTheme.theme?.gluestack.tokens.colors.light900,
        // },
      }}>
      <Stack.Screen
        name={'personalprofile'}
        options={{
          header: () => {
            if (
              rdmData?.refreshDeviceManager?.__typename ===
              'AuthorizationDeviceProfile'
            ) {
              if (
                rdmData?.refreshDeviceManager.Profile?.ProfileType ===
                ProfileType.Personal
              ) {
                return (
                  <VStack style={{marginTop: insets.top}} className="mt-5">
                    <HStack className="mx-2 justify-between pb-2">
                      <Box className="flex-1 justify-center">
                        <Button
                          className="ml-2 flex-1 items-center justify-start"
                          variant="link"
                          onPress={onPress}>
                          <Text className="max-w-[195px] text-2xl text-black dark:text-white text-ellipsis">
                            {
                              rdmData?.refreshDeviceManager.Profile
                                .IdentifiableInformation?.username
                            }
                          </Text>
                          <Ionicons
                            name={'chevron-down'}
                            size={26}
                            // color={
                            //   rTheme.colorScheme === 'light'
                            //     ? rTheme.theme?.gluestack.tokens.colors.light900
                            //     : rTheme.theme?.gluestack.tokens.colors.light100
                            // }
                            style={
                              {
                                // marginLeft: -10,
                              }
                            }
                          />
                        </Button>
                      </Box>
                      <Button
                        variant="link"
                        onPress={() =>
                          router.push({
                            pathname: '/(app)/settings',
                          })
                        }>
                        <MaterialCommunityIcons
                          name={'dots-horizontal'}
                          size={30}
                          // color={
                          //   rTheme.colorScheme === 'light'
                          //     ? rTheme.theme?.gluestack.tokens.colors.light900
                          //     : rTheme.theme?.gluestack.tokens.colors.light100
                          // }
                        />
                      </Button>
                    </HStack>
                  </VStack>
                )
              }

              return (
                <>
                  <VStack style={{marginTop: insets.top}} className="mt-[5]">
                    <HStack className="mx-2 justify-between pb-2">
                      <Heading className="font-extrabold text-3xl">
                        Barfriends
                      </Heading>
                    </HStack>
                  </VStack>
                </>
              )
            }
          },
        }}
      />
      <Stack.Screen name={'venueprofile'} />
    </Stack>
  )
}

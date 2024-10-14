import {VStack} from '#/src/components/ui/vstack'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Box} from '#/src/components/ui/box'
import {useReactiveVar} from '@apollo/client'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import * as Haptics from 'expo-haptics'
import {Stack, useRouter} from 'expo-router'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export default function _layout() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)

  return (
    <Stack
      screenOptions={{
        // gestureEnabled: false,
        headerTransparent: false,
        headerShown: true,
        headerStyle: {
          backgroundColor:
            rTheme.colorScheme === 'light'
              ? rTheme.theme?.gluestack.tokens.colors.light100
              : rTheme.theme?.gluestack.tokens.colors.light900,
        },
        header: () => (
          <VStack style={{paddingTop: insets.top}} className="mt-[5]">
            <HStack className="mx-2 justify-between pb-2">
              <Box className="flex-1 justify-center bg-transparent">
                {rAuthorizationVar?.Profile?.ProfileType === 'GUEST' ? (
                  <Heading className="text-xl font-black">Barfriends</Heading>
                ) : (
                  <Button
                    variant="link"
                    onPress={async () => {
                      await Haptics.impactAsync(
                        Haptics.ImpactFeedbackStyle.Heavy,
                      )
                      router.push({
                        pathname: `/(app)/modal/devicemanager/deviceprofilemanager`,
                      })
                    }}>
                    <HStack
                      space={'md'}
                      className="ml-2 flex-1 items-center justify-start">
                      <ButtonText
                        adjustsFontSizeToFit
                        ellipsizeMode={'tail'}
                        className="max-w-[195px] text-xl text-black dark:text-white">
                        {
                          rAuthorizationVar?.Profile?.IdentifiableInformation
                            ?.username
                        }
                      </ButtonText>
                      <Ionicons
                        name={'chevron-down'}
                        size={26}
                        color={
                          rTheme.colorScheme === 'light'
                            ? rTheme.theme?.gluestack.tokens.colors.light900
                            : rTheme.theme?.gluestack.tokens.colors.light100
                        }
                        style={{
                          marginLeft: -10,
                          // position: 'absolute',
                          // top: 3,
                          // right: -15,
                        }}
                      />
                    </HStack>
                  </Button>
                )}
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
                  color={
                    rTheme.colorScheme === 'light'
                      ? rTheme.theme?.gluestack.tokens.colors.light900
                      : rTheme.theme?.gluestack.tokens.colors.light100
                  }
                />
              </Button>
            </HStack>
          </VStack>
        ),
      }}>
      <Stack.Screen name={'personalprofile'} />
    </Stack>
  )
}

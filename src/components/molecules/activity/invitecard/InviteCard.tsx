import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'

import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import useEmojimoodTextColor from '#/hooks/useEmojiMoodTextContrast'
import {PermissionsReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import {ActivityCardProps} from '..'

const InviteCard: React.FC<ActivityCardProps> = ({
  isEmojimoodDynamic = false,
}) => {
  const router = useRouter()
  const rPerm = useReactiveVar(PermissionsReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const textColor = useEmojimoodTextColor({
    isEmojimoodDynamic: isEmojimoodDynamic,
  })

  const {data: rdmData} = useRefreshDeviceManagerQuery()

  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    return (
      <VStack className="mb-2 w-full flex-1 justify-between">
        <VStack className="mt-4 w-full items-start">
          <Box className="h-8 w-8 items-center justify-center rounded-md bg-red-300">
            <Ionicons
              name="people"
              size={23}
              color={
                rTheme.colorScheme === 'light'
                  ? rTheme.theme?.gluestack.tokens.colors.light900
                  : rTheme.theme?.gluestack.tokens.colors.light100
              }
            />
          </Box>
          <Heading
            style={{
              color: textColor,
            }}
            className="leading-xs mt-2 text-lg font-black uppercase">
            Share
          </Heading>
          <Text
            style={{
              color: textColor,
            }}>
            Invite to barfriends and to this venue
          </Text>
        </VStack>
        <Button
          size={'lg'}
          onPress={() => {
            rPerm?.contacts.granted
              ? router.push({
                  pathname: '/public/contacts',
                })
              : router.push({
                  pathname: '/(app)/permission/contacts',
                })
          }}
          className="mt-2 w-full items-center justify-center rounded-xl">
          <ButtonText>Invite</ButtonText>
        </Button>
      </VStack>
    )
  }
}

export default InviteCard

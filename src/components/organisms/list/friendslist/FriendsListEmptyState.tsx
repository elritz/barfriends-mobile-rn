import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'

import {PermissionsReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Heading} from '#/src/components/ui/heading'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'

export const FriendsListEmptyState = () => {
  const router = useRouter()
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const rPerm = useReactiveVar(PermissionsReactiveVar)

  return (
    <VStack
      space={'md'}
      className="my-5 items-center justify-center rounded-md p-5">
      <Box className="items-center bg-transparent">
        <Heading className="leading-xl px-2 text-center text-2xl">
          {`No barfriends\n Find your friends below`}
        </Heading>
      </Box>
      <VStack space={'md'} className="mt-4 w-full items-center">
        <Button
          size={'lg'}
          onPress={() =>
            router.push({
              pathname: '/(app)/permission/contacts',
            })
          }
          className="w-[100%]">
          <ButtonText className="text-lg font-bold">
            {rPerm?.contacts.granted ? 'All Contacts' : 'Use Contacts'}
          </ButtonText>
        </Button>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            router.push({
              pathname: '/(app)/explore/searchtext',
              params: {
                searchtext: '',
              },
            })
          }}
          className="w-[100%] flex-row items-center justify-center">
          <Ionicons
            name="search"
            size={20}
            color={
              rTheme.colorScheme === 'light'
                ? rTheme.theme?.gluestack.tokens.colors.light900
                : rTheme.theme?.gluestack.tokens.colors.light100
            }
          />
          <Text className="ml-2 text-lg font-bold">Search</Text>
        </Pressable>
      </VStack>
    </VStack>
  )
}

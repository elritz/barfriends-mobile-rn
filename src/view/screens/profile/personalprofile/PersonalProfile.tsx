import {VStack} from '#/src/components/ui/vstack'
import {Text} from '#/src/components/ui/text'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Box} from '#/src/components/ui/box'
import {View} from '#/src/components/ui/view'
import ProfilePhoto from '../profilephoto'
import {useReactiveVar} from '@apollo/client'
import CardPleaseSignup from '#/src/components/molecules/asks/signuplogin'
import {FriendsList} from '#/src/components/organisms/list/friendslist'
import QuickBarfriendCard from '#/src/components/molecules/activity/quickbarfriendcard/QuickBarfriendCard'
import AddRelationship from '#/src/components/molecules/activity/addrelationship/AddRelationship'
import {ProfileType} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import {DateTime} from 'luxon'
import RoundedBox from '#/src/components/molecules/activity/RoundedBox'

const PersonalScreen = () => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

  if (rAuthorizationVar?.Profile?.ProfileType === ProfileType.Guest) {
    return (
      <Box className="mx-3 flex-1">
        <CardPleaseSignup signupTextId={4} />
      </Box>
    )
  }

  return (
    <Box>
      <HStack space={'md'} className="mx-3 my-[20px] items-start">
        <VStack space="sm" className="flex-1  pr-2">
          <VStack space="sm" className="mt-3">
            <View>
              <VStack space="sm">
                <HStack className="justify-between">
                  <VStack className="relative ">
                    <Text
                      numberOfLines={1}
                      className="absolute -top-5 text-sm font-medium">
                      @
                      {
                        rAuthorizationVar?.Profile?.IdentifiableInformation
                          ?.username
                      }
                    </Text>
                    <Text
                      numberOfLines={2}
                      className="leading-2xl tracking-sm text-3xl font-bold">
                      {
                        rAuthorizationVar?.Profile?.IdentifiableInformation
                          ?.fullname
                      }
                    </Text>
                  </VStack>
                </HStack>
                <Heading
                  numberOfLines={1}
                  className="text-md leading-xs font-light">
                  {DateTime.fromISO(
                    rAuthorizationVar?.Profile?.IdentifiableInformation
                      ?.birthday,
                  ).toFormat('yyyy LLLL dd')}
                </Heading>
              </VStack>
            </View>
          </VStack>
        </VStack>
      </HStack>
      <VStack space={'md'} className="justify-around">
        <HStack space={'md'} className="justify-around">
          <RoundedBox>
            <QuickBarfriendCard
              color={'#ff7000'}
              showIcon={false}
              logosize={40}
              qrcodesize={140}
            />
          </RoundedBox>
          <AddRelationship />
        </HStack>
      </VStack>
      <Box className="mx-1">
        <FriendsList />
      </Box>
    </Box>
  )
}

export default PersonalScreen

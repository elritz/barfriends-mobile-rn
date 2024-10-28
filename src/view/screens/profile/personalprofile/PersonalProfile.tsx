import {DateTime} from 'luxon'

import {ProfileType, useRefreshDeviceManagerQuery} from '#/graphql/generated'
import AddRelationship from '#/src/components/molecules/activity/addrelationship/AddRelationship'
import QuickBarfriendCard from '#/src/components/molecules/activity/quickbarfriendcard/QuickBarfriendCard'
import RoundedBox from '#/src/components/molecules/activity/RoundedBox'
import CardPleaseSignup from '#/src/components/molecules/asks/signuplogin'
import {FriendsList} from '#/src/components/organisms/list/friendslist'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {View} from '#/src/components/ui/view'
import {VStack} from '#/src/components/ui/vstack'

const PersonalScreen = () => {
  const {data: rdmData, loading: rdmLoading} = useRefreshDeviceManagerQuery()

  if (rdmLoading) {
    return null
  }

  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    if (
      rdmData?.refreshDeviceManager.Profile?.ProfileType === ProfileType.Guest
    ) {
      return (
        <Box className="mx-3 flex-1">
          <CardPleaseSignup signupTextId={4} />
        </Box>
      )
    }
    if (
      rdmData?.refreshDeviceManager.Profile?.ProfileType ===
      ProfileType.Personal
    ) {
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
                            rdmData.refreshDeviceManager.Profile
                              .IdentifiableInformation?.username
                          }
                        </Text>
                        <Text
                          numberOfLines={2}
                          className="leading-2xl tracking-sm text-3xl font-bold">
                          {
                            rdmData.refreshDeviceManager.Profile
                              .IdentifiableInformation?.fullname
                          }
                        </Text>
                      </VStack>
                    </HStack>
                    <Heading
                      numberOfLines={1}
                      className="text-md leading-xs font-light">
                      {DateTime.fromISO(
                        rdmData.refreshDeviceManager.Profile
                          .IdentifiableInformation?.birthday,
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
  }
}

export default PersonalScreen

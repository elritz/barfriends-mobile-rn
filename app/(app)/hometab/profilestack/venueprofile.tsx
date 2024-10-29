import {useEffect} from 'react'
import {View} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import {DateTime} from 'luxon'

import {
  ProfileType,
  useGetNotificationsLazyQuery,
  useRefreshDeviceManagerQuery, // useGetNotificationsLazyQuery
} from '#/graphql/generated'
import {Box} from '#/src/components/ui/box'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import ProfilePhoto from '#/src/view/screens/profile/profilephoto'

export default () => {
  const insets = useContentInsets()

  const [getNotificationQuery, {loading: GNLoading}] =
    useGetNotificationsLazyQuery({
      fetchPolicy: 'network-only',
    })

  const {data: rdmData, loading: rdmLoading} = useRefreshDeviceManagerQuery()

  useEffect(() => {
    getNotificationQuery()
  }, [])

  if (rdmLoading || GNLoading) return null

  const PersonalProfilePhoto = () => {
    if (
      rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
    ) {
      switch (rdmData?.refreshDeviceManager?.Profile?.ProfileType) {
        case ProfileType.Guest:
          return null
        case ProfileType.Personal:
          return (
            <ProfilePhoto
              photo={rdmData?.refreshDeviceManager?.Profile?.profilePhoto}
            />
          )
        case ProfileType.Venue:
          return null
      }
      return null
    }
  }

  const DetailInformation = () => {
    if (
      rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
    ) {
      switch (rdmData?.refreshDeviceManager?.Profile?.ProfileType) {
        case ProfileType.Guest:
          return null
        case ProfileType.Personal:
          return (
            <HStack space={'md'} className="mx-3 my-[20px] items-start">
              <PersonalProfilePhoto />
              <VStack space="sm" className="flex-1  pr-2">
                <VStack space="sm" className="mt-3">
                  <View>
                    <VStack space="sm">
                      <HStack className="justify-between">
                        <VStack className="relative ">
                          <Text
                            numberOfLines={1}
                            className="absolute -top-5 text-md font-medium">
                            @
                            {
                              rdmData.refreshDeviceManager?.Profile
                                ?.IdentifiableInformation?.username
                            }
                          </Text>
                          <Text
                            numberOfLines={2}
                            className="leading-2xl tracking-sm text-3xl font-bold">
                            {
                              rdmData.refreshDeviceManager?.Profile
                                ?.IdentifiableInformation?.fullname
                            }
                          </Text>
                        </VStack>
                      </HStack>
                      <Heading
                        numberOfLines={1}
                        className="text-md leading-xs font-light">
                        {DateTime.fromISO(
                          rdmData.refreshDeviceManager?.Profile
                            ?.IdentifiableInformation?.birthday,
                        ).toFormat('yyyy LLLL dd')}
                      </Heading>
                    </VStack>
                  </View>
                </VStack>
              </VStack>
            </HStack>
          )
        case ProfileType.Venue:
          return null
      }
      return null
    }
  }

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      contentInset={{...insets, top: 0, bottom: 150}}
      data={[]}
      estimatedItemSize={100}
      renderItem={() => {
        return null
      }}
      ListHeaderComponent={() => {
        return (
          <View>
            <Box className="bg-transparent">
              <VStack space={'md'} className="justify-around">
                <DetailInformation />
              </VStack>
            </Box>
          </View>
        )
      }}
    />
  )
}

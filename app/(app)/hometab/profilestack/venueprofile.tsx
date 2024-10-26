import PreferenceNotificationPermission from '#/src/components/molecules/permissions/preferencenotificationpermission/PreferenceNotificationPermission'
import {
  ProfileType,
  useGetNotificationsLazyQuery,
  useRefreshDeviceManagerQuery, // useGetNotificationsLazyQuery
} from '#/graphql/generated'
import {FlashList} from '@shopify/flash-list'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import {useEffect} from 'react'
import {View} from 'react-native'
import AddRelationship from '#/src/components/molecules/activity/addrelationship/AddRelationship'
import {FriendsList} from '#/src/components/organisms/list/friendslist'
import {Box} from '#/src/components/ui/box'
import {HStack} from '#/src/components/ui/hstack'
import {VStack} from '#/src/components/ui/vstack'
import {Heading} from '#/src/components/ui/heading'
import {DateTime} from 'luxon'
import {Text} from '#/src/components/ui/text'
import ProfilePhoto from '#/src/view/screens/profile/profilephoto'

export default () => {
  const insets = useContentInsets()

  const [getNotificationQuery, {data: GNData, loading: GNLoading, error}] =
    useGetNotificationsLazyQuery({
      fetchPolicy: 'network-only',
      onCompleted: data => {},
    })

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery()

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
            <PreferenceNotificationPermission />
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

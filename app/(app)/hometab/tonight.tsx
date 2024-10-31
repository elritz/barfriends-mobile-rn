import {FlashList} from '@shopify/flash-list'
import {ScrollView} from 'react-native'

import {useRefreshDeviceManagerQuery} from '#/graphql/generated'
import AddEmoji from '#/src/components/molecules/activity/addemoji/AddEmoji'
import InviteCard from '#/src/components/molecules/activity/invitecard/InviteCard'
import JoinVenue from '#/src/components/molecules/activity/joinvenue/JoinVenue'
import QuickBarfriendCard from '#/src/components/molecules/activity/quickbarfriendcard/QuickBarfriendCard'
import RoundedBox from '#/src/components/molecules/activity/RoundedBox'
import CardPleaseSignup from '#/src/components/molecules/asks/signuplogin'
import {Box} from '#/src/components/ui/box'
import useContentInsets from '#/src/util/hooks/useContentInsets'
import EmojimoodGradient from '#/src/view/screens/tonight/EmojimoodGradient'
import Photos from '#/src/view/screens/tonight/photos'

const Tonight = () => {
  const contentInsets = useContentInsets()
  const {data: rdmData, loading: rdmLoading} = useRefreshDeviceManagerQuery({
    onCompleted(data) {
      if (
        data.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
      ) {
      }
    },
  })

  if (rdmLoading) {
    return null
  }

  if (
    rdmData?.refreshDeviceManager?.__typename ===
      'AuthorizationDeviceProfile' &&
    rdmData?.refreshDeviceManager.Profile?.ProfileType === 'GUEST'
  ) {
    return (
      <ScrollView
        contentInset={{
          ...contentInsets,
        }}
        automaticallyAdjustContentInsets>
        <Box className="mx-2 my-2 p-5 pt-10">
          <CardPleaseSignup signupTextId={1} />
        </Box>
      </ScrollView>
    )
  }

  if (
    rdmData?.refreshDeviceManager?.__typename === 'AuthorizationDeviceProfile'
  ) {
    return (
      <EmojimoodGradient>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}>
          <FlashList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 5,
            }}
            ListHeaderComponentStyle={{
              marginBottom: 20,
            }}
            contentInset={{
              ...contentInsets,
            }}
            ListHeaderComponent={() => {
              return <Photos isEmojimoodDynamic />
            }}
            data={[
              {
                _typename: 'addemoji',
                item: <AddEmoji isEmojimoodDynamic />,
              },
              {
                _typename: 'joinvenue',
                item: <JoinVenue isEmojimoodDynamic />,
              },
              {
                _typename: 'quickbarfriend',
                item: (
                  <QuickBarfriendCard
                    // color={rTheme.colorScheme === 'light' ? 'black' : 'white'}
                    showIcon={false}
                    logosize={40}
                    qrcodesize={140}
                    isEmojimoodDynamic
                  />
                ),
              },
              {
                _typename: 'invite',
                item: <InviteCard isEmojimoodDynamic />,
              },
            ]}
            numColumns={2}
            estimatedItemSize={200}
            renderItem={({item}) => {
              return <RoundedBox>{item.item}</RoundedBox>
            }}
          />
        </ScrollView>
      </EmojimoodGradient>
    )
  }
}

export default Tonight

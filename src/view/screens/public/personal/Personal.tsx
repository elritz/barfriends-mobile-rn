import {ScrollView} from 'react-native'
import {useRoute} from '@react-navigation/native'

import {Profile, useProfileQuery} from '#/graphql/generated'
import {VStack} from '#/src/components/ui/vstack'
import Actions from './actions/Actions'

const PersonalScreen = () => {
  const route = useRoute()

  const {data: PQData, loading: PQLoading} = useProfileQuery({
    skip: !(route.params as {username?: string})?.username,
    variables: {
      where: {
        IdentifiableInformation: {
          username: {
            equals: String((route.params as {username?: string})?.username),
          },
        },
      },
    },
  })

  if (PQLoading && !PQData?.profile) return null

  return (
    <ScrollView
      style={{
        paddingTop: 4,
        marginHorizontal: 3,
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}>
      {/* <Photos story={PQData?.profile?.tonightStory} photo={PQData?.profile?.photos[0]} /> */}
      {/* <ProfilePhoto /> */}
      <VStack space={'md'}>
        <Actions profile={PQData?.profile as Profile} />
      </VStack>
    </ScrollView>
  )
}

export default PersonalScreen

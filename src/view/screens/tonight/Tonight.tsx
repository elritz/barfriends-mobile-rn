import {ScrollView} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import AddEmoji from '#/src/components/molecules/activity/addemoji/AddEmoji'
import AddRelationship from '#/src/components/molecules/activity/addrelationship/AddRelationship'
import JoinVenue from '#/src/components/molecules/activity/joinvenue/JoinVenue'
import QuickBarfriendCard from '#/src/components/molecules/activity/quickbarfriendcard/QuickBarfriendCard'
import {VStack} from '#/src/components/ui/vstack'
import Photos from './photos'

const Tonight = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 90,
          right: 0,
        }}>
        {/* <TonightImages /> */}
        <Photos />
        <VStack space={'md'} className="mx-3 flex-wrap justify-around">
          <QuickBarfriendCard
            color={'#ff7000'}
            showIcon={false}
            logosize={40}
            qrcodesize={140}
          />
          <JoinVenue />
          <AddRelationship />
          <AddEmoji />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Tonight

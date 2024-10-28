import AddRelationship from '#/src/components//molecules/activity/addrelationship/AddRelationship'
import AddEmoji from '#/src/components/molecules/activity/addemoji/AddEmoji'
import JoinVenue from '#/src/components/molecules/activity/joinvenue/JoinVenue'
import QuickBarfriendCard from '#/src/components/molecules/activity/quickbarfriendcard/QuickBarfriendCard'
import {VStack} from '#/src/components/ui/vstack'

const ProfileActivityAndStatusCards = ({}) => {
  return (
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
  )
}
export default ProfileActivityAndStatusCards

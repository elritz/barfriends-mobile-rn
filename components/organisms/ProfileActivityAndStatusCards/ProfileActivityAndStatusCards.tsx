import { Box, HStack, VStack } from '@components/core'
import QuickBarfriendCard from '@components/screens/public/venue/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import AddEmoji from '@components/screens/tonight/activity/ask/AddEmoji/AddEmoji'
import AddRelationship from '@components/screens/tonight/activity/ask/AddRelationship/AddRelationship'
import JoinVenue from '@components/screens/tonight/activity/ask/JoinVenue/JoinVenue'

interface ProfileActivityAndStatusCardsProps {}

const ProfileActivityAndStatusCards = ({}) => {
	return (
		<VStack mx={'$3'} space={'md'} justifyContent={'space-around'} flexWrap='wrap'>
			<QuickBarfriendCard color={'#ff7000'} showIcon={false} logosize={40} qrcodesize={140} />
			<JoinVenue />
			<AddRelationship />
			<AddEmoji />
		</VStack>
	)
}
export default ProfileActivityAndStatusCards

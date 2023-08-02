import { useReactiveVar } from '@apollo/client'
import { Box } from '@components/core'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import InviteCard from '@components/screens/public/venue/venueactions/actioncards/invitecard/InviteCard'
import QuickBarfriendCard from '@components/screens/public/venue/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import AddEmoji from '@components/screens/tonight/activity/ask/AddEmoji/AddEmoji'
import JoinVenue from '@components/screens/tonight/activity/ask/JoinVenue/JoinVenue'
import Photos from '@components/screens/tonight/photos'
import { AuthorizationReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { LinearGradient } from 'expo-linear-gradient'

const Wrapper = ({ children }) => {
	return (
		<Box
			sx={{
				h: 200,
			}}
			flex={1}
			rounded='$lg'
			justifyContent={'center'}
			alignItems={'center'}
			overflow='hidden'
			px={'$5'}
			py={'$1'}
			m={'$2'}
		>
			{children}
		</Box>
	)
}

export default () => {
	const contentInsets = useContentInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	if (rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST') {
		return (
			<Box my={'$2'} p={'$5'} pt={'$10'}>
				<CardPleaseSignup signupTextId={1} />
			</Box>
		)
	}

	return (
		<LinearGradient
			style={{ flex: 1 }}
			colors={
				rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood
					? [...rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood.colors]
					: []
			}
		>
			<FlashList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 5,
				}}
				contentInset={{
					...contentInsets,
				}}
				ListHeaderComponent={() => {
					return <Photos />
				}}
				data={[
					{
						_typename: 'addemoji',
						item: <AddEmoji />,
					},
					{
						_typename: 'joinvenue',
						item: <JoinVenue />,
					},
					{
						_typename: 'quickbarfriend',
						item: (
							<QuickBarfriendCard color={'#ff7000'} showIcon={false} logosize={40} qrcodesize={140} />
						),
					},
					{
						_typename: 'invite',
						item: <InviteCard />,
					},
				]}
				numColumns={2}
				estimatedItemSize={200}
				renderItem={({ index, item }) => {
					return <Wrapper>{item.item}</Wrapper>
				}}
			/>
		</LinearGradient>
	)
}

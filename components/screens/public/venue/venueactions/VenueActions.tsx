// TODO: UX() Item need to be updated for messageboard route
// TODO: UX() Item need to be updated for Personal data, loading, error
import ActionCard from './ActionCard'
import DistanceCard from './actioncards/distancecard/DistanceCard'
import InviteCard from './actioncards/invitecard/InviteCard'
import QuickBarfriend from './actioncards/quickbarfriendcard/QuickBarfriendCard'
import UberCard from './actioncards/ubercard/UberCard'
import DevActions from './devactions/DevActions'
import { useReactiveVar } from '@apollo/client'
import { Box, HStack, VStack } from '@gluestack-ui/themed'
import { AuthorizationReactiveVar } from '#/reactive'
import { useLocalSearchParams } from 'expo-router'
import { uniqueId } from 'lodash'
import { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'

const VenueActions = () => {
	const numColumns = 2
	const { width } = useWindowDimensions()
	const itemPadding = width / numColumns - 65

	const params = useLocalSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [isJoined, setIsJoined] = useState(false)

	useEffect(() => {
		const out = rAuthorizationVar?.Profile?.Personal?.LiveOutPersonal?.Out.find(
			item => item.venueProfileId === String(params.venueProfileId),
		)
		if (out) {
			setIsJoined(true)
		}
	}, [rAuthorizationVar])

	return (
		<VStack flex={1} mt={'$1'}>
			<HStack style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
				{process.env.NODE_ENV === 'development' && (
					<Box w={'100%'} bg='$transparent' mt={'$4'}>
						<ActionCard key={uniqueId()} numColumns={1}>
							<DevActions />
						</ActionCard>
					</Box>
				)}

				{!isJoined && (
					<HStack px={'$2'} w={'100%'} space={'md'} mt={'$5'} >
						<ActionCard h={190} key={uniqueId()} numColumns={numColumns}>
							<UberCard />
						</ActionCard>
						<ActionCard h={190} key={uniqueId()} numColumns={numColumns}>
							<DistanceCard />
						</ActionCard>
					</HStack>
				)}

				{rAuthorizationVar?.Profile?.ProfileType !== 'GUEST' && (
					<HStack px={'$2'} w={'100%'} space={'md'} mt={'$5'}>
						<ActionCard h={200} key={uniqueId()} numColumns={numColumns}>
							<QuickBarfriend qrcodesize={itemPadding || 100} />
						</ActionCard>
						<ActionCard h={200} key={uniqueId()} numColumns={numColumns}>
							<InviteCard />
						</ActionCard>
					</HStack>
				)}
			</HStack>
		</VStack>
	)
}

export default VenueActions

import { Box } from '@gluestack-ui/themed'
import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import { Request } from '@graphql/generated'

interface Props<T> {
	data: T[] | undefined | null
	renderItem: (item: Request) => React.ReactNode
	keyExtractor: (item: T) => string
}

const CondensedVerticalFriendsNotficationsList = <T extends Request>({ data }: Props<T>) => {
	return (
		<>
			{data?.length ? (
				<Box
					flex={1}
					sx={{
						h: '100%',
					}}
					flexDirection={'column'}
					rounded={'$md'}
					overflow={'hidden'}
				>
					{data.map((item, index) => (
						<CondensedHorizontalFriendNotifciation key={index} item={item} />
					))}
				</Box>
			) : null}
		</>
	)
}

export default CondensedVerticalFriendsNotficationsList

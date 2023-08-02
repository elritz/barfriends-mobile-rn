import { Box, HStack, Heading, Text } from '@components/core'
import { useGetLiveVenueTotalsQuery } from '@graphql/generated'
import { useGlobalSearchParams } from 'expo-router'
import { uniqueId } from 'lodash'
import { useState } from 'react'
import { useWindowDimensions } from 'react-native'

type Totals = {
	name: 'friends' | 'total' | 'joined'
	value: number
}

export default function VenueTotals() {
	const params = useGlobalSearchParams()
	const { width } = useWindowDimensions()
	const numColumns = 3
	const itemPadding = (width / 33.33) * numColumns

	const [total, setTotal] = useState<Totals>({ name: 'total', value: 0 })
	const [friends, setFriends] = useState<Totals>({ name: 'friends', value: 0 })
	const [joined, setJoined] = useState<Totals>({ name: 'joined', value: 0 })

	const { data, loading, error } = useGetLiveVenueTotalsQuery({
		skip: !String(params.profileid),
		variables: {
			profileIdVenue: String(params.profileid),
		},
		onCompleted: async data => {
			if (data.getLiveVenueTotals) {
				setTotal({
					...total,
					value: data.getLiveVenueTotals.totaled ? data.getLiveVenueTotals.totaled.length : 0,
				})
				setJoined({
					...joined,
					value: data.getLiveVenueTotals.joined ? data.getLiveVenueTotals.joined.length : 0,
				})
			}
		},
	})

	return (
		<HStack
			style={{
				flexDirection: 'row',
				justifyContent: 'space-around',
			}}
			mt={'$3'}
			mx={'$1'}
		>
			{[friends, total, joined].map((item, index) => {
				return (
					<Box
						key={uniqueId()}
						sx={{
							_light: {
								bg: item.name !== 'friends' ? '$light200' : '$primary500',
								opacity: loading ? 50 : 100,
							},
							_dark: {
								bg: item.name !== 'friends' ? '$dark50' : '$primary500',
								opacity: loading ? 50 : 100,
							},
							height: 60,
							width: (width - itemPadding) / 3,
						}}
						rounded={'$xl'}
						alignItems='center'
						justifyContent='center'
					>
						<Heading numberOfLines={1} fontSize={'$3xl'} fontWeight='$black' sx={{ letterSpacing: 0.01 }}>
							{item.value}
						</Heading>
						<Text fontWeight={'$black'} lineHeight={'$xs'} fontSize={'$xs'} textTransform='uppercase'>
							{item.name}
						</Text>
					</Box>
				)
			})}
		</HStack>
	)
}

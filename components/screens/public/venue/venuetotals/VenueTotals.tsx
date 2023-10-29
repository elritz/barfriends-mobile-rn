import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { Box, Button, HStack, Heading, Text } from '@gluestack-ui/themed'
import { useGetLiveVenueTotalsQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { useGlobalSearchParams } from 'expo-router'
import { uniqueId } from 'lodash'
import { useState } from 'react'
import { Alert, Platform, Share, useWindowDimensions } from 'react-native'

type Totals = {
	name: 'friends' | 'total' | 'joined'
	value: number
}

export default function VenueTotals() {
	const params = useGlobalSearchParams()
	const { width } = useWindowDimensions()
	const numColumns = 3
	const itemPadding = (width / 33.33) * numColumns
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [total, setTotal] = useState<Totals>({ name: 'total', value: 0 })
	const [friends, setFriends] = useState<Totals>({ name: 'friends', value: 0 })
	const [joined, setJoined] = useState<Totals>({ name: 'joined', value: 0 })

	const link = `https://revel.com/app/public/venue?profileid=${params.profileid}`

	const onShare = async () => {
		try {
			const result = await Share.share(
				{
					message: 'Revel | The nightlife app',
					url: Platform.OS === 'ios' ? link : '',
				},
				{
					dialogTitle: 'Join me on Revel',
					subject: 'Invite to Revel',
				},
			)
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			Alert.alert(error.message)
		}
	}

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
			space='sm'
			mx={'$2'}
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
								bg: item.name !== 'friends' ? '$light800' : '$primary500',
								opacity: loading ? 50 : 100,
							},
							// height: 50,
							// width: (width - itemPadding) / 3.33,
							flex: 1
						}}
						p={'$1'}
						rounded={'$xl'}
						alignItems='center'
						justifyContent='space-around'
					>
						<Heading
							numberOfLines={1}
							fontSize={'$2xl'}
							lineHeight={'$xl'}
							fontWeight='$black'
							sx={{
								letterSpacing: 0.01,
								_light: { color: item.name === 'friends' ? '$white' : '$black' },
								_dark: { color: item.name === 'friends' ? '$white' : '$white' },
							}}
						>
							{item.value}
						</Heading>
						<Text
							fontWeight={'$black'}
							lineHeight={'$xs'}
							fontSize={'$xs'}
							textTransform='uppercase'
							sx={{
								_light: { color: item.name === 'friends' ? '$white' : '$black' },
								_dark: { color: item.name === 'friends' ? '$white' : '$white' },
							}}
						>
							{item.name}
						</Text>
					</Box>
				)
			})}
			<Button
				bg={'transparent'}
				onPress={onShare}
				alignSelf={'center'}
				variant={'solid'}
				size={'lg'}
				height={'$full'}
			>
				<Ionicons
					name={'share'}
					size={23}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
				/>
			</Button>
		</HStack>
	)
}

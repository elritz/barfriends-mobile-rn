import { useReactiveVar } from '@apollo/client'
import { Badge, BadgeText, Box, Button, HStack, Text, VStack } from '@gluestack-ui/themed'
import { usePublicVenueQuery } from '@graphql/generated'
import { SearchAreaReactiveVar } from '@reactive'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

type DetailTitleProps = {
	title: string
}

const DetailTitle = (props: DetailTitleProps) => {
	return (
		<Text fontSize={'$md'} fontWeight={'$extrabold'} py={'$2'}>
			{props.title}
		</Text>
	)
}

export default function Details() {
	const [showMore, setShowMore] = useState(false)
	const params = useLocalSearchParams()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const currentLocationCoords = rSearchAreaVar.useCurrentLocation
		? {
				currentLocationCoords: {
					latitude: Number(rSearchAreaVar.searchArea.coords.latitude),
					longitude: Number(rSearchAreaVar.searchArea.coords.longitude),
				},
		  }
		: null

	const { data, loading, error } = usePublicVenueQuery({
		skip: !params.username,
		fetchPolicy: 'cache-first',
		variables: {
			where: {
				IdentifiableInformation: {
					username: {
						equals: String(params.username),
					},
				},
			},
			...currentLocationCoords,
		},
	})

	if (loading || !data) {
		return null
	}

	return (
		<Box
			py={'$4'}
			px={'$2'}
			mx={'$2'}
			mt={'$5'}
			rounded={'$xl'}
			sx={{
				_dark: {
					bg: '$light800',
				},
				_light: {
					bg: '$light50',
				},
			}}
		>
			<VStack space={'lg'} flex={1}>
				<Box bg='$transparent'>
					<DetailTitle title={'Address'} />
					<Text fontSize={'$xl'} fontWeight={'$medium'}>
						{data?.publicVenue?.Venue?.Location?.Address?.formattedAddress}
					</Text>
				</Box>
				<Box bg={'transparent'}>
					<DetailTitle title={'Type'} />
					<HStack py={'$2'} space='xs' flexWrap='wrap'>
						{data.publicVenue?.DetailInformation?.Tags.map((item, index) => {
							return (
								<Badge
									key={item.id}
									size='lg'
									my={'$1'}
									p={'$2'}
									px={'$2'}
									variant='solid'
									borderRadius='$md'
									sx={{
										_dark: {
											bg: '$black',
										},
										_light: {
											bg: '$light200',
										},
									}}
								>
									<BadgeText
										textTransform='capitalize'
										fontSize={'$md'}
										sx={{
											_dark: {
												color: '$white',
											},
											_light: {
												color: '$black',
											},
										}}
									>
										{`${item.emoji}`}&nbsp;{`${item.name}`}
									</BadgeText>
								</Badge>
							)
						})}
					</HStack>
				</Box>
				<Box bg={'transparent'}>
					<DetailTitle title={'Capacity'} />
					<Text fontSize={'$2xl'} lineHeight={'$lg'} fontWeight={'$medium'}>
						{data?.publicVenue?.DetailInformation?.capacity}
					</Text>
				</Box>
				<Box bg={'transparent'} flex={1}>
					<DetailTitle title={'Description'} />
					{data?.publicVenue?.DetailInformation?.description ? (
						<Box bg={'transparent'}>
							{!showMore ? (
								<Text fontSize={'$lg'} numberOfLines={4}>
									{data.publicVenue.DetailInformation?.description}
								</Text>
							) : (
								<Text fontSize={'$lg'}>{data.publicVenue.DetailInformation?.description}</Text>
							)}
							<Button mt={'$2'} onPress={() => setShowMore(!showMore)} variant={'link'}>
								<Text>{showMore ? 'Show Less' : 'Show More'}</Text>
							</Button>
						</Box>
					) : (
						<Box bg={'transparent'}>
							<Text fontSize={'$lg'}>No description available</Text>
						</Box>
					)}
				</Box>
			</VStack>
		</Box>
	)
}

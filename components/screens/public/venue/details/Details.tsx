import { useReactiveVar } from '@apollo/client'
import { Badge, Box, Button, HStack, Text, VStack } from '@components/core'
import { useCurrentVenueQuery } from '@graphql/generated'
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

export default function Details(props) {
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

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !params.profileId,
		fetchPolicy: 'cache-first',
		variables: {
			where: {
				id: {
					equals: String(params.profileid),
				},
			},
			...currentLocationCoords,
		},
	})

	if (loading || !data) {
		return null
	}

	return (
		<Box py={'$4'} px={'$2'} mx={'$2'} mt={'$5'} rounded={'$xl'}>
			<VStack space={'lg'} flex={1}>
				<Box bg='$transparent'>
					<DetailTitle title={'Address'} />
					<Text fontSize={'$xl'} fontWeight={'$medium'}>
						{data?.currentVenue?.Venue?.Location?.Address?.formattedAddress}
					</Text>
				</Box>
				<Box bg={'transparent'}>
					<DetailTitle title={'Type'} />
					<HStack flexWrap={'wrap'} justifyContent={'flex-start'}>
						{data.currentVenue?.DetailInformation?.Tags.map((item, index) => {
							return (
								<Badge
									key={item.id}
									mx={'$1'}
									my={'$2'}
									px={'$3'}
									py={'$2'}
									sx={{
										_dark: {
											bg: '$black',
										},
										_light: {
											bg: '$gray200',
										},
									}}
									rounded={'$lg'}
								>
									<Badge.Text
										textTransform='capitalize'
										fontSize={'$md'}
										sx={{
											_dark: {
												color: '$white100',
											},
											_light: {
												color: '$dark100',
											},
										}}
									>{`${item.emoji} ${item.name}`}</Badge.Text>
								</Badge>
							)
						})}
					</HStack>
				</Box>
				<Box bg={'transparent'}>
					<DetailTitle title={'Capacity'} />
					<Text fontSize={'$2xl'} lineHeight={'$lg'} fontWeight={'$medium'}>
						{data?.currentVenue?.DetailInformation?.capacity}
					</Text>
				</Box>
				<Box bg={'transparent'} flex={1}>
					<DetailTitle title={'Description'} />
					{data?.currentVenue?.DetailInformation?.description ? (
						<Box bg={'transparent'}>
							{!showMore ? (
								<Text fontSize={'$lg'} numberOfLines={4}>
									{data.currentVenue.DetailInformation?.description}
								</Text>
							) : (
								<Text fontSize={'$lg'}>{data.currentVenue.DetailInformation?.description}</Text>
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

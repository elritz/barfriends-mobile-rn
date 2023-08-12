import { Box, Heading, Text } from '@components/core'
import MemoizedVerticalVenueFeedVenueItem from '@components/screens/venuesfeed/VerticalVenueFeedVenueItem'
import { useGetH3Index6VenueRecommendationByIdQuery } from '@graphql/generated'
import { MasonryFlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useLocalSearchParams } from 'expo-router'

export default function SearchExplore() {
	const params = useLocalSearchParams()
	const contentInsets = useContentInsets()
	console.log('params :>> ', params)

	const { data, loading, error } = useGetH3Index6VenueRecommendationByIdQuery({
		skip: !params.id,
		variables: {
			id: String(params.id),
		},
	})

	if (loading) return null

	const ListheaderComponent = () => {
		{
			data?.getH3Index6VenueRecommendationById?.Area?.State
		}
		return (
			<Box bg='$transparent'>
				<Heading fontSize={'$4xl'}>{data?.getH3Index6VenueRecommendationById?.Area?.City.name}</Heading>
				<Heading fontSize={'$xl'}>
					{data?.getH3Index6VenueRecommendationById?.Area?.Country.flag}
				</Heading>
				<Heading fontSize={'$xl'}>{data?.getH3Index6VenueRecommendationById?.Area?.State.name}</Heading>
				<Text fontSize={'$lg'}>searchareaexplore</Text>
			</Box>
		)
	}

	return (
		<Box bg={'$red700'} flex={1} px={'$2'}>
			<MasonryFlashList
				overScrollMode='always'
				refreshing={loading}
				showsVerticalScrollIndicator={false}
				numColumns={2}
				estimatedItemSize={100}
				scrollEnabled
				contentInset={{
					...contentInsets,
				}}
				data={data?.getH3Index6VenueRecommendationById?.venues}
				renderItem={({ item, index, columnIndex }) => (
					<MemoizedVerticalVenueFeedVenueItem
						showDistance={false}
						showJoin={false}
						index={index}
						item={item}
						columnIndex={columnIndex}
					/>
				)}
				ItemSeparatorComponent={() => <Box bg={'transparent'} h={'$5'} />}
				keyExtractor={item => item.id}
				ListHeaderComponent={<ListheaderComponent />}
				// ListFooterComponent={ListFooterComponent}
				automaticallyAdjustContentInsets
			/>
		</Box>
	)
}

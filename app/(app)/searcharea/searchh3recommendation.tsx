import { Box, Heading, Text } from '@components/core'
import MemoizedVerticalVenueFeedVenueItem from '@components/screens/venuesfeed/VerticalVenueFeedVenueItem'
import { useGetH3Index6VenueRecommendationByIdQuery } from '@graphql/generated'
import { MasonryFlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useLocalSearchParams } from 'expo-router'

export default function SearchH3Recommendation() {
	const params = useLocalSearchParams()
	const contentInsets = useContentInsets()

	const { data, loading, error } = useGetH3Index6VenueRecommendationByIdQuery({
		skip: !params.id || !params.venueprofileids,
		variables: {
			id: String(params.id),
			venuesProfileIds: JSON.parse(String(params.venueprofileids)),
		},
	})

	if (loading) return null

	const ListheaderComponent = () => {
		{
			data?.getH3Index6VenueRecommendationById?.Area?.State
		}
		return (
			<Box bg='$transparent'>
				<Heading lineHeight={'$4xl'} fontSize={'$4xl'}>
					{data?.getH3Index6VenueRecommendationById?.Area?.City.name}
				</Heading>
				<Heading fontSize={'$xl'}>
					{data?.getH3Index6VenueRecommendationById?.Area?.Country.flag}
					{data?.getH3Index6VenueRecommendationById?.Area?.State.name}
				</Heading>
			</Box>
		)
	}

	return (
		<Box flex={1} px={'$2'}>
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

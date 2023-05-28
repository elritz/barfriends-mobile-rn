import SearchCard from '../components/SearchCard'
import { useExploreSearchQuery } from '@graphql/generated'
import { FlashList } from '@shopify/flash-list'
import { useSearchParams } from 'expo-router'
import { Box, Center, Heading, ScrollView, Skeleton, View } from 'native-base'

export default function SearchAccounts() {
	const params = useSearchParams()

	const {
		data,
		loading: ESLoading,
		error,
	} = useExploreSearchQuery({
		fetchPolicy: 'cache-first',
		variables: {
			search: String(params.searchtext),
		},
		onCompleted: data => {
			console.log('data :>> ', data)
		},
	})

	if (ESLoading) {
		return (
			<FlashList
				numColumns={1}
				estimatedItemSize={15}
				data={[...Array(15)]}
				showsVerticalScrollIndicator={false}
				contentInset={{
					top: 20
				}}
				renderItem={({ item }) => {
					return (
						<Skeleton
							h={'65px'}
							w={'95%'}
							rounded={'md'}
							alignSelf={'center'}
						/>
					)
				}}
				ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
			/>
		)
	}

	if (!data?.exploreSearch.people.length) {
		return (
			<Box safeAreaTop>
				<Center>
					<Heading fontSize={'md'} fontWeight={'medium'}>
						No search results for
					</Heading>
					<Heading fontSize={'3xl'}>"{params.searchtext}"</Heading>
				</Center>
			</Box>
		)
	}

	return (
		<Box style={{ flex: 1 }}>
			<FlashList
				keyExtractor={({ id }: { id: string }) => id.toString()}
				renderItem={item => {
					return <SearchCard item={item} />
				}}
			/>
		</Box>
	)
}

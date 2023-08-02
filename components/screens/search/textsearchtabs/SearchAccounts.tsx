import SearchCard from '../components/SearchCard'
import { useReactiveVar } from '@apollo/client'
import { Box, Center, Heading } from '@components/core'
import { useExploreSearchQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useGlobalSearchParams } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SearchAccounts() {
	const params = useGlobalSearchParams()
	const insets = useSafeAreaInsets()
	const contentInsets = useContentInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const {
		data,
		loading: ESLoading,
		error,
	} = useExploreSearchQuery({
		fetchPolicy: 'cache-first',
		variables: {
			search: String(params.searchtext),
		},
	})

	if (ESLoading) {
		return (
			<FlashList
				numColumns={1}
				estimatedItemSize={65}
				data={[...Array(15)]}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
					return (
						<Skeleton
							height={65}
							width={'95%'}
							radius={15}
							colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							colors={
								rTheme.colorScheme === 'light'
									? [
											String(rTheme.theme?.gluestack.tokens.colors.light100),
											String(rTheme.theme?.gluestack.tokens.colors.light300),
									  ]
									: [
											String(rTheme.theme?.gluestack.tokens.colors.dark100),
											String(rTheme.theme?.gluestack.tokens.colors.dark300),
									  ]
							}
						/>
					)
				}}
				ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
			/>
		)
	}

	if (!data?.exploreSearch.people.length) {
		return (
			<Box
				bg='$transparent'
				sx={{
					mt: contentInsets.top,
				}}
			>
				<Center>
					<Heading fontSize={'$md'} fontWeight={'$medium'}>
						No search results for
					</Heading>
					<Heading fontSize={'$3xl'}>"{params.searchtext}"</Heading>
				</Center>
			</Box>
		)
	}

	return (
		<Box bg={'$transparent'} style={{ flex: 1 }}>
			<FlashList
				data={data?.exploreSearch.people}
				estimatedItemSize={55}
				keyExtractor={({ id }: { id: string }) => id.toString()}
				renderItem={({ index, item }) => {
					return <SearchCard item={item} />
				}}
			/>
		</Box>
	)
}

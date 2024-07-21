import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Center } from "#/components/ui/center";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import SearchCard from '#/components/screens/search/components/SearchCard'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '#/graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '#/util/hooks/useContentInsets'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

type Item = {
	search: string
}

export default () => {
	const router = useRouter()
	const params = useLocalSearchParams()
	const contentInsets = useContentInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [showPastItems, setShotPastItems] = useState(true)

	const [exploreSearchQuery, { data, loading, error }] = useExploreSearchLazyQuery({
		fetchPolicy: 'cache-first',
		onError: error => {},
		onCompleted: data => {
			// if (data.exploreSearch.people.length && data.exploreSearch.venues.length) {
			// 	setShotPastItems(true)
			// }
		},
	})

	useEffect(() => {
		if (params.searchtext?.length) {
			setShotPastItems(false)
			exploreSearchQuery({
				variables: {
					search: String(params.searchtext),
				},
			})
		} else {
			setShotPastItems(true)
		}
	}, [params.searchtext])

	function getUniqueListBy(arr, key) {
		return [...new Map(arr?.map(item => [item[key], item])).values()]
	}

	const filteredRecentSearches = getUniqueListBy(
		rAuthorizationVar?.Profile?.resentSearches?.searches,
		'search',
	)

	const PastSearchItem = (item: Item) => {
		return (
            <Pressable
				onPress={() => {
					exploreSearchQuery({
						variables: {
							search: item.search,
						},
						onCompleted: data => {
							router.setParams({
								searchtext: item.search,
							})
						},
					})
				}}
				className="px-2"
			>
                <HStack space={'md'} className="w-[100%]  h-[55px] justify-start items-center">
					<Box
                        className="content-center justify-center items-center border-2 rounded-md h-[35px]  w-[35px]">
						<Ionicons
							name='search'
							size={18}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.light50
							}
						/>
					</Box>
					<VStack>
						<Text className="text-md font-medium">
							{item.search}
						</Text>
					</VStack>
				</HStack>
            </Pressable>
        );
	}

	if (!params?.searchtext?.length && !loading) {
		return (
            <Box className="bg-transparent flex-1 px-2">
                <FlashList
					data={filteredRecentSearches as Item[]}
					ListHeaderComponent={() => {
						return (<>
                            {filteredRecentSearches.length ? (
                                <Heading>Recent</Heading>
                            ) : (
                                <Heading className="text-center mt-10">
                                    No recent searches
                                </Heading>
                            )}
                        </>);
					}}
					numColumns={1}
					estimatedItemSize={55}
					scrollEnabled={true}
					renderItem={item => <PastSearchItem search={item.item.search} />}
					contentInset={{
						...contentInsets,
					}}
					automaticallyAdjustsScrollIndicatorInsets
					keyboardDismissMode='on-drag'
					keyboardShouldPersistTaps='handled'
					ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
				/>
            </Box>
        );
	}

	if (loading) {
		return (
            <FlashList
				data={[...Array(20)]}
				numColumns={1}
				estimatedItemSize={60}
				keyExtractor={(item, index) => index.toString()}
				scrollEnabled={false}
				contentInset={{
					...contentInsets,
				}}
				keyboardDismissMode='on-drag'
				automaticallyAdjustKeyboardInsets
				ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
				renderItem={item => {
					return (
                        <HStack space='md' className="px-5 h-[60px] items-center flex-1">
                            <Skeleton
								height={50}
								width={50}
								radius={10}
								colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
								colors={
									rTheme.colorScheme === 'light'
										? [
												String(rTheme.theme?.gluestack.tokens.colors.light100),
												String(rTheme.theme?.gluestack.tokens.colors.light300),
										  ]
										: [
												String(rTheme.theme?.gluestack.tokens.colors.light800),
												String(rTheme.theme?.gluestack.tokens.colors.light600),
										  ]
								}
							/>
                            <VStack space='md'>
								<Skeleton
									colors={
										rTheme.colorScheme === 'light'
											? [
													String(rTheme.theme?.gluestack.tokens.colors.light100),
													String(rTheme.theme?.gluestack.tokens.colors.light300),
											  ]
											: [
													String(rTheme.theme?.gluestack.tokens.colors.light800),
													String(rTheme.theme?.gluestack.tokens.colors.light600),
											  ]
									}
									width={250}
									height={20}
								/>
								<Skeleton
									colors={
										rTheme.colorScheme === 'light'
											? [
													String(rTheme.theme?.gluestack.tokens.colors.light100),
													String(rTheme.theme?.gluestack.tokens.colors.light300),
											  ]
											: [
													String(rTheme.theme?.gluestack.tokens.colors.light800),
													String(rTheme.theme?.gluestack.tokens.colors.light600),
											  ]
									}
									width={100}
									height={20}
								/>
							</VStack>
                        </HStack>
                    );
				}}
			/>
        );
	}

	return (
        <Box className="bg-transparent flex-1 px-2">
            <FlashList
				scrollEnabled={true}
				estimatedItemSize={40}
				contentInset={{
					...contentInsets,
				}}
				
				automaticallyAdjustKeyboardInsets
				automaticallyAdjustContentInsets
				refreshing={loading}
				keyboardDismissMode='on-drag'
				ItemSeparatorComponent={() => <Box className="bg-transparent h-5" />}
				ListHeaderComponent={() => {
					return (<>
                        {!data?.exploreSearch.venues?.length && !data?.exploreSearch.people?.length && (
                            <Box className="bg-transparent">
                                <Center>
                                    <Heading className="text-md font-medium">
                                        No search results for
                                    </Heading>
                                    <Heading className="text-3xl">"{params.searchtext}"</Heading>
                                </Center>
                            </Box>
                        )}
                    </>);
				}}
				data={[
					{ title: 'Accounts', data: data?.exploreSearch.people },
					{ title: 'Venues', data: data?.exploreSearch.venues },
				]}
				renderItem={({ item }) => {
					return (
                        <Box className="bg-transparent">
                            {item.data && item.data.length ? (
								<Box className="bg-transparent">
									<Heading className="text-lg mx-2">
										{item.title}
									</Heading>
									{item.data?.map((item, index) => {
										return <SearchCard key={index} item={item} />
									})}
								</Box>
							) : null}
                        </Box>
                    );
				}}
			/>
        </Box>
    );
}

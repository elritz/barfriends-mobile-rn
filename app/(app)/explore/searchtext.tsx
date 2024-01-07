import { useReactiveVar } from '@apollo/client'
import SearchCard from '@components/screens/search/components/SearchCard'
import { Ionicons } from '@expo/vector-icons'
import { Box, Center, HStack, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
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
				px={'$2'}
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
			>
				<HStack
					sx={{
						w: '100%',
						h: 55,
					}}
					justifyContent={'flex-start'}
					alignItems={'center'}
					space={'md'}
				>
					<Box
						alignContent='center'
						justifyContent='center'
						alignItems='center'
						borderWidth={'$2'}
						// borderColor='$primary500'
						rounded={'$md'}
						sx={{
							h: 35,
							w: 35,
						}}
					>
						<Ionicons
							name='ios-search'
							size={18}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.light50
							}
						/>
					</Box>
					<VStack>
						<Text fontSize={'$md'} fontWeight={'$medium'}>
							{item.search}
						</Text>
					</VStack>
				</HStack>
			</Pressable>
		)
	}

	if (!params?.searchtext?.length && !loading) {
		return (
			<Box bg={'$transparent'} flex={1} px={'$2'}>
				<FlashList
					data={filteredRecentSearches as Array<Item>}
					ListHeaderComponent={() => {
						return (
							<>
								{filteredRecentSearches.length ? (
									<Heading>Recent</Heading>
								) : (
									<Heading textAlign='center' mt={'$10'}>
										No recent searches
									</Heading>
								)}
							</>
						)
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
					ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
				/>
			</Box>
		)
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
						<HStack
							px={'$5'}
							sx={{
								h: 60,
							}}
							space='md'
							alignItems='center'
							// justifyContent='center'
							flex={1}
						>
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
					)
				}}
			/>
		)
	}

	return (
		<Box bg={'$transparent'} flex={1} px={'$2'}>
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
				ItemSeparatorComponent={() => <Box bg='$transparent' h={'$5'} />}
				ListHeaderComponent={() => {
					return (
						<>
							{!data?.exploreSearch.venues?.length && !data?.exploreSearch.people?.length && (
								<Box bg='$transparent'>
									<Center>
										<Heading fontSize={'$md'} fontWeight={'$medium'}>
											No search results for
										</Heading>
										<Heading fontSize={'$3xl'}>"{params.searchtext}"</Heading>
									</Center>
								</Box>
							)}
						</>
					)
				}}
				data={[
					{ title: 'Accounts', data: data?.exploreSearch.people },
					{ title: 'Venues', data: data?.exploreSearch.venues },
				]}
				renderItem={({ item }) => {
					return (
						<Box bg={'transparent'}>
							{item.data && item.data.length ? (
								<Box bg={'transparent'}>
									<Heading fontSize={'$lg'} mx={'$2'}>
										{item.title}
									</Heading>
									{item.data?.map((item, index) => {
										return <SearchCard key={index} item={item} />
									})}
								</Box>
							) : null}
						</Box>
					)
				}}
			/>
		</Box>
	)
}

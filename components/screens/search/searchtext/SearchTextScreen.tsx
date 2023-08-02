import { useReactiveVar } from '@apollo/client'
import { Box, Button, Center, HStack, Heading, Pressable, Text, VStack } from '@components/core'
import SearchCard from '@components/screens/search/components/SearchCard'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type HItem = {
	search: string
}

const SearchTextScreen = () => {
	const params = useLocalSearchParams()
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const [exploreSearchQuery, { data, loading, error }] = useExploreSearchLazyQuery({
		onCompleted: data => {},
	})

	useEffect(() => {
		if (params.searchtext?.length) {
			exploreSearchQuery({
				variables: {
					search: String(params.searchtext),
				},
			})
		}
	}, [params.searchtext])

	function getUniqueListBy(arr, key) {
		return [...new Map(arr.map(item => [item[key], item])).values()]
	}

	const filteredRecentSearches = getUniqueListBy(
		rAuthorizationVar?.DeviceProfile?.Profile?.resentSearches?.searches,
		'search',
	)

	if (loading) {
		return (
			<Box bg={'$transparent'} px={'$3'}>
				<FlashList
					scrollEnabled={false}
					automaticallyAdjustContentInsets
					automaticallyAdjustKeyboardInsets
					automaticallyAdjustsScrollIndicatorInsets
					contentInsetAdjustmentBehavior='automatic'
					keyboardDismissMode='on-drag'
					data={[...Array(20)]}
					ListHeaderComponent={() => {
						return (
							<>
								{!data?.exploreSearch.venues?.length && !data?.exploreSearch.people?.length && (
									// <Box mt={insets.top}>
									<Center>
										<Heading fontSize={'$md'} fontWeight={'$medium'}>
											No search results for
										</Heading>
										<Heading fontSize={'$3xl'}>"{params.searchtext}"</Heading>
									</Center>
									// </Box>
								)}
							</>
						)
					}}
					estimatedItemSize={80}
					keyExtractor={(item, index) => {
						return (`key` + item).toString()
					}}
					contentInset={{
						top: insets.top + 10,
						bottom:
							insets.bottom !== 0
								? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
								: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
					}}
					renderItem={({ index, item }) => {
						return (
							<HStack
								px={'$2'}
								sx={{
									h: 60,
									w: '90%',
								}}
							>
								<Skeleton
									height={40}
									width={40}
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
								<VStack px={'$2'}>
									<Skeleton
										height={40}
										width={'100%'}
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
									<Skeleton
										height={40}
										width={'100%'}
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
								</VStack>
							</HStack>
						)
					}}
				/>
			</Box>
		)
	}

	if (!params?.searchtext?.length) {
		return (
			<FlashList
				scrollEnabled={true}
				automaticallyAdjustContentInsets
				automaticallyAdjustsScrollIndicatorInsets
				contentInsetAdjustmentBehavior='automatic'
				keyboardDismissMode='on-drag'
				data={filteredRecentSearches as HItem[]}
				ListHeaderComponent={() => {
					return (
						<>
							{!data?.exploreSearch.venues?.length && !data?.exploreSearch.people?.length && (
								// <Box mt={insets.top}>
								<Center>
									<Heading fontSize={'$md'} fontWeight={'$medium'}>
										No search results for
									</Heading>
									<Heading fontSize={'$3xl'}>"{params.searchtext}"</Heading>
								</Center>
								// </Box>
							)}
						</>
					)
				}}
				estimatedItemSize={80}
				keyExtractor={(item, index) => {
					return (`key` + item).toString()
				}}
				contentInset={{
					top: insets.top + 10,
					bottom:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
				}}
				automaticallyAdjustKeyboardInsets
				renderItem={({ index, item }) => {
					return (
						<Pressable
							onPress={() => {
								router.setParams({
									searchtext: item.search,
								})
							}}
						>
							<HStack
								sx={{
									h: 55,
									w: '100%',
								}}
								justifyContent={'flex-start'}
								alignItems={'center'}
								space={'md'}
								px={'$2'}
							>
								<Button rounded={'$md'} size='sm' variant='outline'>
									<Ionicons name={'ios-search'} size={30} />
								</Button>
								<VStack>
									<Text fontSize={'$md'} fontWeight={'$medium'}>
										{item.search}
									</Text>
								</VStack>
							</HStack>
						</Pressable>
					)
				}}
			/>
		)
	}

	return (
		<Box mt={insets.top} flex={1}>
			<FlashList
				data={[
					{ title: 'Accounts', data: data?.exploreSearch.people },
					{ title: 'Venues', data: data?.exploreSearch.venues },
				]}
				ListHeaderComponent={() => {
					return (
						<>
							{!data?.exploreSearch.venues?.length && !data?.exploreSearch.people?.length && (
								// <Box mt={insets.top}>
									<Center>
										<Heading fontSize={'$md'} fontWeight={'$medium'}>
											No search results for
										</Heading>
										<Heading fontSize={'$3xl'}>"{params.searchtext}"</Heading>
									</Center>
								// </Box>
							)}
						</>
					)
				}}
				estimatedItemSize={80}
				keyExtractor={(item, index) => {
					return (`key` + item.title).toString()
				}}
				contentInset={{
					top: insets.top,
					bottom:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
				}}
				automaticallyAdjustKeyboardInsets
				automaticallyAdjustContentInsets
				keyboardDismissMode='on-drag'
				renderItem={({ index, item }) => {
					return (
						<Box bg={'$transparent'}>
							{item.data && item.data.length ? (
								<Box my={'$1'}>
									<Heading mx={'$3'}>{item.title}</Heading>
									{item.data.map((item, index) => {
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

export default SearchTextScreen

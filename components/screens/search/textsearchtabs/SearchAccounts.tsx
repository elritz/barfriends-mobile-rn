import SearchCard from '../components/SearchCard'
import { useReactiveVar } from '@apollo/client'
import { Box, Center, HStack, Heading, VStack } from '@gluestack-ui/themed'
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
				keyboardShouldPersistTaps='handled'
				keyboardDismissMode='on-drag'
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
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
												String(rTheme.theme?.gluestack.tokens.colors.light900),
												String(rTheme.theme?.gluestack.tokens.colors.light700),
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
													String(rTheme.theme?.gluestack.tokens.colors.light900),
													String(rTheme.theme?.gluestack.tokens.colors.light700),
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
													String(rTheme.theme?.gluestack.tokens.colors.light900),
													String(rTheme.theme?.gluestack.tokens.colors.light700),
											  ]
									}
									width={100}
									height={20}
								/>
							</VStack>
						</HStack>
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

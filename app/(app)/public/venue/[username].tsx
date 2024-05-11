import { useReactiveVar } from '@apollo/client'
import InformationJoinVenue from '@components/molecules/information/informationjoinvenue'
import Details from '@components/screens/public/venue/details/Details'
import PersonalAtVenue from '@components/screens/public/venue/peopleatvenue/PersonalAtVenue'
import VenueActions from '@components/screens/public/venue/venueactions/VenueActions'
import LeaveSection from '@components/screens/public/venue/venueactions/actioncards/leavesection/LeaveSection'
import VenueHeader from '@components/screens/public/venue/venueheader/VenueHeader'
import VenueTotals from '@components/screens/public/venue/venuetotals/VenueTotals'
import { PUBLIC_VENUE_HEADER_IMAGE_HEIGHT } from '@constants/Layout'
import { Box, Heading, HStack, Text, VStack } from '@gluestack-ui/themed'
import { usePublicVenueQuery } from '@graphql/generated'
import { CurrentLocationReactiveVar, SearchAreaReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useLocalSearchParams } from 'expo-router'
import { uniqueId } from 'lodash'
import { Skeleton } from 'moti/skeleton'
import { useWindowDimensions } from 'react-native'

const numColumns = 2

export default () => {
	const { width } = useWindowDimensions()
	const contentInsets = useContentInsets()
	const itemPadding = (width / 33.33) * numColumns
	const params = useLocalSearchParams()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const link = `https://barfriends.com/app/public/venue?username=${params.username}`

	const { data, loading, error } = usePublicVenueQuery({
		skip: !params.username,
		fetchPolicy: 'network-only',
		variables: {
			where: {
				IdentifiableInformation: {
					username: {
						equals: String(params.username),
					},
				},
			},
			currentLocationCoords: {
				latitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.latitude)
					: Number(rSearchAreaVar?.searchArea.coords.latitude),
				longitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.longitude)
					: Number(rSearchAreaVar?.searchArea.coords.longitude),
			},
		},
	})

	if (loading || !data?.publicVenue) {

		return (
			<VStack flex={1} space={'md'}>
				<Skeleton
					key={uniqueId()}
					height={PUBLIC_VENUE_HEADER_IMAGE_HEIGHT}
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
								String(rTheme.theme?.gluestack.tokens.colors.light900),
								String(rTheme.theme?.gluestack.tokens.colors.light700),
							]
					}
				/>
				<VStack rounded={'$md'} px={'$2'} space={'md'}>
					<Skeleton
						key={uniqueId()}
						height={30}
						width={'75%'}
						radius={15}
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
					<Skeleton
						key={uniqueId()}
						height={30}
						width={'25%'}
						radius={15}
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
				</VStack>
				<HStack rounded='$md' justifyContent='center' alignItems='center' space={'md'}>
					{[...Array(2)].map((item, index) => {
						return (
							<Skeleton
								key={uniqueId()}
								height={30}
								width={(width - itemPadding) / numColumns}
								radius={15}
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
						)
					})}
				</HStack>
				<HStack rounded='$md' justifyContent='center' alignItems='center' space={'md'}>
					{[...Array(2)].map((item, index) => {
						return (
							<Skeleton
								key={uniqueId()}
								height={220}
								width={(width - itemPadding) / numColumns}
								radius={15}
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
						)
					})}
				</HStack>
				<Skeleton
					key={uniqueId()}
					height={PUBLIC_VENUE_HEADER_IMAGE_HEIGHT}
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
								String(rTheme.theme?.gluestack.tokens.colors.light900),
								String(rTheme.theme?.gluestack.tokens.colors.light700),
							]
					}
				/>
			</VStack>
		)
	}

	const HandleEmptyUsers = () => {
		return (
			<VStack alignItems='center'>
				<Heading>Be the first to join</Heading>
				<Text textAlign={'center'} fontSize={'$2xl'}>
					No users present!
				</Text>
			</VStack>
		)
	}

	const venueData = data.publicVenue

	return (
		<FlashList
			data={[]}
			estimatedItemSize={200}
			numColumns={2}
			contentInset={contentInsets}
			showsVerticalScrollIndicator={false}
			// ListEmptyComponent={!loading && <HandleEmptyUsers />}
			ListHeaderComponent={
				<VStack mb={'$5'} >
					<VenueHeader key={uniqueId()} loading={loading} photos={data.publicVenue?.photos} />
					<Box rounded={'$none'} key={uniqueId()} borderBottomEndRadius={5} py={'$3'} mb={'$2'}>
						<VenueTotals />
						<LeaveSection />
					</Box>
					<InformationJoinVenue />
					<VenueActions key={uniqueId()} />
				</VStack>
			}
			ListFooterComponent={
				<>
					<Details />
				</>
			}
			keyExtractor={(item, index) => index.toString()}
			renderItem={item => <PersonalAtVenue item={item} />}
		/>
	)
}

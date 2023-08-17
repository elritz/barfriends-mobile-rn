import { useReactiveVar } from '@apollo/client'
import { Box, Button, HStack, Heading, Text, VStack } from '@components/core'
import Details from '@components/screens/public/venue/details/Details'
import PersonalAtVenue from '@components/screens/public/venue/peopleatvenue/PersonalAtVenue'
import VenueActions from '@components/screens/public/venue/venueactions/VenueActions'
import LeaveSection from '@components/screens/public/venue/venueactions/actioncards/leavesection/LeaveSection'
import VenueHeader from '@components/screens/public/venue/venueheader/VenueHeader'
import VenueTotals from '@components/screens/public/venue/venuetotals/VenueTotals'
import { PUBLIC_VENUE_HEADER_IMAGE_HEIGHT } from '@constants/Layout'
import { Ionicons } from '@expo/vector-icons'
import { useCurrentVenueQuery } from '@graphql/generated'
import { CurrentLocationReactiveVar, SearchAreaReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import { uniqueId } from 'lodash'
import { Skeleton } from 'moti/skeleton'
import { Alert, Platform, Share, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const numColumns = 2

export default () => {
	const { bottom } = useSafeAreaInsets()
	const { width } = useWindowDimensions()
	const itemPadding = (width / 33.33) * numColumns
	const params = useLocalSearchParams()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const link = `https://revel.com/(app)/public/venue?profileid=${params.profileid}`

	const onShare = async () => {
		try {
			const result = await Share.share(
				{
					message: 'Revel | The nightlife app',
					url: Platform.OS === 'ios' ? link : '',
				},
				{
					dialogTitle: 'Join me on Revel',
					subject: 'Invite to Revel',
				},
			)
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			Alert.alert(error.message)
		}
	}

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !params.profileid,
		fetchPolicy: 'network-only',
		variables: {
			where: {
				id: {
					equals: String(params.profileid),
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

	if (loading || !data?.currentVenue) {
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
									String(rTheme.theme?.gluestack.tokens.colors.dark100),
									String(rTheme.theme?.gluestack.tokens.colors.dark300),
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
										String(rTheme.theme?.gluestack.tokens.colors.dark100),
										String(rTheme.theme?.gluestack.tokens.colors.dark300),
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
										String(rTheme.theme?.gluestack.tokens.colors.dark100),
										String(rTheme.theme?.gluestack.tokens.colors.dark300),
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
												String(rTheme.theme?.gluestack.tokens.colors.dark100),
												String(rTheme.theme?.gluestack.tokens.colors.dark300),
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
												String(rTheme.theme?.gluestack.tokens.colors.dark100),
												String(rTheme.theme?.gluestack.tokens.colors.dark300),
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
									String(rTheme.theme?.gluestack.tokens.colors.dark100),
									String(rTheme.theme?.gluestack.tokens.colors.dark300),
							  ]
					}
				/>
			</VStack>
		)
	}

	const HandleEmptyUsers = () => {
		return (
			<Text textAlign={'center'} fontSize={'$2xl'}>
				{' '}
				No users present!
			</Text>
		)
	}

	const venueData = data.currentVenue
	const name = venueData.IdentifiableInformation?.fullname
	const username = venueData.IdentifiableInformation?.username

	return (
		<FlashList
			data={[]}
			estimatedItemSize={200}
			numColumns={2}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={
				<VStack mb={'$5'}>
					<VenueHeader key={uniqueId()} loading={loading} photos={data.currentVenue?.photos} />
					<Box  rounded={'$none'} key={uniqueId()} py={'$4'} borderBottomEndRadius={5} >
						<HStack px={'$2'} justifyContent={'space-between'}>
							<VStack space='xs'>
								<Heading fontSize={'$2xl'} lineHeight={'$lg'} fontWeight={'$black'} numberOfLines={1}>
									{name}
								</Heading>
								<Heading
									fontSize={'$sm'}
									sx={{
										_light: {
											color: '$light600',
										},
										_dark: {
											color: '$dark600',
										},
									}}
									lineHeight={'$sm'}
									numberOfLines={1}
								>
									@{username}
								</Heading>
							</VStack>
							<Button
								bg={'transparent'}
								onPress={onShare}
								alignSelf={'center'}
								variant={'solid'}
								size={'lg'}
							>
								<Ionicons
									name={'share'}
									size={23}
									color={
										rTheme.colorScheme === 'light'
											? rTheme.theme?.gluestack.tokens.colors.light900
											: rTheme.theme?.gluestack.tokens.colors.dark900
									}
								/>
							</Button>
						</HStack>
						<VenueTotals />
						<LeaveSection />
					</Box>
					<VenueActions key={uniqueId()} />
				</VStack>
			}
			ListEmptyComponent={!loading && <HandleEmptyUsers />}
			ListFooterComponent={<Details />}
			keyExtractor={(item, index) => index.toString()}
			renderItem={item => <PersonalAtVenue item={item} />}
			contentInset={{
				bottom: bottom,
			}}
		/>
	)
}

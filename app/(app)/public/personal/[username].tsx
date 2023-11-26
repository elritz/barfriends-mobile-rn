import { useReactiveVar } from '@apollo/client'
import CurrentVenue from '@components/screens/public/personal/currentvenue/CurrentVenue'
import Photos from '@components/screens/public/personal/photos'
import { Feather, Ionicons } from '@expo/vector-icons'
import {
	Badge,
	Box,
	Button,
	HStack,
	Heading,
	Pressable,
	Text,
	VStack,
	ButtonText,
} from '@gluestack-ui/themed'
import { usePublicProfileQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { generateRandomBlurhash } from '@util/helpers/generateBlurhash'
import useContentInsets from '@util/hooks/useContentInsets'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

export default () => {
	const params = useLocalSearchParams()
	const contentInsets = useContentInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const SectionHeader = ({ title }: { title: string }) => {
		return (
			<Heading py={'$2'} fontSize={'$md'} fontWeight='$bold'>
				{title}
			</Heading>
		)
	}
	const SectionContainer = ({ children }) => {
		return (
			<BlurView
				style={{
					padding: 20,
					borderRadius: 13,
					overflow: 'hidden',
					backgroundColor: profile?.tonightStory?.emojimood?.colors
						? 'transparent'
						: rTheme.colorScheme === 'light'
						? rTheme.theme.gluestack.tokens.colors.light100
						: rTheme.theme.gluestack.tokens.colors.light800,
				}}
				intensity={80}
				tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
			>
				{children}
			</BlurView>
		)
	}

	const { data, loading, error } = usePublicProfileQuery({
		skip: !params.username,
		variables: {
			where: {
				IdentifiableInformation: {
					username: {
						equals: String(params.username),
					},
				},
			},
		},
	})

	if (loading)
		return (
			<Text fontSize={'$2xl'} mt={'$12'}>
				Loading...
			</Text>
		)

	const profile = data?.publicProfile

	const IdentifiableInformation = () => {
		return (
			<>
				<HStack py={'$3'} alignItems='center' space='md'>
					<VStack flex={1} position='relative' mt={'$3'} space='sm'>
						<HStack justifyContent='space-between'>
							<Text
								fontSize={'$sm'}
								fontWeight={'$medium'}
								position='absolute'
								numberOfLines={1}
								color={rTheme.colorScheme === 'light' ? '$light800' : '$light100'}
								sx={{
									top: -20,
								}}
							>
								@{profile?.IdentifiableInformation?.username}
							</Text>
							<HStack>
								<Text
									lineHeight={'$2xl'}
									fontSize={'$3xl'}
									letterSpacing={'$sm'}
									numberOfLines={2}
									fontWeight='$bold'
									color={rTheme.colorScheme === 'light' ? '$light900' : '$light100'}
								>
									{profile?.IdentifiableInformation?.fullname}
								</Text>
							</HStack>
						</HStack>
					</VStack>
					<Button
						onPress={() => {
							console.log('//todo: Message icon to conversation with this person')
						}}
						size='xs'
						bg={'$tertiary400'}
						rounded={'$full'}
					>
						<ButtonText fontSize={'$sm'} mr={'$2'}>
							Message
						</ButtonText>
						<Ionicons
							color={rTheme.theme?.gluestack?.tokens.colors.light100}
							name='chatbubble-ellipses'
							size={20}
						/>
					</Button>
				</HStack>
			</>
		)
	}

	const TonightVenue = () => {
		return (
			<>
				<SectionHeader title='Tonight' />
				<Pressable
					onPress={() => {
						console.log('//todo: Navigate to Public Venue ')
					}}
				>
					<HStack justifyContent='space-between' alignItems='center'>
						<HStack space='sm' alignItems='center'>
							<Image
								source={{
									uri: 'https://images.unsplash.com/photo-1544450030-1fccab69a2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
								}}
								style={{
									width: 40,
									height: 40,
									borderRadius: 5,
								}}
								placeholder={generateRandomBlurhash()}
							/>
							<Text fontSize={'$lg'}>Dallas Night Club</Text>
						</HStack>
						<Feather
							name='arrow-right'
							size={25}
							color={
								rTheme.colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.light100
							}
						/>
					</HStack>
				</Pressable>
			</>
		)
	}

	const Relationship = () => {
		return (
			<HStack mb={'$2'} alignItems='center' justifyContent='space-between'>
				<HStack alignItems='center' space='sm'>
					<Image
						source={{
							uri: 'https://images.unsplash.com/photo-1544450030-1fccab69a2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
						}}
						style={{
							width: 40,
							height: 40,
							borderRadius: 5,
						}}
						placeholder={generateRandomBlurhash()}
					/>
					<HStack justifyContent='space-between' flex={1}>
						<Text fontSize={'$lg'}>Christian Firmi</Text>
						<Text fontSize={'$sm'} fontStyle={'italic'}>
							dating
						</Text>
					</HStack>
				</HStack>
			</HStack>
		)
	}

	type FriendStatus = 'friends' | 'requested' | 'notfriends'

	type FriendRequestProps = {
		status: FriendStatus
	}

	const FriendRequest = (props: FriendRequestProps) => {
		console.log('🚀 ~ file: [username].tsx:204 ~ FriendRequest ~ props.status:', props.status)
		switch (props.status) {
			case 'friends':
				return (
					<SectionContainer>
						<HStack py={'$3'} w={'$full'} justifyContent='space-between' alignItems='center'>
							<VStack>
								<Text>
									Friends since <Text fontWeight={'$bold'}>2020</Text>
								</Text>
								<Text>
									Met at{' '}
									<Text fontWeight={'$bold'} underline>
										Dallas Night Club
									</Text>
								</Text>
							</VStack>
							<Button rounded={'$lg'} size='xs'>
								<Box
									bg='$transparent'
									alignItems='center'
									justifyContent='center'
									sx={{
										h: 30,
									}}
								>
									<Ionicons name='person' size={17} color='white' />
								</Box>
							</Button>
						</HStack>
					</SectionContainer>
				)
			case 'requested':
				return (
					<SectionContainer>
						<HStack py={'$3'} w={'$full'} justifyContent='space-between' alignItems='center'>
							<Text fontSize={'$lg'} fontWeight='$medium'>
								Want to be Barfriends
							</Text>
							<HStack space='sm'>
								<Button
									size='xs'
									variant='link'
									height={28}
									onPress={() => {
										console.log('//todo: Message icon to conversation with this person')
									}}
								>
									<Text fontSize={'$sm'} fontWeight='$bold'>
										Decline
									</Text>
								</Button>
								<Button
									size='xs'
									height={28}
									onPress={() => {
										console.log('//todo: Message icon to conversation with this person')
									}}
								>
									<ButtonText fontSize={'$sm'}>Accept</ButtonText>
								</Button>
							</HStack>
						</HStack>
					</SectionContainer>
				)

			case 'notfriends':
				return (
					<SectionContainer>
						<HStack py={'$3'} w={'$full'} justifyContent='space-between' alignItems='center'>
							<Text fontWeight='$medium' fontSize={'$md'}>
								Add to your friends
							</Text>
							<Button
								// rounded={'$full'}
								rounded={'$lg'}
								height={30}
								onPress={() => console.log('FRIEND')}
								size='xs'
							>
								<ButtonText fontSize={'$sm'}>Barfriend</ButtonText>
							</Button>
						</HStack>
					</SectionContainer>
				)
		}
	}

	const Tags = () => {
		return (
			<HStack py={'$2'} space='xs' flexWrap='wrap'>
				{profile?.DetailInformation?.Tags.map(interest => {
					return (
						<Badge
							size='lg'
							my={'$1'}
							p={'$1'}
							px={'$3'}
							variant='solid'
							borderRadius='$lg'
							sx={{
								_dark: {
									bg: '$black',
								},
								_light: {
									bg: '$light200',
								},
							}}
						>
							<Badge.Text fontSize={'$sm'} textTransform='capitalize' pr={'$0.5'}>
								{interest.emoji}
							</Badge.Text>
							<Text
								sx={{
									_dark: {
										color: '$white',
									},
									_light: {
										color: '$black',
									},
								}}
								fontWeight='$medium'
								fontSize={'$sm'}
								textTransform='capitalize'
							>
								{interest.name}
							</Text>
						</Badge>
					)
				})}
			</HStack>
		)
	}

	const Description = () => {
		return (
			<>
				<SectionHeader title='About me' />
				<HStack space='sm' flexWrap='wrap'>
					{!profile?.DetailInformation?.description?.length ? (
						<Text fontSize={'$lg'} fontWeight='$normal' lineHeight={'$xl'}>
							{profile?.DetailInformation?.description}
						</Text>
					) : (
						<Text fontSize={'$lg'} fontWeight='$normal' lineHeight={'$xl'} textAlign='center' w={'$full'}>
							No details yet!
						</Text>
					)}
				</HStack>
			</>
		)
	}

	return (
		<LinearGradient
			style={{
				flex: 1,
				// backgroundColor:
				// 	rTheme.colorScheme === 'light'
				// 		? rTheme.theme.gluestack.tokens.colors.light100
				// 		: rTheme.theme.gluestack.tokens.colors.light900,
			}}
			colors={profile?.tonightStory?.emojimood?.colors ? profile?.tonightStory?.emojimood?.colors : []}
			// colors={[]}
		>
			<ScrollView contentInset={contentInsets}>
				<VStack mx={'$3'} space='md'>
					<Photos
						photos={profile?.tonightStory?.photos}
						profilePhoto={profile?.profilePhoto}
						emojimoodsColors={
							profile?.tonightStory?.emojimood?.colors ? profile?.tonightStory?.emojimood?.colors : []
						}
					/>
					<FriendRequest status={'notfriends'} />
					<SectionContainer>
						<IdentifiableInformation />
						<TonightVenue />
						<SectionHeader title='My basics' />
						<Relationship />
						<Tags />
						<Description />
					</SectionContainer>
				</VStack>
			</ScrollView>
		</LinearGradient>
	)
}

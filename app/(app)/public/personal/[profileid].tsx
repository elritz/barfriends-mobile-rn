import { useReactiveVar } from '@apollo/client'
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

const tags = [
	{ name: 'Software developer', icon: '💻' },
	{ name: 'Athletic', icon: '👟' },
	{ name: 'Creative', icon: '🎨' },
]

export default () => {
	const params = useLocalSearchParams()

	console.log('🚀 ~ file: [profileid].tsx:49 ~ params:', params)

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
					padding: 10,
					borderRadius: 13,
					overflow: 'hidden',
				}}
				intensity={80}
				tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
			>
				{children}
			</BlurView>
		)
	}

	const { data, loading, error } = usePublicProfileQuery({
		skip: !params.profileid,
		variables: {
			where: {
				id: {
					equals: params.profileid,
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
								@username 343
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
									Christian Firmi
								</Text>
							</HStack>
						</HStack>
					</VStack>
					<Button
						onPress={() => {
							console.log('//todo: Message icon to conversation with this person')
						}}
						size='xs'
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

	const RelationShip = () => {
		return (
			<HStack alignItems='center' justifyContent='space-between'>
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
				{tags.map(interest => {
					return (
						<Badge
							size='lg'
							my={'$1'}
							p={'$1'}
							px={'$3'}
							variant='solid'
							borderRadius='$full'
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
								{interest.icon}
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
					<Text fontSize={'$lg'} fontWeight='$normal' lineHeight={'$xl'}>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos voluptate, earum quasi dolor
						quod quis asperiores, fugiat ratione cumque exercitationem assumenda laudantium animi
						reprehenderit tempo..
					</Text>
				</HStack>
			</>
		)
	}

	return (
		<LinearGradient
			style={{
				flex: 1,
			}}
			colors={['#339800', '#F446']}
			// colors={[]}
		>
			<ScrollView contentInset={contentInsets}>
				<VStack mx={'$3'} space='md'>
					<Photos />
					<FriendRequest status='friends' />
					<SectionContainer>
						<IdentifiableInformation />
						<TonightVenue />
						<SectionHeader title='My basics' />
						<RelationShip />
						<Tags />
						<Description />
					</SectionContainer>
				</VStack>
			</ScrollView>
		</LinearGradient>
	)
}

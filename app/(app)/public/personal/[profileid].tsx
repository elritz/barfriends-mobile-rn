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
	Divider,
} from '@gluestack-ui/themed'
import { ThemeReactiveVar } from '@reactive'
import { generateRandomBlurhash } from '@util/helpers/generateBlurhash'
import useContentInsets from '@util/hooks/useContentInsets'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

const items = [
	{ name: 'Software developer', icon: '💻' },
	{ name: 'Athletic', icon: '👟' },
	{ name: 'Creative', icon: '🎨' },
]

const SectionHeader = ({ title }: { title: string }) => {
	return (
		<Heading py={'$2'} fontSize={'$lg'} fontWeight='$medium'>
			{title}
		</Heading>
	)
}
const SectionContainer = ({ children }) => {
	return (
		<Box py={'$2'} bg='transparent'>
			{children}
		</Box>
	)
}

export default () => {
	// const params = useLocalSearchParams()
	const contentInsets = useContentInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<LinearGradient
			style={{
				flex: 1,
			}}
			colors={['#FF9800', '#F44336']}
			// colors={[]}
		>
			<ScrollView contentInset={contentInsets}>
				<VStack mx={'$3'} space='md'>
					<Box
						flex={1}
						rounded={'$2xl'}
						marginTop={'$3'}
						//  bg='$green400'
					>
						<Photos />
						<SectionContainer>
							<VStack justifyContent='space-between' alignItems='center' p={'$2'} space='md'>
								<VStack maxWidth={'$5/6'} flex={1} position='relative' mt={'$5'} alignItems='center'>
									<Text
										fontSize={'$sm'}
										fontWeight={'$extrabold'}
										position='absolute'
										numberOfLines={1}
										sx={{
											top: -20,
										}}
									>
										@username 343
									</Text>
									<Text fontSize={'$xl'} letterSpacing={'$sm'} numberOfLines={2}>
										Christian Firmi
									</Text>
								</VStack>

								<HStack space='md'>
									<Box
										bg='$primary500'
										alignItems='center'
										justifyContent='center'
										rounded={'$sm'}
										sx={{
											h: 28,
											w: 20,
										}}
									>
										<Ionicons name='person' size={16} color='white' />
									</Box>
									<Button
										size='xs'
										height={28}
										onPress={() => {
											console.log('//todo: Message icon to conversation with this person')
										}}
									>
										<Button.Text fontSize={'$sm'}>Barfriend</Button.Text>
									</Button>
									<Divider orientation='vertical' />
									<Pressable
										onPress={() => {
											console.log('//todo: Message icon to conversation with this person')
										}}
									>
										<Ionicons
											color={
												rTheme.colorScheme === 'light'
													? rTheme.theme?.gluestack.tokens.colors.light700
													: rTheme.theme?.gluestack.tokens.colors.light100
											}
											name='chatbubble-ellipses'
											size={28}
										/>
									</Pressable>
								</HStack>
							</VStack>
						</SectionContainer>
					</Box>
					<Box p={'$3'} rounded={'$2xl'} sx={{}}>
						<SectionContainer>
							<VStack>
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
							</VStack>
						</SectionContainer>
						<SectionContainer>
							<SectionHeader title='My basics' />
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
						</SectionContainer>
						<SectionContainer>
							<HStack space='sm' flexWrap='wrap'>
								{items.map(interest => {
									return (
										<Badge
											size='lg'
											my={'$1'}
											p={'$2'}
											variant='solid'
											borderRadius='$sm'
											bgColor='$primary200'
										>
											<Badge.Text fontSize={'$sm'} textTransform='capitalize' pr={'$0.5'}>
												{interest.icon}
											</Badge.Text>
											<Text color='$black' fontWeight='$medium' fontSize={'$sm'} textTransform='capitalize'>
												{interest.name}
											</Text>
										</Badge>
									)
								})}
							</HStack>
						</SectionContainer>
						<SectionContainer>
							<SectionHeader title='About me' />
							<HStack space='sm' flexWrap='wrap'>
								<Text fontSize={'$lg'} fontWeight='$normal' lineHeight={'$xl'}>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos voluptate, earum quasi dolor
									quod quis asperiores, fugiat ratione cumque exercitationem assumenda laudantium animi
									reprehenderit temporibus esse? Ab quia dolorum consequatur repellendus, libero minima
									exercitationem rem omnis itaque optio laboriosam quae, ut odit, aperiam non ducimus
									doloribus! Iste veritatis a officia, aliquam exercitationem ducimus. Laudantium aspernatur
									sint fuga eius eveniet vel.
								</Text>
							</HStack>
						</SectionContainer>
					</Box>
				</VStack>
			</ScrollView>
		</LinearGradient>
	)
}

import { useReactiveVar } from '@apollo/client';
import { Heading } from '@components/core';
import { Ionicons } from '@expo/vector-icons';
import { useProfileQuery } from '@graphql/generated';
import { AuthorizationReactiveVar } from '@reactive';
import { useRouter } from 'expo-router';
import { Badge, Box, HStack, Icon, Text, VStack } from 'native-base';
import { ScrollView, Pressable } from 'react-native';


interface EditableOptionsScreenProps {}

export default ({}: EditableOptionsScreenProps) => {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rIdentifiableInformation = rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation
	const date = new Date(
		rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.birthday,
	).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })

	const { data, loading, error } = useProfileQuery({
		variables: {
			where: {
				id: {
					equals: rAuthorizationVar?.DeviceProfile?.Profile?.id,
				},
			},
		},
	})

	if (loading) return null

	const RoundedListItem = ({ children, ...props }) => (
		<Pressable onPress={props.onPress}>
			<Box
				_light={{
					bg: 'light.100',
				}}
				_dark={{
					bg: 'dark.100',
				}}
				my={2}
				px={2}
				py={3}
				borderRadius={'md'}
				alignItems={'flex-start'}
				flexDirection={'column'}
			>
				{props.title && (
					<Heading fontSize={'$md'} pb={3}>
						{props.title}
					</Heading>
				)}
				{children}
			</Box>
		</Pressable>
	)

	return (
		<ScrollView
			style={{
				marginVertical: 20,
				marginHorizontal: 10,
			}}
			scrollToOverflowEnabled
			showsVerticalScrollIndicator={false}
			contentInsetAdjustmentBehavior='scrollableAxes'
		>
			<RoundedListItem
				onPress={() => {
					router.push({
						pathname: '(app)/settings/profilesettings/personal/fullname',
					})
				}}
				title='Full name'
			>
				<Text fontSize={'xl'}>{rIdentifiableInformation?.fullname}</Text>
				{rIdentifiableInformation?.nickname && (
					<>
						<Text fontSize={'xl'} py={2}>
							Nick name
						</Text>
						<Text fontSize={'xl'}>{rIdentifiableInformation.nickname}</Text>
					</>
				)}
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/username',
					})
				}
				title='Username'
			>
				<Text fontSize={'xl'}>{rIdentifiableInformation?.username}</Text>
			</RoundedListItem>
			<RoundedListItem title='Birthday 🥳'>
				<HStack justifyContent={'space-between'} w={'100%'} alignItems={'center'}>
					<Text color={'light.400'} fontSize={'xl'}>
						{date}
					</Text>
					<Icon as={Ionicons} name={'md-lock-closed'} color={'light.400'} size={'sm'} />
				</HStack>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/description',
					})
				}
				title='About me'
			>
				<Text fontSize={'xl'} numberOfLines={4} ellipsizeMode='tail'>
					{!rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.description
						? 'Add description'
						: rAuthorizationVar.DeviceProfile.Profile.DetailInformation.description}
				</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/interests',
					})
				}
				title={'My interests'}
			>
				<Box>
					<VStack flexDir={'row'} flexWrap={'wrap'}>
						{rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.length ? (
							<>
								{rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.map((item, index) => (
									<Badge
										key={item.id}
										borderRadius={'md'}
										bg={'primary.500'}
										_text={{
											fontWeight: '400',
											fontSize: 'md',
											color: 'text.100',
										}}
										px={2}
										py={1}
										m={2}
									>
										{item.emoji}
										{item.name}
									</Badge>
								))}
							</>
						) : (
							<Box>
								<Text fontSize={'xl'} numberOfLines={1}>
									Select your interests
								</Text>
							</Box>
						)}
					</VStack>
				</Box>
			</RoundedListItem>
			<Heading fontSize={'$lg'} py={2}>
				MY BASIC INFO
			</Heading>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/gender',
					})
				}
				title={`I am a ...`}
			>
				<Text fontSize={'xl'}>
					{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.gender ||
						'Set your gender'}
				</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/lookingfor',
					})
				}
				title={`I'm looking for a ...`}
			>
				<Text fontSize={'xl'} numberOfLines={1}>
					{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.lookfor ||
						'Set the vibes your looking for'}
				</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/relationship',
					})
				}
				title={`Relationship`}
			>
				<Text fontSize={'xl'}>Are you in a relationship</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/hometown',
					})
				}
				title={`Add your hometown`}
			>
				<Text fontSize={'xl'}>add your hometown</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/currenttown',
					})
				}
				title={'Add your city'}
			>
				<Text fontSize={'xl'}>Rep your city</Text>
			</RoundedListItem>
		</ScrollView>
	)
}
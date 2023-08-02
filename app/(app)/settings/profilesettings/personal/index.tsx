import { useReactiveVar } from '@apollo/client'
import { Badge, Box, HStack, Heading, Text, VStack } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { useProfileQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { ScrollView, Pressable } from 'react-native'

interface EditableOptionsScreenProps {}

export default ({}: EditableOptionsScreenProps) => {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
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
				my={'$2'}
				px={'$2'}
				py={'$3'}
				rounded={'$md'}
				alignItems={'flex-start'}
				flexDirection={'column'}
			>
				{props.title && (
					<Heading fontSize={'$md'} pb={'$3'}>
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
				<Text fontSize={'$xl'}>{rIdentifiableInformation?.fullname}</Text>
				{rIdentifiableInformation?.nickname && (
					<>
						<Text fontSize={'$xl'} py={'$2'}>
							Nick name
						</Text>
						<Text fontSize={'$xl'}>{rIdentifiableInformation.nickname}</Text>
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
				<Text fontSize={'$xl'}>{rIdentifiableInformation?.username}</Text>
			</RoundedListItem>
			<RoundedListItem title='Birthday 🥳'>
				<HStack
					sx={{
						w: '100%',
					}}
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<Text color={'$light600'} fontSize={'$xl'}>
						{date}
					</Text>
					<Ionicons
						name={'md-lock-closed'}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light400
								: rTheme.theme?.gluestack.tokens.colors.dark400
						}
						size={20}
					/>
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
				<Text fontSize={'$xl'} numberOfLines={4} ellipsizeMode='tail'>
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
					<VStack flexDirection={'row'} flexWrap={'wrap'}>
						{rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.length ? (
							<>
								{rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.map((item, index) => (
									<Badge key={item.id} rounded={'$md'} bg={'$primary500'} px={'$2'} py={'$1'} m={'$2'}>
										<Text
											fontWeight='$bold'
											fontSize={'$md'}
											color={
												rTheme.colorScheme === 'light'
													? rTheme.theme?.gluestack.tokens.colors.light100
													: rTheme.theme?.gluestack.tokens.colors.dark100
											}
										>
											{item.emoji}
											{item.name}
										</Text>
									</Badge>
								))}
							</>
						) : (
							<Box>
								<Text fontSize={'$xl'} numberOfLines={1}>
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
				<Text fontSize={'$xl'}>
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
				<Text fontSize={'$xl'} numberOfLines={1}>
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
				<Text fontSize={'$xl'}>Are you in a relationship</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/hometown',
					})
				}
				title={`Add your hometown`}
			>
				<Text fontSize={'$xl'}>add your hometown</Text>
			</RoundedListItem>
			<RoundedListItem
				onPress={() =>
					router.push({
						pathname: '(app)/settings/profilesettings/personal/currenttown',
					})
				}
				title={'Add your city'}
			>
				<Text fontSize={'$xl'}>Rep your city</Text>
			</RoundedListItem>
		</ScrollView>
	)
}

import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Box } from "#/components/ui/box";
import { Badge } from "#/components/ui/badge";
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { useProfileQuery } from '#/graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import { useRouter } from 'expo-router'
import { ScrollView, Pressable } from 'react-native'

interface EditableOptionsScreenProps {}

export default ({}: EditableOptionsScreenProps) => {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rIdentifiableInformation = rAuthorizationVar?.Profile?.IdentifiableInformation
	const date = new Date(
		rAuthorizationVar?.Profile?.IdentifiableInformation?.birthday,
	).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })

	const { data, loading, error } = useProfileQuery({
		variables: {
			where: {
				id: {
					equals: rAuthorizationVar?.Profile?.id,
				},
			},
		},
	})

	if (loading) return null

	const RoundedListItem = ({ children, ...props }) => (
		<Pressable onPress={props.onPress}>
			<Box className="my-2 px-2 py-3 rounded-md items-start flex-column">
				{props.title && (
					<Heading className="text-md pb-3">
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
						pathname: '/(app)/settings/profilesettings/personal/fullname',
					})
				}}
				title='Full name'
			>
				<Text className="text-xl">{rIdentifiableInformation?.fullname}</Text>
				{rIdentifiableInformation?.nickname && (
					<>
						<Text className="text-xl py-2">
							Nick name
						</Text>
						<Text className="text-xl">{rIdentifiableInformation.nickname}</Text>
					</>
				)}
			</RoundedListItem>
            <RoundedListItem
				onPress={() =>
					router.push({
						pathname: '/(app)/settings/profilesettings/personal/username',
					})
				}
				title='Username'
			>
				<Text className="text-xl">{rIdentifiableInformation?.username}</Text>
			</RoundedListItem>
            <RoundedListItem title='Birthday 🥳'>
				<HStack className="w-[100%] justify-between items-center">
					<Text className="text-light-600 text-xl">
						{date}
					</Text>
					<Ionicons
						name={'lock-closed'}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light400
								: rTheme.theme?.gluestack.tokens.colors.light600
						}
						size={20}
					/>
				</HStack>
			</RoundedListItem>
            <RoundedListItem
				onPress={() =>
					router.push({
						pathname: '/(app)/settings/profilesettings/personal/description',
					})
				}
				title='About me'
			>
				<Text numberOfLines={4} ellipsizeMode='tail' className="text-xl">
					{!rAuthorizationVar?.Profile?.DetailInformation?.description
						? 'Add description'
						: rAuthorizationVar.Profile.DetailInformation.description}
				</Text>
			</RoundedListItem>
            <RoundedListItem
				onPress={() =>
					router.push({
						pathname: '/(app)/settings/profilesettings/personal/interests',
					})
				}
				title={'My interests'}
			>
				<Box>
					<VStack className="flex-row flex-wrap">
						{rAuthorizationVar?.Profile?.DetailInformation?.Tags.length ? (
							<>
								{rAuthorizationVar?.Profile?.DetailInformation?.Tags.map((item, index) => (
									<Badge key={item.id} className="rounded-md bg-primary-500 px-2 py-1 m-2">
										<Text
                                            className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} font-bold text-md `}>
											{item.emoji}
											{item.name}
										</Text>
									</Badge>
								))}
							</>
						) : (
							<Box>
								<Text numberOfLines={1} className="text-xl">
									Select your interests
								</Text>
							</Box>
						)}
					</VStack>
				</Box>
			</RoundedListItem>
            <Heading className="text-lg py-2">
				MY BASIC INFO
			</Heading>
            <RoundedListItem
				onPress={() =>
					router.push({
						pathname: '/(app)/settings/profilesettings/personal/gender',
					})
				}
				title={`I am a ...`}
			>
				<Text className="text-xl">
					{rAuthorizationVar?.Profile?.IdentifiableInformation?.gender ||
						'Set your gender'}
				</Text>
			</RoundedListItem>
            <RoundedListItem
				onPress={() =>
					router.push({
						pathname: '/(app)/settings/profilesettings/personal/lookingfor',
					})
				}
				title={`I'm looking for a ...`}
			>
				<Text numberOfLines={1} className="text-xl">
					{rAuthorizationVar?.Profile?.IdentifiableInformation?.lookfor ||
						'Set the vibes your looking for'}
				</Text>
			</RoundedListItem>
            <RoundedListItem
				onPress={() =>
					router.push({
						pathname: '/(app)/settings/profilesettings/personal/relationship',
					})
				}
				title={`Relationship`}
			>
				<Text className="text-xl">Are you in a relationship</Text>
			</RoundedListItem>
            <RoundedListItem
				onPress={() =>
					router.push({
						pathname: '/(app)/settings/profilesettings/personal/hometown',
					})
				}
				title={`Add your hometown`}
			>
				<Text className="text-xl">add your hometown</Text>
			</RoundedListItem>
            <RoundedListItem
				onPress={() =>
					router.push({
						pathname: '/(app)/settings/profilesettings/personal/currenttown',
					})
				}
				title={'Add your city'}
			>
				<Text className="text-xl">Rep your city</Text>
			</RoundedListItem>
        </ScrollView>
    );
}

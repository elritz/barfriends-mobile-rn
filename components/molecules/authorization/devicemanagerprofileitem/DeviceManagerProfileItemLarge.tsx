import { useReactiveVar } from '@apollo/client'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Box, Center, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Maybe, Profile } from '#/graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import { Image, View } from 'react-native'
import { ActivityIndicator } from 'react-native'

type ProfileItemType = {
	item: Partial<Profile> | null | undefined
	loading?: boolean
}

const DeviceManagerProfileItemLarge = ({ item, loading }: ProfileItemType) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	return (
		<Box
			key={item?.id}
			flex={1}
			flexDirection={'row'}
			my={'$2'}
			py={'$3'}
			px={'$3'}
			rounded={'$md'}
			alignItems={'center'}
			bg='$transparent'
		>
			<HStack alignItems={'center'} justifyContent='space-between'>
				<View style={{ marginRight: 8 }}>
					{!loading ? (
						<View style={{ width: 30 }}>
							{rAuthorizationVar?.Profile?.id === item?.id ? (
								<Ionicons
									name='checkmark-circle'
									size={20}
									color={rTheme.theme?.gluestack.tokens.colors.success600}
								/>
							) : (
								<MaterialIcons
									name='radio-button-unchecked'
									size={20}
									color={rTheme.theme?.gluestack.tokens.colors.green400}
								/>
							)}
						</View>
					) : (
						<View style={{ width: 30 }}>
							<ActivityIndicator />
						</View>
					)}
				</View>
				{item?.profilePhoto ? (
					<Image
						source={{ uri: item.profilePhoto.url }}
						style={{ width: 50, height: 50, borderRadius: 10 }}
						alt={'Profile photo'}
					/>
				) : (
					<Box
						rounded={'$md'}
						sx={{
							w: 40,
							h: 40,
							_light: {
								bg: '$light200',
							},
							_dark: {
								bg: '$light700',
							},
						}}
						justifyContent={'center'}
					>
						<Center>
							<Ionicons
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light900
										: rTheme.theme?.gluestack.tokens.colors.light100
								}
								size={20}
								name={'person'}
							/>
						</Center>
					</Box>
				)}
				<VStack mx={'$2'} flex={1} justifyContent='center'>
					<Text fontSize={'$lg'} numberOfLines={1}>
						{item?.IdentifiableInformation?.fullname}
					</Text>
					<Text fontWeight='$bold' fontSize={'$md'}>
						@{item?.IdentifiableInformation?.username}
					</Text>
				</VStack>
			</HStack>
		</Box>
	)
}

export default DeviceManagerProfileItemLarge

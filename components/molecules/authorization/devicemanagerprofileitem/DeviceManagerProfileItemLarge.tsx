import { useReactiveVar } from '@apollo/client'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Box, Center, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Profile } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { useRef, useState } from 'react'
import { Image, View } from 'react-native'
import { ActivityIndicator } from 'react-native'

type ProfileItemType = {
	item: Profile | undefined
	isActive: boolean | undefined
	loading?: boolean
}

const DeviceManagerProfileItemLarge = ({ item, isActive, loading }: ProfileItemType) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [showModal, setShowModal] = useState(false)
	console.log('==============>',showModal)
	const ref = useRef(null)
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
		>
			<HStack alignItems={'center'} justifyContent='space-between'>
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
								name={'ios-person'}
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

				{!loading ? (
					<View>
						{isActive ? (
							<Ionicons
								name='ios-checkmark-circle'
								size={30}
								color={rTheme.theme?.gluestack.tokens.colors.success600}
							/>
						) : (
							<MaterialIcons
								name='radio-button-unchecked'
								size={30}
								color={rTheme.theme?.gluestack.tokens.colors.green400}
							/>
						)}
					</View>
				) : (
					<ActivityIndicator />
				)}
			</HStack>
		</Box>
	)
}

export default DeviceManagerProfileItemLarge

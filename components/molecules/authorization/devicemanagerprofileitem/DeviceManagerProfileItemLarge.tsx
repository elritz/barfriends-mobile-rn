import { useReactiveVar } from '@apollo/client'
import { Box, Center, HStack, Heading, Text, VStack } from '@components/core'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Profile } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'

type ProfileItemType = {
	item: Profile | undefined
	isActive: boolean | undefined
	loading?: boolean
}

const DeviceManagerProfileItemLarge = ({ item, isActive, loading }: ProfileItemType) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
		<Box
			key={item?.id}
			flex={1}
			flexDirection={'row'}
			w={'100%'}
			my={'$2'}
			py={'$3'}
			px={'$3'}
			rounded={'$md'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<HStack alignItems={'center'}>
				{item?.profilePhoto ? (
					<Image
						source={{ uri: item.profilePhoto.url }}
						style={{ width: 50, height: 50, borderRadius: 10 }}
						alt={'Profile photo'}
					/>
				) : (
					<Box
						sx={{
							w: 40,
							h: 40,
						}}
						rounded={'$md'}
					>
						<Box
							sx={{
								h: '100%',
							}}
							justifyContent={'center'}
						>
							<Center>
								<Ionicons
									_light={{
										color: 'light.300',
									}}
									_dark={{
										color: 'dark.300',
									}}
									color={
										rTheme.colorScheme === 'light'
											? rTheme.theme?.gluestack.tokens.colors.light900
											: rTheme.theme?.gluestack.tokens.colors.dark900
									}
									size={30}
									name={'ios-person'}
								/>
							</Center>
						</Box>
					</Box>
				)}
				<VStack mx={'$2'}>
					<Text fontSize={'$lg'} numberOfLines={1}>
						{item?.IdentifiableInformation?.fullname}
					</Text>
					<Heading fontSize={'$sm'}>{item?.IdentifiableInformation?.username}</Heading>
				</VStack>
			</HStack>
			{!loading ? (
				<>
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
				</>
			) : (
				<ActivityIndicator />
			)}
		</Box>
	)
}

export default DeviceManagerProfileItemLarge

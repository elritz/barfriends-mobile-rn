import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { HStack } from "#/components/ui/hstack";
import { Center } from "#/components/ui/center";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Maybe, Profile } from '#/graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import { View } from 'react-native'

import { ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'

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
            className="flex-1 flex-row my-2 py-3 px-3 rounded-md items-center  light:bg-light-200  dark:bg-light-800">
            <HStack className="items-center justify-between">
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
						placeholder={item.profilePhoto.blurhash}
						source={{ uri: item.profilePhoto.url }}
						style={{ width: 50, height: 50, borderRadius: 10 }}
						alt={'Profile photo'}
					/>
				) : (
					<Box
                        className="rounded-md w-[40px]  h-[40px]  bg-light-200  dark:bg-light-700 justify-center">
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
				<VStack className="mx-2 flex-1 justify-center">
					<Text numberOfLines={1} className="text-lg">
						{item?.IdentifiableInformation?.fullname}
					</Text>
					<Text className="font-bold text-md">
						@{item?.IdentifiableInformation?.username}
					</Text>
				</VStack>
			</HStack>
        </Box>
    );
}

export default DeviceManagerProfileItemLarge

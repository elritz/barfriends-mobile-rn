import { useReactiveVar } from '@apollo/client'
import { Box, HStack, Pressable, Text, VStack } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Image } from 'react-native'

export default function SearchCard({ item }) {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	if (!item?.Profile) {
		return null
	}

	return (
		<Pressable
			key={item.id}
			onPress={() => {
				switch (item.__typename) {
					case 'Personal':
						return router.push({
							pathname: `(app)/public/personal/${item.Profile.id}`,
						})
					case 'Venue':
						return router.push({
							pathname: `(app)/public/venue/${item.Profile.id}`,
						})
				}
			}}
		>
			<Box
				my={'$1'}
				sx={{
					h: 65,
					_dark: {
						bg: '$dark50'
					},
					_light: {
						bg: '$light50'
					}
				}}

				px={'$3'}
			>
				<HStack sx={{ h: '100%' }} alignItems={'center'}>
					{item.Profile?.photos[0]?.url ? (
						<Image
							style={{
								height: 45,
								width: 45,
								borderRadius: 8,
							}}
							alt={'Profile Image'}
							// placeholder={item.Profile?.photos[0]?.blurhash}
							source={{ uri: item.Profile?.photos[0]?.url }}
						/>
					) : (
						<Box
							sx={{
								h: 45,
								w: 45,
							}}
							alignItems={'center'}
							justifyContent={'center'}
							rounded={'$md'}
						>
							<Ionicons
								size={25}
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light900
										: rTheme.theme?.gluestack.tokens.colors.dark900
								}
								name={'ios-person'}
							/>
						</Box>
					)}
					<VStack ml={'$2'}>
						<Text fontWeight={'$medium'} textTransform={'capitalize'} lineHeight={'$xs'} fontSize={'$lg'}>
							{item.Profile?.IdentifiableInformation.fullname}
						</Text>
						<Text lineHeight={'$xs'} fontSize={'$sm'}>
							{item.Profile?.IdentifiableInformation.username}
						</Text>
					</VStack>
				</HStack>
			</Box>
		</Pressable>
	)
}

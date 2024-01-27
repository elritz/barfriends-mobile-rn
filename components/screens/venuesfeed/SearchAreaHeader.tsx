import { useReactiveVar } from '@apollo/client'
import { Heading, VStack, Pressable, HStack, Text } from '@gluestack-ui/themed'
import { FontAwesome5 } from '@expo/vector-icons'
import { SearchAreaReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

export default function SearchAreaHeader({ typename }) {
	const router = useRouter()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const _press = () => {
		router.navigate({
			pathname: '/(app)/searcharea',
		})
	}

	return (
		<Pressable onPress={() => _press()}>
			<HStack
				py={'$4'}
				my={'$4'}
				px={'$2'}
				rounded={'$lg'}
				sx={{
					':pressed': {
						_dark: {
							bg: '#00000040',
						},
						_light: {
							bg: '#A1A1A140',
						},
					},
				}}
				flex={1}
				alignItems={'flex-end'}
				justifyContent={'center'}
			>
				<VStack flex={1}>
					<HStack alignItems={'center'} justifyContent={'space-between'} space={'md'}>
						<HStack alignItems={'center'} space={'md'}>
							<Heading fontWeight={'$black'} fontSize={'$3xl'}>
								{rSearchAreaVar.searchArea.city.name}
							</Heading>
							{rSearchAreaVar?.useCurrentLocation && (
								<FontAwesome5
									name='location-arrow'
									color={rTheme.theme?.gluestack.tokens.colors.blue500}
									size={20}
								/>
							)}
						</HStack>
					</HStack>
					<Text color={'$primary500'}>Change area</Text>
				</VStack>
			</HStack>
		</Pressable>
	)
}

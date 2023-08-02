import { useReactiveVar } from '@apollo/client'
import { Heading, VStack, Pressable, HStack, Text } from '@components/core'
import { FontAwesome5 } from '@expo/vector-icons'
import { SearchAreaReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

export default function SearchAreaHeader({ typename }) {
	const router = useRouter()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const _press = () => {
		router.push({
			pathname: '(app)/searcharea',
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
				<VStack flex={1} space={'md'}>
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
						<FontAwesome5
							style={{ marginBottom: 2 }}
							name='chevron-up'
							color={rTheme.colorScheme === 'light' ? 'black' : 'white'}
							size={25}
						/>
					</HStack>
					{typename === 'ComingAreaResponse' && (
						<Text fontSize={'$lg'} textAlign={'center'}>
							No venues, hamma the notification bell and we will let you know when it gets added. Upvoting
							is huge, it lets us know where to go!
						</Text>
					)}
				</VStack>
			</HStack>
		</Pressable>
	)
}

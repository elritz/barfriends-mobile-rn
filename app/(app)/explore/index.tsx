import { Box, Pressable, Text } from '@components/core'
import { ProfileType, useProfilesQuery } from '@graphql/generated'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useRouter } from 'expo-router'
import { Image } from 'react-native'
import { View, useWindowDimensions } from 'react-native'

export default () => {
	const { width } = useWindowDimensions()
	const router = useRouter()
	const numColumns = 2 // 2.5 if numColumns from flatlist is 3
	const height = width * (1.25 / numColumns)
	const contentInsets = useContentInsets()

	const { data, loading, error } = useProfilesQuery({
		variables: {
			where: {
				ProfileType: {
					equals: ProfileType.Personal,
				},
			},
			take: 20,
		},
	})

	return (
		<Box bg='$transparent' style={{ flex: 1 }}>
			<FlashList
				data={loading ? [] : data?.profiles}
				numColumns={2}
				estimatedItemSize={45}
				keyExtractor={(item, index) => index.toString()}
				// ListHeaderComponent={() => {
				// 	return <ShowCaseScroll />
				// }}
				contentInset={{
					...contentInsets,
				}}
				renderItem={({ item }) => {
					return (
						<>
							{loading ? null : (
								<Pressable
									// maxW={'1/2'}
									rounded={'$md'}
									flexGrow={1}
									mx={'$1'}
									my={'$2'}
									flex={1}
									alignSelf={'center'}
									onPress={() => {
										router.push({
											pathname: `(app)/public/personal/${item.id}`,
											params: {
												profileid: item.id,
											},
										})
									}}
								>
									{item && item.photos && item.photos.length > 0 && (
										<Image
											style={{
												width: '100%',
												height,
												borderWidth: 3,
												borderColor: 'white',
											}}
											source={{ uri: item.photos[0].url }}
											resizeMode='cover'
										/>
									)}
									<View
										style={{
											width: '100%',
											justifyContent: 'flex-start',
										}}
									>
										<Text textTransform={'capitalize'} fontSize={'$sm'}>
											{item.IdentifiableInformation?.fullname}
										</Text>
									</View>
								</Pressable>
							)}
						</>
					)
				}}
			/>
		</Box>
	)
}

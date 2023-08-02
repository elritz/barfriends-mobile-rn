import { useReactiveVar } from '@apollo/client'
import {
	AddIcon,
	Box,
	Button,
	Center,
	Heading,
	Pressable,
	RemoveIcon,
	Text,
} from '@components/core'
import { MaterialIcons } from '@expo/vector-icons'
import { PhotoCreateManyProfileInput, useAddStoryPhotosMutation } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import { BlurView } from 'expo-blur'
import * as ImagePicker from 'expo-image-picker'
import { useCallback, useState } from 'react'
import { Image } from 'react-native'
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from 'react-native-reanimated'

const size = 70

export default function Photos() {
	const [isLoading, setLoading] = useState(false)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const { width } = useWindowDimensions()
	const scrollRef = useAnimatedRef<ScrollView>()
	const translateX = useSharedValue(0)
	const containerHeight = 400
	const margin = 12
	const DOT_SIZE = 8
	const ITEM_WIDTH = width - margin * 2

	//! don't move this from here
	const activeIndex = useDerivedValue(() => {
		return Math.round(translateX.value / ITEM_WIDTH)
	})

	const [addPhotosMutation, { data, loading, error }] = useAddStoryPhotosMutation()

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		setTimeout(() => {
			setLoading(true)
		}, 1500)
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
			selectionLimit: 4,
			aspect: [4, 3],
			allowsMultipleSelection: true,
			quality: 1,
		})

		console.log('result', JSON.stringify(result, null, 2))

		if (result.assets) {
			const resultSettled = await Promise.allSettled(
				result.assets.map(async item => {
					const data = await useCloudinaryImageUploading(item.uri)
					return data.secure_url
				}),
			)
			// console.log('resultSettled', JSON.stringify(resultSettled, null, 2))

			const images: PhotoCreateManyProfileInput[] = resultSettled.map((item, index) => {
				if (item.status === 'fulfilled' && item.value) {
					return { url: item.value }
				}
			})

			addPhotosMutation({
				variables: {
					photos: {
						data: [...images],
					},
				},
			})
			setLoading(false)
		} else {
			setLoading(false)
		}
	}

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: event => {
			translateX.value = event.contentOffset.x
		},
	})

	const onPressScroll = useCallback(side => {
		if (side === 'left') {
			if (activeIndex.value === 0) return
			scrollRef.current?.scrollTo({ x: ITEM_WIDTH * (activeIndex.value - 1), animated: false })
		}
		if (side == 'right') {
			if (rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.photos) {
				if (
					activeIndex.value ===
					rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.photos?.length - 1
				) {
					scrollRef.current?.scrollTo({ x: ITEM_WIDTH * 0, animated: false })
					return
				}
				scrollRef.current?.scrollTo({ x: ITEM_WIDTH * (activeIndex.value + 1), animated: false })
			}
		}
	}, [])

	const styles = StyleSheet.create({
		dotLg: {
			position: 'absolute',
			left: -39,
			top: -10,
			height: size + 10,
			width: size + 10,
			borderRadius: size + 10 / 2,
			backgroundColor: rTheme.theme?.gluestack.tokens.colors.primary400,
		},
		dotMd: {
			top: 10,
			left: -55,
			position: 'absolute',
			height: size - 15,
			width: size - 15,
			borderRadius: size / 2,
			backgroundColor: rTheme.theme?.gluestack.tokens.colors.tertiary400,
		},
		dotSm: {
			top: 20,
			left: 20,
			position: 'absolute',
			height: size - 25,
			width: size - 25,
			borderRadius: size / 2,
			backgroundColor: rTheme.theme?.gluestack.tokens.colors.secondary700,
			zIndex: 3,
		},
	})

	return (
		<Box bg={'$transparent'}>
			{rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.photos?.length ? (
				<Box
					bg='$transparent'
					sx={{
						h: containerHeight,
					}}
					rounded={'$md'}
				>
					<Animated.ScrollView
						ref={scrollRef as any}
						pagingEnabled
						horizontal
						scrollToOverflowEnabled
						snapToInterval={ITEM_WIDTH}
						onScroll={scrollHandler}
						scrollEventThrottle={16}
						showsHorizontalScrollIndicator={false}
						decelerationRate={'fast'}
						bounces={false}
						style={{ overflow: 'hidden' }}
					>
						{[
							...rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.photos,
							{ __typename: 'upload' },
						]?.map((item, index) => {
							if (item?.__typename === 'upload') {
								return (
									<Box
										bg={'$transparent'}
										sx={{
											h: containerHeight,
											w: ITEM_WIDTH,
										}}
										rounded={'$md'}
									>
										<Center flex={1} mx={'$5'}>
											<Box
												sx={{
													w: '100%',
													mb: 25,
												}}
												bg='$transparent'
												alignItems={'center'}
											>
												<MaterialIcons
													style={{
														zIndex: 10,
														marginTop: 10,
														color:
															rTheme.colorScheme === 'light'
																? rTheme.theme?.gluestack.tokens.colors.light100
																: rTheme.theme?.gluestack.tokens.colors.dark900,
													}}
													size={40}
													name={'photo-size-select-actual'}
												/>
												<Box bg='$transparent' position={'absolute'} zIndex={5}>
													<View
														style={[
															styles.dotSm,
															{
																alignContent: 'center',
																justifyContent: 'center',
															},
														]}
													/>
													<View
														style={[
															styles.dotMd,
															{
																alignContent: 'center',
																justifyContent: 'center',
															},
														]}
													/>
													<View
														style={[
															styles.dotLg,
															{
																alignContent: 'center',
																justifyContent: 'center',
															},
														]}
													/>
												</Box>
											</Box>
											<Heading pb={1} fontWeight={'$black'}>
												Upload another image
											</Heading>
											<Button onPress={pickImage} bg={'$tertiary400'} rounded={'$md'} zIndex={20}>
												<Button.Icon>
													<AddIcon />
												</Button.Icon>
											</Button>
										</Center>
									</Box>
								)
							}

							return (
								<View key={index}>
									<Box h={'100%'} w={ITEM_WIDTH} rounded={'$md'} overflow='hidden' bg='$transparent'>
										<Pressable
											position={'absolute'}
											top={0}
											left={0}
											bottom={0}
											w={ITEM_WIDTH / 2}
											h={'100%'}
											opacity={20}
											onPress={() => {
												onPressScroll('left')
											}}
											zIndex={10}
										/>
										<Pressable
											position={'absolute'}
											top={0}
											right={0}
											bottom={0}
											h={'100%'}
											w={ITEM_WIDTH / 2}
											onPress={() => {
												onPressScroll('right')
											}}
											zIndex={10}
										/>
										<Button
											position={'absolute'}
											bg='$danger600'
											rounded={'$full'}
											right={10}
											top={10}
											size='xs'
											onPress={() => {
												onPressScroll('right')
											}}
											zIndex={20}
										>
											<RemoveIcon />
										</Button>
										<Image
											source={{
												uri: item.url,
											}}
											resizeMode='cover'
											style={{
												height: '100%',
												width: '100%',
												borderRadius: 0,
												overflow: 'hidden',
											}}
										/>
									</Box>
								</View>
							)
						})}
					</Animated.ScrollView>

					<View
						style={{
							position: 'absolute',
							bottom: 10,
							alignSelf: 'center',
							flexDirection: 'row',
						}}
					>
						{[
							rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.photos,
							{ __typename: 'upload' },
						].map((item, i) => {
							const rDotStyle = useAnimatedStyle(() => {
								const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
								const dotWidth = interpolate(translateX.value, inputRange, [11, 20, 11], 'clamp')
								const dotColor = interpolateColor(translateX.value, inputRange, [
									'#1d1d1d',
									'#ff7000',
									'#1d1d1d',
								])

								return {
									width: dotWidth,
									backgroundColor: dotColor,
								}
							})

							return (
								<Animated.View
									key={i.toString()}
									style={[
										rDotStyle,
										{
											marginHorizontal: 3,
											height: DOT_SIZE,
											borderRadius: DOT_SIZE / 2,
										},
									]}
								/>
							)
						})}
					</View>
				</Box>
			) : (
				<BlurView
					tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
					intensity={40}
					style={{ borderRadius: 15, overflow: 'hidden', marginHorizontal: 7 }}
				>
					<Box
						bg={'$transparent'}
						sx={{
							h: containerHeight,
							w: '100%',
						}}
						rounded={'$md'}
					>
						<Center flex={1} mx={'$5'}>
							<Box
								sx={{
									w: '100%',
									mb: 25,
								}}
								bg={'$transparent'}
								alignItems={'center'}
							>
								<MaterialIcons
									style={{
										zIndex: 10,
										marginTop: 10,
										color:
											rTheme.colorScheme === 'light'
												? rTheme.theme?.gluestack.tokens.colors.light100
												: rTheme.theme?.gluestack.tokens.colors.dark900,
									}}
									size={40}
									name={'photo-size-select-actual'}
								/>
								<Box bg={'$transparent'} position={'absolute'} zIndex={5}>
									<View
										style={[
											styles.dotSm,
											{
												alignContent: 'center',
												justifyContent: 'center',
											},
										]}
									/>
									<View
										style={[
											styles.dotMd,
											{
												alignContent: 'center',
												justifyContent: 'center',
											},
										]}
									/>
									<View
										style={[
											styles.dotLg,
											{
												alignContent: 'center',
												justifyContent: 'center',
											},
										]}
									/>
								</Box>
							</Box>
							<Heading pb={1} fontWeight={'$black'}>
								Start tonights story
							</Heading>
							<Text fontSize={'$lg'} fontWeight={'$medium'}>
								Ready to go out? Add photos of your fit and pick your emojimood
							</Text>
							<Button onPress={pickImage} bg={'$tertiary400'} rounded={'$md'} mt={'$4'}>
								<Button.Text>Upload{loading ? 'ing' : ''} images</Button.Text>
							</Button>
						</Center>
					</Box>
				</BlurView>
			)}
		</Box>
	)
}

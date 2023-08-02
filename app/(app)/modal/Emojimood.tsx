import { FormType } from './_layout'
import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Pressable, Text } from '@components/core'
import Photos from '@components/screens/tonight/photos'
import { useEmojimoodsQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const ITEM_WIDTH = 70
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const insets = useSafeAreaInsets()
	const { watch, setValue, control, reset } = useFormContext<FormType>()

	const { data, loading, error } = useEmojimoodsQuery({})

	if (loading) {
		return null
	}

	return (
		<LinearGradient colors={watch('emojimood.colors') || ['']}>
			<Box
				bg='$transparent'
				style={{
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'flex-start',
					alignSelf: 'center',
				}}
			>
				<Box
					bg='$transparent'
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
					}}
				>
					<Controller
						name='emojimood'
						control={control}
						render={({ field: { value, onChange, onBlur } }) => (
							<FlashList
								data={data?.emojimoods}
								estimatedItemSize={50}
								numColumns={3}
								extraData={watch('emojimood')}
								contentInset={{
									top: insets.top + 400 + 60,
									bottom: insets.bottom,
								}}
								ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
								renderItem={({ index, item }) => {
									return (
										<Pressable
											bg='$transparent'
											alignItems='center'
											alignSelf={'center'}
											flex={1}
											onPress={() => {
												rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.id === watch('emojimood').id ||
												watch('emojimood').id === item.id ||
												rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood?.id === item.id
													? reset()
													: setValue('emojimood', item)
											}}
										>
											<BlurView
												tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
												intensity={70}
												style={{
													width: '100%',
													maxWidth: '90%',
													overflow: 'hidden',
													borderRadius: 10,
													marginTop: 5,
													marginHorizontal: 10,
													paddingVertical: 10,
													alignItems: 'center',
													alignSelf: 'center',
												}}
											>
												<LinearGradient
													style={{
														borderRadius: ITEM_WIDTH / 2,
														height: ITEM_WIDTH,
														width: ITEM_WIDTH,
														alignItems: 'center',
														justifyContent: 'center',
														alignSelf: 'center',
														borderWidth: 2,
														borderColor:
															rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.id === watch('emojimood').id
																? 'white'
																: watch('emojimood').id === item.id ||
																  rAuthorizationVar?.DeviceProfile?.Profile?.tonightStory?.emojimood?.id === item.id
																? 'white'
																: 'transparent',
													}}
													colors={item.colors.length ? [...item.colors] : ['#ff7000', '#567000']}
												>
													<Text>{item.emoji}</Text>
												</LinearGradient>
												{/* <BlurView
												tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
												intensity={70}
												style={{
													overflow: 'hidden',
													borderRadius: 15,
													marginTop: 5,
													paddingHorizontal: 10,
													paddingVertical: 5,
												}}
											> */}
												<Text mt={'$3'} fontWeight='$bold'>
													{item.emojiname}
												</Text>
												{/* </BlurView> */}
											</BlurView>
										</Pressable>
									)
								}}
							/>
						)}
					/>
				</Box>
				<View style={{ marginTop: insets.top + 60, marginBottom: 10 }}>
					<Photos />
				</View>
			</Box>
		</LinearGradient>
	)
}

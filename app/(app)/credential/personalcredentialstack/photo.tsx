// TODO: FN()
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Center, HStack, Pressable, Text, VStack } from '@components/core'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
	CredentialPersonalProfileReactiveVar,
	PermissionMediaReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useCloudinaryImageUploading from '@util/uploading/useCloudinaryImageUploading'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useRouter } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Image } from 'react-native'
import { AppState, SafeAreaView, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'

const UserFemaleIllustration = require('@assets/images/illustration/user_female_illustration.png')

export default () => {
	const appStateRef = useRef(AppState.currentState)
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const window = useWindowDimensions()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const rPermissionMediaReactiveVar = useReactiveVar(PermissionMediaReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [status] = MediaLibrary.usePermissions()
	const [mediaLoading, setMediaLoading] = useState(false)
	const [imageUploading, setImageUploading] = useState(false)
	const [numberOfPhotos] = useState(100)
	const [photoLibrary, setPhotoLibrary] = useState([])
	const [lastPhotoID, setLastPhotoID] = useState<string>('')
	const [hasNextPage, setHasNextPage] = useState<boolean>(true)

	const loadingSkelWidth = window.width / 2.15
	const loadingSkelHeight = window.width - 20

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			photo: {
				id: '',
				uri: '',
				url: '',
			},
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const watchValues = watch()

	const loadMediaAsync = async () => {
		setMediaLoading(true)
		const assets = await MediaLibrary.getAssetsAsync({
			first: numberOfPhotos,
			mediaType: 'photo',
		})
		const id = assets.endCursor
		setLastPhotoID(id)
		setHasNextPage(assets.hasNextPage)
		setPhotoLibrary(assets.assets)
		setMediaLoading(false)
	}

	const _pickMediaPicker = async () => {
		if (!rPermissionMediaReactiveVar?.granted) {
			router.push({
				pathname: '(app)/permission/medialibrary',
			})
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1,
			})
			if (!result.cancelled) {
				setValue('photo', { id: '', uri: result.uri, url: '' })
			}
		}
	}

	const onSubmit = async data => {
		setImageUploading(true)
		const { secure_url } = await useCloudinaryImageUploading(data.photo.uri)
		if (secure_url) {
			CredentialPersonalProfileReactiveVar({
				...credentialPersonalProfileVar,
				photo: {
					...data.photo,
					url: secure_url,
				},
			})
			setImageUploading(false)
		}
	}

	const _loadMoreMedia = async () => {
		if (!mediaLoading) {
			setMediaLoading(true)
		}

		const assets = await MediaLibrary.getAssetsAsync({
			first: numberOfPhotos,
			after: lastPhotoID,
		})

		const id = assets.endCursor

		setLastPhotoID(id)
		setHasNextPage(assets.hasNextPage)
		setPhotoLibrary([...photoLibrary, ...assets.assets])
		setMediaLoading(false)
	}

	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange)
		return () => {
			subscription.remove()
		}
	}, [])

	const handleAppStateChange = async (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
			const mediapermission = await MediaLibrary.getPermissionsAsync()
			PermissionMediaReactiveVar(mediapermission)

			if (mediapermission.granted && mediapermission.status === 'granted') {
			}
		}
		appStateRef.current = nextAppState
	}

	useEffect(() => {
		if (rPermissionMediaReactiveVar?.granted) {
			if (!photoLibrary.length) {
				loadMediaAsync()
			}
		} else {
			router.push({
				pathname: '(app)/permission/medialibrary',
			})
		}
	}, [rPermissionMediaReactiveVar, mediaLoading])

	if (!photoLibrary.length) {
		return (
			<Box bg='$transparent'>
				<VStack alignItems={'center'}>
					<Image
						style={{
							height: window.width / 1.55,
							width: window.width / 1.75,
							margin: 10,
							borderRadius: 20,
						}}
						source={watchValues?.photo?.uri ? { uri: watchValues.photo.uri } : UserFemaleIllustration}
					/>
					<Box mb={'$2'} mx={'$2'} rounded={'$md'} p={'$5'}>
						<VStack my={'$2'} alignItems={'center'}>
							<Text px={'$2'}>
								Continue with your profile setup, use your own photos to share and create the style that
								reflect you the best.
							</Text>
							<Button
								variant='solid'
								onPress={async () =>
									router.push({
										pathname: '(app)/permission/medialibrary',
									})
								}
								mt={'$10'}
								sx={{
									w: '85%',
								}}
							>
								<Text fontWeight='$bold'>Continue</Text>
							</Button>
						</VStack>
					</Box>
					{[...Array(6)].map((item, index) => {
						return (
							<HStack key={index} space={'none'} overflow='hidden'>
								{[...Array(3)].map((item, index) => {
									return (
										<Skeleton
											height={window.width / 3}
											width={window.width / 3}
											radius={15}
											colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
											colors={
												rTheme.colorScheme === 'light'
													? [
															String(rTheme.theme?.gluestack.tokens.colors.light100),
															String(rTheme.theme?.gluestack.tokens.colors.light300),
													  ]
													: [
															String(rTheme.theme?.gluestack.tokens.colors.dark100),
															String(rTheme.theme?.gluestack.tokens.colors.dark300),
													  ]
											}
										/>
									)
								})}
							</HStack>
						)
					})}
				</VStack>
			</Box>
		)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Center>
				<Svg
					style={{
						position: 'absolute',
					}}
					width={window.width}
					height='100%'
				>
					<Defs>
						<LinearGradient id='grad' x1='1' y1='0' x2='1' y2='1'>
							<Stop offset='0.25' stopOpacity='1' />
							<Stop offset='1' stopOpacity='1' />
						</LinearGradient>
					</Defs>
					<Rect height='100%' width={window.width} fill='url(#grad)' />
				</Svg>
				<Image
					style={{
						height: window.width / 1.55,
						width: window.width / 1.75,
						margin: 10,
						borderRadius: 20,
					}}
					source={watchValues?.photo?.uri ? { uri: watchValues.photo.uri } : UserFemaleIllustration}
				/>
			</Center>
			<FlashList
				style={{
					width: '100%',
					height: '100%',
				}}
				keyExtractor={(item, index) => index.toString()}
				onEndReachedThreshold={0.4}
				onEndReached={_loadMoreMedia}
				numColumns={3}
				data={photoLibrary}
				scrollEnabled={!imageUploading}
				renderItem={({ item }: any) => {
					return (
						<Pressable
							onPress={() => {
								!imageUploading && setValue('photo.uri', item.uri)
							}}
						>
							<Image
								style={{
									height: window.width / 3,
									width: window.width / 3,
									justifyContent: 'center',
								}}
								source={{ uri: item.uri }}
							/>
							{watchValues?.photo?.uri === item.uri && (
								<Ionicons
									name='checkmark-circle'
									color={rTheme.theme?.gluestack.tokens.colors.success500}
									style={{
										position: 'absolute',
										bottom: 1,
										right: 1,
									}}
									size={25}
								/>
							)}
						</Pressable>
					)
				}}
			/>
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					flexDirection: 'row',
					width: '100%',
					height: 90,
					paddingTop: 10,
					justifyContent: 'space-around',
					alignItems: 'center',
					paddingBottom: insets.bottom,
				}}
			>
				<Pressable
					sx={{
						mx: '10%',
						w: '40%',
					}}
				>
					<MaterialIcons
						name={'photo-library'}
						size={29}
						color={rTheme.theme?.gluestack.tokens.colors.green800}
					/>
				</Pressable>

				<Button
					mx={'$5'}
					sx={{
						w: '40%',
					}}
					onPress={handleSubmit(onSubmit)}
					variant={'link'}
					disabled={imageUploading}
				>
					<Text color={'$primary500'} fontSize={'$xl'}>
						{imageUploading ? 'Continue' : 'Uploading'}
					</Text>
					<Feather
						name='arrow-right'
						size={29}
						color={rTheme.theme?.gluestack.tokens.colors.primary500}
					/>
				</Button>
			</View>
		</SafeAreaView>
	)
}
